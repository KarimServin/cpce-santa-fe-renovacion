'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Indica si la página ya bajó lo suficiente como para compactar el encabezado (la barra
 * azul sale por arriba y la blanca se achica). El encabezado es fijo y tiene un espaciador
 * de alto constante, así que compactarlo no mueve el contenido.
 *
 * Usa dos umbrales (histéresis): se compacta recién después de bajar `enter` px y vuelve al
 * tamaño completo al subir por encima de `exit` px. Así no "parpadea" con scrolls cortos
 * cerca del borde superior.
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
