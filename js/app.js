/* ================================================================
   App shared JS: sidebar, topbar, toast, modal helpers
   ================================================================ */

/**
 * Render sidebar + topbar chung cho mọi trang thu ngân
 * @param {Object} opts { active, title, icon, showShift = true }
 */
function renderShell(opts) {
  const { active, title, icon = 'fa-cash-register', showShift = true } = opts;

  const kioskBadge = (typeof KIOSK_QUEUE !== 'undefined')
    ? `<span class="badge">${KIOSK_QUEUE.length}</span>` : '';

  const navItems = [
    { key: 'pos',       href: 'pos.html',        icon: 'fa-cash-register', label: 'Bán hàng (POS)' },
    { key: 'kiosk',     href: 'kiosk-orders.html', icon: 'fa-tablet-screen-button', label: 'Đơn từ Kiosk', badge: kioskBadge },
    { key: 'orders',    href: 'orders.html',     icon: 'fa-receipt', label: 'Đơn hàng trong ca' },
    { key: 'kds',       href: 'kds.html',        icon: 'fa-utensils', label: 'Trạng thái bếp' },
    { key: 'shift',     href: 'shift-close.html', icon: 'fa-flag-checkered', label: 'Đóng ca & Báo cáo' }
  ];

  const nav = navItems.map(it => `
    <a class="nav-item ${active === it.key ? 'active' : ''}" href="${it.href}">
      <i class="fa-solid ${it.icon}"></i>
      <span>${it.label}</span>
      ${it.badge || ''}
    </a>
  `).join('');

  const shiftBadge = showShift ? `
    <div class="shift-indicator" title="Ca đang mở">
      <span class="dot"></span>
      <span>Ca sáng · ${CURRENT_SHIFT.cashierCode}</span>
    </div>
  ` : '';

  const shell = `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-logo"><i class="fa-solid fa-burger"></i></div>
        <div>
          <div class="brand-name">FastPOS</div>
          <div class="brand-sub">Cashier Terminal</div>
        </div>
      </div>
      <div class="nav-group-title">Nghiệp vụ</div>
      ${nav}
      <div class="nav-group-title">Hệ thống</div>
      <a class="nav-item" href="index.html">
        <i class="fa-solid fa-right-from-bracket"></i>
        <span>Đăng xuất</span>
      </a>
    </aside>

    <header class="topbar">
      <div class="page-title">
        <i class="fa-solid ${icon}"></i>
        <span>${title}</span>
      </div>
      <div class="spacer"></div>
      ${shiftBadge}
      <div class="clock" id="topClock">--:--:--</div>
      <div class="user-menu">
        <div class="avatar">NH</div>
        <div>
          <div class="u-name">${CURRENT_SHIFT.cashier}</div>
          <div class="u-role">Thu ngân · ${CURRENT_SHIFT.cashierCode}</div>
        </div>
      </div>
    </header>
  `;

  document.getElementById('shell').innerHTML = shell;
  startClock();
}

function startClock() {
  const el = document.getElementById('topClock');
  if (!el) return;
  const tick = () => {
    const d = new Date();
    const pad = n => String(n).padStart(2, '0');
    el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  tick();
  setInterval(tick, 1000);
}

// ============ TOAST ============
function toast(msg, type = 'success', duration = 2500) {
  let c = document.querySelector('.toast-container');
  if (!c) {
    c = document.createElement('div');
    c.className = 'toast-container';
    document.body.appendChild(c);
  }
  const t = document.createElement('div');
  t.className = 'toast ' + (type === 'success' ? '' : type);
  const iconMap = { success: 'fa-circle-check', error: 'fa-circle-xmark', warn: 'fa-triangle-exclamation', info: 'fa-circle-info' };
  t.innerHTML = `<i class="fa-solid ${iconMap[type] || iconMap.success}" style="color: var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : type === 'warn' ? 'warning' : 'info'})"></i><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(100%)';
    t.style.transition = 'all .25s';
    setTimeout(() => t.remove(), 250);
  }, duration);
}

// ============ MODAL ============
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}
// Đóng modal khi click ngoài
document.addEventListener('click', (e) => {
  if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('active');
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
  }
});
