from typing import Dict, Any, List
from backend.services.standards_service import get_all_standards
from backend.services.gemini_service import extract_requirement_with_gemini, rank_and_explain_with_gemini

def stage1_shortlist_candidates(query: str, understanding: Dict[str, Any], max_candidates: int = 6) -> List[Dict[str, Any]]:
    """
    Stage 1: Metadata & keyword matching shortlist from bis_mvp_standards.json
    """
    all_standards = get_all_standards()
    query_lower = query.lower()
    product_extracted = understanding.get("product", "").lower()
    app_extracted = understanding.get("application", "").lower()
    
    scored_candidates = []
    
    for std in all_standards:
        score = 0
        text_corpus = " ".join([
            std.get("is_number", ""),
            std.get("title", ""),
            std.get("product", ""),
            std.get("category", ""),
            std.get("scope", ""),
            " ".join(std.get("applications", [])),
            " ".join(std.get("keywords", []))
        ]).lower()
        
        # Match product category / extracted product
        if product_extracted and (product_extracted in std.get("product", "").lower() or std.get("product", "").lower() in product_extracted):
            score += 40
            
        # Match keywords in query
        q_words = [w for w in query_lower.split() if len(w) > 2]
        for w in q_words:
            if w in text_corpus:
                score += 10
                
        # Category matches
        if any(cat in text_corpus for cat in ["lighting", "led", "street", "lamp"]) and any(w in query_lower for w in ["led", "street", "light", "lamp", "luminaire", "bulb"]):
            score += 25
        elif any(cat in text_corpus for cat in ["safety", "ppe", "helmet", "boot"]) and any(w in query_lower for w in ["helmet", "boot", "safety", "ppe", "head"]):
            score += 25
        elif any(cat in text_corpus for cat in ["cement", "opc", "ppc", "concrete"]) and any(w in query_lower for w in ["cement", "opc", "ppc", "concrete", "mortar"]):
            score += 25
        elif any(cat in text_corpus for cat in ["cable", "wire", "pvc", "solar"]) and any(w in query_lower for w in ["cable", "wire", "pvc", "solar", "conductor"]):
            score += 25

        if score > 0:
            scored_candidates.append((score, std))
            
    # Sort candidates by score descending
    scored_candidates.sort(key=lambda x: x[0], reverse=True)
    
    # Return top N candidate standards
    top_candidates = [item[1] for item in scored_candidates[:max_candidates]]
    return top_candidates

async def process_recommendation(query: str) -> Dict[str, Any]:
    # 1. AI Feature A: Extract requirement understanding
    understanding = await extract_requirement_with_gemini(query)
    
    # 2. Stage 1: Shortlist candidates from bis_mvp_standards.json
    candidates = stage1_shortlist_candidates(query, understanding, max_candidates=6)
    
    if not candidates:
        return {
            "query": query,
            "understanding": understanding,
            "recommendations": [],
            "message": "No sufficiently relevant standard was found in the current MVP knowledge base."
        }
        
    # 3. Stage 2: Rank & explain candidates using Gemini
    raw_recs = await rank_and_explain_with_gemini(query, understanding, candidates)
    
    # 4. Merge AI ranking/explanations with authoritative JSON dataset fields
    final_recommendations = []
    seen_scores = set()
    
    # Preset strictly descending base score sequence to ensure clear visual hierarchy
    default_base_scores = [96, 89, 83, 76, 70, 64]
    
    for idx, rec in enumerate(raw_recs):
        std_id = rec.get("id")
        is_num = rec.get("is_number")
        
        # Match back to candidate standard record
        matched_std = None
        if std_id:
            matched_std = next((c for c in candidates if c.get("id") == std_id), None)
        if not matched_std and is_num:
            matched_std = next((c for c in candidates if c.get("is_number") == is_num), None)
        if not matched_std and candidates and idx < len(candidates):
            matched_std = candidates[idx]
            
        if matched_std:
            # Determine unique descending score
            raw_score = rec.get("relevance_score")
            if not isinstance(raw_score, int) or raw_score <= 0:
                score = default_base_scores[idx] if idx < len(default_base_scores) else max(50, 96 - idx * 6)
            else:
                score = raw_score
                
            # If duplicate score encountered, decrement until unique
            while score in seen_scores or (final_recommendations and score >= final_recommendations[-1]["relevance_score"]):
                score = max(50, (final_recommendations[-1]["relevance_score"] - 5) if final_recommendations else score - 1)
                
            seen_scores.add(score)
            
            final_recommendations.append({
                "id": matched_std.get("id"),
                "is_number": matched_std.get("is_number"),
                "title": matched_std.get("title"),
                "relevance": rec.get("relevance") or ("High" if score >= 88 else "Medium" if score >= 75 else "Low"),
                "relevance_score": score,
                "reason": rec.get("reason") or matched_std.get("scope"),
                "scope": matched_std.get("scope", ""),
                "related_standards": matched_std.get("related_standards", []),
                "certification": matched_std.get("certification", ""),
                "status": matched_std.get("status", ""),
                "latest_version": matched_std.get("latest_version", ""),
                "source_url": matched_std.get("source_url", "")
            })
            
    return {
        "query": query,
        "understanding": understanding,
        "recommendations": final_recommendations,
        "message": None if final_recommendations else "No sufficiently relevant standard was found in the current MVP knowledge base."
    }
