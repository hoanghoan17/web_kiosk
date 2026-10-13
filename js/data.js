/* ================================================================
   Dữ liệu mẫu (mock) cho hệ thống Thu ngân
   Trong hệ thống thực, các dữ liệu này lấy từ REST API của Spring Boot
   và cập nhật realtime qua WebSocket/STOMP.
   ================================================================ */

// ============ DANH MỤC MÓN ============
const CATEGORIES = [
  { id: 'all',      name: 'Tất cả',       icon: 'fa-utensils' },
  { id: 'burger',   name: 'Burger',       icon: 'fa-burger' },
  { id: 'chicken',  name: 'Gà rán',       icon: 'fa-drumstick-bite' },
  { id: 'pizza',    name: 'Pizza',        icon: 'fa-pizza-slice' },
  { id: 'combo',    name: 'Combo',        icon: 'fa-boxes-stacked' },
  { id: 'side',     name: 'Ăn kèm',       icon: 'fa-french-fries' },
  { id: 'drink',    name: 'Nước uống',    icon: 'fa-mug-hot' },
  { id: 'dessert',  name: 'Tráng miệng',  icon: 'fa-ice-cream' }
];

// ============ MÓN ĂN ============
const PRODUCTS = [
  // Burger
  { id: 'p01', code: 'BG01', name: 'Burger Bò Phô Mai',     cat: 'burger',  price: 65000, icon: 'fa-burger',        popular: true,  stock: 20, desc: 'Bò Úc, phô mai Cheddar, sốt BBQ' },
  { id: 'p02', code: 'BG02', name: 'Burger Gà Giòn',        cat: 'burger',  price: 55000, icon: 'fa-burger',        popular: false, stock: 15, desc: 'Gà giòn tan, xà lách, sốt mayonnaise' },
  { id: 'p03', code: 'BG03', name: 'Burger Tôm Sốt Tartar', cat: 'burger',  price: 60000, icon: 'fa-burger',        popular: false, stock: 12, desc: 'Tôm chiên xù, sốt tartar' },
  { id: 'p04', code: 'BG04', name: 'Burger Cá Fillet',      cat: 'burger',  price: 58000, icon: 'fa-burger',        popular: false, stock: 8,  desc: 'Cá tuyết fillet, xà lách' },

  // Chicken
  { id: 'p05', code: 'GA01', name: 'Gà Rán Cay 1 miếng',    cat: 'chicken', price: 39000, icon: 'fa-drumstick-bite', popular: true,  stock: 30, desc: 'Đùi gà rán cay giòn' },
  { id: 'p06', code: 'GA02', name: 'Gà Rán Truyền Thống',   cat: 'chicken', price: 39000, icon: 'fa-drumstick-bite', popular: true,  stock: 30, desc: 'Đùi gà rán vàng ươm, giòn tan' },
  { id: 'p07', code: 'GA03', name: 'Cánh Gà Sốt Cay (4c)',  cat: 'chicken', price: 79000, icon: 'fa-drumstick-bite', popular: false, stock: 20, desc: '4 cánh gà sốt cay Hàn Quốc' },
  { id: 'p08', code: 'GA04', name: 'Gà Popcorn',            cat: 'chicken', price: 49000, icon: 'fa-drumstick-bite', popular: true,  stock: 25, desc: 'Miếng gà chiên nhỏ, giòn xốp' },

  // Pizza
  { id: 'p09', code: 'PZ01', name: 'Pizza Hải Sản (M)',      cat: 'pizza',   price: 149000, icon: 'fa-pizza-slice',  popular: false, stock: 10, desc: 'Tôm, mực, cua, sốt kem' },
  { id: 'p10', code: 'PZ02', name: 'Pizza Bò BBQ (M)',       cat: 'pizza',   price: 139000, icon: 'fa-pizza-slice',  popular: false, stock: 10, desc: 'Bò xay, hành tây, sốt BBQ' },
  { id: 'p11', code: 'PZ03', name: 'Pizza Phô Mai 4 Loại',   cat: 'pizza',   price: 159000, icon: 'fa-pizza-slice',  popular: false, stock: 8,  desc: 'Mozzarella, Parmesan, Cheddar, Gouda' },

  // Combo
  { id: 'p12', code: 'CB01', name: 'Combo Burger Bò + Khoai + Coca', cat: 'combo', price: 99000,  icon: 'fa-boxes-stacked', popular: true,  stock: 20, desc: 'Tiết kiệm 15%' },
  { id: 'p13', code: 'CB02', name: 'Combo Gà 2 miếng + Cơm + Pepsi', cat: 'combo', price: 89000,  icon: 'fa-boxes-stacked', popular: true,  stock: 20, desc: 'Combo bữa trưa hot' },
  { id: 'p14', code: 'CB03', name: 'Combo Gia Đình (4 người)',       cat: 'combo', price: 349000, icon: 'fa-boxes-stacked', popular: false, stock: 5,  desc: '4 burger + 4 nước + khoai lớn' },

  // Side
  { id: 'p15', code: 'AK01', name: 'Khoai Tây Chiên (M)',   cat: 'side',    price: 29000, icon: 'fa-french-fries',  popular: true,  stock: 40, desc: 'Khoai tây chiên vàng giòn' },
  { id: 'p16', code: 'AK02', name: 'Khoai Tây Chiên (L)',   cat: 'side',    price: 39000, icon: 'fa-french-fries',  popular: true,  stock: 40, desc: 'Size lớn cho 2 người' },
  { id: 'p17', code: 'AK03', name: 'Vòng Hành Chiên',       cat: 'side',    price: 35000, icon: 'fa-french-fries',  popular: false, stock: 20, desc: 'Vòng hành tây chiên giòn' },
  { id: 'p18', code: 'AK04', name: 'Salad Trộn',            cat: 'side',    price: 32000, icon: 'fa-leaf',          popular: false, stock: 15, desc: 'Rau xà lách trộn sốt' },

  // Drink
  { id: 'p19', code: 'NU01', name: 'Coca-Cola (M)',         cat: 'drink',   price: 22000, icon: 'fa-mug-hot',       popular: true,  stock: 50, desc: 'Nước ngọt có gas' },
  { id: 'p20', code: 'NU02', name: 'Pepsi (M)',             cat: 'drink',   price: 22000, icon: 'fa-mug-hot',       popular: true,  stock: 50, desc: 'Nước ngọt có gas' },
  { id: 'p21', code: 'NU03', name: 'Trà Đào Cam Sả',        cat: 'drink',   price: 35000, icon: 'fa-mug-hot',       popular: true,  stock: 30, desc: 'Trà đào thanh mát' },
  { id: 'p22', code: 'NU04', name: 'Nước Cam Ép',           cat: 'drink',   price: 32000, icon: 'fa-mug-hot',       popular: false, stock: 20, desc: '100% cam tươi' },
  { id: 'p23', code: 'NU05', name: 'Nước Suối',             cat: 'drink',   price: 12000, icon: 'fa-bottle-water',  popular: false, stock: 50, desc: 'Chai 500ml' },

  // Dessert
  { id: 'p24', code: 'TM01', name: 'Kem Ốc Quế Vani',       cat: 'dessert', price: 15000, icon: 'fa-ice-cream',     popular: true,  stock: 30, desc: 'Kem tươi vị vani' },
  { id: 'p25', code: 'TM02', name: 'Sundae Chocolate',      cat: 'dessert', price: 25000, icon: 'fa-ice-cream',     popular: false, stock: 20, desc: 'Kem + sốt chocolate' },
  { id: 'p26', code: 'TM03', name: 'Bánh Táo Nướng',        cat: 'dessert', price: 19000, icon: 'fa-cookie-bite',   popular: false, stock: 15, desc: 'Bánh táo ấm nóng' }
];

