import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getDbPool();
    const result = await pool.query("SELECT 1 AS health_check");
    
    if (result.rows[0].health_check === 1) {
      return NextResponse.json({
        status: "healthy",
        database: "connected",
        timestamp: new Date().toISOString()
      }, { status: 200 });
    }
    throw new Error("Unexpected database response");
  } catch (error) {
    console.error("Health Check Failed:", error);
    return NextResponse.json({
      status: "unhealthy",
      database: "disconnected",
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}
