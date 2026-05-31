from __future__ import annotations

import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Iterator

from app.config import get_settings


class StorageService:
    def __init__(self) -> None:
        settings = get_settings()
        self.db_path = Path(settings.database_url.replace("sqlite:///", ""))
        if not self.db_path.is_absolute():
            self.db_path = Path(__file__).resolve().parent.parent / self.db_path
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._initialize()

    @contextmanager
    def _connect(self) -> Iterator[sqlite3.Connection]:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
            conn.commit()
        finally:
            conn.close()

    def _initialize(self) -> None:
        with self._connect() as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS chat_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    message TEXT NOT NULL,
                    reply TEXT NOT NULL,
                    route TEXT NOT NULL,
                    category TEXT NOT NULL,
                    duration_ms INTEGER NOT NULL,
                    user_ip TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )

    def save_chat_log(
        self,
        *,
        message: str,
        reply: str,
        route: str,
        category: str,
        duration_ms: int,
        user_ip: str | None,
    ) -> None:
        with self._connect() as conn:
            conn.execute(
                """
                INSERT INTO chat_logs (
                    message, reply, route, category, duration_ms, user_ip
                ) VALUES (?, ?, ?, ?, ?, ?)
                """,
                (message, reply, route, category, duration_ms, user_ip),
            )

    def recent_chat_logs(self, limit: int = 50) -> list[dict]:
        with self._connect() as conn:
            rows = conn.execute(
                """
                SELECT id, message, reply, route, category, duration_ms, user_ip, created_at
                FROM chat_logs
                ORDER BY id DESC
                LIMIT ?
                """,
                (limit,),
            ).fetchall()
        return [dict(row) for row in rows]
