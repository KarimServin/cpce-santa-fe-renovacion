'use client';
import React, { ReactNode } from 'react';
import Image from 'next/image';

interface HeroBandProps {
  children: ReactNode;
}

export default function HeroBand({ children }: HeroBandProps) {
  return (
    <div className="hero-aurora-bg">
      {/* Manchas aurora — aria-hidden, pointer-events none */}
      <div className="aurora-blob aurora-blob--top-left" aria-hidden="true" />
      <div className="aurora-blob aurora-blob--1" aria-hidden="true" />
      <div className="aurora-blob aurora-blob--2" aria-hidden="true" />
      <div className="aurora-blob aurora-blob--3" aria-hidden="true" />
      <div className="aurora-blob aurora-blob--4" aria-hidden="true" />

      {/* Foto institucional anclada a la derecha fundida suavemente con el fondo */}
      <div className="hero-bg-photo-fade" aria-hidden="true">
        <Image
          src="/images/sede-cpce-hero.jpg"
          alt="Sede Central CPCE Santa Fe"
          fill
          priority
          className="hero-bg-photo-img"
          sizes="(max-width: 1024px) 100vw, 65vw"
        />
        <div className="hero-bg-photo-overlay" />
      </div>

      <div className="hero-content-wrap">
        {children}
      </div>
    </div>
  );
}
