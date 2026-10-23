import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "WiPay payments are no longer active." }, { status: 410 });
}