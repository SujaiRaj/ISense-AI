from fastapi import APIRouter, HTTPException, Query, status
from typing import List, Dict, Any
from backend.services.standards_service import (
    get_all_standards,
    get_standard_by_id,
    get_standards_by_category,
    search_standards
)

router = APIRouter(prefix="/api/standards", tags=["Standards Library"])

@router.get("", response_model=List[Dict[str, Any]])
async def list_all_standards():
    """Return all standards from the BIS MVP dataset"""
    return get_all_standards()

@router.get("/search", response_model=List[Dict[str, Any]])
async def search_bis_standards(q: str = Query(..., description="Search keyword query")):
    """Search standards in the local BIS dataset"""
    return search_standards(q)

@router.get("/category/{category}", response_model=List[Dict[str, Any]])
async def get_standards_by_cat(category: str):
    """Return standards belonging to a specific category"""
    return get_standards_by_category(category)

@router.get("/{id}", response_model=Dict[str, Any])
async def get_standard_details(id: str):
    """Return complete information for a specific standard by ID"""
    std = get_standard_by_id(id)
    if not std:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Standard with ID '{id}' not found in MVP dataset."
        )
    return std
