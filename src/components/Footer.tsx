'use client';

import React from 'react';
import { useModal } from '../context/ModalContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { openDialog, showToast } = useModal();

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-renovated" id="contacto" role="contentinfo">
      {/* Línea superior con gradiente institucional exacto CPCE */}
      <div className="footer-gradient-accent" />

      {/* Manchas aurora ambientales acordes a la estética Hero y Chambers */}
      <div className="footer-aurora-container" aria-hidden="true">
        <div className="footer-aurora-blob footer-aurora-blob--left" />
        <div className="footer-aurora-blob footer-aurora-blob--right" />
      </div>

      <div className="wrap footer-content-wrap">
        <div className="footer-main-grid">
          {/* ── COLUMNA 1: IDENTIDAD INSTITUCIONAL & MARCA ── */}
          <div className="footer-brand-col">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToTop();
              }}
              className="footer-brand-logo-link"
              aria-label="Consejo Profesional de Ciencias Económicas de Santa Fe - Cámara Primera"
            >
              <img
                src="/images/logo-cpce-camara-1.png"
                alt="Consejo Profesional de Ciencias Económicas de la Provincia de Santa Fe - Cámara Primera"
                className="footer-brand-logo"
                width="280"
                height="80"
                loading="lazy"
              />
            </a>

            <span className="footer-brand-eyebrow">
              CÁMARA PRIMERA · JURISDICCIÓN CENTRO-NORTE
            </span>

            <p className="footer-brand-desc">
              Entidad de derecho público no estatal creada por Ley Provincial N.º 8.738 para el gobierno de la matrícula, el control deontológico y la jerarquización del ejercicio profesional en Ciencias Económicas.
            </p>

            <div className="footer-brand-badges">
              <span className="footer-badge-pill">Ley Prov. N.º 8.738</span>
              <span className="footer-badge-pill">Personería Pública No Estatal</span>
            </div>

            {/* Redes Sociales y Canales Oficiales */}
            <div className="footer-social-wrap">
              <span className="footer-social-label">Canales Oficiales:</span>
              <div className="footer-social-icons">
                <a
                  href="https://www.linkedin.com/company/cpcesfe1"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn"
                  aria-label="LinkedIn Institucional CPCE Cámara Primera"
                  title="LinkedIn Institucional"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/cpcesfe1"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn"
                  aria-label="Instagram Oficial @cpcesfe1"
                  title="Instagram @cpcesfe1"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com/@cpcesfe1"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn"
                  aria-label="Canal de YouTube CPCE Santa Fe"
                  title="Canal de YouTube"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                <a
                  href="https://www.facebook.com/cpcesfe1"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn"
                  aria-label="Página de Facebook CPCE Santa Fe"
                  title="Facebook Institucional"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>

                <a
                  href="https://wa.me/5493424593450"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn footer-social-btn--whatsapp"
                  aria-label="WhatsApp Mesa de Consultas CPCE"
                  title="WhatsApp Mesa de Consultas"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── COLUMNA 2: SEDE CENTRAL SANTA FE ── */}
          <div className="footer-col">
            <span className="footer-col-eyebrow">SEDE PRINCIPAL</span>
            <h3 className="footer-col-title">Sede Central Santa Fe</h3>

            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="footer-contact-detail">
                  <strong>Dirección:</strong>
                  <span>San Lorenzo 1849 (S3000CGI), Ciudad de Santa Fe</span>
                </div>
              </div>

              <div className="footer-contact-item">
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div className="footer-contact-detail">
                  <strong>Teléfonos:</strong>
                  <span>
                    <a href="tel:03424593450" className="footer-inline-link">(0342) 459-3450</a> /{' '}
                    <a href="tel:03424593458" className="footer-inline-link">459-3458</a>
                  </span>
                </div>
              </div>

              <div className="footer-contact-item">
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div className="footer-contact-detail">
                  <strong>Atención al público:</strong>
                  <span>Lunes a Viernes de 7:30 a 15:30 hs</span>
                </div>
              </div>

              <div className="footer-contact-item">
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <div className="footer-contact-detail">
                  <strong>Correo institucional:</strong>
                  <a href="mailto:cpcesfe@cpcesfe1.org.ar" className="footer-inline-link">
                    cpcesfe@cpcesfe1.org.ar
                  </a>
                </div>
              </div>
            </div>

            <a
              href="https://cpcesfe1.org.ar/"
              target="_blank"
              rel="noreferrer"
              className="footer-portal-btn"
            >
              <span>Portal Oficial Cámara Primera</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>

          {/* ── COLUMNA 3: SERVICIOS Y ECOSISTEMA ── */}
          <div className="footer-col">
            <span className="footer-col-eyebrow">SERVICIOS Y CONSULTAS</span>
            <h3 className="footer-col-title">Accesos Frecuentes</h3>

            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  className="footer-link-action"
                  onClick={() => openDialog('consulta')}
                >
                  <svg className="footer-link-bullet" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span>Consulta de Matrícula Profesional</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="footer-link-action"
                  onClick={() => openDialog('acceso')}
                >
                  <svg className="footer-link-bullet" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span>Autogestión y Software CPCE</span>
                </button>
              </li>

              <li>
                <a
                  href="https://cpcesfe1.org.ar/legalizaciones/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link-action"
                >
                  <svg className="footer-link-bullet" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span>Legalizaciones Digitales</span>
                </a>
              </li>

              <li>
                <a
                  href="https://cpcesfe1.org.ar/capacitacion/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link-action"
                >
                  <svg className="footer-link-bullet" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span>Cursos y Formación Continua</span>
                </a>
              </li>

              <li>
                <a
                  href="https://www.facpce.org.ar/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link-action"
                >
                  <svg className="footer-link-bullet" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span>FACPCE · Federación Argentina ↗</span>
                </a>
              </li>

              <li>
                <a
                  href="https://www.cajaprofesional.org.ar/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link-action"
                >
                  <svg className="footer-link-bullet" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span>Caja de Seguridad Social (CSS) ↗</span>
                </a>
              </li>

              <li>
                <button
                  type="button"
                  className="footer-link-action"
                  onClick={() => showToast('Mesa de Entradas y Turnos: Atención presencial y digital activa')}
                >
                  <svg className="footer-link-bullet" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span>Mesa de Entradas y Turnos</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ── BARRA INFERIOR / LEGAL & COPYRIGHT ── */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-legal">
            <p className="footer-bottom-copy">
              © {currentYear} Consejo Profesional de Ciencias Económicas de la Provincia de Santa Fe — Cámara Primera. Todos los derechos reservados.
            </p>
            <p className="footer-bottom-sub">
              San Lorenzo 1849, Ciudad de Santa Fe, República Argentina · CUIT: 30-54129524-7
            </p>
          </div>

          <div className="footer-bottom-actions">
            <div className="footer-bottom-links">
              <button
                type="button"
                className="footer-bottom-link-btn"
                onClick={() => showToast('Transparencia y Deontología: En conformidad con la Ley 8.738.')}
              >
                Transparencia
              </button>
              <span className="footer-bottom-separator">·</span>
              <button
                type="button"
                className="footer-bottom-link-btn"
                onClick={() => showToast('Términos de Uso del Portal CPCE Santa Fe Cámara I.')}
              >
                Términos de uso
              </button>
              <span className="footer-bottom-separator">·</span>
              <button
                type="button"
                className="footer-bottom-link-btn"
                onClick={() => showToast('Política de Privacidad y Protección de Datos Personales.')}
              >
                Privacidad
              </button>
            </div>

            <button
              type="button"
              className="footer-back-to-top-btn"
              onClick={handleScrollToTop}
              aria-label="Volver arriba al inicio de la página"
            >
              <span>Volver arriba</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
