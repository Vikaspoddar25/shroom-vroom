import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { LangProvider } from "@/lib/lang";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shroom Vroom — Fresh Mushrooms, Delivered in 24hrs | Rajasthan",
    template: "%s | Shroom Vroom",
  },
  description:
    "Farm-fresh, pesticide-free oyster mushrooms & cordyceps powder delivered within 24 hours across India. Farm in Kishangarh, Rajasthan.",
  metadataBase: new URL("https://shroom-vroom.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Shroom Vroom",
    title: "Shroom Vroom — Fresh Mushrooms, Delivered in 24hrs",
    description:
      "Pesticide-free oyster mushrooms & cordyceps from our farm in Kishangarh, Rajasthan. Free delivery across India above ₹5,000.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shroom Vroom — Fresh Mushrooms, Delivered in 24hrs",
    description:
      "Pesticide-free oyster mushrooms & cordyceps from our farm in Kishangarh, Rajasthan.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans">
        <LangProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
        </LangProvider>

        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Shroom Vroom",
              url: "https://shroomvroom.com",
              logo: "https://shroomvroom.com/logo.svg",
              description:
                "Farm-fresh gourmet and exotic mushrooms delivered to your door. Same-day delivery available.",
              address: {
                "@type": "PostalAddress",
                addressRegion: "OR",
                addressCountry: "US",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
