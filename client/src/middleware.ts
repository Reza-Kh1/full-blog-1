"use client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export function middleware(res: NextRequest) {
  return NextResponse.next();
}
