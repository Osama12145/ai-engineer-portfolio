import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-6 text-center">
        <p className="text-xs text-muted-foreground">
          {t("footer.text")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
