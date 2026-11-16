'use client';

import { useState, useEffect } from 'react';

/**
 * Indica si la página ya bajó lo suficiente como para compactar el encabezado (la barra
 * azul sale por arriba y la blanca se achica). El encabezado es fijo y tiene un espaciador
 * de alto constante, así que compactarlo no mueve el contenido ni provoca rebotes del scroll.
 */
export function useHeaderScroll(threshold = 44) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { isScrolled };
}
