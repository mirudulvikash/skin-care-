import { Info, Code, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col p-4 gap-6">
      <div className="text-center pt-4">
        <div className="w-20 h-20 bg-medical-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-medical-teal/20">
          <ShieldCheck className="w-10 h-10 text-medical-teal" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">DermaSense AI</h2>
        <p className="text-sm text-slate-500 font-medium">Version 1.0.0</p>
      </div>

      <div className="bg-white rounded-2xl border border-medical-border p-5 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <Info className="w-5 h-5 text-medical-teal" /> 
            Project &amp; Technology Architecture
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            End-to-end dermatological screening system powered by computer vision.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider text-medical-teal mb-1">
              AI &amp; Deep Learning Backbone
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              Fine-tuned <strong>Vision Transformer (ViT)</strong> trained on the <strong>HAM10000</strong> dermatoscopic dataset (10,015 clinical images) to classify 7 major cutaneous lesion categories with confidence scoring.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider text-medical-teal mb-1">
              9-Step Processing Pipeline
            </h4>
            <ol className="text-slate-600 text-xs space-y-1 list-decimal list-inside leading-relaxed">
              <li>High-res Optical Capture &amp; Gallery Upload</li>
              <li>Tensor Preprocessing &amp; Normalization (224×224)</li>
              <li>ViT Feature Patch Extraction &amp; Self-Attention</li>
              <li>Multiclass Cutaneous Disease Classification</li>
              <li>Probabilistic Confidence Score Generation</li>
              <li>Plain-Language Clinical Context &amp; Explanation</li>
              <li>Automated Triage Stratification (Low/Mod/High)</li>
              <li>Interactive Visual Analytics &amp; PDF Report Export</li>
              <li>Encrypted Cloud Storage Persistence</li>
            </ol>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider text-medical-teal mb-1">
              Full-Stack &amp; Cloud Infrastructure
            </h4>
            <ul className="text-slate-600 text-xs space-y-1 list-disc list-inside leading-relaxed">
              <li><strong>Frontend:</strong> Next.js App Router, React, Tailwind CSS, Recharts</li>
              <li><strong>Mobile/PWA:</strong> Offline-capable Progressive Web App</li>
              <li><strong>Database:</strong> Managed PostgreSQL Cloud Database (SSL pool)</li>
              <li><strong>Resilience:</strong> Deterministic fallback heuristic for zero-downtime offline demos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
