'use client';

import React from 'react';

interface InstitutionalBrandProps {
  compact?: boolean;
}

export function InstitutionalBrand({ compact = false }: InstitutionalBrandProps) {
  if (compact) {
    return (
      <a href="/" className="vanguard-scrolled-brand" aria-label="CPCE Santa Fe">
        <img
          src="/images/isologo-cpce-emblem.png"
          alt="CPCE Emblem"
          className="vanguard-scrolled-emblem"
          width="32"
          height="28"
        />
      </a>
    );
  }

  return (
    <a href="/" className="vanguard-brand" aria-label="Consejo Profesional de Ciencias Económicas de Santa Fe">
      <img
        src="/images/isologo-cpce-emblem.png"
        alt="CPCE Santa Fe Emblem"
        className="vanguard-emblem"
        width="50"
        height="46"
      />
      <div className="vanguard-brand-text">
        <span className="vanguard-brand-serif">Consejo Profesional de Ciencias Económicas</span>
        <span className="vanguard-brand-caps">DE LA PROVINCIA DE SANTA FE · CÁMARA I</span>
      </div>
    </a>
  );
}
