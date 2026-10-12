import { Resend } from 'resend';
import { ScanRecord } from '@/app/actions/scan-actions';

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = new Resend(resendApiKey || 're_dummy_fallback_key');
const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: 'Welcome to DermaSense AI',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Welcome, ${name}!</h2>
          <p>Thank you for joining DermaSense AI, your personal dermatological screening assistant.</p>
          <p>You can now save your diagnostic scans, view your history, and send reports to your clinician directly from the platform.</p>
          <br/>
          <p>Stay healthy,</p>
          <p><strong>The DermaSense AI Team</strong></p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}

export async function sendDiagnosticReportEmail(email: string, scan: ScanRecord) {
  try {
    const severityColor = scan.severity === 'High' ? '#ef4444' : scan.severity === 'Moderate' ? '#f59e0b' : '#10b981';
    
    // We create a clean HTML version of the report, embedding the image if it's a valid data URI
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `DermaSense AI Report: ${scan.disease_name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 20px; color: white;">
            <h1 style="margin: 0; font-size: 24px;">DermaSense AI Clinical Report</h1>
            <p style="margin: 5px 0 0 0; color: #94a3b8;">Created on ${new Date(scan.created_at).toLocaleString()}</p>
          </div>
          
          <div style="padding: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="${scan.image_data}" alt="Scan Image" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #e5e7eb; max-height: 300px;" />
            </div>

            <h2 style="color: #334155; margin-bottom: 10px; font-size: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Diagnostic Findings</h2>
            
            <p><strong>Condition Detected:</strong> ${scan.disease_name}</p>
            <p><strong>Confidence Score:</strong> ${scan.confidence_score}%</p>
            <p style="margin-bottom: 20px;">
              <strong>Severity:</strong> 
              <span style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 14px; font-weight: 500; background-color: ${severityColor}20; color: ${severityColor};">
                ${scan.severity}
              </span>
            </p>

            <h2 style="color: #334155; margin-bottom: 10px; font-size: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Analysis Explanation</h2>
            <p style="color: #475569; line-height: 1.5;">${scan.explanation}</p>

            <h2 style="color: #334155; margin-bottom: 10px; font-size: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Medical Recommendation</h2>
            <p style="color: #475569; line-height: 1.5;">${scan.medical_recommendation}</p>

            ${scan.user_notes ? `
            <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #3b82f6;">
              <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #1e293b;">Patient / Clinician Notes</h3>
              <p style="margin: 0; color: #475569; line-height: 1.5;">${scan.user_notes}</p>
            </div>
            ` : ''}
          </div>
          
          <div style="background-color: #f8fafc; padding: 15px; text-align: center; color: #64748b; font-size: 14px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0;">This report is AI-generated and should not replace professional medical advice.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send diagnostic report:', error);
    return { success: false, error };
  }
}
