# 🌿 AgriTrace AI — Hệ Thống Quản Lý Chuỗi Cung Ứng Nông Sản Sạch

> Nền tảng web quản lý chuỗi cung ứng nông sản sạch tích hợp trí tuệ nhân tạo.  
> Truy xuất nguồn gốc bằng QR Code, quản lý nông trại, kho hàng, vận chuyển và đặt hàng trực tuyến.

---

## 📋 Mục lục

- [Tổng quan](#-tổng-quan)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Cài đặt & Chạy](#-cài-đặt--chạy)
- [Cơ sở dữ liệu](#-cơ-sở-dữ-liệu)
- [API Endpoints](#-api-endpoints)
- [Chức năng chính](#-chức-năng-chính)
- [Vai trò người dùng](#-vai-trò-người-dùng)
- [Biến môi trường](#-biến-môi-trường)

---

## 🌱 Tổng quan

**AgriTrace AI** là dự án xây dựng hệ thống web quản lý chuỗi cung ứng nông sản sạch, bao gồm:

- Quản lý tài khoản, phân quyền (5 vai trò)
- Quản lý nông trại, sản phẩm, lô thu hoạch, chứng nhận chất lượng
- Quản lý kho hàng (nhập/xuất/tồn kho)
- Theo dõi vận chuyển đơn hàng
- Truy xuất nguồn gốc nông sản qua **QR Code**
- Đặt hàng, giỏ hàng, thanh toán, voucher
- Chat trực tuyến giữa khách hàng và nhân viên (WebSocket)
- Chương trình khách hàng thân thiết: tích điểm, thăng hạng, đổi voucher
- AI Chatbot giải đáp thắc mắc sản phẩm + phân tích xu hướng tiêu thụ
- Dashboard thống kê doanh thu, tồn kho, hiệu suất chuỗi cung ứng

---

## 🏗 Kiến trúc hệ thống

```
┌──────────────────────────────────────────────────────────┐
│                      Nginx (port 80)                     │
│               Reverse Proxy + Static Files               │
├────────────────────────┬─────────────────────────────────┤
│                        │                                 │
│   Frontend (port 3000) │    Backend API (port 8080)      │
│   Next.js 15 App       │    Spring Boot 3.4.2            │
│   React 19 + TS        │    Java 21 + Maven              │
│                        │                                 │
├────────────────────────┴─────────────────────────────────┤
│                                                          │
│   PostgreSQL 16 (port 5432)    Redis 7 (port 6379)       │
│   Dữ liệu chính               Cache & Sessions          │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🛠 Công nghệ sử dụng

### Backend
| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| Java | 21 | Ngôn ngữ chính |
| Spring Boot | 3.4.2 | Framework REST API |
| Spring Security | 6.x | Xác thực & phân quyền |
| Spring Data JPA | 3.x | ORM, truy vấn database |
| Flyway | — | Quản lý migration database |
| JWT (jjwt) | 0.12.6 | Token xác thực |
| MapStruct | 1.6.3 | Mapping DTO ↔ Entity |
| PostgreSQL | 16 | Cơ sở dữ liệu quan hệ |
| Maven | 3.9+ | Quản lý dependencies |
| Springdoc OpenAPI | 2.7.0 | Swagger API documentation |

### Frontend
| Công nghệ | Phiên bản | Mô tả |
|---|---|---|
| Next.js | 15.2.4 | React framework (App Router) |
| React | 19.0.0 | UI library |
| TypeScript | 5.8 | Type‑safe JavaScript |
| Tailwind CSS | 3.4 | Utility‑first CSS |
| Zustand | 5.0 | State management |
| TanStack Query | 5.66 | Server state & caching |
| React Hook Form | 7.54 | Form handling |
| Zod | 3.24 | Schema validation |
| Axios | 1.8 | HTTP client |
| Lucide React | 0.475 | SVG icon library |

### Hạ tầng
| Công nghệ | Mô tả |
|---|---|
| Docker & Docker Compose | Container hoá toàn bộ hệ thống |
| Nginx | Reverse proxy, phân phối frontend |
| Redis 7 | Cache sessions & data |

---

## 📁 Cấu trúc thư mục

```
AI_Vegetable/
├── backend/                          # Spring Boot REST API
│   ├── src/main/java/.../            # Java source
│   │   ├── config/                   # Cấu hình ứng dụng
│   │   ├── controller/               # REST Controllers
│   │   ├── dto/                      # Data Transfer Objects
│   │   ├── entity/                   # JPA Entities
│   │   ├── exception/                # Custom exceptions
│   │   ├── mapper/                   # MapStruct mappers
│   │   ├── repository/               # Spring Data JPA repos
│   │   ├── security/                 # JWT filter, UserDetails
│   │   ├── service/                  # Business logic
│   │   └── util/                     # Utilities
│   ├── src/main/resources/           # config & migrations
│   │   ├── application.yml
│   │   └── db/migration/            # Flyway SQL files (V1, V2, V3)
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                         # Next.js 15 App Router
│   ├── src/app/                      # Pages (App Router)
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Root layout (metadata, fonts)
│   │   ├── globals.css               # Global CSS (light theme)
│   │   ├── login/page.tsx            # Đăng nhập
│   │   ├── register/page.tsx         # Đăng ký
│   │   └── dashboard/                # Dashboard sections
│   ├── src/components/               # UI components & layout
│   ├── src/features/                 # Feature modules (auth, projects)
│   ├── src/hooks/                    # Custom React hooks
│   ├── src/lib/                      # Shared utilities (api, validation)
│   ├── src/services/                 # API service functions
│   ├── src/stores/                   # Zustand stores
│   ├── src/types/                    # TypeScript type definitions
│   ├── src/utils/                    # Helper functions
│   ├── public/images/                # Ảnh hero, fresh produce, QR scan
│   ├── Dockerfile
│   └── package.json
│
├── docker/
│   └── nginx/default.conf           # Nginx reverse proxy config
├── compose.yaml                     # Docker Compose (production)
├── compose.override.yaml            # Docker Compose overrides (dev)
├── Makefile                         # Make commands
├── .env.example                     # Mẫu biến môi trường
├── .gitignore                       # Git ignore rules
└── README.md                        # <-- This file
```

---

## 🚀 Cài đặt & Chạy

### Yêu cầu hệ thống
| Phần mềm | Phiên bản |
|---|---|
| Node.js | 20+ |
| Java JDK | 21 |
| Maven | 3.9+ |
| PostgreSQL | 16+ |
| Redis | 7+ |
| Docker (tuỳ chọn) | 24+ |

### Cách 1: Chạy từng service (Development)
1. **Tạo file `.env` từ mẫu**
   ```bash
   cp .env.example .env
   # Sửa thông tin PostgreSQL, JWT secret trong .env
   ```
2. **Chạy Backend**
   ```bash
   cd backend
   mvn spring-boot:run -Dspring-boot.run.profiles=dev
   # Backend chạy tại http://localhost:8080
   # Swagger UI: http://localhost:8080/swagger-ui/index.html
   ```
3. **Chạy Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   # Frontend chạy tại http://localhost:3000
   ```

### Cách 2: Chạy bằng Docker Compose
```bash
cp .env.example .env
# Sửa biến môi trường trong .env

docker compose up -d
# Toàn bộ hệ thống chạy tại http://localhost
```

---

## 🗄 Cơ sở dữ liệu

### Sơ đồ ERD (hiện tại)
```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│    roles     │     │  user_roles  │     │      users       │
├──────────────┤     ├──────────────┤     ├──────────────────┤
│ id (PK)      │◄────│ role_id (FK) │     │ id (UUID, PK)    │
│ name         │     │ user_id (FK) │────►│ email            │
└──────────────┘     └──────────────┘     │ password_hash    │
                                          │ full_name        │
                                          │ active           │
                                          │ created_at       │
                                          │ updated_at       │
                                          └────────┬─────────┘
                                                   │
                                                   │ 1:N
                                                   ▼
                     ┌──────────────────┐   ┌──────────────────┐
                     │ refresh_tokens   │   │    projects      │
                     ├──────────────────┤   ├──────────────────┤
                     │ id (UUID, PK)    │   │ id (UUID, PK)    │
                     │ token_id         │   │ name             │
                     │ user_id (FK)     │   │ description      │
                     │ expires_at       │   │ status           │
                     │ revoked          │   │ owner_id (FK)    │
                     │ created_at       │   │ created_at       │
                     └──────────────────┘   │ updated_at       │
                                            └──────────────────┘
```

### Migration files
- `V1__create_core_schema.sql` – Tạo bảng `users`, `roles`, `user_roles`, `projects`, `refresh_tokens`
- `V2__seed_roles.sql` – Thêm 5 vai trò: ADMIN, FARMER, WAREHOUSE_STAFF, DISTRIBUTOR, CUSTOMER
- `V3__enforce_case_insensitive_emails.sql` – Email không phân biệt hoa/thường

---

## 📡 API Endpoints
### Authentication (`/api/v1/auth`)
| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/register` | Đăng ký tài khoản mới | ❌ |
| POST | `/login` | Đăng nhập, nhận JWT | ❌ |
| POST | `/refresh` | Làm mới access token | ❌ |
| POST | `/logout` | Đăng xuất, hủy refresh token | ✅ |

### Users (`/api/v1/users`) – Admin only
| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/` | Danh sách người dùng | ✅ ADMIN |
| GET | `/{id}` | Chi tiết người dùng | ✅ ADMIN |
| POST | `/` | Tạo người dùng mới | ✅ ADMIN |
| PUT | `/{id}` | Cập nhật người dùng | ✅ ADMIN |
| DELETE | `/{id}` | Xóa người dùng | ✅ ADMIN |

### Projects (`/api/v1/projects`)
| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/` | Danh sách dự án | ✅ |
| GET | `/{id}` | Chi tiết dự án | ✅ |
| POST | `/` | Tạo dự án mới | ✅ |
| PUT | `/{id}` | Cập nhật dự án | ✅ |
| DELETE | `/{id}` | Xóa dự án | ✅ |

---

## ✨ Chức năng chính
### Đã hoàn thành ✅
- [x] Đăng ký / Đăng nhập / Đăng xuất (JWT + Refresh Token)
- [x] Phân quyền theo vai trò (RBAC)
- [x] CRUD người dùng (Admin)
- [x] CRUD dự án
- [x] Landing page AgriTrace AI (light theme, Lucide icons, ảnh thật)
- [x] Trang đăng nhập / đăng ký (split‑screen layout)
- [x] Dashboard với sidebar, stat cards, bảng dữ liệu
- [x] Responsive design (mobile + desktop)
- [x] Docker Compose multi‑service deployment
- [x] Flyway database migrations
- [x] Swagger API documentation

### Sắp phát triển 🔜
- [ ] Quản lý nông trại & lô thu hoạch
- [ ] Quản lý sản phẩm theo mùa vụ
- [ ] Truy xuất nguồn gốc QR Code
- [ ] Quản lý kho hàng (nhập/xuất/tồn)
- [ ] Theo dõi vận chuyển
- [ ] Giỏ hàng & đặt hàng & thanh toán
- [ ] Chat trực tuyến (WebSocket)
- [ ] Voucher & mã giảm giá
- [ ] Tích điểm & thăng hạng thành viên
- [ ] AI Chatbot (tích hợp LLM)
- [ ] Dashboard thống kê nâng cao

---

## 👥 Vai trò người dùng
| Vai trò | Mô tả | Quyền chính |
|---|---|---|
| **Admin** | Quản trị viên | Quản lý toàn hệ thống, tài khoản, phân quyền, voucher, báo cáo |
| **Farmer** | Nông dân | Quản lý nông trại, lô thu hoạch, chứng nhận, tạo voucher riêng |
| **Warehouse Staff** | Nhân viên kho | Nhập/xuất kho, kiểm soát tồn kho, cảnh báo hàng hết |
| **Distributor** | Nhà phân phối | Tiếp nhận hàng, cập nhật trạng thái vận chuyển |
| **Customer** | Khách hàng | Tìm kiếm, đặt hàng, quét QR, tích điểm, chat |

---

## ⚙ Biến môi trường
Tạo file `.env` từ [`.env.example`](.env.example):
```env
# Docker Compose
COMPOSE_PROJECT_NAME=agritrace-ai
APP_PORT=80
FRONTEND_PORT=3000
BACKEND_PORT=8080
REDIS_PORT=6379

# PostgreSQL
POSTGRES_DB=agritrace_db
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_strong_password
POSTGRES_PORT=5432

# Backend
SERVER_PORT=8080
JWT_SECRET=your-jwt-secret-at-least-32-characters
JWT_EXPIRATION=3600
REFRESH_TOKEN_EXPIRATION=604800
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost
BOOTSTRAP_ADMIN_EMAIL=admin@agritrace.vn
BOOTSTRAP_ADMIN_PASSWORD=admin_password
BOOTSTRAP_ADMIN_NAME=Administrator

# Frontend
NEXT_PUBLIC_API_URL=/api/v1
NEXT_PUBLIC_APP_NAME=AgriTrace AI
```
> ⚠️ **Lưu ý:** File `.env` chứa mật khẩu thật – KHÔNG được commit lên Git. File này đã có trong `.gitignore`.

---

## 📄 License

Đồ án tốt nghiệp © 2026 — AgriTrace AI Team
