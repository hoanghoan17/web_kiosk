/* ================================================================
   POS logic: menu render, cart, suggestions (FP-Growth mock),
   voucher, payment, order finalize
   ================================================================ */

const CART = {
  items: [],           // { pid, name, unitPrice, qty, size, toppings, note }
  type: 'takeaway',    // 'dine-in' | 'takeaway'
  voucher: null,
  customer: 'Khách lẻ',
  customerPhone: '',
  orderNumber: null
};
let CURRENT_CATEGORY = 'all';
let CURRENT_SEARCH = '';
let CURRENT_PAY_METHOD = 'cash';
let SELECTED_PRODUCT = null;   // product đang mở trong modal chi tiết

// Sinh mã đơn tạm
function generateOrderNumber() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const seq = String(Math.floor(Math.random() * 900) + 100);
  return `ORD-${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${seq}`;
}
CART.orderNumber = generateOrderNumber();

// ==================== MENU (LEFT) ====================
function renderCategories() {
  const el = document.getElementById('categoryTabs');
  el.innerHTML = CATEGORIES.map(c => `
    <button class="category-tab ${c.id === CURRENT_CATEGORY ? 'active' : ''}"
            onclick="selectCategory('${c.id}')">
      <i class="fa-solid ${c.icon}"></i>${c.name}
    </button>
  `).join('');
}
function selectCategory(id) {
  CURRENT_CATEGORY = id;
  renderCategories();
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const q = CURRENT_SEARCH.toLowerCase();
  const list = PRODUCTS.filter(p => {
    const inCat = CURRENT_CATEGORY === 'all' || p.cat === CURRENT_CATEGORY;
    const inSearch = !q || p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
    return inCat && inSearch;
  });

  if (list.length === 0) {
    grid.innerHTML = `<div class="empty" style="grid-column: 1/-1;">
      <i class="fa-solid fa-magnifying-glass"></i>
      <div>Không tìm thấy món phù hợp</div>
    </div>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <div class="product-card ${p.stock <= 0 ? 'out-of-stock' : ''}"
         onclick="${p.stock > 0 ? `openProductModal('${p.id}')` : ''}">
      <div class="img">
        <i class="fa-solid ${p.icon}"></i>
        ${p.popular ? '<div class="fav"><i class="fa-solid fa-fire"></i> HOT</div>' : ''}
      </div>
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="desc">${p.desc}</div>
        <div class="price">${money(p.price)}</div>
      </div>
    </div>
  `).join('');
}

// ==================== CART (RIGHT) ====================
function renderCart() {
  const box = document.getElementById('cartItems');
  document.getElementById('orderNumber').textContent = CART.orderNumber;
  if (CART.items.length === 0) {
    box.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-basket-shopping"></i>
        <div class="fw-600" style="color:#374151;">Giỏ hàng trống</div>
        <div style="font-size:12.5px; margin-top:4px;">Chọn món từ menu bên trái để bắt đầu</div>
      </div>`;
  } else {
    box.innerHTML = CART.items.map((it, idx) => {
      const p = PRODUCTS.find(x => x.id === it.pid);
      const optText = [];
      if (it.size && it.size !== 'M') optText.push(`Size ${it.size}`);
      if (it.toppings && it.toppings.length) optText.push(it.toppings.map(t => t.name).join(', '));
      if (it.note) optText.push('Ghi chú: ' + it.note);
      const lineTotal = it.unitPrice * it.qty;
      return `
        <div class="cart-item">
          <div class="thumb"><i class="fa-solid ${p.icon}"></i></div>
          <div>
            <div class="name">${it.name}</div>
            ${optText.length ? `<div class="opts">${optText.join(' · ')}</div>` : ''}
            <div class="qty-ctrl">
              <button onclick="changeQty(${idx}, -1)"><i class="fa-solid fa-minus"></i></button>
              <span class="qty">${it.qty}</span>
              <button onclick="changeQty(${idx}, 1)"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
          <div>
            <div class="amount">${money(lineTotal)}</div>
            <button class="remove" onclick="removeItem(${idx})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`;
    }).join('');
  }
  renderSuggestions();
  renderTotals();
}

