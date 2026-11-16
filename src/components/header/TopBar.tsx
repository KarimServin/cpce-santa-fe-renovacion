'use client';

import React from 'react';

interface TopBarProps {
  onHowToRegister: () => void;
  onStudent: () => void;
}

interface SocialLink {
  label: string;
  /** Si está vacío el ícono no se muestra (falta la URL de la cuenta). */
  href: string;
  /** Ícono blanco de 16 px exportado de Figma ("Red social"). */
  icon: string;
}

// Orden del diseño (Figma · "Redes sociales"): Instagram, Facebook, X, YouTube
const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/cpcesfe1', icon: '/images/header/red-instagram.svg' },
  { label: 'Facebook', href: 'https://www.facebook.com/cpcesfe1', icon: '/images/header/red-facebook.svg' },
  // TODO: completar con la URL de la cuenta de X del Consejo para que aparezca el ícono.
  { label: 'X', href: '', icon: '/images/header/red-x.svg' },
  { label: 'YouTube', href: 'https://www.youtube.com/@cpcesfe1', icon: '/images/header/red-youtube.svg' },
];

/**
 * Barra superior del encabezado (Figma · "Barra superior"): accesos "¿Cómo matricularte?" y
 * "¿Sos estudiante?" a la izquierda, redes sociales centradas y "Software profesional" a la
 * derecha. No es sticky: se desplaza con la página y queda solo la barra principal fija.
 */
export function TopBar({ onHowToRegister, onStudent }: TopBarProps) {
  return (
    <div className="vanguard-topbar">
      <div className="vanguard-topbar-inner">
        <div className="vanguard-topbar-left">
          <button type="button" className="vanguard-topbar-link" onClick={onHowToRegister}>
            ¿Cómo matricularte?
          </button>
          <span className="vanguard-topbar-divider" aria-hidden="true" />
          <button type="button" className="vanguard-topbar-link" onClick={onStudent}>
            ¿Sos estudiante?
          </button>
        </div>

        <ul className="vanguard-topbar-social" aria-label="Redes sociales del Consejo">
          {SOCIAL_LINKS.filter((social) => social.href).map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="vanguard-topbar-social-link"
                aria-label={social.label}
                title={social.label}
              >
                <img src={social.icon} alt="" width={16} height={16} />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://ssp.contadores.org.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="vanguard-topbar-cta"
          aria-label="Software profesional"
        >
          {/* En mobile se muestra la versión corta para que entren los dos accesos de la izquierda */}
          <span className="vanguard-topbar-cta-full">Software profesional</span>
          <span className="vanguard-topbar-cta-short" aria-hidden="true">
            Software
          </span>
        </a>
      </div>
    </div>
  );
}
