from fastapi import APIRouter, HTTPException, status
from backend.models.schemas import AnalyzeRequest, AnalyzeResponse
from backend.services.recommendation_service import process_recommendation

router = APIRouter(prefix="/api", tags=["Analysis"])

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_procurement_requirement(payload: AnalyzeRequest):
    query = payload.query.strip()
    if not query:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Procurement specification query cannot be empty."
        )
    
    try:
        result = await process_recommendation(query)
        return result
    except Exception as e:
        print(f"[Analysis Route Error]: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unable to analyze procurement requirement: {str(e)}"
        )
