"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const DEFAULT_PASSWORD = "cnru-admin-2024";

interface OrderItem {
  id: string;
  docName: string;
  status: string;
  fee: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  createdAt: string;
  progress: { step: string; status: string; date?: string }[];
}

interface Stats {
  totalOrders: number;
  pending: number;
  processing: number;
  done: number;
  totalRevenue: number;
}

const statusLabels: Record<string, string> = {
  pending: "待审核",
  processing: "办理中",
  done: "已完成",
  shipped: "已寄送",
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-blue-100 text-blue-800",
  done: "bg-green-100 text-green-800",
  shipped: "bg-purple-100 text-purple-800",
};

function getLastVisit(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_last_visit");
}

function setLastVisit(time: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("admin_last_visit", time);
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [bannerVisible, setBannerVisible] = useState(false);
  const prevOrderIds = useRef<Set<string>>(new Set());

  const fetchOrders = useCallback(async (isAutoRefresh = false) => {
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { Authorization: `Bearer ${DEFAULT_PASSWORD}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      const newOrders: OrderItem[] = data.orders;

      // Detect new orders
      if (isAutoRefresh && prevOrderIds.current.size > 0) {
        const incoming = newOrders.filter((o) => !prevOrderIds.current.has(o.id));
        if (incoming.length > 0) {
          setNewOrderCount((c) => c + incoming.length);
          // Play notification sound
          try {
            const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAf39/f4B/f3+AgH9/gIB/gH9/gIB/gIB/f3+Af3+AgH9/gIB/f4CAf3+AgH+Af3+AgH9/gIB/f4B/f3+Af3+AgH9/gIB/f4B/f4B/gH9/gH+AgH+Af3+AgH+Af3+AgH9/gH+AgH+Af3+Af3+AgH+AgH9/gIB/gH+AgH+Af3+AgH9/gH+AgH+Af3+AgH+Af3+AgIB/f3+AgIB/f3+AgIB/f4B/gIB/gH+AgH9/gH+Af4CAgH9/gH+AgH9/gH+AgH9/gH+AgH+Af4CAgH9/gH+AgH+Af3+AgH9/gH+AgH+Af4B/gH+AgH9/gH+AgH+Af3+AgH9/gH+AgH+Af4B/gIB/f3+AgIB/f4B/gIB/f4B/gH+AgIB/f3+AgH+AgH+AgIB/f3+AgH9/gH+AgH+Af3+AgH+Af4B/gIB/f4B/gH+AgH+AgH9/gIB/f4B/gH+AgH+Af3+AgH+AgH+AgH9/gH+AgH+Af3+AgH+AgIB/f4B/gH+AgH+Af4B/gIB/gH+AgH9/gH+AgIB/f4B/gIB/gH+AgH+Af4B/gH+AgH+Af4B/gIB/f4B/gH+AgH+AgH9/gIB/gH+AgH+Af4B/gIB/f4B/gH+AgH+AgH+AgH+Af4B/gH+AgH+AgH9/gH+AgH+AgH+Af4B/gIB/f4B/gH+AgH+AgH+AgH9/gIB/f4B/gH+AgH+Af4B/gH+AgH+AgH9/gH+AgIB/gH+AgH+Af4B/gIB/f4B/gH+AgH+AgH+AgH9/gIB/gH+AgH+Af4B/gIB/f4B/gH+AgH+AgH+AgH9/gIB/gH+AgH+Af4B/gIB/f4B/gH+AgH+AgH+AgH9/gH+AgH+AgH+Af4B/gIB/f4B/gIB/gH+AgH+Af4B/gH+AgH+AgH+AgH9/gH+AgH+AgH+Af4B/gIB/f4B/gH+AgH+AgH+AgH9/gH+AgH+AgH+Af4B/gH+AgH+AgH+AgH9/gH+AgH+AgH+Af4B/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+Af4B/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9/gH+AgH+AgH+AgH9");
            audio.volume = 0.3;
            audio.play().catch(() => {});
          } catch {}
          // Browser notification
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("新订单提醒", {
              body: `收到 ${incoming.length} 个新订单！${incoming.map((o) => o.docName).join("、")}`,
              icon: "/favicon.ico",
            });
          }
        }
      }

      // Update order IDs set
      prevOrderIds.current = new Set(newOrders.map((o) => o.id));
      setOrders(newOrders);
      setStats(data.stats);
      setLastVisit(new Date().toISOString());
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      setLoading(true);
      fetchOrders();
      // Request notification permission
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, [authenticated, fetchOrders]);

  // Auto refresh every 30 seconds
  useEffect(() => {
    if (!authenticated || !autoRefresh) return;
    const interval = setInterval(() => fetchOrders(true), 30000);
    return () => clearInterval(interval);
  }, [authenticated, autoRefresh, fetchOrders]);

  // Show banner when new orders arrive
  useEffect(() => {
    if (newOrderCount > 0) {
      setBannerVisible(true);
      const timer = setTimeout(() => setBannerVisible(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [newOrderCount]);

  const handleLogin = () => {
    if (password === DEFAULT_PASSWORD) {
      setAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("密码错误");
    }
  };

  const isNew = (order: OrderItem) => {
    const lastVisit = getLastVisit();
    if (!lastVisit) return false;
    return order.createdAt > lastVisit;
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 w-full max-w-sm shadow-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-2">后台管理</h1>
          <p className="text-sm text-gray-500 mb-6">请输入管理密码</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="输入密码"
            autoFocus
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary mb-3"
          />
          {passwordError && (
            <p className="text-xs text-red-500 mb-3">{passwordError}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            进入后台
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* New Order Banner */}
      {bannerVisible && newOrderCount > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 animate-pulse">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">🔔</span>
              <span className="font-bold text-lg">
                您有 {newOrderCount} 个新订单！
              </span>
              <button
                onClick={() => {
                  setNewOrderCount(0);
                  setBannerVisible(false);
                  fetchOrders();
                }}
                className="px-3 py-1 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors"
              >
                查看
              </button>
              <button
                onClick={() => { setNewOrderCount(0); setBannerVisible(false); }}
                className="text-white/70 hover:text-white ml-2"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">后台管理</h1>
            {newOrderCount > 0 && !bannerVisible && (
              <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
                {newOrderCount} 新订单
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded text-primary"
              />
              自动刷新（30秒）
            </label>
            <button
              onClick={() => fetchOrders()}
              className="text-sm text-primary font-medium hover:underline"
            >
              {loading ? "刷新中..." : "刷新数据"}
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
            {[
              { label: "总订单", value: stats.totalOrders, color: "text-gray-900" },
              { label: "待审核", value: stats.pending, color: "text-amber-600" },
              { label: "办理中", value: stats.processing, color: "text-blue-600" },
              { label: "已完成", value: stats.done, color: "text-green-600" },
              { label: "总收入", value: `¥${stats.totalRevenue.toLocaleString()}`, color: "text-primary" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">所有订单</h2>
            {orders.filter((o) => isNew(o)).length > 0 && (
              <span className="text-xs text-gray-400">
                {orders.filter((o) => isNew(o)).length} 条新记录
              </span>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">
              暂无订单数据
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left">
                    <th className="px-4 py-3 font-medium text-gray-500">订单号</th>
                    <th className="px-4 py-3 font-medium text-gray-500">客户</th>
                    <th className="px-4 py-3 font-medium text-gray-500">文件类型</th>
                    <th className="px-4 py-3 font-medium text-gray-500">金额</th>
                    <th className="px-4 py-3 font-medium text-gray-500">状态</th>
                    <th className="px-4 py-3 font-medium text-gray-500">时间</th>
                    <th className="px-4 py-3 font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const showNewBadge = isNew(order);
                    return (
                      <>
                        <tr
                          key={order.id}
                          className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                            showNewBadge ? "bg-blue-50/50" : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-mono text-xs">
                            {order.id}
                            {showNewBadge && (
                              <span className="ml-2 px-1.5 py-0.5 rounded bg-blue-500 text-white text-[10px] font-bold">
                                NEW
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{order.userName}</div>
                            <div className="text-xs text-gray-400">{order.phone}</div>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{order.docName}</td>
                          <td className="px-4 py-3 font-medium">¥{order.fee?.toLocaleString() ?? 0}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || statusColors.pending}`}>
                              {statusLabels[order.status] || order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-400">
                            {order.createdAt?.slice(0, 10)}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                              className="text-xs text-primary hover:underline"
                            >
                              {expandedOrder === order.id ? "收起" : "详情"}
                            </button>
                          </td>
                        </tr>
                        {expandedOrder === order.id && (
                          <tr key={`${order.id}-detail`}>
                            <td colSpan={7} className="px-4 py-4 bg-gray-50">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-400">邮箱：</span>
                                  <span className="text-gray-700">{order.email || order.userEmail}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400">手机：</span>
                                  <span className="text-gray-700">{order.phone || order.userPhone}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400">地址：</span>
                                  <span className="text-gray-700">{order.address}</span>
                                </div>
                                {order.note && (
                                  <div className="sm:col-span-2">
                                    <span className="text-gray-400">备注：</span>
                                    <span className="text-gray-700">{order.note}</span>
                                  </div>
                                )}
                              </div>
                              {order.progress && order.progress.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                  <span className="text-xs text-gray-400 mb-2 block">办理进度</span>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {order.progress.map((p, i) => (
                                      <span key={i} className="flex items-center gap-1">
                                        <span className={`inline-block w-2 h-2 rounded-full ${
                                          p.status === "done" ? "bg-green-500" :
                                          p.status === "active" ? "bg-blue-500" : "bg-gray-300"
                                        }`} />
                                        <span className="text-xs text-gray-600">{p.step}</span>
                                        {i < order.progress.length - 1 && (
                                          <span className="text-gray-300 mx-1">→</span>
                                        )}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
