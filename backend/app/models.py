from __future__ import annotations

from typing import Literal, TypedDict

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(max_length=2000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=500)
    history: list[ChatMessage] = Field(default_factory=list, max_length=10)


class ChatResponse(BaseModel):
    output: str
    route: str = "generated"
    category: str = "general"


class ChatLogItem(BaseModel):
    id: int
    message: str
    reply: str
    route: str
    category: str
    duration_ms: int
    user_ip: str | None = None
    created_at: str


class AgentState(TypedDict, total=False):
    message: str
    history: list[dict[str, str]]
    language: Literal["ar", "en"]
    category: str
    route: str
    context: str
    final_reply: str