// ============ TÙY CHỌN (SIZE / TOPPING) ============
const OPTIONS = {
  size: [
    { id: 'S', name: 'Nhỏ (S)',  extra: 0 },
    { id: 'M', name: 'Vừa (M)',  extra: 5000 },
    { id: 'L', name: 'Lớn (L)',  extra: 10000 }
  ],
  topping: [
    { id: 't1', name: 'Thêm phô mai',   extra: 8000 },
    { id: 't2', name: 'Thêm thịt xông khói', extra: 12000 },
    { id: 't3', name: 'Thêm trứng ốp',  extra: 7000 },
    { id: 't4', name: 'Thêm rau xà lách', extra: 3000 }
  ]
};

/* ============ LUẬT KẾT HỢP FP-GROWTH (mô phỏng) ============
   Trong hệ thống thực: BE Spring Boot chạy thuật toán FP-Growth trên lịch sử
   giao dịch, sinh ra tập luật {antecedent} => {consequent} kèm confidence,
   support. FE gọi API /api/recommendations?items=[...] để lấy gợi ý.
   Ở đây ta mô phỏng bằng map cứng.                                        */
const ASSOCIATION_RULES = [
  // Burger bò -> khoai + coca (combo cổ điển)
  { if: ['p01'], then: 'p15', conf: 0.82, sup: 0.34 },
  { if: ['p01'], then: 'p19', conf: 0.78, sup: 0.31 },
  { if: ['p01'], then: 'p24', conf: 0.42, sup: 0.18 },

  // Burger gà -> khoai + pepsi
  { if: ['p02'], then: 'p15', conf: 0.75, sup: 0.28 },
  { if: ['p02'], then: 'p20', conf: 0.71, sup: 0.26 },

  // Gà rán -> Pepsi + khoai + salad
  { if: ['p05'], then: 'p20', conf: 0.79, sup: 0.30 },
  { if: ['p05'], then: 'p15', conf: 0.66, sup: 0.22 },
  { if: ['p06'], then: 'p20', conf: 0.81, sup: 0.33 },
  { if: ['p06'], then: 'p18', conf: 0.38, sup: 0.14 },

  // Pizza -> nước ngọt lớn
  { if: ['p09'], then: 'p19', conf: 0.68, sup: 0.20 },
  { if: ['p10'], then: 'p19', conf: 0.70, sup: 0.22 },

  // Khoai tây -> nước ngọt / kem
  { if: ['p15'], then: 'p19', conf: 0.62, sup: 0.28 },
  { if: ['p15'], then: 'p24', conf: 0.35, sup: 0.12 },

  // Combo -> tráng miệng
  { if: ['p12'], then: 'p24', conf: 0.48, sup: 0.16 },
  { if: ['p13'], then: 'p25', conf: 0.44, sup: 0.15 },

  // Popcorn gà -> pepsi
  { if: ['p08'], then: 'p20', conf: 0.72, sup: 0.24 }
];

