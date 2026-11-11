'use client';

import React from 'react';

// Incluye tamaños intermedios (1,25x y 1,5x) para pantallas de Windows con escala del 125 % o 150 %
const LOGO_WIDTHS = [141, 176, 212, 220, 247, 265, 282, 309, 318, 352, 371, 423, 493, 741];
const LOGO_SRCSET = [
  ...LOGO_WIDTHS.map((w) => `/images/logo-cpce-camara-1-${w}.png ${w}w`),
  '/images/logo-cpce-camara-1.png 1024w',
].join(', ');

const EMBLEM_WIDTHS = [44, 87, 130];
const EMBLEM_SRCSET = [
  ...EMBLEM_WIDTHS.map((w) => `/images/isologo-cpce-emblem-${w}.png ${w}w`),
  '/images/isologo-cpce-emblem.png 481w',
].join(', ');

/**
 * Logo institucional del navbar.
 * Muestra el logo original completo (emblema + denominación + Cámara I) y, en pantallas
 * muy angostas, solo el emblema. No cambia según la categoría del menú desplegable.
 */
export function InstitutionalBrand() {
  return (
    <a
      href="/"
      className="vanguard-brand"
      aria-label="Consejo Profesional de Ciencias Económicas de la Provincia de Santa Fe · Cámara I"
    >
      {/*
        El logo original mide 1024 px y se muestra a 141–247 px: si el navegador lo reduce 4x las
        letras quedan blandas. Por eso hay versiones remuestreadas (Lanczos) a cada tamaño de
        pantalla (1x, 2x y 3x) y el navegador elige la más cercana al tamaño real; las medidas
        de `sizes` deben coincidir con las alturas definidas en header.css.
      */}
      <img
        src="/images/logo-cpce-camara-1.png"
        srcSet={LOGO_SRCSET}
        sizes="(min-width: 1100px) 247px, (min-width: 641px) 176px, 141px"
        alt="Consejo Profesional de Ciencias Económicas de la Provincia de Santa Fe · Cámara I"
        className="vanguard-brand-logo"
        width="1024"
        height="291"
        fetchPriority="high"
      />
      <img
        src="/images/isologo-cpce-emblem.png"
        srcSet={EMBLEM_SRCSET}
        sizes="44px"
        alt=""
        aria-hidden="true"
        className="vanguard-brand-emblem-only"
        width="50"
        height="46"
      />
    </a>
  );
}
