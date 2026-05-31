from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Osama Portfolio Agent"
    app_env: str = "development"
    app_host: str = "0.0.0.0"
    app_port: int = 8000
    log_level: str = "INFO"

    openrouter_api_key: str = Field(default="")
    openrouter_base_url: str = Field(default="https://openrouter.ai/api/v1")
    openrouter_text_model: str = Field(default="openai/gpt-5-mini")

    allowed_origins: str = Field(
        default="http://localhost:5173,https://osama1.site,https://www.osama1.site"
    )
    knowledge_file: str = Field(default=(DATA_DIR / "knowledge" / "osama_profile.md").as_posix())
    database_url: str = Field(default=f"sqlite:///{(DATA_DIR / 'portfolio_agent.db').as_posix()}")
    admin_api_key: str = Field(default="")

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    (DATA_DIR / "knowledge").mkdir(parents=True, exist_ok=True)
    return Settings()