/**
 * Trả về mảng gợi ý cho giỏ hàng hiện tại (mô phỏng FP-Growth).
 * @param {string[]} productIds - id các món đang có trong giỏ
 * @returns {Array} - [{ product, confidence, support }]
 */
function getRecommendations(productIds) {
  if (!productIds || productIds.length === 0) return [];
  const inCart = new Set(productIds);
  const scores = new Map(); // pid -> {conf, sup, count}
  for (const rule of ASSOCIATION_RULES) {
    if (rule.if.every(x => inCart.has(x)) && !inCart.has(rule.then)) {
      const prev = scores.get(rule.then);
      if (!prev || rule.conf > prev.conf) {
        scores.set(rule.then, { conf: rule.conf, sup: rule.sup });
      }
    }
  }
  const list = [];
  for (const [pid, s] of scores.entries()) {
    const p = PRODUCTS.find(x => x.id === pid);
    if (p) list.push({ product: p, confidence: s.conf, support: s.sup });
  }
  list.sort((a, b) => b.confidence - a.confidence);
  return list.slice(0, 5);
}

// ============ VOUCHER / KHUYẾN MÃI ============
const VOUCHERS = [
  { code: 'HUIT10',    type: 'percent', value: 10, min: 100000, desc: 'Giảm 10% cho đơn từ 100k' },
  { code: 'FREESHIP',  type: 'amount',  value: 15000, min: 50000, desc: 'Giảm 15.000đ' },
  { code: 'LUNCH20',   type: 'percent', value: 20, min: 150000, desc: 'Giảm 20% đơn từ 150k' },
  { code: 'NEWCUST',   type: 'amount',  value: 30000, min: 200000, desc: 'Khách mới - giảm 30.000đ' }
];

