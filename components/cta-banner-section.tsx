"use client";

import { motion } from "motion/react";

export function CTABannerSection() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary rounded-3xl md:rounded-[3rem] p-8 md:p-12 lg:p-16 text-center"
        >
          {/* "OUR OFFER" label */}
          <p className="text-white/90 text-sm md:text-base font-medium uppercase tracking-wider mb-4 md:mb-6">
            OUR OFFER
          </p>

          {/* Main headline */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight max-w-5xl mx-auto">
            Start Your Free Trial Today And Explore The Endless Entertainment Possibilities With
            <span className="text-white"> HeroLiveTV</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
