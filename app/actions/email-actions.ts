"use server";

import { sendDiagnosticReportEmail } from "@/lib/email";
import { query } from "@/lib/db";
import { verifySession } from "@/lib/session";
import { ScanRecord } from "@/app/actions/scan-actions";

export async function dispatchReport(scanId: string) {
  const session = await verifySession();
  if (!session || !session.isAuth) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const result = await query("SELECT * FROM scans WHERE id = $1 AND user_id = $2", [scanId, session.userId]);
    const scan = result.rows[0] as ScanRecord;

    if (!scan) {
      return { success: false, error: "Scan not found or unauthorized to view." };
    }

    // Default to the user's email registered in the session
    const response = await sendDiagnosticReportEmail(session.user.email, scan);
    
    if (!response.success) {
      throw new Error(response.error?.message || "Email dispatch failed");
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to dispatch report:", error);
    return { success: false, error: "Failed to dispatch email report." };
  }
}
