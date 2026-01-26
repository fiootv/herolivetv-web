import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.herolivetv.com";

export const metadata: Metadata = {
  title: "Download HeroLiveTV App – iOS, Android, Android TV & Web Player",
  description: "Download HeroLiveTV app for iOS, Android, Android TV, and Web Player. Compatible with all devices. Simple setup, fast servers, unlimited device access. Get started today!",
  keywords: ["HeroLiveTV download", "IPTV app download", "streaming app", "Android TV app", "iOS IPTV", "IPTV player", "HeroLiveTV app"],
  openGraph: {
    title: "Download HeroLiveTV App – iOS, Android, Android TV & Web Player",
    description: "Download HeroLiveTV app for iOS, Android, Android TV, and Web Player. Compatible with all devices. Simple setup, fast servers.",
    url: `${defaultUrl}/download`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Download HeroLiveTV App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download HeroLiveTV App – iOS, Android, Android TV & Web Player",
    description: "Download HeroLiveTV app for iOS, Android, Android TV, and Web Player. Compatible with all devices.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/download`,
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
