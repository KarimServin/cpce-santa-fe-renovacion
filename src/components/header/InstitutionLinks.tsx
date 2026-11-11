'use client';

import React, { useId } from 'react';

interface InstitutionLinksProps {
  /** Se ejecuta al pulsar una institución que todavía no tiene URL propia (DSS). */
  onSelectWithoutLink: (label: string) => void;
}

interface Institution {
  id: 'dss' | 'caja';
  name: string;
  description: string;
  /** Logo oficial del micrositio. `srcSet`/`sizes` son opcionales (versiones remuestreadas). */
  logo: { src: string; width: number; height: number; srcSet?: string; sizes?: string };
  /** URL externa. Si no existe, el acceso dispara `onSelectWithoutLink`. */
  href?: string;
  /** Texto del tooltip que aparece al pasar el mouse o enfocar con teclado. */
  hint: string;
  toastLabel: string;
}

/*
  El logo de la Caja mide 1024 px y se muestra a 121–166 px: reducido 6x por el navegador, el
  texto "Ciencias Económicas - Santa Fe" queda blando. Hay versiones remuestreadas (Lanczos) a
  1x, 1,25x, 1,5x, 2x y 3x de cada tamaño; `sizes` debe coincidir con las alturas de header.css
  (desktop 44 px → 166 px, tablet 36 px → 136 px, mobile 32 px → 121 px).
*/
const CAJA_WIDTHS = [121, 136, 166, 204, 208, 242, 249, 272, 333, 363];
const CAJA_SRCSET = [
  ...CAJA_WIDTHS.map((w) => `/images/logo-caja-${w}.png ${w}w`),
  '/images/logo-caja.png 1024w',
].join(', ');

const INSTITUTIONS: Institution[] = [
  {
    id: 'dss',
    name: 'DSS',
    description: 'Departamento de Servicios Sociales',
    logo: { src: '/images/logo-dss.png', width: 173, height: 67 },
    hint: 'Obra Social · DSS',
    toastLabel: 'Obra Social - DSS',
  },
  {
    id: 'caja',
    name: 'Caja',
    description: 'Caja de Seguridad Social',
    logo: {
      src: '/images/logo-caja.png',
      width: 1024,
      height: 271,
      srcSet: CAJA_SRCSET,
      sizes: '(min-width: 1100px) 166px, (min-width: 641px) 136px, 121px',
    },
    href: 'https://www.cajaprofesional.org.ar/',
    hint: 'Ir a cajaprofesional.org.ar',
    toastLabel: 'Caja de Seguridad Social',
  },
];

/**
 * Logos de las instituciones vinculadas (DSS y Caja) en el extremo derecho del navbar.
 * Se muestran como co-marca, sin caja ni borde, igual que el logo del CPCE: un rótulo
 * chico arriba explica qué son, y el ↗ en la esquina más el tooltip indican que llevan
 * a otro sitio.
 */
export function InstitutionLinks({ onSelectWithoutLink }: InstitutionLinksProps) {
  const labelId = useId();

  return (
    <nav className="vanguard-institutions" aria-labelledby={labelId}>
      <span id={labelId} className="vanguard-institutions-label">
        Sitios institucionales
      </span>
      <ul className="vanguard-institutions-list">
        {INSTITUTIONS.map((institution) => {
          const content = (
            <>
              <img
                src={institution.logo.src}
                srcSet={institution.logo.srcSet}
                sizes={institution.logo.sizes}
                alt=""
                width={institution.logo.width}
                height={institution.logo.height}
                className={`vanguard-institution-logo vanguard-institution-logo--${institution.id}`}
              />
              <svg
                className="vanguard-institution-arrow"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </>
          );

          const className = `vanguard-institution vanguard-institution--${institution.id}`;

          return (
            <li key={institution.id} className="vanguard-institutions-item">
              {institution.href ? (
                <a
                  href={institution.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  data-hint={institution.hint}
                  aria-label={`${institution.description} (abre en una pestaña nueva)`}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  className={className}
                  data-hint={institution.hint}
                  onClick={() => onSelectWithoutLink(institution.toastLabel)}
                  aria-label={`${institution.name}: ${institution.description}`}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