function addToCart(pid, opts = {}) {
  const p = PRODUCTS.find(x => x.id === pid);
  if (!p) return;
  const size = opts.size || 'M';
  const toppings = opts.toppings || [];
  const note = opts.note || '';
  const qty = opts.qty || 1;

  const sizeExtra = (OPTIONS.size.find(s => s.id === size) || {}).extra || 0;
  const topExtra = toppings.reduce((s, t) => s + (t.extra || 0), 0);
  const unitPrice = p.price + sizeExtra + topExtra;

  // Gộp nếu trùng hoàn toàn opts
  const key = JSON.stringify({ pid, size, tops: toppings.map(t => t.id).sort(), note });
  const found = CART.items.find(it => it._key === key);
  if (found) {
    found.qty += qty;
  } else {
    CART.items.push({
      _key: key, pid, name: p.name, unitPrice, qty,
      size, toppings, note
    });
  }
  renderCart();
  toast(`Đã thêm ${p.name}${qty > 1 ? ' x' + qty : ''} vào giỏ`);
}

function changeQty(idx, delta) {
  const it = CART.items[idx];
  it.qty += delta;
  if (it.qty <= 0) CART.items.splice(idx, 1);
  renderCart();
}
function removeItem(idx) {
  CART.items.splice(idx, 1);
  renderCart();
  toast('Đã xóa món khỏi giỏ', 'warn');
}
function clearCart() {
  if (CART.items.length === 0) return;
  if (!confirm('Xóa toàn bộ giỏ hàng?')) return;
  CART.items = []; CART.voucher = null;
  document.getElementById('voucherInput').value = '';
  renderCart();
  toast('Đã xóa toàn bộ giỏ', 'warn');
}

function setOrderType(type) {
  CART.type = type;
  document.querySelectorAll('.order-type-switch button').forEach(b => {
    b.classList.toggle('active', b.dataset.type === type);
  });
}

