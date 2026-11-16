'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Indica si la página ya bajó. En desktop el encabezado queda fijo arriba y, con la página
 * bajada, muestra una sombra suave que lo separa del contenido (no cambia de tamaño).
 *
 * Usa dos umbrales (histéresis) para no "parpadear" con scrolls cortos cerca del borde
 * superior: se activa después de bajar `enter` px y se desactiva al subir por encima de `exit`.
 */
export function useHeaderScroll(enter = 120, exit = 40) {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const next = scrolledRef.current ? y > exit : y > enter;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setIsScrolled(next);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enter, exit]);

  return { isScrolled };
}
