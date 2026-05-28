import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, generateId } from "@/lib/db";
import { hashPassword, createToken, setAuthCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "姓名、邮箱和密码为必填项" }, { status: 400 });
    }

    const users = readCollection<any>("users");
    if (users.find((u) => u.email === email)) {
      return NextResponse.json({ error: "该邮箱已被注册" }, { status: 409 });
    }

    let hashedPassword: string;
    try {
      hashedPassword = await hashPassword(password);
    } catch (e: any) {
      return NextResponse.json({ error: `密码加密失败: ${e.message}` }, { status: 500 });
    }

    const newUser = {
      id: generateId(),
      name,
      email,
      phone: phone || "",
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeCollection("users", users);

    let token: string;
    try {
      token = await createToken({ id: newUser.id, email: newUser.email, name: newUser.name });
    } catch (e: any) {
      return NextResponse.json({ error: `Token 生成失败: ${e.message}` }, { status: 500 });
    }

    try {
      await setAuthCookie(token);
    } catch (e: any) {
      return NextResponse.json({ error: `Cookie 设置失败: ${e.message}` }, { status: 500 });
    }

    return NextResponse.json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone },
    });
  } catch (e: any) {
    return NextResponse.json({ error: `注册失败: ${e?.message || "未知错误"}` }, { status: 500 });
  }
}
