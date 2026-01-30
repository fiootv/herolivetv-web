import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.herolivetv.com";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "HeroLiveTV - Best IPTV Service Provider | 4000+ Live Channels | $12.50/Month",
  description: "HeroLiveTV offers 4000+ live TV channels from around the world. Watch unlimited entertainment on TV, smartphones, laptops, and handheld devices. Starting at $12.50/month. Cut the cable and save!",
  keywords: ["IPTV", "TV service", "streaming", "live TV", "cable alternative", "HeroLiveTV", "IPTV service provider", "streaming service"],
  authors: [{ name: "HeroLiveTV" }],
  creator: "HeroLiveTV",
  publisher: "HeroLiveTV",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: defaultUrl,
    siteName: "HeroLiveTV",
    title: "HeroLiveTV - Best IPTV Service Provider | 4000+ Live Channels",
    description: "HeroLiveTV offers 4000+ live TV channels from around the world. Watch unlimited entertainment on any device starting at $12.50/month.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "HeroLiveTV - Best IPTV Service Provider",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HeroLiveTV - Best IPTV Service Provider | 4000+ Live Channels",
    description: "HeroLiveTV offers 4000+ live TV channels from around the world. Watch unlimited entertainment on any device starting at $12.50/month.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: defaultUrl,
  },
};

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HeroLiveTV",
    url: defaultUrl,
    logo: `${defaultUrl}/logo.png`,
    description: "HeroLiveTV offers 4000+ live TV channels from around the world. Watch unlimited entertainment on TV, smartphones, laptops, and handheld devices.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-716-800-3757",
      contactType: "Customer Service",
      email: "support@herolivetv.com",
      availableLanguage: "English",
    },
    sameAs: [
      // Add social media URLs when available
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "IPTV Streaming Service",
    provider: {
      "@type": "Organization",
      name: "HeroLiveTV",
    },
    areaServed: "Worldwide",
    description: "Premium IPTV streaming service with 4000+ live TV channels, 28K+ movies, 6K+ series, and on-demand content.",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "39.00",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "39.00",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
  };

  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} font-poppins antialiased bg-black text-white`}>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/5e04a5d67e39ea1242a1dd46/default';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
