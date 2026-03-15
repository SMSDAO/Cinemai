import { NextResponse } from "next/server";

export const runtime = "edge";

export function GET() {
  return NextResponse.json(
    {
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      requests: {
        total: 0,
        errors: 0,
        rate_per_minute: 0,
      },
      performance: {
        p50_latency_ms: 0,
        p95_latency_ms: 0,
        p99_latency_ms: 0,
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
