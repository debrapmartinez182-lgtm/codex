import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: true, time: new Date().toISOString() });
}
