"use client";

import { useState, useEffect, useCallback } from "react";

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

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { Authorization: `Bearer ${DEFAULT_PASSWORD}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
        setStats(data.stats);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchOrders();
    }
  }, [authenticated, fetchOrders]);

  const handleLogin = () => {
    if (password === DEFAULT_PASSWORD) {
      setAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("密码错误");
    }
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
      {/* Header */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">后台管理</h1>
          <button
            onClick={fetchOrders}
            className="text-sm text-primary font-medium hover:underline"
          >
            {loading ? "刷新中..." : "刷新数据"}
          </button>
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
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">所有订单</h2>
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
                  {orders.map((order) => (
                    <>
                      <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="px-4 py-3 font-mono text-xs">{order.id}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
