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
  "value.heading": { en: "Why fresh matters", hi: "ताज़ा क्यों ज़रूरी है" },
  "value.subheading": {
    en: "Supermarket mushrooms sit for days. Ours go from farm to your kitchen in under 24 hours.",
    hi: "सुपरमार्केट में मशरूम दिनों तक पड़े रहते हैं। हमारे मशरूम 24 घंटे में फार्म से आपकी रसोई तक पहुँचते हैं।",
  },
  "value.sameDay": { en: "Same-Day Harvested", hi: "उसी दिन तुड़ाई" },
  "value.sameDayDesc": {
    en: "No cold storage. Picked the same morning your order comes in. Maximum freshness guaranteed.",
    hi: "कोल्ड स्टोरेज नहीं। आपका ऑर्डर आते ही उसी सुबह तोड़े जाते हैं। अधिकतम ताज़गी की गारंटी।",
  },
  "value.pesticide": { en: "Pesticide-Free", hi: "कीटनाशक-मुक्त" },
  "value.pesticideDesc": {
    en: "Grown on natural substrates without any chemicals. Safe for your family, safe for the planet.",
    hi: "प्राकृतिक सब्सट्रेट पर बिना किसी रसायन के उगाए गए। आपके परिवार के लिए सुरक्षित।",
  },
  "value.delivery": { en: "Farm-to-Fork in 24hrs", hi: "24 घंटे में फार्म से थाली तक" },
  "value.deliveryDesc": {
    en: "Free delivery across India on orders above ₹5,000. Same-day harvest, next-day delivery.",
    hi: "₹5,000 से ऊपर के ऑर्डर पर पूरे भारत में मुफ्त डिलीवरी। उसी दिन तुड़ाई, अगले दिन डिलीवरी।",
  },
  "value.packaging": { en: "Compostable Packaging", hi: "कम्पोस्टेबल पैकेजिंग" },
  "value.packagingDesc": {
    en: "We use eco-friendly, fully compostable packaging. No plastic touches your mushrooms.",
    hi: "हम इको-फ्रेंडली, पूरी तरह कम्पोस्टेबल पैकेजिंग का उपयोग करते हैं। कोई प्लास्टिक नहीं।",
  },

  // Featured Products
  "featured.heading": { en: "This week's harvest", hi: "इस हफ्ते की फसल" },
  "featured.subheading": { en: "Fresh picks, limited quantities.", hi: "ताज़ा चुनाव, सीमित मात्रा।" },
  "featured.viewAll": { en: "View all →", hi: "सभी देखें →" },
  "featured.viewAllMobile": { en: "View all mushrooms", hi: "सभी मशरूम देखें" },

  // Products
  "product.addToCart": { en: "Add to cart", hi: "कार्ट में जोड़ें" },
  "product.outOfStock": { en: "Out of Stock", hi: "स्टॉक में नहीं" },
  "product.wholesale": { en: "Wholesale", hi: "थोक" },
  "product.backToShop": { en: "Back to shop", hi: "दुकान पर वापस" },
  "product.healthBenefits": { en: "Health Benefits", hi: "स्वास्थ्य लाभ" },
  "product.youMightLike": { en: "You might also like", hi: "आपको ये भी पसंद आ सकते हैं" },
  "product.youMightAlsoLike": { en: "You might also like", hi: "आपको ये भी पसंद आ सकते हैं" },
  "product.outOfStockMsg": { en: "Currently out of stock. WhatsApp us to get notified when it's back.", hi: "फिलहाल स्टॉक में नहीं है। वापस आने पर सूचना के लिए WhatsApp करें।" },
  "product.bulkOrders": { en: "bulk orders", hi: "थोक ऑर्डर" },
  "product.freeDeliveryAbove": { en: "Free delivery on orders above", hi: "इससे ऊपर के ऑर्डर पर मुफ्त डिलीवरी" },
  "product.otherwiseCharge": { en: "Otherwise delivery charge", hi: "अन्यथा डिलीवरी चार्ज" },
  "product.deliveringTo": { en: "Delivering to", hi: "डिलीवरी क्षेत्र" },

  // Cart
  "cart.title": { en: "Your Cart", hi: "आपका कार्ट" },
  "cart.empty": { en: "Your cart is empty", hi: "आपका कार्ट खाली है" },
  "cart.browse": { en: "Browse products", hi: "प्रोडक्ट देखें" },
  "cart.subtotal": { en: "Subtotal", hi: "उप-कुल" },
  "cart.delivery": { en: "Delivery", hi: "डिलीवरी" },
  "cart.free": { en: "FREE", hi: "मुफ्त" },
  "cart.total": { en: "Total", hi: "कुल" },
  "cart.proceedToOrder": { en: "Proceed to order", hi: "ऑर्डर करें" },
  "cart.continueShopping": { en: "Continue shopping", hi: "खरीदारी जारी रखें" },
  "cart.nothingYet": { en: "Nothing here yet.", hi: "अभी कुछ नहीं है।" },
  "cart.startShopping": { en: "Start shopping", hi: "खरीदारी शुरू करें" },
  "cart.yourCart": { en: "Your cart", hi: "आपका कार्ट" },

  // Checkout
  "checkout.title": { en: "Checkout", hi: "चेकआउट" },
  "checkout.emptyMsg": { en: "Your cart is empty. Add some products first!", hi: "आपका कार्ट खाली है। पहले कुछ प्रोडक्ट जोड़ें!" },
  "checkout.subtitle": { en: "Fill in your details and we'll confirm your order via WhatsApp.", hi: "अपनी जानकारी भरें और हम WhatsApp से आपके ऑर्डर की पुष्टि करेंगे।" },
  "checkout.name": { en: "Full Name", hi: "पूरा नाम" },
  "checkout.phone": { en: "Phone (WhatsApp)", hi: "फ़ोन (WhatsApp)" },
  "checkout.email": { en: "Email (optional)", hi: "ईमेल (वैकल्पिक)" },
  "checkout.address": { en: "Delivery Address", hi: "डिलीवरी पता" },
  "checkout.city": { en: "City", hi: "शहर" },
  "checkout.selectCity": { en: "Select city", hi: "शहर चुनें" },
  "checkout.pincode": { en: "Pincode", hi: "पिनकोड" },
  "checkout.notes": { en: "Order Notes (optional)", hi: "ऑर्डर नोट्स (वैकल्पिक)" },
  "checkout.howItWorks": {
    en: "After submitting, your order summary will be sent to us via WhatsApp. We'll confirm availability, delivery time, and payment details. Payment: UPI or Cash on Delivery.",
    hi: "सबमिट करने के बाद, आपका ऑर्डर WhatsApp पर भेजा जाएगा। हम उपलब्धता, डिलीवरी समय, और भुगतान की पुष्टि करेंगे। भुगतान: UPI या कैश ऑन डिलीवरी।",
  },
  "checkout.placeOrder": { en: "Place Order via WhatsApp", hi: "WhatsApp से ऑर्डर करें" },
  "checkout.orderSummary": { en: "Order Summary", hi: "ऑर्डर सारांश" },
  "checkout.payment": { en: "Payment: UPI / Cash on Delivery", hi: "भुगतान: UPI / कैश ऑन डिलीवरी" },

  // Learn section
  "learn.heading": { en: "Recipes & Health Tips", hi: "रेसिपी और स्वास्थ्य टिप्स" },
  "learn.subheading": {
    en: "Indian recipes, health benefits, and everything you need to make mushrooms a part of your daily diet.",
    hi: "भारतीय रेसिपी, स्वास्थ्य लाभ, और मशरूम को अपने दैनिक आहार का हिस्सा बनाने के लिए सब कुछ।",
  },
  "learn.label": { en: "Learn", hi: "सीखें" },

  // Footer
  "footer.description": {
    en: "Farm-fresh mushrooms, harvested same-day and delivered within 24 hours. Pesticide-free. Compostable packaging.",
    hi: "ताज़ा मशरूम, उसी दिन तोड़े गए और 24 घंटे में डिलीवर किए गए। कीटनाशक-मुक्त। कम्पोस्टेबल पैकेजिंग।",
  },
  "footer.shop": { en: "Shop", hi: "दुकान" },
  "footer.learn": { en: "Learn", hi: "सीखें" },
  "footer.company": { en: "Company", hi: "कंपनी" },
  "footer.allProducts": { en: "All Products", hi: "सभी प्रोडक्ट" },
  "footer.freshMushrooms": { en: "Fresh Mushrooms", hi: "ताज़ा मशरूम" },
  "footer.wellness": { en: "Wellness", hi: "वेलनेस" },
  "footer.wholesale": { en: "Wholesale", hi: "थोक" },
  "footer.recipes": { en: "Recipes", hi: "रेसिपी" },
  "footer.healthBenefits": { en: "Health Benefits", hi: "स्वास्थ्य लाभ" },
  "footer.ourStory": { en: "Our Story", hi: "हमारी कहानी" },
  "footer.contact": { en: "Contact", hi: "संपर्क" },
  "footer.copyright": { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" },
  "footer.delivering": { en: "Delivering across India", hi: "पूरे भारत में डिलीवरी" },

  // Shop page
  "shop.inStockOnly": { en: "In stock only", hi: "केवल स्टॉक में" },
  "shop.noProducts": {
    en: "No products match those filters. Try adjusting your selection.",
    hi: "कोई प्रोडक्ट इन फ़िल्टर से मेल नहीं खाता। अपना चयन बदलें।",
  },

  // Contact
  "contact.name": { en: "Name", hi: "नाम" },
  "contact.email": { en: "Email", hi: "ईमेल" },
  "contact.subject": { en: "Subject", hi: "विषय" },
  "contact.message": { en: "Message", hi: "संदेश" },
  "contact.send": { en: "Send message", hi: "संदेश भेजें" },
  "contact.sent": { en: "Message sent!", hi: "संदेश भेजा गया!" },
  "contact.sentDesc": {
    en: "We'll get back to you within 24 hours.",
    hi: "हम 24 घंटे में आपसे संपर्क करेंगे।",
  },

  // Wholesale
  "wholesale.businessName": { en: "Business Name", hi: "व्यवसाय का नाम" },
  "wholesale.contactPerson": { en: "Contact Person", hi: "संपर्क व्यक्ति" },
  "wholesale.phone": { en: "WhatsApp Number", hi: "WhatsApp नंबर" },
  "wholesale.city": { en: "City", hi: "शहर" },
  "wholesale.quantity": { en: "Estimated Quantity (kg/week)", hi: "अनुमानित मात्रा (किलो/सप्ताह)" },
  "wholesale.frequency": { en: "Delivery Frequency", hi: "डिलीवरी आवृत्ति" },
  "wholesale.notes": { en: "Additional Notes", hi: "अतिरिक्त नोट्स" },
  "wholesale.submit": { en: "Send enquiry via WhatsApp", hi: "WhatsApp पर पूछताछ भेजें" },
  "wholesale.select": { en: "Select", hi: "चुनें" },
  "wholesale.daily": { en: "Daily", hi: "दैनिक" },
  "wholesale.thrice": { en: "3 times/week", hi: "सप्ताह में 3 बार" },
  "wholesale.weekly": { en: "Weekly", hi: "साप्ताहिक" },
  "wholesale.biweekly": { en: "Bi-weekly", hi: "पाक्षिक" },

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
