"use client";

import {
  BarChart3,
  Bot,
  CheckCircle,
  ChevronRight,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  QrCode,
  ShieldCheck,
  Star,
  Truck,
  Users,
  Warehouse,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#gioi-thieu", label: "Giới thiệu" },
    { href: "#tinh-nang", label: "Tính năng" },
    { href: "#quy-trinh", label: "Quy trình" },
    { href: "#doi-tuong", label: "Đối tượng" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #e8e8e8",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: "#1a7a3a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Leaf size={18} color="#fff" strokeWidth={2} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, color: "#1a1a1a" }}>
            AgriTrace<span style={{ color: "#1a7a3a" }}> AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 2 }} className="hidden md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                color: "#555",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1a7a3a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Auth buttons */}
        <div style={{ display: "flex", gap: 10 }} className="hidden md:flex">
          <Link
            href="/login"
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              color: "#333",
              border: "1px solid #ddd",
            }}
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              background: "#1a7a3a",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Đăng ký <ChevronRight size={15} />
          </Link>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#333" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden"
          style={{ padding: "12px 24px 20px", borderTop: "1px solid #eee", background: "#fff" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ display: "block", padding: "10px 0", color: "#555", fontSize: 15 }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <Link href="/login" style={{ flex: 1, textAlign: "center", padding: 10, border: "1px solid #ddd", borderRadius: 8, fontSize: 14 }}>Đăng nhập</Link>
            <Link href="/register" style={{ flex: 1, textAlign: "center", padding: 10, background: "#1a7a3a", color: "#fff", borderRadius: 8, fontSize: 14 }}>Đăng ký</Link>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #f0f7f2 0%, #fff 45%, #fafdf9 100%)",
        padding: "64px 0 80px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: 60,
          flexWrap: "wrap",
        }}
      >
        {/* Left */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#e8f5e9",
              color: "#1a7a3a",
              padding: "5px 13px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 22,
            }}
          >
            <Leaf size={13} />
            Nền tảng nông sản sạch Việt Nam
          </span>

          <h1
            style={{
              fontSize: "clamp(30px, 4.5vw, 46px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#1a1a1a",
              marginBottom: 18,
            }}
          >
            Quản lý chuỗi cung ứng
            <br />
            <span style={{ color: "#1a7a3a" }}>nông sản sạch</span> thông minh
          </h1>

          <p style={{ fontSize: 16, color: "#666", lineHeight: 1.75, marginBottom: 32, maxWidth: 480 }}>
            AgriTrace AI giúp theo dõi hành trình nông sản từ trang trại đến bàn ăn. Truy xuất nguồn gốc bằng QR Code, quản lý kho hàng, đơn hàng và phân tích thông minh từ AI.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
            <Link
              href="/register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 26px",
                background: "#1a7a3a",
                color: "#fff",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Dùng thử miễn phí <ChevronRight size={16} />
            </Link>
            <Link
              href="#gioi-thieu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 26px",
                background: "#fff",
                color: "#333",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 500,
                border: "1px solid #ddd",
              }}
            >
              Tìm hiểu thêm
            </Link>
          </div>

          {/* Trust bar */}
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { num: "5+", label: "Vai trò người dùng" },
              { num: "QR", label: "Truy xuất nguồn gốc" },
              { num: "24/7", label: "Hỗ trợ trực tuyến" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a7a3a" }}>{s.num}</div>
                <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <div style={{ flex: 1, minWidth: 300, position: "relative" }}>
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
            <Image
              src="/images/hero-farm.png"
              alt="Nông trại rau sạch Việt Nam"
              width={600}
              height={400}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </div>
          {/* Floating badge */}
          <div
            style={{
              position: "absolute",
              bottom: -18,
              left: -18,
              background: "#fff",
              borderRadius: 14,
              padding: "14px 18px",
              boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid #f0f0f0",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "#e8f5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <QrCode size={20} color="#1a7a3a" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Truy xuất nguồn gốc</div>
              <div style={{ fontSize: 11, color: "#999" }}>100% minh bạch từ gốc</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */
function About() {
  return (
    <section id="gioi-thieu" style={{ padding: "80px 0", background: "#fff" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          gap: 64,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 300, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <Image
            src="/images/qr-scan.png"
            alt="Quét mã QR truy xuất nguồn gốc"
            width={560}
            height={380}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1a7a3a", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Về AgriTrace AI
          </span>
          <h2 style={{ fontSize: 30, fontWeight: 700, margin: "10px 0 14px", color: "#1a1a1a", lineHeight: 1.3 }}>
            Minh bạch chuỗi cung ứng, bảo vệ sức khỏe người tiêu dùng
          </h2>
          <p style={{ color: "#666", lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
            AgriTrace AI là hệ thống quản lý toàn diện cho chuỗi cung ứng nông sản sạch. Mỗi lô hàng được gắn mã QR riêng — khi quét, người tiêu dùng thấy ngay thông tin nông trại, ngày thu hoạch, lịch sử vận chuyển và chứng nhận chất lượng.
          </p>
          <p style={{ color: "#666", lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>
            Ngoài ra, hệ thống tích hợp AI chatbot giải đáp thắc mắc về sản phẩm, phân tích xu hướng tiêu thụ và cảnh báo bất thường để người quản lý ra quyết định nhanh và chính xác.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Truy xuất nguồn gốc bằng QR Code",
              "AI chatbot hỗ trợ khách hàng 24/7",
              "Quản lý nông trại, kho, vận chuyển tập trung",
              "Chương trình tích điểm & thăng hạng thành viên",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle size={16} color="#1a7a3a" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#444" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */
const features = [
  { icon: QrCode,       title: "Truy xuất nguồn gốc",    desc: "Quét mã QR để xem thông tin nông trại, ngày thu hoạch, lịch sử vận chuyển và chứng nhận chất lượng của từng lô nông sản.", color: "#1a7a3a" },
  { icon: Bot,          title: "AI Chatbot thông minh",   desc: "Chatbot hỗ trợ giải đáp thắc mắc sản phẩm, gợi ý mua hàng và phân tích xu hướng tiêu thụ dựa trên dữ liệu thực tế.",      color: "#0d6efd" },
  { icon: Leaf,         title: "Quản lý nông trại",       desc: "Quản lý thông tin trang trại, lô sản xuất, mùa vụ, chứng nhận và lịch sử thu hoạch. Hỗ trợ theo dõi trái cây theo mùa.",   color: "#25a050" },
  { icon: Warehouse,    title: "Quản lý kho hàng",        desc: "Kiểm soát nhập kho, xuất kho, tồn kho và bảo quản. Hệ thống cảnh báo khi hàng sắp hết hoặc gần hết hạn.",                   color: "#f59e0b" },
  { icon: Truck,        title: "Theo dõi vận chuyển",     desc: "Cập nhật trạng thái giao hàng theo thời gian thực. Nhà phân phối cập nhật hành trình từ kho đến tay khách hàng.",            color: "#6366f1" },
  { icon: Package,      title: "Đặt hàng & Thanh toán",  desc: "Giỏ hàng, áp voucher, thanh toán trực tuyến. Theo dõi đơn hàng và đánh giá sản phẩm sau khi nhận.",                          color: "#ec4899" },
  { icon: MessageCircle,title: "Chat trực tuyến",         desc: "Khách hàng chat trực tiếp với nông dân và nhân viên hỗ trợ qua WebSocket. Hỗ trợ tư vấn sản phẩm ngay trong lúc mua.",      color: "#0891b2" },
  { icon: Star,         title: "Tích điểm & Thành viên", desc: "Tích điểm sau mỗi đơn hàng. Thăng hạng thành viên Đồng → Bạc → Vàng → Kim Cương. Đổi điểm lấy voucher.",                    color: "#d97706" },
  { icon: BarChart3,    title: "Dashboard báo cáo",       desc: "Biểu đồ thống kê doanh thu, tồn kho, xu hướng tiêu thụ. AI dự đoán nhu cầu giúp lập kế hoạch nhập hàng.",                   color: "#7c3aed" },
];

function Features() {
  return (
    <section id="tinh-nang" style={{ padding: "80px 0", background: "#f8f9fa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1a7a3a", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Tính năng
          </span>
          <h2 style={{ fontSize: 30, fontWeight: 700, margin: "10px 0 12px", color: "#1a1a1a" }}>
            Tất cả công cụ bạn cần trong một nền tảng
          </h2>
          <p style={{ color: "#777", maxWidth: 520, margin: "0 auto", fontSize: 15 }}>
            Quản lý toàn bộ chuỗi cung ứng từ nông trại đến người tiêu dùng, tích hợp AI và QR Code.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
            gap: 18,
          }}
        >
          {features.map((f) => {
            const IconComp = f.icon;
            return (
              <div
                key={f.title}
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 14,
                  padding: "26px 24px",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.06)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: 11,
                    background: `${f.color}12`,
                    marginBottom: 14,
                  }}
                >
                  <IconComp size={22} color={f.color} strokeWidth={1.8} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, color: "#777", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── How it works ─── */
function HowItWorks() {
  const steps = [
    { num: 1, title: "Đăng ký tài khoản",      desc: "Tạo tài khoản với vai trò phù hợp. Hệ thống phân quyền tự động theo từng vai trò.",                                         icon: ShieldCheck },
    { num: 2, title: "Quản lý sản phẩm",        desc: "Nông dân thêm nông trại, tạo lô thu hoạch, gắn chứng nhận chất lượng và sinh mã QR.",                                       icon: Leaf },
    { num: 3, title: "Nhập kho & vận chuyển",   desc: "Nhân viên kho nhập hàng và kiểm tra. Nhà phân phối cập nhật tiến trình giao hàng.",                                          icon: Warehouse },
    { num: 4, title: "Mua hàng & tích điểm",    desc: "Khách hàng đặt hàng, áp voucher, thanh toán. Nhận hàng xong tự động tích điểm và xét thăng hạng.",                          icon: Star },
  ];

  return (
    <section id="quy-trinh" style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{ maxWidth: 940, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1a7a3a", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Quy trình
          </span>
          <h2 style={{ fontSize: 30, fontWeight: 700, margin: "10px 0", color: "#1a1a1a" }}>
            Vận hành đơn giản, hiệu quả cao
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {steps.map((s, i) => {
            const IconComp = s.icon;
            return (
              <div key={s.num} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                {/* Icon circle */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: i === 0 ? "#1a7a3a" : "#f0f7f0",
                    border: i === 0 ? "none" : "1px solid #d4edda",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <IconComp size={22} color={i === 0 ? "#fff" : "#1a7a3a"} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    background: "#fafbfa",
                    borderRadius: 12,
                    padding: "20px 24px",
                    border: "1px solid #eee",
                  }}
                >
                  <div style={{ fontSize: 12, color: "#1a7a3a", fontWeight: 600, marginBottom: 4 }}>Bước {s.num}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a", marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Roles ─── */
const roles = [
  { name: "Admin",           desc: "Quản trị viên",    icon: ShieldCheck, color: "#dc3545", items: ["Quản lý toàn hệ thống", "Phân quyền tài khoản", "Tạo voucher hệ thống", "Báo cáo tổng hợp"] },
  { name: "Farmer",          desc: "Nông dân",          icon: Leaf,        color: "#1a7a3a", items: ["Quản lý nông trại & lô hàng", "Gắn chứng nhận chất lượng", "Trả lời chat khách hàng", "Tạo voucher riêng"] },
  { name: "Warehouse Staff", desc: "Nhân viên kho",     icon: Warehouse,   color: "#0d6efd", items: ["Nhập kho & xuất kho", "Kiểm soát tồn kho", "Cảnh báo hàng hết", "Hỗ trợ chat khách hàng"] },
  { name: "Distributor",     desc: "Nhà phân phối",     icon: Truck,       color: "#f59e0b", items: ["Tiếp nhận hàng hóa", "Cập nhật trạng thái giao", "Theo dõi đơn hàng", "Xác nhận hoàn thành"] },
  { name: "Customer",        desc: "Khách hàng",        icon: Users,       color: "#8b5cf6", items: ["Tìm kiếm & đặt hàng", "Quét QR nguồn gốc", "Tích điểm & thăng hạng", "Chat tư vấn sản phẩm"] },
];

function Roles() {
  return (
    <section id="doi-tuong" style={{ padding: "80px 0", background: "#f8f9fa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1a7a3a", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Đối tượng sử dụng
          </span>
          <h2 style={{ fontSize: 30, fontWeight: 700, margin: "10px 0 12px", color: "#1a1a1a" }}>
            5 vai trò — 1 hệ thống thống nhất
          </h2>
          <p style={{ color: "#777", maxWidth: 480, margin: "0 auto", fontSize: 15 }}>
            Mỗi vai trò có bộ quyền riêng biệt, phối hợp chặt chẽ trong chuỗi cung ứng.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 16 }}>
          {roles.map((r) => {
            const IconComp = r.icon;
            return (
              <div
                key={r.name}
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 14,
                  padding: "22px 18px",
                  borderTop: `3px solid ${r.color}`,
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 42,
                    height: 42,
                    borderRadius: 11,
                    background: `${r.color}12`,
                    marginBottom: 14,
                  }}
                >
                  <IconComp size={20} color={r.color} strokeWidth={1.8} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{r.name}</h3>
                <p style={{ fontSize: 12, color: "#999", marginBottom: 14 }}>{r.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
                  {r.items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#555" }}>
                      <CheckCircle size={13} color={r.color} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Product highlight ─── */
function ProductHighlight() {
  return (
    <section style={{ padding: "80px 0", background: "#fff" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          gap: 64,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 300 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1a7a3a", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Nông sản sạch
          </span>
          <h2 style={{ fontSize: 30, fontWeight: 700, margin: "10px 0 14px", color: "#1a1a1a", lineHeight: 1.3 }}>
            Sản phẩm theo mùa vụ, tươi ngon mỗi ngày
          </h2>
          <p style={{ color: "#666", lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
            Hệ thống tự động gắn nhãn mùa vụ cho nông sản: đang vào mùa, cuối mùa hoặc hết mùa. Sản phẩm được quản lý theo vùng trồng, sản lượng dự kiến và lịch thu hoạch chi tiết.
          </p>
          <p style={{ color: "#666", lineHeight: 1.8, fontSize: 15 }}>
            Người tiêu dùng tìm kiếm sản phẩm theo danh mục, mùa vụ và khu vực — đảm bảo mua được nông sản tươi nhất với giá hợp lý.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 36px rgba(0,0,0,0.06)" }}>
            <Image
              src="/images/fresh-produce.png"
              alt="Rau củ quả tươi sạch"
              width={560}
              height={400}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section style={{ padding: "80px 24px", background: "#1a7a3a" }}>
      <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, color: "#fff", marginBottom: 14 }}>
          Bắt đầu quản lý nông sản thông minh
        </h2>
        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 15, lineHeight: 1.75, marginBottom: 32 }}>
          Đăng ký tài khoản miễn phí và trải nghiệm hệ thống quản lý chuỗi cung ứng nông sản sạch tích hợp AI ngay hôm nay.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/register"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              background: "#fff",
              color: "#1a7a3a",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Đăng ký miễn phí <ChevronRight size={16} />
          </Link>
          <Link
            href="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              background: "transparent",
              color: "#fff",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ background: "#f8f8f8", padding: "52px 0 28px", borderTop: "1px solid #eee" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          justifyContent: "space-between",
        }}
      >
        <div style={{ maxWidth: 270 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "#1a7a3a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Leaf size={15} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>
              AgriTrace <span style={{ color: "#1a7a3a" }}>AI</span>
            </span>
          </div>
          <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75 }}>
            Nền tảng quản lý chuỗi cung ứng nông sản sạch tích hợp trí tuệ nhân tạo và truy xuất nguồn gốc bằng QR Code.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 14 }}>Hệ thống</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["Tính năng", "Quy trình", "Đối tượng"].map((l) => (
              <a key={l} href="#" style={{ fontSize: 13, color: "#888" }}>{l}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 14 }}>Tài khoản</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link href="/login" style={{ fontSize: 13, color: "#888" }}>Đăng nhập</Link>
            <Link href="/register" style={{ fontSize: 13, color: "#888" }}>Đăng ký</Link>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 14 }}>Liên hệ</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: Mail, text: "support@agritrace.vn" },
              { icon: Phone, text: "1900 1234" },
              { icon: MapPin, text: "TP. Hồ Chí Minh, Việt Nam" },
            ].map((c) => {
              const IconComp = c.icon;
              return (
                <div key={c.text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <IconComp size={13} color="#999" />
                  <span style={{ fontSize: 13, color: "#888" }}>{c.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "32px auto 0",
          padding: "16px 24px 0",
          borderTop: "1px solid #e8e8e8",
          textAlign: "center",
          fontSize: 12,
          color: "#bbb",
        }}
      >
        © 2026 AgriTrace AI — Đồ án tốt nghiệp. Hệ thống quản lý chuỗi cung ứng nông sản sạch.
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <ProductHighlight />
        <Roles />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
