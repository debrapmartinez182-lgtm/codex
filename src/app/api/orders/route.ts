import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, generateId } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const DEFAULT_PROGRESS = [
  { step: "订单提交", status: "done", date: "" },
  { step: "文件翻译", status: "pending", date: "" },
  { step: "机构认证", status: "pending", date: "" },
  { step: "已寄送", status: "pending", date: "" },
];

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "请先登录" }, { status: 401 });
    }

    const body = await req.json();
    const { docId, docName, name, phone, email, address, note, fee } = body;

    if (!docId || !docName || !name || !phone || !address) {
      return NextResponse.json({ error: "请填写完整信息" }, { status: 400 });
    }

    const orders = readCollection<any>("orders");
    const orderId = "ORD" + Date.now().toString().slice(-6);

    const now = new Date().toISOString();
    DEFAULT_PROGRESS[0].date = now.split("T")[0];

    const newOrder = {
      id: orderId,
      userId: user.id,
      docId,
      docName,
      status: "pending",
      name,
      phone,
      email: email || user.email,
      address,
      note: note || "",
      fee: fee || 0,
      progress: JSON.parse(JSON.stringify(DEFAULT_PROGRESS)),
      createdAt: now,
      updatedAt: now,
    };

    orders.push(newOrder);
    writeCollection("orders", orders);

    return NextResponse.json({ order: newOrder }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "创建订单失败" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "请先登录" }, { status: 401 });
    }

    const orders = readCollection<any>("orders");
    const userOrders = orders
      .filter((o) => o.userId === user.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ orders: userOrders });
  } catch {
    return NextResponse.json({ error: "获取订单失败" }, { status: 500 });
  }
}
