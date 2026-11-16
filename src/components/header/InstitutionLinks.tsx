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
  Logos de DSS y Caja como PNG supermuestreados: se dibujan los SVG vectoriales de Figma
  (logo-dss-recortado.svg y logo-caja.svg) a 8x y se reducen con filtro de área a cada
  tamaño exacto. En pantallas comunes (1x) el navegador dibuja los SVG con bordes
  escalonados ("serrucho"), sobre todo en el círculo fino de Caja y las figuras de DSS;
  así los bordes quedan suaves. Hay una versión por alto usado en header.css (56 / 44 / 42 /
  36 / 30 px) y sus múltiplos para pantallas de alta densidad; `sizes` debe coincidir con
  esos altos.
*/
const DSS_WIDTHS = [76, 91, 106, 111, 142, 152, 182, 213, 223, 284, 319, 426];
const CAJA_WIDTHS = [102, 122, 143, 150, 190, 204, 245, 286, 299, 381, 428, 571];
const srcSetFor = (name: string, widths: number[]) =>
  widths.map((w) => `/images/header/logo-${name}-${w}.png ${w}w`).join(', ');

const INSTITUTIONS: Institution[] = [
  {
    id: 'dss',
    name: 'DSS',
    description: 'Departamento de Servicios Sociales',
    // Recortado a su dibujo (sin los márgenes transparentes del SVG original de Figma) para
    // que a la misma altura pese igual que el de Caja
    logo: {
      src: '/images/header/logo-dss-142.png',
      width: 142,
      height: 56,
      srcSet: srcSetFor('dss', DSS_WIDTHS),
      sizes: '(max-width: 640px) 76px, (max-width: 860px) 91px, (max-width: 1023px) 106px, 142px',
    },
    hint: 'Obra Social · DSS',
    toastLabel: 'Obra Social - DSS',
  },
  {
    id: 'caja',
    name: 'Caja',
    description: 'Caja de Seguridad Social',
    // Armado con las piezas vectoriales del logo en Figma ("Botón · Acceso externo", Caja)
    logo: {
      src: '/images/header/logo-caja-190.png',
      width: 190,
      height: 56,
      srcSet: srcSetFor('caja', CAJA_WIDTHS),
      sizes: '(max-width: 640px) 102px, (max-width: 860px) 122px, (max-width: 1023px) 143px, 190px',
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
