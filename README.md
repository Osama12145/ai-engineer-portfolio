# Osama Naji Portfolio

React portfolio with a lightweight LangGraph chat backend for Osama Ali Naji's personal AI assistant.

## Frontend

```bash
pnpm install
pnpm run dev
```

Set `VITE_PORTFOLIO_AGENT_URL` to the backend endpoint:

```text
http://localhost:8000/api/portfolio-chat
```

`VITE_N8N_WEBHOOK_URL` can remain as an optional fallback during migration.

## Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

The backend uses:

- FastAPI for `/api/portfolio-chat`
- LangGraph for a small deterministic agent flow
- OpenRouter for response generation
- Markdown knowledge from `backend/data/knowledge/osama_profile.md`
- SQLite chat logs in `backend/data/portfolio_agent.db`

Recent messages can be reviewed with:

```bash
curl -H "x-admin-key: your-admin-key" http://localhost:8000/api/admin/messages
```
