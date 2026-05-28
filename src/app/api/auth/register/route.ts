import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, generateId } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "姓名、邮箱和密码为必填项" }, { status: 400 });
    }

    // Step 1: check db
    let users: any[];
    try {
      users = readCollection<any>("users");
    } catch (e: any) {
      return NextResponse.json({ error: `数据库读取失败: ${e.message}` }, { status: 500 });
    }

    if (users.find((u: any) => u.email === email)) {
      return NextResponse.json({ error: "该邮箱已被注册" }, { status: 409 });
    }

    // Step 2: hash password
    let hashedPassword: string;
    try {
      const bcrypt = await import("bcryptjs");
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (e: any) {
      return NextResponse.json({ error: `密码加密失败: ${e.message}`, stack: e.stack?.split("\n").slice(0, 5) }, { status: 500 });
    }

    // Step 3: create user
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

    // Step 4: create JWT
    let token: string;
    try {
      const { SignJWT } = await import("jose");
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "cn-ru-auth-secret-key-change-in-production");
      token = await new SignJWT({ id: newUser.id, email: newUser.email, name: newUser.name })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(secret);
    } catch (e: any) {
      return NextResponse.json({ error: `Token 生成失败: ${e.message}`, stack: e.stack?.split("\n").slice(0, 5) }, { status: 500 });
    }

    // Step 5: set cookie
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    } catch (e: any) {
      return NextResponse.json({ error: `Cookie 设置失败: ${e.message}`, stack: e.stack?.split("\n").slice(0, 5) }, { status: 500 });
    }

    return NextResponse.json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone },
    });
  } catch (e: any) {
    return NextResponse.json({
      error: `注册失败: ${e.message || "未知错误"}`,
      stack: e.stack?.split("\n").slice(0, 5),
    }, { status: 500 });
  }
}
