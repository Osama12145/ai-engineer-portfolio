from __future__ import annotations

from langgraph.graph import END, StateGraph

from app.knowledge import KnowledgeService
from app.models import AgentState
from app.openrouter import OpenRouterService
from app.prompts import PORTFOLIO_SYSTEM_PROMPT, build_user_prompt


AR_IDENTITY_REPLY = "أنا المساعد الذكي للمهندس أسامة، وموجود هنا عشان أجاوبك بخصوص خبراته ومشاريع الـ AI اللي اشتغل عليها"
AR_REFUSAL = "أعتذر، أنا مخصص فقط للإجابة عن خبرات ومشاريع المهندس أسامة في مجال الذكاء الاصطناعي."
EN_REFUSAL = "I’m designed specifically to answer questions about Osama Ali Naji’s experience and AI projects."
AR_PRICING = "بخصوص الأسعار، الأفضل تتواصل مع المهندس أسامة مباشرة عشان يعطيك تفاصيل تناسب احتياجك. تقدر تتواصل معه عبر LinkedIn أو الإيميل."
EN_PRICING = "For pricing details, it's best to reach out to Osama directly so he can tailor a quote to your needs."


class PortfolioAgent:
    def __init__(self) -> None:
        self.knowledge = KnowledgeService()
        self.openrouter = OpenRouterService()
        self.graph = self._build_graph()

    def _build_graph(self):
        graph = StateGraph(AgentState)
        graph.add_node("guardrails", self.guardrails_node)
        graph.add_node("retrieve_context", self.retrieve_context_node)
        graph.add_node("generate_reply", self.generate_reply_node)

        graph.set_entry_point("guardrails")
        graph.add_conditional_edges(
            "guardrails",
            self.route_after_guardrails,
            {
                "final": END,
                "retrieve_context": "retrieve_context",
            },
        )
        graph.add_edge("retrieve_context", "generate_reply")
        graph.add_edge("generate_reply", END)
        return graph.compile()

    def guardrails_node(self, state: AgentState) -> AgentState:
        message = state["message"].strip()
        language = self._detect_language(message)
        state["language"] = language

        if self._is_identity_question(message):
            state["final_reply"] = AR_IDENTITY_REPLY
            state["route"] = "identity"
            return state

        if self._is_pricing_question(message):
            state["final_reply"] = AR_PRICING if language == "ar" else EN_PRICING
            state["route"] = "pricing"
            return state

        category = self.knowledge.infer_category(message)
        if category == "general" and self._looks_out_of_scope(message):
            state["final_reply"] = AR_REFUSAL if language == "ar" else EN_REFUSAL
            state["route"] = "refusal"
            return state

        state["category"] = category
        state["route"] = "generate"
        return state

    def route_after_guardrails(self, state: AgentState) -> str:
        return "final" if state.get("final_reply") else "retrieve_context"

    def retrieve_context_node(self, state: AgentState) -> AgentState:
        category, context = self.knowledge.retrieve(state["message"])
        state["category"] = category
        state["context"] = context
        return state

    async def generate_reply_node(self, state: AgentState) -> AgentState:
        history = "\n".join(
            f"{item.get('role', 'user')}: {item.get('content', '')}"
            for item in state.get("history", [])[-6:]
        )
        user_prompt = build_user_prompt(
            message=state["message"],
            context=state.get("context", ""),
            history=history,
        )
        state["final_reply"] = await self.openrouter.complete_text(
            system_prompt=PORTFOLIO_SYSTEM_PROMPT,
            user_prompt=user_prompt,
        )
        return state

    async def run(self, *, message: str, history: list[dict[str, str]]) -> AgentState:
        result = await self.graph.ainvoke({"message": message, "history": history})
        return result

    @staticmethod
    def _detect_language(message: str) -> str:
        return "ar" if any("\u0600" <= char <= "\u06ff" for char in message) else "en"

    @staticmethod
    def _is_identity_question(message: str) -> bool:
        lowered = message.lower()
        return any(
            phrase in lowered
            for phrase in (
                "who are you",
                "what are you",
                "your identity",
                "من انت",
                "من أنت",
                "وش انت",
                "مين انت",
            )
        )

    @staticmethod
    def _is_pricing_question(message: str) -> bool:
        lowered = message.lower()
        return any(
            term in lowered
            for term in (
                "price",
                "pricing",
                "cost",
                "rate",
                "budget",
                "quote",
                "سعر",
                "اسعار",
                "أسعار",
                "تكلفة",
                "كم تاخذ",
                "بكم",
            )
        )

    @staticmethod
    def _looks_out_of_scope(message: str) -> bool:
        lowered = message.lower()
        profile_terms = (
            "osama",
            "أسامة",
            "اسامة",
            "cv",
            "resume",
            "portfolio",
            "خبرات",
            "خبرته",
            "مشاريعه",
            "مهاراته",
            "تعليمه",
        )
        if any(term in lowered for term in profile_terms):
            return False
        out_of_scope_terms = (
            "weather",
            "news",
            "recipe",
            "joke",
            "write code",
            "debug",
            "ما الطقس",
            "الطقس",
            "طقس",
            "نكتة",
            "اكتب كود",
            "كود",
            "بايثون",
            "صلح",
        )
        return any(term in lowered for term in out_of_scope_terms)
