'use client';

import React from 'react';
import { useModal } from '../context/ModalContext';

/*
  Pie de página (Figma · "Pie de página", 1440 × 380): fondo azul oscuro con las esquinas
  superiores redondeadas, cuatro columnas ("Seguinos", "Navegación", "Sitios", "Contacto") y
  el "Pie inferior" con el copyright y los enlaces legales.
*/

/*
  Logo negativo (732 × 215). En Figma ocupa 236 × 69 px dentro de una caja de 250 × 80; hay
  versiones remuestreadas (Lanczos) a 1x, 1,25x, 1,5x y 2x para que las letras no queden blandas.
*/
const LOGO_WIDTHS = [236, 295, 355, 473];
const LOGO_SRCSET = [
  ...LOGO_WIDTHS.map((w) => `/images/logo-cpce-negativo-${w}.png ${w}w`),
  '/images/logo-cpce-negativo.png 732w',
].join(', ');

/** Enlace del pie: navega (`href`), abre un diálogo o, si la sección todavía no existe, avisa con un toast. */
type FooterItem = {
  label: string;
  href?: string;
  /** Abre en una pestaña nueva (se marca con ↗ en el diseño). */
  external?: boolean;
  dialog?: string;
  toast?: string;
};

// "Navegación"
const NAV_ITEMS: FooterItem[] = [
  { label: 'El Consejo', toast: 'El Consejo' },
  { label: 'Matrícula', dialog: 'consulta' },
  { label: 'Ejercicio profesional', toast: 'Ejercicio profesional' },
  { label: 'Actuación judicial', toast: 'Actuación judicial' },
  { label: 'Capacitación y eventos', href: '/calendar' },
  { label: 'Beneficios y servicios', toast: 'Beneficios y servicios' },
];

// "Sitios" (los que llevan ↗ son externos)
const SITE_ITEMS: FooterItem[] = [
  // El DSS todavía no tiene URL propia: mismo aviso que el acceso del navbar
  { label: 'Servicios Sociales (DSS)', external: true, toast: 'Obra Social - DSS' },
  { label: 'Caja de Seguridad Social', external: true, href: 'https://www.cajaprofesional.org.ar/' },
  { label: 'Sitios de interés', toast: 'Sitios de interés' },
  { label: 'Revista Opinión Profesional', toast: 'Revista Opinión Profesional' },
];

// "Enlaces legales"
const LEGAL_ITEMS: FooterItem[] = [
  { label: 'Privacidad', toast: 'Política de Privacidad y Protección de Datos Personales.' },
  { label: 'Denuncias', toast: 'Denuncia por Ejercicio Ilegal' },
];

// "Redes sociales". X no tiene URL conocida todavía: se muestra cuando se cargue `href`.
const SOCIAL_NETWORKS: { name: string; icon: string; href: string | null }[] = [
  { name: 'Instagram', icon: '/images/footer/red-instagram.svg', href: 'https://www.instagram.com/cpcesfe1' },
  { name: 'Facebook', icon: '/images/footer/red-facebook.svg', href: 'https://www.facebook.com/cpcesfe1' },
  { name: 'X', icon: '/images/footer/red-x.svg', href: null },
  { name: 'YouTube', icon: '/images/footer/red-youtube.svg', href: 'https://www.youtube.com/@cpcesfe1' },
];

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=San+Lorenzo+1849,+Santa+Fe,+Argentina';

function NewTabHint() {
  return <span className="footer-sr-only"> (abre en una pestaña nueva)</span>;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { openDialog, showToast } = useModal();

  const renderItem = (item: FooterItem) => {
    const content = (
      <>
        {item.label}
        {item.external && <span aria-hidden="true"> ↗</span>}
      </>
    );

    if (item.href) {
      return item.external ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className="footer-link">
          {content}
          <NewTabHint />
        </a>
      ) : (
        <a href={item.href} className="footer-link">
          {content}
        </a>
      );
    }

    return (
      <button
        type="button"
        className="footer-link"
        onClick={() => (item.dialog ? openDialog(item.dialog) : showToast(item.toast ?? item.label))}
      >
        {content}
      </button>
    );
  };

  // En el inicio, el logo vuelve arriba con scroll suave; en otras páginas navega al inicio
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="contacto" role="contentinfo">
      <div className="footer-inner">
        {/* COLUMNAS */}
        <div className="footer-columns">
          {/* "Seguinos": logo negativo + redes sociales */}
          <div className="footer-col footer-col--brand">
            <a
              href="/"
              className="footer-logo-link"
              onClick={handleLogoClick}
              aria-label="Consejo Profesional de Ciencias Económicas de la Provincia de Santa Fe · Cámara I · Ir al inicio"
            >
              <img
                src="/images/logo-cpce-negativo.png"
                srcSet={LOGO_SRCSET}
                sizes="236px"
                alt="Consejo Profesional de Ciencias Económicas de la Provincia de Santa Fe · Cámara I"
                className="footer-logo"
                width="732"
                height="215"
                loading="lazy"
                decoding="async"
              />
            </a>

            <div className="footer-follow">
              <h2 className="footer-heading" id="footer-seguinos">
                Seguinos
              </h2>
              <ul className="footer-social" aria-labelledby="footer-seguinos">
                {SOCIAL_NETWORKS.filter((network) => network.href).map((network) => (
                  <li key={network.name}>
                    <a
                      href={network.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link"
                      aria-label={`${network.name} del CPCE (abre en una pestaña nueva)`}
                    >
                      <img src={network.icon} alt="" width={16} height={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* "Navegación" */}
          <nav className="footer-col" aria-labelledby="footer-navegacion">
            <h2 className="footer-heading" id="footer-navegacion">
              Navegación
            </h2>
            <ul className="footer-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>{renderItem(item)}</li>
              ))}
            </ul>
          </nav>

          {/* "Sitios" */}
          <nav className="footer-col" aria-labelledby="footer-sitios">
            <h2 className="footer-heading" id="footer-sitios">
              Sitios
            </h2>
            <ul className="footer-links">
              {SITE_ITEMS.map((item) => (
                <li key={item.label}>{renderItem(item)}</li>
              ))}
            </ul>
          </nav>

          {/* "Contacto" */}
          <div className="footer-col">
            <h2 className="footer-heading" id="footer-contacto">
              Contacto
            </h2>
            <address className="footer-contact">
              <ul className="footer-links" aria-labelledby="footer-contacto">
                <li>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="footer-link">
                    San Lorenzo 1849, Santa Fe
                    <span className="footer-sr-only"> (ver en Google Maps, abre en una pestaña nueva)</span>
                  </a>
                </li>
                <li>
                  <a href="tel:03424593450" className="footer-link">
                    (0342) 4593450
                  </a>
                </li>
                <li className="footer-text">Lunes a viernes de 7 a 15 h</li>
                <li>
                  <a href="mailto:cra@cpn.org.ar" className="footer-link">
                    cra@cpn.org.ar
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* "Pie inferior": copyright y enlaces legales */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {currentYear} Consejo Profesional de Ciencias Económicas de la Provincia de Santa Fe — Cámara I
          </p>
          <ul className="footer-legal" aria-label="Enlaces legales">
            {LEGAL_ITEMS.map((item) => (
              <li key={item.label}>{renderItem(item)}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