// ============ ĐƠN HÀNG MẪU (lịch sử ca) ============
const SAMPLE_ORDERS = [
  {
    id: 'ORD-20260920-0018', source: 'kiosk', type: 'takeaway',
    items: [
      { pid: 'p06', name: 'Gà Rán Truyền Thống', qty: 2, price: 39000 },
      { pid: 'p20', name: 'Pepsi (M)',           qty: 2, price: 22000 },
      { pid: 'p15', name: 'Khoai Tây Chiên (M)', qty: 1, price: 29000 }
    ],
    subtotal: 151000, discount: 0, total: 151000,
    payment: 'vnpay', status: 'preparing', paid: true,
    customer: 'Khách lẻ', createdAt: '2026-09-20 10:42', cashier: 'Nguyễn Quốc Huy'
  },
  {
    id: 'ORD-20260920-0017', source: 'counter', type: 'dine-in',
    items: [
      { pid: 'p12', name: 'Combo Burger Bò + Khoai + Coca', qty: 1, price: 99000 },
      { pid: 'p24', name: 'Kem Ốc Quế Vani',                qty: 1, price: 15000 }
    ],
    subtotal: 114000, discount: 11400, total: 102600,
    payment: 'cash', status: 'ready', paid: true, voucher: 'HUIT10',
    customer: 'Khách lẻ', createdAt: '2026-09-20 10:38', cashier: 'Nguyễn Quốc Huy'
  },
  {
    id: 'ORD-20260920-0016', source: 'counter', type: 'takeaway',
    items: [
      { pid: 'p01', name: 'Burger Bò Phô Mai', qty: 1, price: 65000 },
      { pid: 'p15', name: 'Khoai Tây Chiên (M)', qty: 1, price: 29000 },
      { pid: 'p19', name: 'Coca-Cola (M)',      qty: 1, price: 22000 }
    ],
    subtotal: 116000, discount: 0, total: 116000,
    payment: 'vietqr', status: 'delivered', paid: true,
    customer: 'Chị Lan (0908 ***)', createdAt: '2026-09-20 10:25', cashier: 'Nguyễn Quốc Huy'
  },
  {
    id: 'ORD-20260920-0015', source: 'kiosk', type: 'takeaway',
    items: [
      { pid: 'p09', name: 'Pizza Hải Sản (M)', qty: 1, price: 149000 },
      { pid: 'p19', name: 'Coca-Cola (M)',      qty: 2, price: 22000 }
    ],
    subtotal: 193000, discount: 0, total: 193000,
    payment: 'vnpay', status: 'delivered', paid: true,
    customer: 'Khách lẻ', createdAt: '2026-09-20 10:12', cashier: 'Nguyễn Quốc Huy'
  },
  {
    id: 'ORD-20260920-0014', source: 'counter', type: 'dine-in',
    items: [
      { pid: 'p08', name: 'Gà Popcorn', qty: 1, price: 49000 },
      { pid: 'p23', name: 'Nước Suối',  qty: 1, price: 12000 }
    ],
    subtotal: 61000, discount: 0, total: 61000,
    payment: 'cash', status: 'cancelled', paid: false,
    customer: 'Khách lẻ', createdAt: '2026-09-20 10:05', cashier: 'Nguyễn Quốc Huy',
    cancelReason: 'Khách đổi ý'
  },
  {
    id: 'ORD-20260920-0013', source: 'counter', type: 'takeaway',
    items: [
      { pid: 'p13', name: 'Combo Gà 2 miếng + Cơm + Pepsi', qty: 2, price: 89000 }
    ],
    subtotal: 178000, discount: 35600, total: 142400,
    payment: 'vietqr', status: 'delivered', paid: true, voucher: 'LUNCH20',
    customer: 'Anh Bảo', createdAt: '2026-09-20 09:48', cashier: 'Nguyễn Quốc Huy'
  }
];

