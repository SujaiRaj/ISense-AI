from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict

class AnalyzeRequest(BaseModel):
    query: str = Field(..., description="Raw procurement requirement input")

class RequirementUnderstanding(BaseModel):
    product: str = Field(default="Not specified")
    application: str = Field(default="General procurement")
    technical_requirements: List[str] = Field(default_factory=list)
    environment: str = Field(default="Standard operating environment")

class Recommendation(BaseModel):
    id: Optional[str] = None
    is_number: str
    title: str
    relevance: str = Field(default="High")
    relevance_score: Optional[int] = 90
    reason: str
    scope: Optional[str] = ""
    related_standards: List[Any] = Field(default_factory=list)
    certification: Optional[str] = ""
    status: Optional[str] = ""
    latest_version: Optional[str] = ""
    source_url: Optional[str] = ""

class AnalyzeResponse(BaseModel):
    query: str
    understanding: RequirementUnderstanding
    recommendations: List[Recommendation]
    message: Optional[str] = None

class StandardItem(BaseModel):
    id: str
    is_number: str
    title: str
    product: str
    category: str
    scope: str
    applications: List[str]
    keywords: List[str]
    status: str
    latest_version: str
    review_year: str
    amendments: List[Any] = Field(default_factory=list)
    related_standards: List[Any] = Field(default_factory=list)
    certification: str
    source: str
    source_url: str
    source_notes: str
