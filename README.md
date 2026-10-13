# FastPOS — Giao diện Thu ngân (Cashier)

Bộ giao diện **Thu ngân** cho đồ án khóa luận:

> **XÂY DỰNG HỆ THỐNG ĐẶT MÓN WEB–KIOSK TÍCH HỢP GỢI Ý MÓN ĂN DỰA TRÊN LUẬT KẾT HỢP CHO CỬA HÀNG THỨC ĂN NHANH**
> Mã đề tài: `CNTT-KLCN181` — GVHD: **Phùng Thế Bảo**
> Nhóm: Nguyễn Quốc Huy (2001230301), Hoàng Văn Hoan (2001230258), Phạm Quốc Vũ (2001231050)
> Trường ĐH Công Thương TP.HCM — Khoa CNTT — 2026

Phần này do **Nguyễn Quốc Huy** phụ trách thiết kế **giao diện Thu ngân (Cashier)**, làm nền cho phần Front-end kết nối Back-end Spring Boot ở giai đoạn tích hợp.

---

## 1. Công nghệ sử dụng (đúng đề cương)

| Thành phần | Công nghệ |
|---|---|
| **Front-end** | **HTML5, CSS3, JavaScript thuần** (theo đúng đề cương) |
| Thư viện phụ | Font Awesome 6, Google Fonts (Inter), Chart.js (biểu đồ báo cáo ca) |
| Back-end (đối tác) | Java 17, Spring Boot 3.x, REST + WebSocket/STOMP, **FP-Growth**, VNPay/VietQR, Spring Security, JWT |
| CSDL (đối tác) | Microsoft SQL Server, Redis |

Không dùng framework FE (React/Vue/...) để bám sát đề cương và dễ tích hợp vào Spring Boot bằng static resources.

---

## 2. Danh sách các màn hình đã hoàn thành

| # | File | Trang | Mô tả |
|---|---|---|---|
| 1 | `index.html` | **Đăng nhập** | Form đăng nhập, hiển thị features hệ thống, mẹo demo |
| 2 | `shift-open.html` | **Mở ca làm việc** | Nhập tiền quỹ đầu ca, chọn máy POS, ghi chú bàn giao |
| 3 | `pos.html` | **Bán hàng (POS)** — màn hình chính | Menu 8 danh mục · 26 món · giỏ hàng · **panel gợi ý FP-Growth** · voucher · nút thanh toán |
| 4 | `pos.html` (modal) | **Chi tiết món** | Chọn size (S/M/L), topping (phô mai, thịt xông khói...), ghi chú, số lượng |
| 5 | `pos.html` (modal) | **Thanh toán** | 3 phương thức: **Tiền mặt** (tính tiền thối), **VNPay** (QR), **VietQR** (QR) |
| 6 | `invoice.html` | **Hóa đơn** | Xem trước dạng phiếu nhiệt 80mm, in trực tiếp (`Ctrl+P`), gửi Email/SMS |
| 7 | `orders.html` | **Đơn hàng trong ca** | Lọc theo trạng thái, tìm kiếm, xem chi tiết, in lại, hủy đơn |
| 8 | `kiosk-orders.html` | **Đơn từ Kiosk** (realtime) | Nhận đơn từ Kiosk qua WebSocket (mô phỏng), thu tiền / chuyển bếp / từ chối |
| 9 | `kds.html` | **Trạng thái bếp (KDS)** | View rút gọn cho Thu ngân theo dõi tiến độ, tick từng món, báo sẵn sàng |
| 10 | `shift-close.html` | **Đóng ca & Báo cáo** | KPI ca, doanh thu theo phương thức, biểu đồ theo giờ + top món, kiểm tiền cuối ca |

---

## 3. Điểm nhấn kỹ thuật bám sát đề tài

### 3.1. Gợi ý món ăn dựa trên luật kết hợp (FP-Growth) ⭐
- Panel **"Gợi ý món ăn kèm"** hiển thị ngay dưới giỏ hàng trong màn POS.
- Mỗi gợi ý kèm chỉ số **confidence** và **support** — đúng ngôn ngữ của luật kết hợp.
- Tập luật mẫu ~15 luật (`ASSOCIATION_RULES` trong `js/data.js`).
- Hàm `getRecommendations(cartItemIds)` mô phỏng chính xác cách BE trả kết quả FP-Growth.
- Trong hệ thống thực: FE gọi `GET /api/recommendations?items=[p01,p15]` → BE Spring Boot chạy FP-Growth trên bảng lịch sử giao dịch.

### 3.2. Thanh toán VNPay / VietQR
- Modal thanh toán có 3 tab: Tiền mặt, VNPay, VietQR.
- Mã QR sinh động qua `api.qrserver.com` (chỉ để hiển thị) — BE thực tế sẽ trả về URL VNPay hoặc chuỗi EMVCo VietQR chuẩn NAPAS 247.
- Realtime cập nhật trạng thái thanh toán qua WebSocket (mô phỏng ghi chú trên UI).

### 3.3. Realtime WebSocket (mô phỏng)
- `kiosk-orders.html`: tự động **push đơn mới mỗi 25 giây** kèm hiệu ứng nhấp nháy + tiếng beep bằng Web Audio API.
- Đây là mô phỏng cho topic STOMP `/topic/kiosk-orders/{storeId}` trong BE thực.

