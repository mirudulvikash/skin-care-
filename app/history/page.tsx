"use client";

import { History, FileText, AlertCircle, Download, Loader2, Send } from "lucide-react";
import { getScanHistory, ScanRecord } from "@/app/actions/scan-actions";
import { dispatchReport } from "@/app/actions/email-actions";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const dynamic = "force-dynamic";

export default function HistoryPage() {
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [emailingId, setEmailingId] = useState<string | null>(null);
  
  const reportRef = useRef<HTMLDivElement>(null);
  const [activeReport, setActiveReport] = useState<ScanRecord | null>(null);

  useEffect(() => {
    getScanHistory().then((data) => {
      setScans(data);
      setLoading(false);
    });
  }, []);

  const exportPDF = async (scan: ScanRecord) => {
    setExportingId(scan.id);
    setActiveReport(scan); // Mount targeted report info invisibly
    
    // Give react time to render the hidden DOM element
    setTimeout(async () => {
      if (reportRef.current) {
        try {
          const canvas = await html2canvas(reportRef.current, { scale: 2 });
          const imgData = canvas.toDataURL('image/png');
          
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
          });
          
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
          pdf.save(`DermaSense_Clinical_Report_${scan.id}.pdf`);
        } catch (e) {
          console.error("PDF Export failed", e);
        }
      }
      setExportingId(null);
      setActiveReport(null);
    }, 100);
  };

  const handleSendEmail = async (scanId: string) => {
    setEmailingId(scanId);
    const result = await dispatchReport(scanId);
    if (result.success) {
      alert("Report dispatched successfully!");
    } else {
      alert(result.error || "Failed to dispatch email");
    }
    setEmailingId(null);
  };

  return (
    <div className="flex flex-col p-4">
      {/* Hidden PDF Overlay Target rendered strictly for html2canvas */}
      {activeReport && (
        <div className="fixed left-[1000vw] top-[1000vh]">
          <div ref={reportRef} className="w-[800px] bg-white p-12 text-slate-800">
            <div className="border-b-4 border-medical-slate pb-6 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-extrabold text-medical-slate tracking-tight">DermaSense AI</h1>
                <p className="text-slate-500 font-semibold tracking-widest mt-1 uppercase text-sm">Automated Clinical Analysis Report</p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 font-bold">Report ID: <span className="text-slate-800 font-mono">{activeReport.id}</span></p>
                <p className="text-slate-500">Date: {new Date(activeReport.created_at).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex gap-8 mb-8">
               <div className="w-1/3">
                 <p className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-2">Captured Lesion</p>
                 <img src={activeReport.image_data} className="w-full aspect-square rounded-xl object-cover border border-slate-200 shadow-sm" alt="Skin Sample" />
               </div>
               <div className="w-2/3 flex flex-col justify-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">Diagnostic Marker</h3>
                    <p className="text-2xl font-bold text-medical-teal">{activeReport.disease_name}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-slate-50 px-4 py-2 border border-slate-100 rounded-lg">
                       <p className="text-xs font-bold text-slate-500">Confidence</p>
                       <p className="text-xl font-bold text-slate-800">{activeReport.confidence_score}%</p>
                    </div>
                    <div className="bg-slate-50 px-4 py-2 border border-slate-100 rounded-lg">
                       <p className="text-xs font-bold text-slate-500">Severity Risk</p>
                       <p className={`text-xl font-bold ${activeReport.severity === 'High' ? 'text-red-500' : activeReport.severity === 'Moderate' ? 'text-amber-500' : 'text-emerald-500'}`}>
                         {activeReport.severity}
                       </p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">Clinical Explanation</h3>
                <p className="text-slate-700 leading-relaxed text-sm">{activeReport.explanation}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">Medical Recommendation</h3>
                <p className="text-slate-700 leading-relaxed text-sm bg-blue-50/50 p-4 rounded-lg font-semibold border border-blue-100">
                  {activeReport.medical_recommendation}
                </p>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between">
               <div className="text-xs text-slate-400">
                 Disclaimer: AI diagnostics are preliminary screening tools and must not substitute certified biological diagnosis.
               </div>
               <div className="w-48 border-t-2 border-slate-300 text-center pt-2 text-sm font-bold text-slate-600">
                  Physician Signature
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Main UI */}
      <div className="flex items-center gap-2 mb-6">
        <History className="w-6 h-6 text-medical-slate" />
        <h2 className="text-xl font-bold text-slate-800">Past Screenings</h2>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-32">
           <Loader2 className="w-6 h-6 animate-spin text-medical-teal" />
        </div>
      ) : scans.length === 0 ? (
        <div className="bg-white rounded-xl border border-medical-border p-8 text-center shadow-sm">
          <p className="text-slate-500 font-medium pb-2">No past scans found.</p>
          <p className="text-xs text-slate-400">Head to the Scan tab to run your first diagnostic.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {scans.map((scan) => (
            <div key={scan.id} className="flex flex-col gap-3 bg-white p-4 rounded-xl border border-medical-border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 border border-slate-100 overflow-hidden">
                  {scan.image_data ? (
                     <img src={scan.image_data} alt="Derm" className="w-full h-full object-cover" />
                  ) : (
                     <FileText className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">{scan.disease_name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {new Date(scan.created_at).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                  scan.severity === "High" ? "bg-medical-crimson/10 text-medical-crimson" :
                  scan.severity === "Moderate" ? "bg-medical-amber/10 text-medical-amber" :
                  "bg-medical-emerald/10 text-medical-emerald"
                }`}>
                  {scan.severity} Risk
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col gap-2.5">
                 <div className="flex gap-2">
                   <AlertCircle className="w-4 h-4 text-medical-teal shrink-0 mt-0.5" />
                   <div className="flex flex-col gap-1">
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {scan.explanation}
                      </p>
                      <p className="text-[11px] text-slate-500 border-t border-slate-200 pt-1 mt-1">
                        <span className="font-semibold">Rec:</span> {scan.medical_recommendation}
                      </p>
                   </div>
                 </div>
                 
                 <div className="flex gap-2 w-full mt-2">
                   <button 
                    onClick={() => exportPDF(scan)}
                    disabled={exportingId === scan.id || emailingId === scan.id}
                    className="flex flex-1 items-center justify-center gap-2 py-2 bg-white text-medical-slate text-xs font-bold border border-medical-border rounded-md hover:bg-slate-100 transition-colors disabled:opacity-50"
                   >
                     {exportingId === scan.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                     PDF
                   </button>
                   <button 
                    onClick={() => handleSendEmail(scan.id)}
                    disabled={exportingId === scan.id || emailingId === scan.id}
                    className="flex flex-1 items-center justify-center gap-2 py-2 bg-medical-teal text-white text-xs font-bold border border-transparent rounded-md hover:bg-teal-600 transition-colors disabled:opacity-50"
                   >
                     {emailingId === scan.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                     Email
                   </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
