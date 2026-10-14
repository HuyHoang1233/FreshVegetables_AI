"use client";

import { useProjects } from "@/hooks/use-projects";
import { ErrorState, LoadingSkeleton } from "@/components/ui/states";
import { useAuthStore } from "@/stores/auth-store";
import type { ProjectStatus } from "@/types/project";

const roleLabelMap: Record<string, string> = {
  ADMIN: "Quản trị viên",
  FARMER: "Nông dân",
  WAREHOUSE_STAFF: "Nhân viên kho",
  DISTRIBUTOR: "Nhà phân phối",
  CUSTOMER: "Khách hàng",
};

function StatCard({ emoji, value, label, sub, color }: {
  emoji: string; value: string | number; label: string; sub?: string; color?: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: 14,
        padding: "20px 24px",
        borderLeft: `4px solid ${color ?? "#1a7a3a"}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 24 }}>{emoji}</span>
        <span style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a" }}>{value}</span>
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, color: "#333", marginBottom: 2 }}>{label}</p>
      {sub && <p style={{ fontSize: 12, color: "#999" }}>{sub}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const projects = useProjects();
  const { user } = useAuthStore();

  if (projects.isPending) return <LoadingSkeleton rows={5} />;
  if (projects.isError) return <ErrorState onRetry={() => projects.refetch()} />;

  const list = projects.data ?? [];
  const primaryRole = user?.roles[0] ?? "CUSTOMER";
  const roleLabel = roleLabelMap[primaryRole] ?? primaryRole;

  const statusGroups: Record<string, { label: string; emoji: string; color: string }> = {
    ACTIVE:     { label: "Đang hoạt động", emoji: "✅", color: "#1a7a3a" },
    PLANNING:   { label: "Đang lên kế hoạch", emoji: "📝", color: "#f59e0b" },
    COMPLETED:  { label: "Hoàn thành", emoji: "🎉", color: "#0d6efd" },
    ON_HOLD:    { label: "Tạm dừng", emoji: "⏸️", color: "#888" },
  };

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>
          Xin chào, {user?.name?.split(" ").pop()} 👋
        </h1>
        <p style={{ fontSize: 14, color: "#888" }}>
          Bạn đang đăng nhập với vai trò <strong style={{ color: "#1a7a3a" }}>{roleLabel}</strong>. Đây là tổng quan hệ thống hôm nay.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginBottom: 28 }}>
        <StatCard emoji="📋" value={list.length} label="Tổng số dự án" sub="Trong hệ thống" color="#1a7a3a" />
        <StatCard emoji="✅" value={list.filter(p => p.status === "ACTIVE").length} label="Đang hoạt động" color="#25a050" />
        <StatCard emoji="📝" value={list.filter(p => p.status === "PLANNING").length} label="Đang lên kế hoạch" color="#f59e0b" />
        <StatCard emoji="🎉" value={list.filter(p => p.status === "COMPLETED").length} label="Đã hoàn thành" color="#0d6efd" />
      </div>

      {/* Recent projects */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #eee",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "18px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#222" }}>📋 Dự án gần đây</h2>
          <a href="/dashboard/projects" style={{ fontSize: 13, color: "#1a7a3a", fontWeight: 500 }}>
            Xem tất cả →
          </a>
        </div>

        {list.length === 0 ? (
          <div style={{ padding: "40px 24px", textAlign: "center" }}>
            <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>📭</span>
            <p style={{ color: "#888", fontSize: 14 }}>Chưa có dự án nào được tạo.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafbfa" }}>
                {["Tên dự án", "Mô tả", "Trạng thái"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 24px",
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#999",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.slice(0, 8).map((project, i) => {
                const sg = statusGroups[project.status as ProjectStatus] ?? { label: project.status, emoji: "📌", color: "#888" };
                return (
                  <tr
                    key={project.id}
                    style={{
                      borderTop: "1px solid #f5f5f5",
                      background: i % 2 === 0 ? "#fff" : "#fafbfa",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f7f0"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#fafbfa"; }}
                  >
                    <td style={{ padding: "12px 24px", fontSize: 14, fontWeight: 500, color: "#222" }}>
                      {project.name}
                    </td>
                    <td style={{ padding: "12px 24px", fontSize: 13, color: "#777", maxWidth: 300 }}>
                      <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {project.description || "—"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 24px" }}>
                      <span
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          padding: "4px 10px", borderRadius: 20,
                          fontSize: 12, fontWeight: 600,
                          background: `${sg.color}15`,
                          color: sg.color,
                        }}
                      >
                        {sg.emoji} {sg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick links */}
      <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
        {[
          { emoji: "🌾", label: "Quản lý nông trại", href: "/dashboard", desc: "Sắp ra mắt" },
          { emoji: "📦", label: "Quản lý kho hàng", href: "/dashboard", desc: "Sắp ra mắt" },
          { emoji: "🚚", label: "Theo dõi vận chuyển", href: "/dashboard", desc: "Sắp ra mắt" },
          { emoji: "📱", label: "Truy xuất QR", href: "/dashboard", desc: "Sắp ra mắt" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            style={{
              display: "block",
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: 12,
              padding: "16px 18px",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#a5d6a7"; e.currentTarget.style.background = "#f0f7f0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.background = "#fff"; }}
          >
            <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>{l.emoji}</span>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 2 }}>{l.label}</p>
            <p style={{ fontSize: 11, color: "#bbb" }}>{l.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
