import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const toggle = () => {
    i18n.changeLanguage(isAr ? "en" : "ar");
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
      aria-label="Switch language"
    >
      <Globe size={14} />
      <span>{isAr ? "EN" : "عربي"}</span>
    </motion.button>
  );
};

export default LanguageSwitcher;
