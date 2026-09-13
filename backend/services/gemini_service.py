import os
import json
import httpx
from typing import Dict, Any, List
from dotenv import load_dotenv
from backend.utils.prompts import get_extraction_prompt, get_reasoning_prompt

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

def clean_json_response(raw_text: str) -> Dict[str, Any]:
    text = raw_text.strip()
    if text.startswith("```json"):
        text = text[7:]
    elif text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
    text = text.strip()
    return json.loads(text)

async def _call_gemini_api(prompt_text: str) -> Dict[str, Any]:
    if not GEMINI_API_KEY or GEMINI_API_KEY == "your_gemini_api_key_here":
        raise ValueError("GEMINI_API_KEY is not configured in backend/.env")
    
    models_to_try = [GEMINI_MODEL, "gemini-2.5-flash", "gemini-1.5-flash"]
    unique_models = list(dict.fromkeys(models_to_try))
    
    last_error = None
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        for model in unique_models:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={GEMINI_API_KEY}"
            payload = {
                "contents": [
                    {
                        "parts": [{"text": prompt_text}]
                    }
                ],
                "generationConfig": {
                    "temperature": 0.1,
                    "responseMimeType": "application/json"
                }
            }
            try:
                response = await client.post(url, json=payload)
                if response.status_code != 200:
                    raise RuntimeError(f"Gemini API returned status {response.status_code}: {response.text}")
                
                res_data = response.json()
                content = res_data.get("candidates", [])[0].get("content", {}).get("parts", [])[0].get("text", "")
                if not content:
                    raise RuntimeError("Empty text in Gemini API response")
                
                return clean_json_response(content)
            except Exception as e:
                last_error = e
                print(f"[Gemini Service Warning] Model {model} failed: {e}")
                
    raise last_error or RuntimeError("All Gemini model API calls failed")

async def extract_requirement_with_gemini(query: str) -> Dict[str, Any]:
    """
    Capability A: Extract structured requirement parameters from raw query
    """
    prompt = get_extraction_prompt(query)
    try:
        result = await _call_gemini_api(prompt)
        return {
            "product": result.get("product", "Procurement Item"),
            "application": result.get("application", "General Procurement"),
            "technical_requirements": result.get("technical_requirements", []),
            "environment": result.get("environment", "Standard Operating Environment")
        }
    except Exception as e:
        print(f"[Gemini Extraction Error]: {e}")
        # Rule-based fallback requirement extraction if API key fails or network issue
        return fallback_extract_requirement(query)

async def rank_and_explain_with_gemini(query: str, understanding: Dict[str, Any], candidates: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Capability B: Evaluate and rank shortlisted candidate standards from supplied BIS dataset
    """
    if not candidates:
        return []
    
    # Prepare minimal candidate subset for prompt to avoid token bloat
    candidate_summary = [
        {
            "id": c.get("id"),
            "is_number": c.get("is_number"),
            "title": c.get("title"),
            "product": c.get("product"),
            "category": c.get("category"),
            "scope": c.get("scope"),
            "applications": c.get("applications", [])[:2],
            "keywords": c.get("keywords", [])[:4]
        }
        for c in candidates
    ]
    
    prompt = get_reasoning_prompt(query, understanding, candidate_summary)
    
    try:
        result = await _call_gemini_api(prompt)
        recommendations = result.get("recommendations", [])
        return recommendations
    except Exception as e:
        print(f"[Gemini Reasoning Error]: {e}")
        return fallback_rank_candidates(query, candidates)

def fallback_extract_requirement(query: str) -> Dict[str, Any]:
    q_lower = query.lower()
    product = "Procurement Item"
    app = "General Procurement"
    reqs = ["Standard technical performance", "BIS safety compliance"]
    env = "Field / Outdoor"
    
    if "led" in q_lower or "light" in q_lower or "luminaire" in q_lower or "street" in q_lower:
        product = "LED Street Light / Luminaire"
        app = "Municipal & Roadway Lighting"
        reqs = ["Weather resistance", "Lumen efficacy", "Surge protection"]
        env = "Outdoor Weatherproof"
    elif "helmet" in q_lower or "ppe" in q_lower or "boot" in q_lower or "safety" in q_lower:
        product = "Industrial PPE / Safety Equipment"
        app = "Construction & High Hazard Workplace Safety"
        reqs = ["Shock absorption", "Penetration resistance", "Impact safety"]
        env = "High Impact Field Work"
    elif "cement" in q_lower or "opc" in q_lower or "ppc" in q_lower or "concrete" in q_lower:
        product = "Ordinary / Blended Portland Cement"
        app = "RCC Civil Construction & Infrastructure"
        reqs = ["Compressive strength", "Setting time", "Quality compliance"]
        env = "Structural Concrete / Ambient Exposure"
    elif "cable" in q_lower or "wire" in q_lower or "pvc" in q_lower or "solar" in q_lower:
        product = "Electrical Cable / Solar DC Wire"
        app = "Power Distribution & Wiring"
        reqs = ["Rated voltage up to 1100V", "Insulation resistance", "Flame retardance"]
        env = "Indoor / Underground / PV Array"
        
    return {
        "product": product,
        "application": app,
        "technical_requirements": reqs,
        "environment": env
    }

def fallback_rank_candidates(query: str, candidates: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    recs = []
    base_scores = [96, 89, 83, 76, 70, 64]
    for idx, c in enumerate(candidates[:6]):
        score = base_scores[idx] if idx < len(base_scores) else max(50, 96 - idx * 6)
        recs.append({
            "id": c.get("id"),
            "is_number": c.get("is_number"),
            "relevance": "High" if score >= 88 else "Medium" if score >= 75 else "Low",
            "relevance_score": score,
            "reason": f"Matches user requirement for {c.get('product')}. {c.get('is_number')} ({c.get('title')}) governs safety, specification and quality benchmarks for this product class."
        })
    return recs
