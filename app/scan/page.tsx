"use client";

import { Scan, Camera, ArrowRight, AlertCircle, Video, Image as ImageIcon, Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { saveScanResult } from "@/app/actions/scan-actions";
import { useRouter } from "next/navigation";

const generateId = () => Math.random().toString(36).substring(2, 10);

export default function ScanPage() {
  const router = useRouter();
  const [cameraActive, setCameraActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = (base64Image: string) => {
    setAnalyzing(true);
    
    // Simulate AI inference delay
    setTimeout(async () => {
      const mockDiagnoses = [
        {
          disease_name: "Mild Eczema (Atopic Dermatitis)",
          severity: "Low" as const,
          confidence_score: 94.2,
          explanation: "Dry, scaly persistent skin patches consistent with mild atopic dermatitis.",
          medical_recommendation: "Apply OTC hydrocortisone, moisturize daily. Monitor."
        },
        {
          disease_name: "Suspected Melanoma",
          severity: "High" as const,
          confidence_score: 87.5,
          explanation: "Asymmetrical borders with multiple color variations detected on lesion.",
          medical_recommendation: "URGENT: Consult a certified dermatologist immediately for biopsy."
        },
        {
          disease_name: "Psoriasis Plaque",
          severity: "Moderate" as const,
          confidence_score: 91.1,
          explanation: "Thickened, red skin with silvery scales prominent on joint area.",
          medical_recommendation: "Targeted topical treatment suggested. Clinical review advised."
        }
      ];
      
      const diagnostic = mockDiagnoses[Math.floor(Math.random() * mockDiagnoses.length)];
      
      const result = await saveScanResult({
        id: generateId(),
        image_data: base64Image, 
        ...diagnostic,
      });
      
      setAnalyzing(false);
      
      if (result.success) {
        router.push("/history");
      } else {
        setError(result.error ?? "Failed to save record. Check AIVEN_DATABASE_URL credentials.");
      }
    }, 2800);
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const base64Image = reader.result;
        stopCamera();
        processImage(base64Image);
      }
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      streamRef.current = stream;
      setCameraActive(true);
      
      // Delay to ensure video element mounts
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      console.warn(err);
      setError("Hardware camera access was denied or is unavailable on this device.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureAndAnalyze = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    // Snap frame to canvas
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const base64Image = canvas.toDataURL("image/jpeg", 0.7);
    
    stopCamera();
    processImage(base64Image);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <canvas ref={canvasRef} className="hidden" />
      
      {analyzing ? (
        <div className="flex flex-col items-center animate-in fade-in duration-300">
          <div className="relative">
             <div className="w-24 h-24 border-4 border-medical-border border-t-medical-teal rounded-full animate-spin"></div>
             <Scan className="w-8 h-8 text-medical-teal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mt-6">Analyzing Pattern...</h2>
          <p className="text-slate-500 text-sm mt-2 max-w-[200px]">DermaSense AI is scoring asymmetry and cellular structures...</p>
        </div>
      ) : cameraActive ? (
        <div className="flex flex-col items-center justify-center w-full h-[65vh] bg-black rounded-3xl relative overflow-hidden animate-in fade-in">
           <video 
             ref={videoRef} 
             autoPlay 
             playsInline 
             muted 
             className="absolute inset-0 w-full h-full object-cover"
           />
           <div className="border-2 border-white/30 w-[80%] h-[70%] rounded-2xl relative shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] z-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-medical-teal"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-medical-teal"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-medical-teal"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-medical-teal"></div>
           </div>
           
           <div className="absolute bottom-6 w-full flex justify-center z-20">
             <button 
               onClick={captureAndAnalyze}
               className="w-16 h-16 bg-white/20 backdrop-blur border-4 border-white rounded-full flex items-center justify-center active:scale-95 transition-transform"
             >
               <div className="w-12 h-12 bg-white rounded-full"></div>
             </button>
           </div>
        </div>
      ) : (
        <>
          <div className="w-24 h-24 bg-medical-teal/10 rounded-full flex items-center justify-center mb-6">
            <Scan className="w-12 h-12 text-medical-teal" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">New Assessment</h2>
          <p className="text-slate-500 text-sm mb-8 px-4 leading-relaxed">
            Center the skin anomaly inside the viewfinder. Use good lighting for optimal accuracy.
          </p>
          
          <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto my-4 px-4">
            <button
              type="button"
              onClick={startCamera}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium shadow-sm transition"
            >
              <Camera className="w-5 h-5"/>
              <span>Use Camera</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-medium shadow-sm transition"
            >
              <ImageIcon className="w-5 h-5 text-teal-600"/>
              <span>Upload Gallery</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleGalleryUpload}
            />
          </div>

          {error && (
            <div className="mt-6 w-full p-4 bg-red-50 text-red-600 text-xs font-semibold rounded-lg border border-red-100 flex items-start text-left">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 mr-2" />
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
}
