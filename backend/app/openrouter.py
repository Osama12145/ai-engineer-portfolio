from __future__ import annotations

from typing import Any

import httpx

from app.config import get_settings


class OpenRouterService:
    def __init__(self) -> None:
        self.settings = get_settings()

    async def complete_text(
        self,
        *,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.2,
    ) -> str:
        if not self.settings.openrouter_api_key:
            raise RuntimeError("OPENROUTER_API_KEY is not configured.")

        payload: dict[str, Any] = {
            "model": self.settings.openrouter_text_model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "temperature": temperature,
        }
        headers = {
            "Authorization": f"Bearer {self.settings.openrouter_api_key}",
            "Content-Type": "application/json",
        }
        async with httpx.AsyncClient(timeout=45) as client:
            response = await client.post(
                f"{self.settings.openrouter_base_url}/chat/completions",
                headers=headers,
                json=payload,
            )
            response.raise_for_status()
            result = response.json()
        return result["choices"][0]["message"].get("content") or ""
