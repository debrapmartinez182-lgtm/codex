import { NextRequest, NextResponse } from "next/server";
import { readCollection } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "请先登录" }, { status: 401 });
    }

    const { id } = await params;
    const orders = readCollection<any>("orders");
    const order = orders.find((o) => o.id === id && o.userId === user.id);

    if (!order) {
      return NextResponse.json({ error: "订单不存在" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "获取订单失败" }, { status: 500 });
  }
}
