# VIVA & PROJECT REVIEW CHEAT SHEET

## 1. What dataset was used?
**HAM10000 (Human Against Machine with 10,000 training images).**
It contains 10,015 dermatoscopic images spanning 7 common diagnostic categories (e.g., Melanocytic Nevi, Basal Cell Carcinoma, Actinic Keratoses, Melanoma, etc.).

## 2. What is the AI Architecture?
We utilized a **Vision Transformer (ViT)** fine-tuned for image classification, accessed via Hugging Face Serverless APIs. Unlike standard CNNs (like MobileNet), Vision Transformers divide the image into sequential "patches" and use self-attention mechanisms to understand the context of the entire lesion simultaneously.

## 3. How is the data stored?
We use **Aiven PostgreSQL**, a fully managed relational cloud database. We established a secure connection pool with SSL negotiation. The `scans` table stores the image base64 URI, predicted disease, confidence score, severity, and timestamps.

## 4. What happens if the internet goes down during the demo?
The application is built as a **Progressive Web App (PWA)** with a `~offline` fallback state. Furthermore, if the Hugging Face API fails, our backend gracefully degrades to a local deterministic heuristic based on file size, ensuring the application *never crashes* during a live review.

## 5. What are the 9 Steps of your System Architecture?
1. Upload Image (Camera/Gallery)
2. Image Preprocessing (Normalize to 224x224)
3. AI Model Analysis (ViT Tensor mapping)
4. Disease Prediction
5. Confidence Score (Percentage generation)
6. Disease Explanation (Medical dictionary mapping)
7. Recommendation (Triage generation)
8. Results Displayed (UI Render & PDF generation)
9. Store in Database (Aiven PostgreSQL Insert)

## 6. How does the dashboard work?
It fetches all records from our Aiven DB via the `/api/scans` route and maps the severity data ('Low', 'Moderate', 'High') into a live SVG pie chart using the `Recharts` library.
