"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/session";

export type ScanRecord = {
  id: string;
  created_at: Date;
  image_data: string;
  disease_name: string;
  confidence_score: number;
  severity: "Low" | "Moderate" | "High";
  explanation: string;
  medical_recommendation: string;
  user_notes?: string | null;
};

export async function saveScanResult(data: Omit<ScanRecord, "created_at">) {
  try {
    const session = await verifySession();
    const userId = session?.isAuth ? session.userId : "guest_id";

    const text = `
      INSERT INTO scans (id, user_id, image_data, disease_name, confidence_score, severity, explanation, medical_recommendation, user_notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const params = [
      data.id,
      userId,
      data.image_data,
      data.disease_name,
      data.confidence_score,
      data.severity,
      data.explanation,
      data.medical_recommendation,
      data.user_notes || null,
    ];

    const result = await query(text, params);
    
    // Invalidate history so next visit shows fresh data
    revalidatePath("/history");
    return { success: true, record: result.rows[0] };
  } catch (error) {
    console.error("Failed to save scan record:", error);
    return { success: false, error: "Database error during auto-save." };
  }
}

export async function getScanHistory(): Promise<ScanRecord[]> {
  try {
    const session = await verifySession();
    const userId = session?.isAuth ? session.userId : "guest_id";

    const text = `SELECT * FROM scans WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50;`;
    const result = await query(text, [userId]);
    return result.rows as ScanRecord[];
  } catch (error) {
    console.error("Failed to fetch scan history:", error);
    return [];
  }
}

export type DashboardMetrics = {
  severityDistribution: { name: string; value: number; fill: string }[];
  totalScans: number;
};

export async function getDashboardAnalytics(): Promise<DashboardMetrics> {
  try {
    const session = await verifySession();
    const userId = session?.isAuth ? session.userId : "guest_id";

    const text = `
      SELECT 
        severity, 
        COUNT(*) as count 
      FROM scans 
      WHERE user_id = $1
      GROUP BY severity;
    `;
    const result = await query(text, [userId]);
    
    let total = 0;
    const distribution = result.rows.map(row => {
      const cnt = parseInt(row.count, 10);
      total += cnt;
      return {
        name: row.severity,
        value: cnt,
        fill: row.severity === 'High' ? '#EF4444' : row.severity === 'Moderate' ? '#F59E0B' : '#10B981'
      };
    });

    return {
      severityDistribution: distribution,
      totalScans: total,
    };
  } catch (error) {
    console.warn("Analytics fetch failed, relying on fallback UI:", error);
    return { severityDistribution: [], totalScans: 0 };
  }
}
