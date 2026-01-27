"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchPopularMovies, fetchNowPlayingMovies, fetchTopRatedMovies, getPosterUrl } from "@/lib/tmdb";

// Number of movies per slider
const MOVIES_PER_SLIDER = 10;

interface MoviePoster {
  poster_path: string | null;
  id: number;
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
          <div key={`${movie.id || 'placeholder'}-${index}`} className="relative group flex-shrink-0">
            {movie.poster_path ? (
              <div className="relative w-[calc((100vw-4rem)/4-0.5rem)] md:w-[calc((100vw-10rem)/10-0.75rem)] lg:w-[calc(1450px/10-2.5rem)] max-w-[130px] aspect-[2/3] overflow-hidden rounded-lg md:rounded-xl">
                <Image
                  src={getPosterUrl(movie.poster_path)}
                  alt="Movie poster"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 90px, 130px"
                />
              </div>
            ) : (
              <div className="relative w-[calc((100vw-4rem)/4-0.5rem)] md:w-[calc((100vw-10rem)/10-0.75rem)] lg:w-[calc(1450px/10-2.5rem)] max-w-[130px] aspect-[2/3] bg-gray-800 rounded-lg md:rounded-xl" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const [slider1Movies, setSlider1Movies] = useState<MoviePoster[]>([]);
  const [slider2Movies, setSlider2Movies] = useState<MoviePoster[]>([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        // Fetch multiple pages to ensure we have enough movies with posters
        const [popular1, popular2, nowPlaying1, nowPlaying2, topRated1, topRated2] = await Promise.all([
          fetchPopularMovies(1),
          fetchPopularMovies(2),
          fetchNowPlayingMovies(1),
          fetchNowPlayingMovies(2),
          fetchTopRatedMovies(1),
          fetchTopRatedMovies(2),
        ]);

        // Combine and filter movies that have posters
        const allPopular = [...popular1, ...popular2];
        const allNowPlaying = [...nowPlaying1, ...nowPlaying2];
        const allTopRated = [...topRated1, ...topRated2];

        // Get first slider movies from popular
        const popularWithPosters = allPopular
          .filter(m => m.poster_path)
          .slice(0, MOVIES_PER_SLIDER)
          .map(m => ({ poster_path: m.poster_path, id: m.id }));
        
        // Get IDs from first slider to avoid duplicates
        const slider1Ids = new Set(popularWithPosters.map(m => m.id));
        
        // Combine now playing and top rated, excluding movies from slider 1
        const combinedForSlider2 = [...allNowPlaying, ...allTopRated]
          .filter(m => m.poster_path && !slider1Ids.has(m.id))
          .slice(0, MOVIES_PER_SLIDER)
          .map(m => ({ poster_path: m.poster_path, id: m.id }));

        console.log('Slider 1 movies loaded:', popularWithPosters.length);
        console.log('Slider 2 movies loaded:', combinedForSlider2.length);

        // Set movies for each slider
        setSlider1Movies(popularWithPosters);
        setSlider2Movies(combinedForSlider2);
      } catch (error) {
        console.error('Failed to load movies for hero section:', error);
        // Fallback to empty arrays
        setSlider1Movies([]);
        setSlider2Movies([]);
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
          </div>
        </div>
      </div>
    </section>
  );
}
