import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ user: user ? { id: user.id, name: user.name, email: user.email } : null });
  } catch {
    return NextResponse.json({ user: null });
  }
}
