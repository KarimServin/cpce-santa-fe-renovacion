'use client';

import React from 'react';

// Logo positivo del sistema de diseño (735 × 215, mismas proporciones que en Figma: 286 × 84).
// Incluye tamaños intermedios (1,25x y 1,5x) para pantallas de Windows con escala del 125 % o 150 %
const LOGO_WIDTHS = [137, 171, 206, 219, 274, 287, 329, 359, 411, 431, 438, 574];
const LOGO_SRCSET = [
  ...LOGO_WIDTHS.map((w) => `/images/logo-cpce-positivo-${w}.png ${w}w`),
  '/images/logo-cpce-positivo.png 735w',
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
        El logo mide 735 px y se muestra a 137–287 px: si el navegador lo reduce mucho las letras
        quedan blandas. Por eso hay versiones remuestreadas (Lanczos) a cada tamaño de pantalla
        (1x, 1,25x, 1,5x y 2x) y el navegador elige la más cercana al tamaño real; las medidas de
        `sizes` deben coincidir con las alturas definidas en header.css (84 / 64 / 56 / 40 px).
      */}
      <img
        src="/images/logo-cpce-positivo.png"
        srcSet={LOGO_SRCSET}
        sizes="(min-width: 1024px) and (max-height: 900px) 219px, (min-width: 1024px) 287px, (min-width: 861px) 219px, (min-width: 641px) 191px, 137px"
        alt="Consejo Profesional de Ciencias Económicas de la Provincia de Santa Fe · Cámara I"
        className="vanguard-brand-logo"
        width="735"
        height="215"
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
