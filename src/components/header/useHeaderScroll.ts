'use client';

import { useState, useEffect } from 'react';

export function useHeaderScroll(selectorQuery = '.hero-profile-selector-wrap', fallbackThreshold = 220) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const targetEl = document.querySelector(selectorQuery) as HTMLElement | null;
      let threshold = fallbackThreshold;

      if (targetEl) {
        // Obtenemos la posición vertical del selector "SOY: Matriculado..."
        const rect = targetEl.getBoundingClientRect();
        const headerEl = document.querySelector('.vanguard-header') as HTMLElement | null;
        const headerHeight = headerEl ? headerEl.offsetHeight : 80;
        // La franja superior desaparece exactamente cuando "SOY:" llega a la altura del navbar
        const absoluteTop = y + rect.top;
        threshold = Math.max(120, absoluteTop - headerHeight);
      }

      setIsScrolled(y >= threshold);
      setIsPastHero(y > 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [selectorQuery, fallbackThreshold]);

  return { isScrolled, isPastHero };
}
