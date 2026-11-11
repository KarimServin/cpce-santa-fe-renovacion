'use client';

import { useState, useEffect } from 'react';

/**
 * Indica si el navbar ya quedó fijo en el borde superior (la barra oscura superior
 * salió de pantalla). Solo se usa para cambiar sombra/fondo: nunca altera la altura
 * del header, para no provocar saltos de layout ni rebotes del scroll.
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
