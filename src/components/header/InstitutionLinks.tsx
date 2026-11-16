'use client';

import React from 'react';

interface InstitutionLinksProps {
  /** Se ejecuta al pulsar una institución que todavía no tiene URL propia (DSS). */
  onSelectWithoutLink: (label: string) => void;
}

interface Institution {
  id: 'dss' | 'caja';
  name: string;
  description: string;
  /** Logo de la institución. `srcSet`/`sizes` son opcionales (versiones remuestreadas). */
  logo: { src: string; width: number; height: number; srcSet?: string; sizes?: string };
  /** URL externa. Si no existe, el acceso dispara `onSelectWithoutLink`. */
  href?: string;
  /** Texto del tooltip que aparece al pasar el mouse o enfocar con teclado. */
  hint: string;
  toastLabel: string;
}

/*
  Logo de la Caja en dos líneas (496 × 146), tal como aparece en Figma a 40 px de alto (136 px
  de ancho). Hay versiones remuestreadas (Lanczos) para cada tamaño y densidad; `sizes` debe
  coincidir con las alturas de header.css (40 / 32 / 28 px, y en mobile 24 px recortado al árbol).
*/
const CAJA_WIDTHS = [109, 136, 164, 170, 204, 218, 272, 327, 408];
const CAJA_SRCSET = [
  ...CAJA_WIDTHS.map((w) => `/images/logo-caja-dos-lineas-${w}.png ${w}w`),
  '/images/logo-caja-dos-lineas.png 496w',
].join(', ');

const INSTITUTIONS: Institution[] = [
  {
    id: 'dss',
    name: 'DSS',
    description: 'Departamento de Servicios Sociales',
    // Logo vectorial exportado de Figma ("logo DSS", 82 × 40)
    logo: { src: '/images/header/logo-dss.svg', width: 82, height: 40 },
    hint: 'Obra Social · DSS',
    toastLabel: 'Obra Social - DSS',
  },
  {
    id: 'caja',
    name: 'Caja',
    description: 'Caja de Seguridad Social',
    logo: {
      src: '/images/logo-caja-dos-lineas.png',
      width: 496,
      height: 146,
      srcSet: CAJA_SRCSET,
      sizes: '(min-width: 1024px) 136px, (min-width: 861px) 109px, (min-width: 641px) 95px, 82px',
    },
    href: 'https://www.cajaprofesional.org.ar/',
    hint: 'Ir a cajaprofesional.org.ar',
    toastLabel: 'Caja de Seguridad Social',
  },
];

/**
 * Accesos a DSS y Caja en el extremo derecho del navbar (Figma · "Botón · Acceso externo"):
 * cada uno es una caja con borde gris, el logo y el ícono de enlace externo arriba a la derecha.
 */
export function InstitutionLinks({ onSelectWithoutLink }: InstitutionLinksProps) {
  return (
    <nav aria-label="Sitios institucionales">
      <ul className="vanguard-institutions">
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
              <img
                src="/images/header/icono-enlace-externo.svg"
                alt=""
                width={16}
                height={16}
                className="vanguard-institution-arrow"
              />
            </>
          );

          const className = `vanguard-institution vanguard-institution--${institution.id}`;

          return (
            <li key={institution.id}>
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
