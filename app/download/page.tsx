"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Download,
} from "lucide-react";

const downloadPlatforms = [
  {
    name: "iOS",
    image: "/images/downloads/ios.png",
    description: "iPhone & iPad",
    url: "https://apps.apple.com/ca/app/golive-player/id1434968108",
    label: "App Store",
  },
  {
    name: "Android",
    image: "/images/downloads/android.png",
    description: "Mobiles & Tablets",
    url: "https://bit.ly/golivepron",
    label: "Download APK",
  },
  {
    name: "Android TV",
    image: "/images/downloads/android-tv.png",
    description: "Smart TVs & Boxes",
    url: "https://bit.ly/golivepron",
    label: "Download APK",
  },
  {
    name: "Windows",
    image: "/images/downloads/windows.png",
    description: "Desktop & Laptop",
    url: "https://apps.microsoft.com/detail/9nrp2lhsh4mf?hl=en-US&gl=IN",
    label: "Microsoft Store",
  },
  {
    name: "Firestick",
    image: "/images/downloads/firestick.png",
    description: "Amazon Fire Stick",
    url: "https://bit.ly/golivepron",
    label: "Download APK",
  },
  {
    name: "STB",
    image: "/images/downloads/stb.png",
    description: "Set-Top Box",
    url: "/stb.apk",
    label: "Download APK",
  },
];

export default function DownloadPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-20 md:py-[160px] max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-5">
            Download
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Choose Your <span className="text-primary">Platform</span>
          </h2>
        </motion.div>

        {/* Download Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {downloadPlatforms.map((platform, index) => {
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white border border-gray-100 p-8 hover:border-primary/20 transition-all duration-300 rounded-2xl md:rounded-3xl hover:shadow-2xl group flex flex-col"
              >
                <div className="flex flex-col items-center text-center flex-grow">
                  {/* Platform Image */}
                  <div className="w-full aspect-square mb-6 relative overflow-hidden rounded-2xl transform group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={platform.image}
                      alt={platform.name}
                      fill
                      className="object-contain p-2"
                      priority={index < 3}
                    />
                  </div>

                  {/* Platform Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {platform.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-8">
                    {platform.description}
                  </p>
                </div>

                {/* Download Button - Fixed to bottom */}
                <Button
                  asChild
                  className="w-full bg-gray-900 hover:bg-primary text-white py-6 text-base font-semibold transition-colors duration-200 flex items-center justify-center gap-2 rounded-xl cursor-pointer"
                >
                  <a
                    href={platform.url}
                    download={platform.name === "STB" ? "stb.apk" : undefined}
                    target={platform.url.startsWith("http") ? "_blank" : undefined}
                    rel={platform.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <Download className="w-5 h-5" />
                    {platform.label}
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
