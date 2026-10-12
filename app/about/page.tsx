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

      <div className="bg-white rounded-xl border border-medical-border p-4 shadow-sm">
        <h3 className="font-semibold text-slate-800 text-sm mb-2 flex items-center gap-2">
          <Info className="w-4 h-4 text-medical-slate" /> 
          Project Info
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Developed as part of the advanced research capstone at Dr. N.G.P. Institute of Technology. 
          This AI skin disease detection system uses a custom-trained proprietary model optimized for mobile screening.
        </p>
      </div>
      
      <button className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-medium border border-medical-border hover:bg-slate-200 transition-colors">
        <Code className="w-5 h-5" />
        View Source
      </button>
    </div>
  );
}
