import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        sampleen: "Sample English Text",
        recentnewz: "Recent News",
        refresh: "Refresh",
      },
    },
    bg: {
      translation: {
        sampleen: "Sample Bulgarian Text",
        recentnewz: "Последните новини",
        refresh: "Опресняване",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
