from pydantic import BaseModel


class CVDocument(BaseModel):
    title: str = "My Resume"
    name: str
    email: str
    phone: str | None = None
    summary: str | None = None
    template_id: int | None = None


class CVResponse(CVDocument):
    id: int

    class Config:
        from_attributes = True