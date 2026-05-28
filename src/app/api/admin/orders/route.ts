import { NextRequest, NextResponse } from "next/server";
import { readCollection } from "@/lib/db";

// 简单的 admin 密钥验证
const ADMIN_SECRET = process.env.ADMIN_SECRET || "cnru-admin-2024";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (token !== ADMIN_SECRET) {
      return NextResponse.json({ error: "无权限访问" }, { status: 403 });
    }

    const orders = readCollection<any>("orders");
    const users = readCollection<any>("users");

    // 关联用户信息
    const enrichedOrders = orders
      .map((o) => {
        const user = users.find((u) => u.id === o.userId);
        return {
          ...o,
          userName: user?.name || "未知用户",
          userEmail: user?.email || "",
          userPhone: user?.phone || "",
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      orders: enrichedOrders,
      total: orders.length,
      stats: {
        totalOrders: orders.length,
        pending: orders.filter((o) => o.status === "pending").length,
        processing: orders.filter((o) => o.status === "processing").length,
        done: orders.filter((o) => o.status === "done" || o.status === "shipped").length,
        totalRevenue: orders.reduce((sum, o) => sum + (o.fee || 0), 0),
      },
    });
  } catch {
    return NextResponse.json({ error: "获取数据失败" }, { status: 500 });
  }
}
