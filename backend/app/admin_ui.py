from __future__ import annotations

from fastapi.responses import HTMLResponse


ADMIN_MESSAGES_HTML = """
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Portfolio Agent Messages</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #0b0d13;
        --panel: #121622;
        --panel-2: #171c2b;
        --text: #eef2ff;
        --muted: #9ca3af;
        --border: #273043;
        --accent: #3b82f6;
        --danger: #f87171;
        --ok: #34d399;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        max-width: 1180px;
        margin: 0 auto;
        padding: 28px 18px 56px;
      }
      header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 20px;
      }
      h1 {
        margin: 0;
        font-size: 24px;
        letter-spacing: 0;
      }
      p {
        margin: 6px 0 0;
        color: var(--muted);
      }
      .controls {
        display: grid;
        grid-template-columns: minmax(220px, 1fr) 110px auto auto;
        gap: 10px;
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 18px;
      }
      input, button {
        border: 1px solid var(--border);
        border-radius: 8px;
        background: var(--panel-2);
        color: var(--text);
        min-height: 40px;
        padding: 0 12px;
        font: inherit;
      }
      input::placeholder { color: #6b7280; }
      button {
        cursor: pointer;
        background: var(--accent);
        border-color: var(--accent);
        font-weight: 650;
      }
      button.secondary {
        background: var(--panel-2);
        border-color: var(--border);
      }
      .status {
        min-height: 22px;
        margin-bottom: 12px;
        color: var(--muted);
      }
      .status.error { color: var(--danger); }
      .status.ok { color: var(--ok); }
      .list {
        display: grid;
        gap: 12px;
      }
      article {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 8px;
        overflow: hidden;
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 10px 12px;
        border-bottom: 1px solid var(--border);
        color: var(--muted);
        font-size: 13px;
      }
      .pill {
        background: var(--panel-2);
        border: 1px solid var(--border);
        border-radius: 999px;
        padding: 3px 8px;
      }
      .content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
      }
      .cell {
        padding: 12px;
        min-width: 0;
      }
      .cell:first-child {
        border-left: 1px solid var(--border);
      }
      .label {
        color: var(--muted);
        font-size: 12px;
        margin-bottom: 6px;
      }
      .text {
        white-space: pre-wrap;
        line-height: 1.6;
        overflow-wrap: anywhere;
      }
      @media (max-width: 760px) {
        header { display: block; }
        .controls { grid-template-columns: 1fr; }
        .content { grid-template-columns: 1fr; }
        .cell:first-child {
          border-left: 0;
          border-bottom: 1px solid var(--border);
        }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <div>
          <h1>رسائل Portfolio Agent</h1>
          <p>عرض آخر الأسئلة والردود مع التصنيف والمدة والوقت.</p>
        </div>
      </header>

      <section class="controls" aria-label="Controls">
        <input id="adminKey" type="password" autocomplete="off" placeholder="Enter admin key..." />
        <input id="limit" type="number" min="1" max="200" value="50" aria-label="Limit" />
        <button id="loadBtn" type="button">تحميل</button>
        <button id="clearBtn" type="button" class="secondary">مسح المفتاح</button>
      </section>

      <div id="status" class="status"></div>
      <section id="messages" class="list"></section>
    </main>

    <script>
      const keyInput = document.getElementById("adminKey");
      const limitInput = document.getElementById("limit");
      const loadBtn = document.getElementById("loadBtn");
      const clearBtn = document.getElementById("clearBtn");
      const statusEl = document.getElementById("status");
      const messagesEl = document.getElementById("messages");

      keyInput.value = sessionStorage.getItem("portfolioAdminKey") || "";

      function setStatus(message, kind = "") {
        statusEl.textContent = message;
        statusEl.className = "status" + (kind ? ` ${kind}` : "");
      }

      function formatDate(value) {
        if (!value) return "";
        const normalized = value.includes("T") ? value : value.replace(" ", "T") + "Z";
        const date = new Date(normalized);
        if (Number.isNaN(date.getTime())) return value;
        return date.toLocaleString("ar-SA", {
          dateStyle: "medium",
          timeStyle: "short",
        });
      }

      function renderMessages(items) {
        messagesEl.innerHTML = "";
        if (!items.length) {
          setStatus("لا توجد رسائل بعد.", "ok");
          return;
        }

        for (const item of items) {
          const article = document.createElement("article");
          article.innerHTML = `
            <div class="meta">
              <span class="pill">#${item.id}</span>
              <span class="pill">${formatDate(item.created_at)}</span>
              <span class="pill">route: ${item.route}</span>
              <span class="pill">category: ${item.category}</span>
              <span class="pill">${item.duration_ms}ms</span>
              ${item.user_ip ? `<span class="pill">ip: ${item.user_ip}</span>` : ""}
            </div>
            <div class="content">
              <div class="cell">
                <div class="label">رسالة المستخدم</div>
                <div class="text"></div>
              </div>
              <div class="cell">
                <div class="label">رد المساعد</div>
                <div class="text"></div>
              </div>
            </div>
          `;
          const textCells = article.querySelectorAll(".text");
          textCells[0].textContent = item.message || "";
          textCells[1].textContent = item.reply || "";
          messagesEl.appendChild(article);
        }
        setStatus(`تم تحميل ${items.length} رسالة.`, "ok");
      }

      async function loadMessages() {
        const adminKey = keyInput.value.trim();
        if (!adminKey) {
          setStatus("أدخل admin key أولًا.", "error");
          keyInput.focus();
          return;
        }

        sessionStorage.setItem("portfolioAdminKey", adminKey);
        setStatus("جاري التحميل...");
        messagesEl.innerHTML = "";

        try {
          const limit = Math.min(Math.max(Number(limitInput.value) || 50, 1), 200);
          const response = await fetch(`/api/admin/messages?limit=${limit}`, {
            headers: { "x-admin-key": adminKey },
          });
          if (!response.ok) {
            throw new Error(response.status === 401 ? "المفتاح غير صحيح." : "تعذر تحميل الرسائل.");
          }
          renderMessages(await response.json());
        } catch (error) {
          setStatus(error instanceof Error ? error.message : "حدث خطأ غير متوقع.", "error");
        }
      }

      loadBtn.addEventListener("click", loadMessages);
      keyInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") loadMessages();
      });
      clearBtn.addEventListener("click", () => {
        sessionStorage.removeItem("portfolioAdminKey");
        keyInput.value = "";
        messagesEl.innerHTML = "";
        setStatus("تم مسح المفتاح من هذا المتصفح.");
      });
    </script>
  </body>
</html>
""".strip()


def admin_messages_page() -> HTMLResponse:
    return HTMLResponse(ADMIN_MESSAGES_HTML)
