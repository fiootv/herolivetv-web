import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.herolivetv.com";

export const metadata: Metadata = {
  title: "FAQs – HeroLiveTV | Frequently Asked Questions About IPTV Service",
  description: "Find answers to common questions about HeroLiveTV IPTV service. Device compatibility, subscription plans, setup guides, troubleshooting, refund policy, and more.",
  keywords: ["HeroLiveTV FAQ", "IPTV questions", "IPTV help", "streaming FAQ", "IPTV support", "HeroLiveTV help", "IPTV troubleshooting"],
  openGraph: {
    title: "FAQs – HeroLiveTV | Frequently Asked Questions About IPTV Service",
    description: "Find answers to common questions about HeroLiveTV IPTV service. Device compatibility, subscription plans, setup guides, and troubleshooting.",
    url: `${defaultUrl}/faqs`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "HeroLiveTV FAQs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs – HeroLiveTV | Frequently Asked Questions About IPTV Service",
    description: "Find answers to common questions about HeroLiveTV IPTV service. Device compatibility, subscription plans, setup guides.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/faqs`,
  },
};

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
