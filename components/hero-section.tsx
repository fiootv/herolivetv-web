"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchPopularMovies, getPosterUrl } from "@/lib/omdb";

// Number of movies per slider
const MOVIES_PER_SLIDER = 10;

interface MoviePoster {
  poster_path: string | null;
  id: number;
}

/** Poster image with fallback when load fails (broken URL, 403, etc.) */
function PosterImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className="absolute inset-0 bg-gray-800" />;
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      loading="lazy"
      sizes="(max-width: 768px) 90px, 130px"
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}

function HorizontalSlider({ 
  movies, 
  direction = "left", 
  duration = 30 
}: { 
  movies: MoviePoster[]; 
  direction?: "left" | "right"; 
  duration?: number;
}) {
  // Duplicate movies for seamless loop
  const duplicatedMovies = [...movies, ...movies, ...movies];
  
  return (
    <div className="relative w-full overflow-hidden">
      <div 
        className={`flex gap-2 md:gap-3 ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}
        style={{ 
          animationDuration: `${duration}s`,
        }}
      >
        {duplicatedMovies.map((movie, index) => (
          <div key={`${movie.id || "placeholder"}-${index}`} className="relative group flex-shrink-0">
            <div className="relative w-[calc((100vw-4rem)/4-0.5rem)] md:w-[calc((100vw-10rem)/10-0.75rem)] lg:w-[calc(1450px/10-2.5rem)] max-w-[130px] aspect-[2/3] overflow-hidden rounded-lg md:rounded-xl">
              {movie.poster_path ? (
                <PosterImage src={getPosterUrl(movie.poster_path)} alt="Movie poster" />
              ) : (
                <div className="absolute inset-0 bg-gray-800" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const [slider1Movies, setSlider1Movies] = useState<MoviePoster[]>([]);
  const [slider2Movies, setSlider2Movies] = useState<MoviePoster[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies() {
      setError(null);
      try {
        // Single pool from multiple pages so both sliders are always filled
        const [page1, page2, page3] = await Promise.all([
          fetchPopularMovies(1),
          fetchPopularMovies(2),
          fetchPopularMovies(3),
        ]);

        const seen = new Set<number>();
        const pool: MoviePoster[] = [];
        for (const m of [...page1, ...page2, ...page3]) {
          if (pool.length >= MOVIES_PER_SLIDER * 2) break;
          if (seen.has(m.id)) continue;
          seen.add(m.id);
          pool.push({ poster_path: m.poster_path, id: m.id });
        }

        setSlider1Movies(pool.slice(0, MOVIES_PER_SLIDER));
        setSlider2Movies(pool.slice(MOVIES_PER_SLIDER, MOVIES_PER_SLIDER * 2));

        if (pool.length === 0) {
          setError("Movies could not be loaded. Check that NEXT_PUBLIC_OMDB_API_KEY is set in .env.local.");
        }
      } catch (err) {
        console.error("Failed to load movies for hero section:", err);
        setSlider1Movies([]);
        setSlider2Movies([]);
        setError("Couldn't load movies. Please try again later.");
      }
    }

    loadMovies();
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-8 md:py-12">
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 max-w-[1450px]">
        <div className="bg-gray-900 rounded-3xl md:rounded-[3rem] overflow-hidden p-6 md:p-12 lg:p-16 mt-12">
          {/* Top Section - Title, Subtitle, and Button (Centered) */}
          <div className="text-white space-y-6 md:space-y-8 text-center mb-12 md:mb-16">
            <p className="text-primary text-sm md:text-base font-medium uppercase tracking-wider">
              WELCOME TO HEROLIVETV
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-semibold leading-tight">
              Your Ultimate Entertainment
              <br />
              <span className="text-primary">Destination</span>
            </h1>
            
            <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
              Enjoy movies, series, documentaries, and more - your on-demand entertainment in any language and genre.
            </p>
            
            <div className="space-y-4 pt-4">
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 lg:px-12 py-6 lg:py-8 lg:text-xl text-base font-medium transition-colors duration-200 rounded-2xl"
                >
                  Start Your Free Trial Today
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom Section - Two Horizontal Sliders */}
          <div className="space-y-6 md:space-y-8">
            {error ? (
              <div className="flex flex-col items-center justify-center min-h-[200px] text-center px-4 py-8 rounded-xl md:rounded-2xl bg-gray-800/50">
                <p className="text-red-400 font-medium mb-2">Something went wrong</p>
                <p className="text-white/70 text-sm md:text-base max-w-md">{error}</p>
              </div>
            ) : (
              <>
                {/* Slider 1 */}
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
                  <HorizontalSlider 
                    movies={slider1Movies.length > 0 ? slider1Movies : Array(MOVIES_PER_SLIDER).fill({ poster_path: null, id: 0 })} 
                    direction="left" 
                    duration={40} 
                  />
                </div>
                
                {/* Slider 2 */}
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
                  <HorizontalSlider 
                    movies={slider2Movies.length > 0 ? slider2Movies : Array(MOVIES_PER_SLIDER).fill({ poster_path: null, id: 0 })} 
                    direction="right" 
                    duration={50} 
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
