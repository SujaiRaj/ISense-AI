# ISense AI

> **"AI-Powered Indian Standards Intelligence for Smarter Procurement"**

[![Smart India Hackathon](https://img.shields.io/badge/SIH-Hackathon_MVP-blue.svg)](https://sih.gov.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React + Vite](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com)

---

## 📌 Problem Statement Overview
**Smart India Hackathon (SIH) Problem Statement:**
> *"AI-Powered Recommendation Engine for Identifying Applicable Indian Standards for Procurement Specifications"*

Government procurement officers, PSUs, and public agencies frequently create procurement specifications for hardware, electronics, construction materials, and field equipment without explicitly referencing the correct, current Bureau of Indian Standards (BIS) or Quality Control Orders (QCOs). This leads to non-compliant bids, safety hazards, and tender disputes.

**ISense AI** addresses this challenge by providing an intelligent, semantic recommendation engine that translates natural-language procurement requirements into precise, verified Indian Standards (IS), flags specification gaps, and checks mandatory BIS/QCO certifications.

---

## ✨ Features

- ⭐ **AI Natural-Language Standard Search**: Enter natural language product specs (e.g. *"90W outdoor LED street light for municipal roads"*) and instantly discover ranked Indian Standards with confidence scores.
- ⭐ **Tender Document Analysis & Gap Detection**: Drag & drop procurement tender PDFs to extract technical specifications and detect missing safety standards or omitted QCO clauses.
- ⭐ **AI Explanation Engine**: Displays human-readable breakdowns explaining *why* a specific Indian Standard was recommended.
- ⭐ **Compliance & QCO Tracker**: Inspect Quality Control Orders, compulsory registration schemes (CRS), and active BIS amendments.
- ⭐ **Interactive Indian Standards Library**: Filter and search through indexed BIS standard specifications.
- ⭐ **Audit History**: Persistent log of previous procurement requirement searches and tender evaluations.
- ⚡ **2-Minute Pitch Demo Mode**: Built-in preset buttons for LED Street Lights, Safety Helmets, Portland Cement, PVC Cables, and Safety Shoes for effortless judge demonstrations.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend Framework** | React 19 + Vite |
| **Styling & UI** | Tailwind CSS v4 + Vanilla CSS Utilities |
| **Routing** | React Router v6 |
| **HTTP Client** | Axios (configured for FastAPI integration) |
| **Icons** | Lucide React |
| **Analytics Charts** | Recharts |

---

## 📂 Project Architecture

```
ISense AI/
├── .env.example                       # Environment configuration template
├── README.md                          # Comprehensive documentation & demo guide
├── index.html                         # App HTML entrypoint & typography
├── package.json                       # Package dependencies
├── vite.config.js                     # Vite build configuration & Tailwind plugin
├── src/
│   ├── main.jsx                       # Application bootstrap
│   ├── App.jsx                        # Routing, main layout & toast context
│   ├── index.css                      # Global styles & Tailwind directives
│   ├── components/
│   │   ├── AIExplanation.jsx          # "Why recommended?" AI breakdown card
│   │   ├── ComplianceBadge.jsx        # Mandatory QCO & ISI certification tags
│   │   ├── ConfidenceScore.jsx        # Visual relevance progress ring & score
│   │   ├── DemoBanner.jsx             # Top SIH Demo Mode status indicator
│   │   ├── EmptyState.jsx             # Zero results fallback display
│   │   ├── FileUploader.jsx           # Drag-and-drop tender PDF uploader
│   │   ├── LoadingAnalysis.jsx        # Animated multi-step processing loading bar
│   │   ├── Navbar.jsx                 # Top bar navigation & alerts
│   │   ├── RecommendationCard.jsx     # Detailed recommendation result card
│   │   ├── RequirementList.jsx        # Extracted specs & tender gap analysis
│   │   ├── SearchInput.jsx            # Textarea query input with quick presets
│   │   ├── Sidebar.jsx                # Responsive enterprise navigation sidebar
│   │   ├── StandardCard.jsx           # Catalog item card
│   │   ├── StatusBadge.jsx            # Current / Superseded status indicator
│   │   └── Toast.jsx                  # UX notification toast
│   ├── data/
│   │   ├── mockRecommendations.js     # Demo pipeline results & extracted attributes
│   │   └── mockStandards.js           # 20 realistic Indian Standards (BIS repository)
│   ├── pages/
│   │   ├── AnalysisHistoryPage.jsx    # Audit log of past analyses
│   │   ├── CompliancePage.jsx         # Product QCO compliance checker
│   │   ├── DashboardPage.jsx          # Statistics & analytics overview
│   │   ├── LoginPage.jsx              # Presentation login & demo bypass
│   │   ├── RecommendationResultsPage.jsx # AI search results & scored list
│   │   ├── SearchPage.jsx             # Main AI natural language query interface
│   │   ├── StandardDetailsPage.jsx    # Full IS document scope, amendments & history
│   │   ├── StandardsLibraryPage.jsx   # Filterable BIS catalog table
│   │   └── TenderAnalysisPage.jsx     # PDF tender gap analysis interface
│   └── services/
│       ├── api.js                     # Base Axios client pointing to FastAPI
│       ├── complianceService.js       # Product compliance lookup service
│       ├── mockRecommendationService.js # Local semantic matching engine
│       ├── recommendationService.js   # Decoupled router service (Live vs Mock)
│       ├── standardsService.js        # Standards lookup & filter service
│       └── tenderService.js           # Tender PDF processing service
```

---

## 🚀 Quick Start (Running Locally)

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn

### Installation Commands

```bash
# 1. Clone or open repository
cd "ISense AI"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application will be running at `http://localhost:5173`.

---

## ⏱️ 2-Minute SIH Demo Presentation Flow

Follow these steps for a smooth demo presentation to hackathon judges:

1. **Dashboard Overview (0:00 - 0:20)**
   - Open `http://localhost:5173` (Dashboard).
   - Point out the 4 statistic cards (*1,250+ Indexed Standards*, *347 Recommended*, *86 Tenders Analyzed*), the quick action shortcuts, and the Recharts category chart.

2. **AI Standard Search (0:20 - 0:50)**
   - Click **"AI Standard Search"** on sidebar or click **"Start Search"**.
   - Click the preset button **"⚡ LED Street Light"** to populate:
     `"90W outdoor LED street light for municipal roads"`
   - Click **"Find Applicable Standards"**.

3. **Recommendation Results & AI Explanation (0:50 - 1:20)**
   - Observe **IS 10322 (Part 5/Sec 3): 2024** ranked #1 with **96% Relevance Score**.
   - Explain the **AI Explanation Component**: shows semantic match, IP66 ingress protection relevance, and mandatory QCO certification.
   - Click **"View Full Standard"** to open details (`/standards/is-10322-p5-s3`). Explain the scope, amendments, version history, and related standards.

4. **Tender Specification Gap Analysis (1:20 - 1:40)**
   - Click **"Tender Analysis"** on sidebar.
   - Click **"📄 Use Demo Tender Document"**.
   - Watch the animated 5-step processing sequence (*Extracting specs → Searching BIS DB → Gap Analysis*).
   - Show the **Specification Gaps Identified**: highlights missing standard references & missing 10kV surge protection clauses with recommended fixes.

5. **Compliance Tracker & Wrap Up (1:40 - 2:00)**
   - Click **"Compliance"** on sidebar. Select *"Safety Helmet"* or *"Portland Cement"*.
   - Point out mandatory QCO indicators, amendments, and future backend architecture readiness.

---

## 🔮 Future AI Backend Integration Architecture

The frontend architecture is explicitly designed so that mock services can be replaced with real AI models **without modifying any UI components**.

### Future End-to-End AI Pipeline Architecture

```text
User Natural Language Query / Tender Document
                     │
                     ▼
             [ FastAPI Backend ]
                     │
       ┌─────────────┴─────────────┐
       ▼                           ▼
[ LLM Specification ]     [ Document Parser / PyMuPDF ]
[ Extraction Engine ]     [ Text Chunking & OCR       ]
       │                           │
       └─────────────┬─────────────┘
                     ▼
         [ Embedding Generation ]
       (e.g., text-embedding-3-small)
                     │
                     ▼
         [ Vector Similarity Search ]
         (PostgreSQL + pgvector / Qdrant)
                     │
                     ▼
           [ Reranking Pipeline ]
         (Cross-Encoder / Cohere Rerank)
                     │
                     ▼
      [ BIS Quality Control Order (QCO) ]
      [ Version & Amendment Validation  ]
                     │
                     ▼
           [ RAG Prompting Context ]
                     │
                     ▼
       [ LLM Natural Language Explanation ]
                     │
                     ▼
         [ JSON API Output Response ]
                     │
                     ▼
           [ ISense AI Frontend UI ]
```

---

## 🔌 API Service Replacement Guide

To switch from Mock Data to a Live FastAPI Backend:

1. Update `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_USE_LIVE_API=true
   ```

2. The service file [`src/services/recommendationService.js`](file:///c:/Users/HP/OneDrive/Desktop/ISense%20AI/src/services/recommendationService.js) automatically sends HTTP requests to your FastAPI server:

   ```javascript
   // FastAPI endpoint expects:
   // POST /api/recommendations
   // Request Body: { "query": "90W outdoor LED street light for municipal roads" }
   ```

3. The expected backend JSON payload structure matches our mock format:

   ```json
   {
     "query": "90W outdoor LED street light for municipal roads",
     "categoryIdentified": "Electrical",
     "extractedRequirements": [
       { "key": "Power Rating", "value": "90W", "status": "MATCHED" }
     ],
     "recommendations": [
       {
         "id": "is-10322-p5-s3",
         "isNumber": "IS 10322 (Part 5/Sec 3): 2024",
         "title": "Luminaires for Road and Street Lighting",
         "relevanceScore": 96,
         "status": "CURRENT",
         "explanation": "...",
         "certification": { "isMandatory": true, "statusText": "Mandatory QCO" }
       }
     ]
   }
   ```

---

## 📜 License & Disclaimers
This project is developed as an MVP prototype for presentation in the **Smart India Hackathon**. Compliance and standard details presented in demo mode are for illustrative demonstration purposes and must be verified against official notifications published by the Bureau of Indian Standards (BIS).
