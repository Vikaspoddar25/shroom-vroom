"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "hi";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

export const translations: Record<string, Record<Lang, string>> = {
  // Navigation
  "nav.shop": { en: "Shop", hi: "दुकान" },
  "nav.wholesale": { en: "Wholesale", hi: "थोक" },
  "nav.ourStory": { en: "Our Story", hi: "हमारी कहानी" },
  "nav.learn": { en: "Learn", hi: "सीखें" },
  "nav.contact": { en: "Contact", hi: "संपर्क" },

  // Hero
  "hero.title1": { en: "Farm-fresh", hi: "ताज़ा" },
  "hero.title2": { en: "mushrooms,", hi: "मशरूम," },
  "hero.title3": { en: "delivered", hi: "डिलीवरी" },
  "hero.title4": { en: "in 24hrs.", hi: "24 घंटे में।" },
  "hero.subtitle": {
    en: "Pesticide-free, same-day harvested oyster mushrooms & cordyceps from our farm in Kishangarh. Delivering across India.",
    hi: "कीटनाशक-मुक्त, उसी दिन तोड़े गए ऑयस्टर मशरूम और कॉर्डिसेप्स — किशनगढ़ के हमारे फार्म से। पूरे भारत में डिलीवरी।",
  },
  "hero.orderNow": { en: "Order now", hi: "अभी ऑर्डर करें" },
  "hero.whatsapp": { en: "WhatsApp us", hi: "WhatsApp करें" },

  // Value Props
  "value.sameDay": { en: "Same-Day Harvest", hi: "उसी दिन तुड़ाई" },
  "value.sameDayDesc": {
    en: "Your mushrooms are harvested the same morning you order. No cold storage, ever.",
    hi: "आपके मशरूम उसी सुबह तोड़े जाते हैं जब आप ऑर्डर करते हैं। कोल्ड स्टोरेज कभी नहीं।",
  },
  "value.delivery": { en: "Farm-to-Fork in 24hrs", hi: "24 घंटे में फार्म से आपकी थाली तक" },
  "value.deliveryDesc": {
    en: "Free delivery across India on orders above ₹5,000. Same-day harvest, next-day delivery.",
    hi: "₹5,000 से ऊपर के ऑर्डर पर पूरे भारत में मुफ्त डिलीवरी।",
  },
  "value.packaging": { en: "Compostable Packaging", hi: "कम्पोस्टेबल पैकेजिंग" },
  "value.packagingDesc": {
    en: "Eco-friendly packaging you can compost at home. Zero plastic, zero guilt.",
    hi: "घर पर कम्पोस्ट करने योग्य इको-फ्रेंडली पैकेजिंग। शून्य प्लास्टिक।",
  },

  // Products
  "product.addToCart": { en: "Add to cart", hi: "कार्ट में जोड़ें" },
  "product.outOfStock": { en: "Out of stock", hi: "स्टॉक में नहीं" },
  "product.perKg": { en: "per kg", hi: "प्रति किलो" },

  // Cart
  "cart.title": { en: "Your Cart", hi: "आपका कार्ट" },
  "cart.empty": { en: "Your cart is empty", hi: "आपका कार्ट खाली है" },
  "cart.checkout": { en: "Checkout", hi: "चेकआउट" },
  "cart.subtotal": { en: "Subtotal", hi: "कुल" },

  // Checkout
  "checkout.title": { en: "Checkout", hi: "चेकआउट" },
  "checkout.name": { en: "Full Name", hi: "पूरा नाम" },
  "checkout.phone": { en: "Phone Number", hi: "फ़ोन नंबर" },
  "checkout.address": { en: "Delivery Address", hi: "डिलीवरी पता" },
  "checkout.city": { en: "City", hi: "शहर" },
  "checkout.pincode": { en: "Pincode", hi: "पिनकोड" },
  "checkout.placeOrder": { en: "Place Order via WhatsApp", hi: "WhatsApp से ऑर्डर करें" },

  // Footer
  "footer.delivering": { en: "Delivering across India", hi: "पूरे भारत में डिलीवरी" },

  // Common
  "common.readMore": { en: "Read more", hi: "और पढ़ें" },
  "common.viewAll": { en: "View all", hi: "सभी देखें" },
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored && (stored === "en" || stored === "hi")) {
      setLangState(stored);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
