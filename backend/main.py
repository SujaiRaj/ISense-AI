import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from backend.routes import analysis, standards

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app = FastAPI(
    title="ISense AI Backend API",
    description="FastAPI Backend for AI-Powered Indian Standards Intelligence for Procurement (MVP)",
    version="1.0.0"
)

# CORS Configuration
origins = [
    FRONTEND_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(analysis.router)
app.include_router(standards.router)

@app.get("/", tags=["Health"])
async def root():
    return {
        "status": "online",
        "service": "ISense AI Backend (FastAPI)",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "knowledge_base": "bis_mvp_standards.json"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
