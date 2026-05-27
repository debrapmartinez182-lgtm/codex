"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface OrderProgress {
  step: string;
  status: "done" | "active" | "pending";
  date?: string;
}

interface OrderItem {
  id: string;
  docName: string;
  status: string;
  createdAt: string;
  fee: number;
  progress: OrderProgress[];
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

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const highlightOrder = searchParams.get("order") || "";
  const [activeOrder, setActiveOrder] = useState<string | null>(highlightOrder || null);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();
        if (!meData.user) {
          router.push("/login");
          return;
        }
        setUser(meData.user);

        const res = await fetch("/api/orders");
        const data = await res.json();
        if (data.orders) {
          setOrders(data.orders);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-sm">加载中...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">请先登录查看订单</p>
          <button
            onClick={() => router.push("/login")}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white"
          >
            去登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">个人中心</h1>
          <p className="mt-1 text-gray-500">
            你好，{user.name} — 管理你的认证订单，追踪办理进度
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeOrder ? (
          <div>
            <button
              onClick={() => setActiveOrder(null)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回订单列表
            </button>

            {(() => {
              const order = orders.find((o) => o.id === activeOrder);
              if (!order) return <p className="text-gray-500">订单不存在</p>;

              return (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-semibold text-gray-900">{order.docName}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || statusColors.pending}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-500">
                      <span>订单编号：{order.id}</span>
                      <span>提交时间：{order.createdAt.slice(0, 10)}</span>
                      <span>费用：¥{order.fee.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-6">办理进度</h3>
                    <div className="space-y-0">
                      {order.progress.map((item, idx) => (
                        <div key={item.step} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-3 h-3 rounded-full border-2 shrink-0 ${
                                item.status === "done"
                                  ? "bg-green-500 border-green-500"
                                  : item.status === "active"
                                  ? "bg-blue-500 border-blue-500 ring-4 ring-blue-100"
                                  : "bg-white border-gray-300"
                              }`}
                            />
                            {idx < order.progress.length - 1 && (
                              <div className={`w-0.5 h-10 ${item.status === "done" ? "bg-green-300" : "bg-gray-200"}`} />
                            )}
                          </div>
                          <div className="pb-8">
                            <p className={`text-sm font-medium ${item.status === "pending" ? "text-gray-400" : "text-gray-900"}`}>
                              {item.step}
                            </p>
                            {item.date && <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: "全部订单", value: orders.length, color: "text-gray-900" },
                { label: "办理中", value: orders.filter((o) => o.status === "processing").length, color: "text-blue-600" },
                { label: "已完成", value: orders.filter((o) => o.status === "done" || o.status === "shipped").length, color: "text-green-600" },
                { label: "待审核", value: orders.filter((o) => o.status === "pending").length, color: "text-amber-600" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-400 text-lg mb-4">暂无订单</p>
                <button
                  onClick={() => router.push("/order")}
                  className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white"
                >
                  去办理认证
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setActiveOrder(order.id)}
                    className="w-full bg-white rounded-xl p-6 border border-gray-200 hover:border-primary hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{order.docName}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || statusColors.pending}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500">
                      <span>订单编号：{order.id}</span>
                      <span>提交时间：{order.createdAt.slice(0, 10)}</span>
                      <span className="font-medium text-primary">¥{order.fee.toLocaleString()}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
