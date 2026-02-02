"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-white mb-6">Page Not Found</h2>
                <p className="text-gray-400 mb-10 text-lg">
                    Oops! The page you are looking for doesn't exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        asChild
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 rounded-2xl text-base font-semibold transition-all duration-300"
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            Go Home
                        </Link>
                    </Button>
                    <Button
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-2xl text-base font-semibold transition-all duration-300"
                        onClick={() => window.history.back()}
                    >
                        <span className="flex items-center gap-2">
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