### 3.4. In hóa đơn dạng thermal
- Bố cục 80mm, font Courier, in trực tiếp bằng `@media print` + `@page size: 80mm auto`.

### 3.5. Trạng thái đơn hàng chuẩn
`pending` → `preparing` → `ready` → `delivered` (hoặc `cancelled`). Badge màu riêng cho từng trạng thái.

---

## 4. Cấu trúc thư mục

```
/
├── index.html                 # Đăng nhập
├── shift-open.html            # Mở ca
├── pos.html                   # POS chính (+ modal chi tiết món + modal thanh toán)
├── invoice.html               # Hóa đơn
├── orders.html                # Danh sách đơn trong ca
├── kiosk-orders.html          # Đơn từ Kiosk (realtime)
├── kds.html                   # Trạng thái bếp
├── shift-close.html           # Đóng ca & báo cáo
├── css/
│   ├── style.css              # CSS chung (layout, buttons, badges, forms, modal, toast)
│   ├── pos.css                # CSS riêng cho POS + payment modal
│   └── invoice.css            # CSS hóa đơn + print media query
├── js/
│   ├── data.js                # Dữ liệu mẫu: danh mục, món, luật FP-Growth, voucher, đơn mẫu, ca
│   ├── app.js                 # Shell chung: sidebar, topbar, clock, toast, modal helper
│   └── pos.js                 # Logic POS: giỏ hàng, gợi ý, voucher, thanh toán
└── docs/                      # Tài liệu tham chiếu
```

---

## 5. Luồng nghiệp vụ demo

```
[index.html]         Đăng nhập (NV001 / 123456)
      ↓
[shift-open.html]    Mở ca (500.000đ)
      ↓
[pos.html]           Chọn món → Modal chi tiết → Thêm vào giỏ
      ↓              Panel FP-Growth gợi ý combo
      ↓              Nhập voucher HUIT10 / LUNCH20
      ↓              Bấm Thanh toán → Modal thanh toán (Cash / VNPay / VietQR)
      ↓
[invoice.html]       Hóa đơn 80mm → In / Email / SMS
      ↓              Có thể quay lại POS tạo đơn mới
      ↓
[kiosk-orders.html]  Đơn kiosk tự đến sau 25s → Thu tiền hoặc chuyển bếp
[kds.html]           Theo dõi bếp, tick món hoàn tất
[orders.html]        Danh sách đơn trong ca, hủy / in lại
      ↓
[shift-close.html]   Kiểm tiền cuối ca → Đóng ca → In báo cáo
```

**Voucher demo:** `HUIT10`, `FREESHIP`, `LUNCH20`, `NEWCUST` (xem `js/data.js`).

---

## 6. Trách nhiệm Front-end vs Back-end (tài liệu bàn giao tích hợp)

| Chức năng | FE hiện tại | Sẽ thay bằng API BE |
|---|---|---|
| Đăng nhập | Bỏ qua kiểm tra | `POST /api/auth/login` → JWT |
| Danh mục + món | Mảng cứng trong `data.js` | `GET /api/categories`, `GET /api/products` |
| Giỏ hàng | LocalState JS | Chỉ FE, không cần BE |
| Gợi ý FP-Growth | Rule cứng | `POST /api/recommendations` với body `{items:[...]}` |
| Voucher | Mảng cứng | `POST /api/vouchers/apply` |
| Tạo đơn | LocalStorage | `POST /api/orders` |
| Thanh toán VNPay | QR mẫu | `POST /api/payments/vnpay/create` → URL redirect |
| Thanh toán VietQR | QR mẫu | `POST /api/payments/vietqr/create` → chuỗi EMVCo |
| Đơn từ Kiosk realtime | `setInterval(25s)` | STOMP `/topic/kiosk/{storeId}` |
| KDS realtime | State cục bộ | STOMP `/topic/kds/{storeId}` |
| Báo cáo ca | Số cứng | `GET /api/shifts/{id}/report` |

---

## 7. Các tính năng chưa triển khai (nằm ngoài phạm vi UI Thu ngân)

- Xác thực JWT + refresh token thật (BE Spring Security đảm nhiệm)
- Kết nối máy in nhiệt qua ESC/POS (cần Java Print Service hoặc WebUSB)
- Đồng bộ tồn kho realtime với phân hệ Admin
- Chức năng đổi ca giữa nhân viên trong cùng máy POS
- I18n (đa ngôn ngữ) — hiện thuần tiếng Việt

## 8. Đề xuất bước phát triển tiếp

1. Kết nối các trang FE với API BE Spring Boot (đổi mảng cứng → `fetch`).
2. Thay `setInterval` bằng SockJS + STOMP client cho realtime.
3. Bổ sung màn *đăng nhập bằng vân tay / thẻ RFID* cho ca ngắn.
4. Tích hợp WebUSB in phiếu bếp riêng theo trạm.
5. Viết Playwright test cho luồng bán hàng end-to-end.

---

## 9. Ghi chú

- Toàn bộ mã, chú thích, UI đều **tiếng Việt**, kiểu chữ **Inter** (Google Fonts).
- Tông màu **đỏ fast-food (#e63946)** phù hợp thương hiệu KFC/Popeyes/Lotteria.
- Responsive: sidebar tự co lại ở màn hình < 992px; bố cục POS tự đổi sang cột dọc ở màn hình < 1100px.
- Không dùng backend/server-side, chạy hoàn toàn tĩnh — mở trực tiếp file `index.html` là dùng được.