// ============ ĐƠN ĐẾN TỪ KIOSK CHỜ XÁC NHẬN ============
const KIOSK_QUEUE = [
  {
    id: 'ORD-20260920-0021', source: 'kiosk', type: 'takeaway',
    items: [
      { pid: 'p05', name: 'Gà Rán Cay 1 miếng', qty: 2, price: 39000 },
      { pid: 'p16', name: 'Khoai Tây Chiên (L)', qty: 1, price: 39000 },
      { pid: 'p20', name: 'Pepsi (M)',           qty: 2, price: 22000 }
    ],
    subtotal: 161000, discount: 0, total: 161000,
    payment: 'pending', status: 'pending', paid: false,
    customer: 'Khách lẻ', kioskId: 'KIOSK-01', createdAt: '2026-09-20 10:55'
  },
  {
    id: 'ORD-20260920-0020', source: 'kiosk', type: 'takeaway',
    items: [
      { pid: 'p14', name: 'Combo Gia Đình (4 người)', qty: 1, price: 349000 }
    ],
    subtotal: 349000, discount: 0, total: 349000,
    payment: 'pending', status: 'pending', paid: false,
    customer: 'Anh Minh (090 ***)', kioskId: 'KIOSK-02', createdAt: '2026-09-20 10:52'
  },
  {
    id: 'ORD-20260920-0019', source: 'kiosk', type: 'takeaway',
    items: [
      { pid: 'p02', name: 'Burger Gà Giòn', qty: 1, price: 55000 },
      { pid: 'p15', name: 'Khoai Tây Chiên (M)', qty: 1, price: 29000 },
      { pid: 'p21', name: 'Trà Đào Cam Sả', qty: 1, price: 35000 }
    ],
    subtotal: 119000, discount: 0, total: 119000,
    payment: 'vnpay', status: 'pending', paid: true,   // đã thanh toán online, chờ xác nhận vào bếp
    customer: 'Khách lẻ', kioskId: 'KIOSK-01', createdAt: '2026-09-20 10:47'
  }
];

// ============ KDS - BẾP ============
const KDS_ORDERS = [
  {
    id: 'ORD-20260920-0018', type: 'takeaway', source: 'kiosk',
    items: [
      { name: 'Gà Rán Truyền Thống x2', done: false },
      { name: 'Pepsi (M) x2',           done: true },
      { name: 'Khoai Tây Chiên (M) x1', done: false }
    ],
    status: 'preparing', createdAt: '10:42', elapsedMin: 3
  },
  {
    id: 'ORD-20260920-0017', type: 'dine-in', source: 'counter',
    items: [
      { name: 'Combo Burger Bò + Khoai + Coca x1', done: true },
      { name: 'Kem Ốc Quế Vani x1',                done: true }
    ],
    status: 'ready', createdAt: '10:38', elapsedMin: 7
  },
  {
    id: 'ORD-20260920-0021', type: 'takeaway', source: 'kiosk',
    items: [
      { name: 'Gà Rán Cay 1 miếng x2', done: false },
      { name: 'Khoai Tây Chiên (L) x1', done: false },
      { name: 'Pepsi (M) x2',           done: false }
    ],
    status: 'preparing', createdAt: '10:55', elapsedMin: 1
  }
];

// ============ TRẠNG THÁI CA HIỆN TẠI ============
const CURRENT_SHIFT = {
  id: 'SHIFT-20260920-M',
  cashier: 'Nguyễn Quốc Huy',
  cashierCode: 'NV001',
  startTime: '2026-09-20 07:30',
  openingCash: 500000,
  ordersCount: 18,
  revenue: {
    cash:   1240000,
    vnpay:  2180000,
    vietqr: 1560000,
    total:  4980000
  }
};

// Helpers
function money(n) {
  return (n || 0).toLocaleString('vi-VN') + 'đ';
}
function statusLabel(s) {
  const map = {
    pending:   'Chờ xử lý',
    preparing: 'Đang chuẩn bị',
    ready:     'Sẵn sàng',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy'
  };
  return map[s] || s;
}
function paymentLabel(p) {
  const map = {
    cash:    'Tiền mặt',
    vnpay:   'VNPay',
    vietqr:  'VietQR',
    pending: 'Chưa thanh toán'
  };
  return map[p] || p;
}
function typeLabel(t) {
  return t === 'dine-in' ? 'Tại quầy' : (t === 'takeaway' ? 'Mang đi' : t);
}
function sourceLabel(s) {
  return s === 'kiosk' ? 'Kiosk' : 'Quầy';
}
