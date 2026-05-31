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

The n8n fallback is disabled by default. To enable it during migration, set:

```text
VITE_ENABLE_N8N_FALLBACK=true
VITE_N8N_WEBHOOK_URL=https://your-n8n-domain.com/webhook/portfolio-chat
```

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

Or open the browser UI:

```text
http://localhost:8000/admin/messages
```

## Coolify Deployment

Deploy this as two services from the same GitHub repository:

1. Frontend static/Vite service from the repository root.
   - Build command: `npm install && npm run build`
   - Output directory: `dist`
   - Required build-time env:
     `VITE_PORTFOLIO_AGENT_URL=https://your-backend-domain.com/api/portfolio-chat`

2. Backend Docker service using `backend/Dockerfile`.
   - Build context: `backend`
   - Exposed port: `8000`
   - Required runtime env:
     `OPENROUTER_API_KEY`
     `ADMIN_API_KEY`
     `ALLOWED_ORIGINS=https://osama1.site,https://www.osama1.site`

If the browser still calls n8n, the frontend was built without `VITE_PORTFOLIO_AGENT_URL` or an old cached deployment is still being served.
