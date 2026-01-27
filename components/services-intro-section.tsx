"use client";

import { motion } from "motion/react";

export function ServicesIntroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="bg-gray-50 rounded-3xl md:rounded-[3rem] p-8 md:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
          {/* Subheading */}
          <p className="text-gray-600 text-sm md:text-base font-semibold uppercase tracking-wider mb-4">
            ONLY ENTERTAINMENT!!
          </p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
            Comprehensive <span className="text-primary">Entertainment</span> at Your Fingertips
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            At HeroLiveTV, we've designed our services to provide you with the ultimate entertainment experience. 
            From an extensive library of movies and series to seamless multi-device streaming, we ensure that 
            your entertainment needs are met with quality, convenience, and affordability. Discover what makes 
            HeroLiveTV the perfect choice for your streaming needs.
          </p>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
