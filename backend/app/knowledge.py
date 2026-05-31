from __future__ import annotations

import re
from pathlib import Path

from app.config import get_settings


CATEGORY_KEYWORDS: dict[str, set[str]] = {
    "contact": {"contact", "email", "phone", "linkedin", "website", "تواصل", "ايميل", "إيميل", "جوال", "رقم", "لينكد"},
    "experience": {"experience", "work", "job", "tytan", "sit", "intern", "خبرة", "خبراته", "اشتغل", "عمل", "تايتن"},
    "projects": {"project", "projects", "portfolio", "rag", "phish", "chatbot", "مشروع", "مشاريع", "شات", "بوت"},
    "skills": {"skill", "skills", "stack", "tools", "python", "langgraph", "مهارة", "مهارات", "تقنيات", "أدوات"},
    "education": {
        "education",
        "university",
        "gpa",
        "kaust",
        "degree",
        "study",
        "studied",
        "graduate",
        "graduated",
        "college",
        "تعليم",
        "جامعة",
        "جامعه",
        "معدل",
        "كاوست",
        "بكالوريوس",
        "درس",
        "دراسة",
        "دراسه",
        "تخرج",
        "تخرجه",
        "كلية",
        "كليه",
        "وين درس",
        "اي جامعة",
        "أي جامعة",
        "اي جامعه",
        "أي جامعه",
    },
    "certificates": {"certificate", "certification", "training", "course", "شهادة", "شهادات", "دورة", "دورات"},
}


class KnowledgeService:
    def __init__(self) -> None:
        settings = get_settings()
        self.knowledge_path = Path(settings.knowledge_file)

    def load(self) -> str:
        return self.knowledge_path.read_text(encoding="utf-8")

    def sections(self) -> dict[str, str]:
        text = self.load()
        matches = list(re.finditer(r"^##\s+(.+)$", text, flags=re.MULTILINE))
        if not matches:
            return {"profile": text}

        sections: dict[str, str] = {}
        for index, match in enumerate(matches):
            title = match.group(1).strip().lower()
            start = match.end()
            end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
            sections[title] = text[start:end].strip()
        return sections

    def infer_category(self, message: str) -> str:
        lowered = message.lower()
        scores = {
            category: sum(1 for keyword in keywords if keyword.lower() in lowered)
            for category, keywords in CATEGORY_KEYWORDS.items()
        }
        category, score = max(scores.items(), key=lambda item: item[1])
        return category if score else "general"

    def retrieve(self, message: str) -> tuple[str, str]:
        category = self.infer_category(message)
        sections = self.sections()
        base = self._format_section("profile", sections)

        if category == "general":
            selected = ["profile", "experience", "projects", "skills"]
        elif category == "contact":
            selected = ["contact"]
        elif category == "certificates":
            selected = ["certificates"]
        else:
            selected = ["profile", category]

        context_parts = [self._format_section(name, sections) for name in selected]
        context = "\n\n".join(part for part in context_parts if part)
        return category, context or base or self.load()[:3000]

    @staticmethod
    def _format_section(name: str, sections: dict[str, str]) -> str:
        content = sections.get(name)
        if not content:
            return ""
        return f"## {name.title()}\n{content}"
