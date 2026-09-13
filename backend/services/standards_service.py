import json
import os
from pathlib import Path
from typing import List, Optional, Dict, Any

DATA_FILE_PATH = Path(__file__).parent.parent / "data" / "bis_mvp_standards.json"

_standards_cache: List[Dict[str, Any]] = []

def load_standards() -> List[Dict[str, Any]]:
    global _standards_cache
    if _standards_cache:
        return _standards_cache
    
    if not DATA_FILE_PATH.exists():
        raise FileNotFoundError(f"BIS Knowledge Base file not found at {DATA_FILE_PATH}")
    
    with open(DATA_FILE_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
        if not isinstance(data, list):
            raise ValueError("Invalid format: bis_mvp_standards.json must contain a JSON array")
        _standards_cache = data
        return _standards_cache

def get_all_standards() -> List[Dict[str, Any]]:
    return load_standards()

def get_standard_by_id(std_id: str) -> Optional[Dict[str, Any]]:
    standards = load_standards()
    for std in standards:
        if std.get("id", "").lower() == std_id.lower():
            return std
    return None

def get_standard_by_is_number(is_number: str) -> Optional[Dict[str, Any]]:
    standards = load_standards()
    clean_target = is_number.lower().replace(" ", "")
    for std in standards:
        clean_num = std.get("is_number", "").lower().replace(" ", "")
        if clean_target in clean_num or clean_num in clean_target:
            return std
    return None

def get_standards_by_category(category: str) -> List[Dict[str, Any]]:
    standards = load_standards()
    cat_lower = category.lower()
    return [
        std for std in standards 
        if cat_lower in std.get("category", "").lower()
    ]

def search_standards(query: str) -> List[Dict[str, Any]]:
    standards = load_standards()
    if not query or not query.strip():
        return standards
    
    q_words = [w.lower() for w in query.strip().split() if len(w) > 2]
    matched = []
    
    for std in standards:
        searchable_text = " ".join([
            std.get("is_number", ""),
            std.get("title", ""),
            std.get("product", ""),
            std.get("category", ""),
            std.get("scope", ""),
            " ".join(std.get("applications", [])),
            " ".join(std.get("keywords", []))
        ]).lower()
        
        matches_count = sum(1 for word in q_words if word in searchable_text)
        if matches_count > 0:
            matched.append((matches_count, std))
            
    matched.sort(key=lambda x: x[0], reverse=True)
    return [item[1] for item in matched]
