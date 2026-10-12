# DermaSense AI: Skin Disease Detection & Early Screening System

**Dr. N.G.P. Institute of Technology, Coimbatore**  
**Course:** 22UCS407 – IDEA AND DESIGN SPRINT / 22UOC205-STEM PROJECT  
**Team:** Roketh M, Sridhar Jeyaram B, Mirudul Vikash V  
**Guide:** Mr. M. Tamilarasan (Ph.D.)

## Project Overview
DermaSense AI is a mobile-first, cloud-based healthcare screening application. It utilizes a Vision Transformer (ViT) deep-learning backbone trained on the HAM10000 dermatoscopic dataset to classify 7 major cutaneous conditions. The system features a 9-step processing pipeline from optical acquisition to cloud storage, providing plain-language clinical triage and severity assessment.

## Technical Stack
* **Frontend:** Next.js (App Router), React, Tailwind CSS, Recharts (Live Analytics)
* **Mobile Support:** PWA (Progressive Web App) with `next-pwa`
* **Backend:** Next.js Serverless Edge Functions
* **Database:** Aiven Managed PostgreSQL Cloud Database
* **Inference Engine:** Hugging Face REST API (Fine-tuned HAM10000 Model)

## Core Architecture (9-Step Pipeline)
1. Image Upload / Live Camera Acquisition
2. Tensor Preprocessing & Normalization
3. AI Model Analysis
4. Disease Prediction Classification
5. Confidence Score Generation
6. Plain-English Medical Explanation
7. Clinical Recommendation & Triage (Low/Moderate/High)
8. UI Result Display & PDF Export
9. Auto-Persistence to Aiven Cloud Database

## Setup Instructions
1. Install dependencies: `npm install`
2. Create `.env.local`:
   ```env
   AIVEN_DATABASE_URL=postgres://<user>:<pass>@<host>:<port>/<db>?sslmode=require
   HF_API_KEY=your_huggingface_read_token
   ```
3. Initialize the database schema: `npm run db:init`
4. Generate mock assets (for offline demos): `node scripts/generate-demo-assets.mjs`
5. Start development server: `npm run dev`

*Disclaimer: This is an academic awareness tool, not a substitute for certified medical diagnosis.*
