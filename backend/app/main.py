from __future__ import annotations

import logging
from time import perf_counter

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from app.agent import PortfolioAgent
from app.config import get_settings
from app.models import ChatLogItem, ChatRequest, ChatResponse
from app.storage import StorageService


logging.basicConfig(
    level=get_settings().log_level.upper(),
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)

settings = get_settings()
logger = logging.getLogger(__name__)

app = FastAPI(title=settings.app_name)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

agent = PortfolioAgent()
storage = StorageService()


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/portfolio-chat", response_model=ChatResponse)
async def portfolio_chat(request: ChatRequest, http_request: Request) -> ChatResponse:
    started = perf_counter()
    try:
        result = await agent.run(
            message=request.message,
            history=[item.model_dump() for item in request.history],
        )
        response = ChatResponse(
            output=result.get("final_reply") or "",
            route=result.get("route", "generated"),
            category=result.get("category", "general"),
        )
        duration_ms = int((perf_counter() - started) * 1000)
        storage.save_chat_log(
            message=request.message,
            reply=response.output,
            route=response.route,
            category=response.category,
            duration_ms=duration_ms,
            user_ip=http_request.client.host if http_request.client else None,
        )
        logger.info(
            "Chat handled | route=%s | category=%s | duration_ms=%s",
            response.route,
            response.category,
            duration_ms,
        )
        return response
    except Exception as exc:
        logger.exception("Portfolio chat failed")
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/api/admin/messages", response_model=list[ChatLogItem])
async def recent_messages(
    limit: int = 50,
    x_admin_key: str | None = Header(default=None),
) -> list[ChatLogItem]:
    if not settings.admin_api_key:
        raise HTTPException(status_code=404, detail="Not found.")
    if x_admin_key != settings.admin_api_key:
        raise HTTPException(status_code=401, detail="Invalid admin key.")
    safe_limit = min(max(limit, 1), 200)
    return [ChatLogItem(**item) for item in storage.recent_chat_logs(safe_limit)]
