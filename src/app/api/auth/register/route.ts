import { NextRequest, NextResponse } from "next/server";
import { readCollection, writeCollection, generateId } from "@/lib/db";
import { hashPassword, createToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "姓名、邮箱和密码为必填项" }, { status: 400 });
    }

    const users = readCollection<any>("users");
    if (users.find((u) => u.email === email)) {
      return NextResponse.json({ error: "该邮箱已被注册" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
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

    const token = await createToken({ id: newUser.id, email: newUser.email, name: newUser.name });
    await setAuthCookie(token);

    return NextResponse.json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone },
    });
  } catch {
    return NextResponse.json({ error: "注册失败" }, { status: 500 });
  }
}
