'use client';
import React, { ReactNode } from 'react';
import Image from 'next/image';

interface HeroBandProps {
  children: ReactNode;
}

/**
 * Fondo del héroe según Figma (CPCE1_Web_Fase2 · "Héroe · Sin márgenes"), a todo el ancho.
 * En el diseño el fondo es una foto aérea de la ciudad ("image 1"); hasta tener ese archivo se
 * usa la foto de la sede. Encima va la "Capa de color": gris 900 al 20 %.
 */
export default function HeroBand({ children }: HeroBandProps) {
  return (
    <div className="hero-band">
      <div className="hero-band-media" aria-hidden="true">
        <Image
          src="/images/sede-cpce-hero.jpg"
          alt=""
          fill
          priority
          className="hero-band-img"
          sizes="100vw"
        />
      </div>
      <div className="hero-band-tint" aria-hidden="true" />

      <div className="hero-content-wrap">{children}</div>
    </div>
  );
}
