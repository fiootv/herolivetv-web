import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.herolivetv.com";

export const metadata: Metadata = {
  title: "Contact Us – HeroLiveTV | Get Support & Help",
  description: "Contact HeroLiveTV support team. Email us at support@herolivetv.com or call +1-716-800-3757. Get help with setup, billing, technical issues, or general inquiries. We're here to help!",
  keywords: ["HeroLiveTV contact", "IPTV support", "customer service", "HeroLiveTV help", "contact IPTV provider", "streaming support"],
  openGraph: {
    title: "Contact Us – HeroLiveTV | Get Support & Help",
    description: "Contact HeroLiveTV support team. Email us at support@herolivetv.com or call +1-716-800-3757. Get help with setup, billing, or technical issues.",
    url: `${defaultUrl}/contact`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Contact HeroLiveTV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us – HeroLiveTV | Get Support & Help",
    description: "Contact HeroLiveTV support team. Email us at support@herolivetv.com or call +1-716-800-3757.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
