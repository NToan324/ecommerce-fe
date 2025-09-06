# 💻 E-commerce Website - Laptop Store

Đây là dự án **E-commerce bán máy tính** được xây dựng bằng [Next.js](https://nextjs.org).  
Người dùng có thể duyệt sản phẩm, tìm kiếm, thêm vào giỏ hàng, đặt hàng và thanh toán.  
Hệ thống hỗ trợ **quản lý sản phẩm, khách hàng, nhân viên và đơn hàng**.

---

## 🚀 Công nghệ sử dụng

- [Next.js 14](https://nextjs.org) - React framework cho SSR/SSG
- [TypeScript](https://www.typescriptlang.org/) - Ngôn ngữ lập trình mạnh kiểu
- [Tailwind CSS](https://tailwindcss.com/) - Thiết kế UI nhanh chóng
- [NextAuth.js](https://next-auth.js.org/) - Xác thực & phân quyền
- [Zustand / Redux Toolkit] - State management
- [Stripe / VNPay / Momo] - Thanh toán online

---

## 📦 Tính năng chính

### 👨‍💻 Khách hàng

- Đăng ký / Đăng nhập / Quên mật khẩu
- Xem danh sách sản phẩm theo **danh mục / thương hiệu**
- Tìm kiếm & lọc sản phẩm theo **giá, cấu hình, đánh giá**
- Xem chi tiết sản phẩm
- Thêm sản phẩm vào giỏ hàng & đặt hàng
- Thanh toán online hoặc COD
- Quản lý đơn hàng cá nhân

### 🛠️ Nhân viên

- Quản lý sản phẩm (thêm, sửa, xóa, tồn kho)
- Quản lý đơn hàng (xử lý, giao hàng)
- Quản lý khách hàng

### 📊 Quản lý

- Quản lý nhân viên
- Thống kê doanh thu, sản phẩm bán chạy
- Quản lý khuyến mãi / voucher

---

## 🏗️ Cấu trúc thư mục

```

├── app/                # Next.js App Router
│   ├── page.tsx        # Trang chủ
│   ├── products/       # Trang sản phẩm
│   ├── cart/           # Giỏ hàng
│   └── admin/          # Trang quản trị
├── components/         # Các component tái sử dụng
├── lib/                # Config, util
├── prisma/             # Schema database (Prisma)
├── public/             # Static assets
└── README.md

```

---

## ⚡ Cài đặt & chạy dự án

### 1️⃣ Clone repo

```bash
git clone https://github.com/your-username/laptop-store.git
cd laptop-store
```

### 2️⃣ Cài dependencies

```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### 3️⃣ Chạy development server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

### 4️⃣ Build & Production

```bash
npm run build
npm start
```

---

## 🚀 Triển khai

Dự án có thể triển khai dễ dàng với [Vercel](https://vercel.com/):
[📖 Hướng dẫn deploy Next.js](https://nextjs.org/docs/app/building-your-application/deploying)

---

## 📚 Tài liệu tham khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 👨‍💻 Tác giả

- **Nhật Toàn** - [GitHub](https://github.com/your-username) | [LinkedIn](https://linkedin.com/in/your-profile)

---
