'use client';
import React, { ReactNode, useEffect, useRef } from 'react';

interface HeroBandProps {
  children: ReactNode;
}

/**
 * Fondo del héroe según Figma (CPCE1_Web_Fase2 · "Héroe · Sin márgenes"), a todo el ancho:
 * video aéreo de la ciudad en bucle, sin sonido, con la "Capa de color" (gris 900 al 20 %)
 * encima para que el título blanco se lea. Mientras carga, o si el video no puede
 * reproducirse, se ve la imagen de portada (un cuadro del mismo video).
 */
export default function HeroBand({ children }: HeroBandProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Con "reducir movimiento" activado en el sistema, el video queda quieto en la portada
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (query.matches) {
        video.pause();
      } else {
        video.play().catch(() => {
          /* Sin autoplay (p. ej. modo ahorro de energía): queda la portada */
        });
      }
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  return (
    <div className="hero-band">
      <div className="hero-band-media" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-band-video"
          poster="/videos/hero-ciudad-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        >
          <source src="/videos/hero-ciudad.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-band-tint" aria-hidden="true" />

      <div className="hero-content-wrap">{children}</div>
    </div>
  );
}