// ==================== GỢI Ý FP-GROWTH ====================
function renderSuggestions() {
  const box = document.getElementById('suggestionsBox');
  if (!box) return;
  const pids = CART.items.map(it => it.pid);
  const list = getRecommendations(pids);

  if (list.length === 0) {
    box.style.display = 'none';
    return;
  }
  box.style.display = 'block';
  box.innerHTML = `
    <div class="sug-title">
      <i class="fa-solid fa-wand-magic-sparkles"></i>
      <span>Gợi ý món ăn kèm (FP-Growth)</span>
      <span class="text-muted" style="margin-left:auto; font-weight:500;">Top ${list.length}</span>
    </div>
    <div class="sug-list">
      ${list.map(s => `
        <div class="sug-item" onclick="addToCart('${s.product.id}')" title="Confidence ${(s.confidence*100).toFixed(0)}% · Support ${(s.support*100).toFixed(0)}%">
          <div class="sug-thumb"><i class="fa-solid ${s.product.icon}"></i></div>
          <div style="min-width:0;">
            <div class="sug-name">${s.product.name}</div>
            <div class="sug-conf"><i class="fa-solid fa-chart-line"></i> conf ${(s.confidence*100).toFixed(0)}%</div>
          </div>
          <div class="sug-price">+${money(s.product.price)}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// ==================== TOTALS + VOUCHER ====================
function calcTotals() {
  const subtotal = CART.items.reduce((s, it) => s + it.unitPrice * it.qty, 0);
  let discount = 0;
  if (CART.voucher) {
    const v = CART.voucher;
    if (subtotal >= v.min) {
      discount = v.type === 'percent' ? Math.floor(subtotal * v.value / 100) : v.value;
    }
  }
  const vat = 0; // đã bao gồm
  const total = Math.max(0, subtotal - discount + vat);
  return { subtotal, discount, vat, total };
}
function renderTotals() {
  const t = calcTotals();
  document.getElementById('subtotal').textContent = money(t.subtotal);
  document.getElementById('discount').textContent = '-' + money(t.discount);
  document.getElementById('total').textContent = money(t.total);
  document.getElementById('cartCount').textContent = CART.items.reduce((s, it) => s + it.qty, 0);
  document.getElementById('btnPay').disabled = CART.items.length === 0;
  document.getElementById('btnPay').style.opacity = CART.items.length === 0 ? '.5' : '1';
}

function applyVoucher() {
  const code = document.getElementById('voucherInput').value.trim().toUpperCase();
  if (!code) { CART.voucher = null; renderTotals(); toast('Đã bỏ voucher', 'info'); return; }
  const v = VOUCHERS.find(x => x.code === code);
  if (!v) { toast('Mã voucher không tồn tại', 'error'); return; }
  const t = calcTotals();
  const sub = CART.items.reduce((s, it) => s + it.unitPrice * it.qty, 0);
  if (sub < v.min) { toast(`Cần đơn tối thiểu ${money(v.min)}`, 'warn'); return; }
  CART.voucher = v;
  renderTotals();
  toast(`Áp dụng voucher ${v.code}: ${v.desc}`);
}

// ==================== MODAL CHI TIẾT MÓN ====================
function openProductModal(pid) {
  const p = PRODUCTS.find(x => x.id === pid);
  SELECTED_PRODUCT = p;
  document.getElementById('pmName').textContent = p.name;
  document.getElementById('pmDesc').textContent = p.desc;
  document.getElementById('pmIcon').className = 'fa-solid ' + p.icon;
  document.getElementById('pmBasePrice').textContent = money(p.price);
  document.getElementById('pmStock').textContent = p.stock;
  document.getElementById('pmNote').value = '';
  document.getElementById('pmQty').textContent = '1';

  // Size radios
  document.getElementById('pmSizeList').innerHTML = OPTIONS.size.map((s, i) => `
    <label class="opt-chip">
      <input type="radio" name="pmSize" value="${s.id}" ${s.id === 'M' ? 'checked' : ''}>
      <span>${s.name}</span>
      ${s.extra > 0 ? `<em>+${money(s.extra)}</em>` : ''}
    </label>
  `).join('');

  // Topping checkboxes
  document.getElementById('pmToppingList').innerHTML = OPTIONS.topping.map(t => `
    <label class="opt-chip">
      <input type="checkbox" value="${t.id}" data-name="${t.name}" data-extra="${t.extra}">
      <span>${t.name}</span>
      <em>+${money(t.extra)}</em>
    </label>
  `).join('');

  // Cập nhật giá khi đổi opts
  document.querySelectorAll('#pmSizeList input, #pmToppingList input').forEach(inp => {
    inp.addEventListener('change', updatePmPrice);
  });
  updatePmPrice();
  openModal('productModal');
}
function pmQtyChange(delta) {
  const el = document.getElementById('pmQty');
  let v = parseInt(el.textContent) + delta;
  if (v < 1) v = 1; if (v > 20) v = 20;
  el.textContent = v;
  updatePmPrice();
}
function updatePmPrice() {
  if (!SELECTED_PRODUCT) return;
  const size = document.querySelector('input[name="pmSize"]:checked')?.value || 'M';
  const sizeExtra = (OPTIONS.size.find(s => s.id === size) || {}).extra || 0;
  const tops = Array.from(document.querySelectorAll('#pmToppingList input:checked'))
    .reduce((s, i) => s + Number(i.dataset.extra), 0);
  const qty = parseInt(document.getElementById('pmQty').textContent) || 1;
  const unit = SELECTED_PRODUCT.price + sizeExtra + tops;
  document.getElementById('pmTotalPrice').textContent = money(unit * qty);
}
function confirmAddProduct() {
  if (!SELECTED_PRODUCT) return;
  const size = document.querySelector('input[name="pmSize"]:checked')?.value || 'M';
  const tops = Array.from(document.querySelectorAll('#pmToppingList input:checked'))
    .map(i => ({ id: i.value, name: i.dataset.name, extra: Number(i.dataset.extra) }));
  const note = document.getElementById('pmNote').value.trim();
  const qty = parseInt(document.getElementById('pmQty').textContent) || 1;
  addToCart(SELECTED_PRODUCT.id, { size, toppings: tops, note, qty });
  closeModal('productModal');
}

// ==================== MODAL THANH TOÁN ====================
function openPayment() {
  if (CART.items.length === 0) return;
  const t = calcTotals();
  document.getElementById('payTotal').textContent = money(t.total);
  document.getElementById('payTotalHidden').value = t.total;
  document.getElementById('payCashInput').value = '';
  document.getElementById('payChange').textContent = money(0);
  document.getElementById('payCustomerName').value = CART.customer;
  document.getElementById('payCustomerPhone').value = CART.customerPhone;
  selectPayMethod('cash');
  openModal('paymentModal');
}
function selectPayMethod(m) {
  CURRENT_PAY_METHOD = m;
  document.querySelectorAll('.pay-method').forEach(el => {
    el.classList.toggle('active', el.dataset.method === m);
  });
  document.querySelectorAll('.pay-panel').forEach(el => {
    el.style.display = el.dataset.method === m ? 'block' : 'none';
  });
  if (m === 'vnpay' || m === 'vietqr') renderQR(m);
}
function payQuickCash(v) {
  document.getElementById('payCashInput').value = v.toLocaleString('vi-VN');
  calcChange();
}
function calcChange() {
  const total = Number(document.getElementById('payTotalHidden').value);
  const raw = document.getElementById('payCashInput').value.replace(/[^\d]/g, '');
  document.getElementById('payCashInput').value = raw ? Number(raw).toLocaleString('vi-VN') : '';
  const cash = Number(raw) || 0;
  const change = cash - total;
  const el = document.getElementById('payChange');
  el.textContent = money(Math.max(0, change));
  el.parentElement.style.background = change < 0
    ? 'linear-gradient(135deg, #fee2e2, #fecaca)'
    : 'linear-gradient(135deg, #ecfdf5, #d1fae5)';
  el.style.color = change < 0 ? '#991b1b' : '#065f46';
}
function renderQR(method) {
  const total = document.getElementById('payTotalHidden').value;
  // QR mô phỏng bằng dịch vụ QR public (không auth). Trong hệ thống thực,
  // BE sinh URL VNPay hoặc chuỗi EMVCo VietQR gồm số TK + số tiền + nội dung.
  const content = `${CART.orderNumber} - FastPOS`;
  const payload = method === 'vnpay'
    ? `vnpay://pay?amount=${total}&orderInfo=${encodeURIComponent(content)}`
    : `00020101021138550010A00000072701250006970422011400000123456780208QRIBFTTA5303704540${total}5802VN62${String(content.length + 4).padStart(2,'0')}0508${content}6304ABCD`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(payload)}`;
  document.getElementById('qrImage').src = qrUrl;
  document.getElementById('qrMethod').textContent = method === 'vnpay' ? 'VNPay' : 'VietQR';
  document.getElementById('qrAmount').textContent = money(Number(total));
}
function confirmPayment() {
  const total = Number(document.getElementById('payTotalHidden').value);
  if (CURRENT_PAY_METHOD === 'cash') {
    const raw = document.getElementById('payCashInput').value.replace(/[^\d]/g, '');
    const cash = Number(raw) || 0;
    if (cash < total) { toast('Tiền khách đưa chưa đủ', 'error'); return; }
  }

  CART.customer = document.getElementById('payCustomerName').value.trim() || 'Khách lẻ';
  CART.customerPhone = document.getElementById('payCustomerPhone').value.trim();

  // Lưu vào localStorage để trang in hóa đơn đọc
  const t = calcTotals();
  const cashReceived = CURRENT_PAY_METHOD === 'cash'
    ? Number(document.getElementById('payCashInput').value.replace(/[^\d]/g, '')) : t.total;
  const order = {
    id: CART.orderNumber,
    items: CART.items.map(it => ({
      pid: it.pid, name: it.name, qty: it.qty,
      unitPrice: it.unitPrice,
      size: it.size, toppings: it.toppings, note: it.note
    })),
    subtotal: t.subtotal, discount: t.discount, total: t.total,
    voucher: CART.voucher ? CART.voucher.code : null,
    payment: CURRENT_PAY_METHOD,
    cashReceived,
    change: Math.max(0, cashReceived - t.total),
    type: CART.type,
    customer: CART.customer,
    customerPhone: CART.customerPhone,
    cashier: CURRENT_SHIFT.cashier,
    cashierCode: CURRENT_SHIFT.cashierCode,
    createdAt: new Date().toLocaleString('vi-VN')
  };
  localStorage.setItem('lastOrder', JSON.stringify(order));

  closeModal('paymentModal');
  toast('Thanh toán thành công! Đang mở hóa đơn...', 'success');
  setTimeout(() => { window.location.href = 'invoice.html'; }, 700);
}

// ==================== SEARCH ====================
function onSearchInput(v) {
  CURRENT_SEARCH = v;
  renderProducts();
}

// ==================== INIT ====================
function initPOS() {
  renderCategories();
  renderProducts();
  renderCart();

  // Voucher: enter to apply
  const vi = document.getElementById('voucherInput');
  vi.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); applyVoucher(); } });

  // Cash input format on input
  document.getElementById('payCashInput')?.addEventListener('input', calcChange);
}
