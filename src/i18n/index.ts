import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const LANG_KEY = "portfolio-lang";

const savedLang = localStorage.getItem(LANG_KEY) || "en";

// Apply direction and lang attribute on load
function applyDirection(lng: string) {
  const dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
  // Toggle Arabic font class
  if (lng === "ar") {
    document.documentElement.classList.add("font-ar");
  } else {
    document.documentElement.classList.remove("font-ar");
  }
}

applyDirection(savedLang);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// Persist language choice and update direction on change
i18n.on("languageChanged", (lng) => {
  localStorage.setItem(LANG_KEY, lng);
  applyDirection(lng);
});

export default i18n;
