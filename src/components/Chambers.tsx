'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useModal } from '../context/ModalContext';

/**
 * Banda institucional según Figma (CPCE1_Web_Fase2 · "Banda · Institucional", nodo 482:2464):
 * "Columna de texto" (El Consejo + enlaces) y "Canal de YouTube" (video 16:9 + botón), con el
 * "Aurora blob center" detrás, arriba a la derecha.
 *
 * El enlace "Delegaciones, Firmas autorizadas y Oficinas →" despliega debajo los datos reales
 * de la Sede Central y las delegaciones (no figuran en el diseño, que solo muestra el enlace).
 * También se abre al llegar con #sedes (menú "Sede y Delegaciones" del encabezado).
 */

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@cpcesfe1';

interface Delegation {
  id: string;
  city: string;
  type: string;
  fullAddress: string;
  phoneLinks: { label: string; href: string }[];
  hours: string;
  email: string;
  attention?: string;
  mapDirectUrl: string;
}

const DELEGATIONS: Delegation[] = [
  {
    id: 'santa-fe',
    city: 'Santa Fe',
    type: 'Sede Central',
    fullAddress: 'San Lorenzo 1849 (S3000CGI), Ciudad de Santa Fe',
    phoneLinks: [
      { label: '(0342) 459-3450', href: 'tel:03424593450' },
      { label: '459-3458', href: 'tel:03424593458' },
    ],
    hours: 'Lun a Vie de 7:00 a 15:00 hs',
    email: 'cpcesfe@cpcesfe1.org.ar',
    attention: 'Mesa de entradas, Matrícula y Legalizaciones',
    mapDirectUrl:
      'https://www.google.com/maps/search/?api=1&query=San+Lorenzo+1849,+Santa+Fe,+Argentina',
  },
  {
    id: 'rafaela',
    city: 'Rafaela',
    type: 'Delegación',
    fullAddress: 'Cervantes 54 (S2300), Rafaela, Santa Fe',
    phoneLinks: [
      { label: '(03492) 427-663', href: 'tel:03492427663' },
      { label: 'Cel: (03492) 1558-1574', href: 'tel:03492581574' },
    ],
    hours: 'Lun a Vie de 7:00 a 15:00 hs',
    email: 'del-rafaela@cpcesfe1.org.ar',
    attention: 'Gestión arancelaria y trámites profesionales',
    mapDirectUrl:
      'https://www.google.com/maps/search/?api=1&query=Cervantes+54,+Rafaela,+Santa+Fe,+Argentina',
  },
  {
    id: 'reconquista',
    city: 'Reconquista',
    type: 'Delegación',
    fullAddress: 'Chacabuco 871/873 (S3560), Reconquista, Santa Fe',
    phoneLinks: [
      { label: '(03482) 429-761', href: 'tel:03482429761' },
      { label: 'WA: (03482) 1541-2100', href: 'tel:03482412100' },
    ],
    hours: 'Lun a Vie de 7:30 a 12:30 hs',
    email: 'del-reconquista@cpcesfe1.org.ar',
    attention: 'Asesoramiento directo y gestión institucional',
    mapDirectUrl:
      'https://www.google.com/maps/search/?api=1&query=Chacabuco+871,+Reconquista,+Santa+Fe,+Argentina',
  },
  {
    id: 'sastre',
    city: 'Sastre',
    type: 'Delegación',
    fullAddress: 'Emilio Ortiz 1835 (S2440), Sastre, Santa Fe',
    phoneLinks: [
      { label: '(03406) 480-508', href: 'tel:03406480508' },
      { label: 'Cel: (03406) 1545-1751', href: 'tel:03406451751' },
    ],
    hours: 'Lun a Vie de 8:00 a 12:00 hs',
    email: 'cra-polanicha@cpn.org.ar',
    attention: 'Atención a cargo de Cra. Agostina Polanich',
    mapDirectUrl:
      'https://www.google.com/maps/search/?api=1&query=Emilio+Ortiz+1835,+Sastre,+Santa+Fe,+Argentina',
  },
];

// "Enlaces" de la columna de texto. Sin páginas propias todavía: avisan con el toast, igual que
// los mismos ítems del menú "Institucional" del encabezado.
const INSTITUTIONAL_LINKS: { label: string; toast: string }[] = [
  { label: 'Historia y 75 años', toast: 'Historia Institucional' },
  { label: 'Autoridades', toast: 'Autoridades Institucionales' },
  { label: 'Mi Consejo Responsable', toast: 'Mi Consejo Responsable' },
];

const SEDES_HASH = '#sedes';

export default function Chambers() {
  const { showToast } = useModal();
  const [sedesOpen, setSedesOpen] = useState(false);
  const [scrollToSedes, setScrollToSedes] = useState(false);
  const sedesRef = useRef<HTMLDivElement>(null);

  // Abrir el panel de sedes al llegar (o navegar) con #sedes
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === SEDES_HASH) {
        setSedesOpen(true);
        setScrollToSedes(true);
      }
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  useEffect(() => {
    if (sedesOpen && scrollToSedes) {
      sedesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setScrollToSedes(false);
    }
  }, [sedesOpen, scrollToSedes]);

  return (
    <section className="institucional-band" id="institucional" aria-labelledby="institucional-title">
      <div className="institucional-inner">
        {/* "Aurora blob center (#0052FF 28% / #0EA5E9 16%, blur 52)" */}
        <div className="institucional-aurora" aria-hidden="true" />

        {/* "Sección · Institucional y delegaciones" */}
        <div className="institucional-row">
          {/* "Columna de texto" */}
          <div className="institucional-texto">
            <h2 id="institucional-title" className="institucional-titulo">
              El Consejo
            </h2>
            <p className="institucional-cuerpo">
              El Consejo Profesional de Ciencias Económicas de Santa Fe, Cámara I, acompaña a sus
              matriculados desde hace 75 años. Trabaja por la formación continua, los servicios y la
              defensa de la profesión. Su misión es fortalecer la ética, la transparencia y el
              desarrollo profesional.
            </p>

            {/* "Enlaces" */}
            <ul className="institucional-enlaces">
              {INSTITUTIONAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href="#institucional"
                    className="institucional-enlace"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast(link.toast);
                    }}
                  >
                    {link.label}
                    {'\u00a0'}
                    <span aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="institucional-enlace"
                  aria-expanded={sedesOpen}
                  aria-controls="sedes"
                  onClick={() => setSedesOpen((open) => !open)}
                >
                  Delegaciones, Firmas autorizadas y{' '}
                  {/* La última palabra y la flecha no se separan al cortar la línea */}
                  <span className="institucional-nowrap">
                    Oficinas{'\u00a0'}
                    <span className="institucional-enlace-flecha" aria-hidden="true">
                      →
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* "Canal de YouTube" */}
          <div className="institucional-canal">
            {/* "Video · proporción 16:9": imagen del video con enlace al canal */}
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="institucional-video"
              tabIndex={-1}
              aria-hidden="true"
            >
              <span className="institucional-video-media">
                <Image
                  src="/images/institucional/video-consejo.jpg"
                  alt=""
                  fill
                  className="institucional-video-img"
                  sizes="(max-width: 860px) 100vw, (max-width: 1440px) 47vw, 666px"
                />
              </span>
            </a>

            {/* "Botón · hug" */}
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="institucional-boton"
            >
              {/* "Ícono · YouTube" (y su variante de hover en azul acento) */}
              <span className="institucional-boton-icono" aria-hidden="true">
                <img src="/images/institucional/icono-youtube.svg" alt="" width={14} height={14} />
                <img
                  src="/images/institucional/icono-youtube-hover.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="institucional-boton-icono-hover"
                />
              </span>
              <span>
                Ver canal en YouTube <span aria-hidden="true">↗</span>
                <span className="institucional-sr-only"> (se abre en una pestaña nueva)</span>
              </span>
            </a>
          </div>
        </div>

        {/* Sede Central y delegaciones: se despliega desde el último enlace */}
        <div id="sedes" ref={sedesRef} className="institucional-sedes" hidden={!sedesOpen}>
          <h3 className="institucional-sedes-titulo">Sede Central y Delegaciones</h3>

          <div className="institucional-sedes-grid">
            {DELEGATIONS.map((delegation) => (
              <article key={delegation.id} className="sede-card">
                <div className="sede-card-head">
                  <span className="sede-card-tipo">{delegation.type}</span>
                  <h4 className="sede-card-ciudad">{delegation.city}</h4>
                </div>

                <ul className="sede-card-datos">
                  <li className="sede-card-dato">
                    <svg className="sede-card-icono" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{delegation.fullAddress}</span>
                  </li>
                  <li className="sede-card-dato">
                    <svg className="sede-card-icono" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{delegation.hours}</span>
                  </li>
                  <li className="sede-card-dato">
                    <svg className="sede-card-icono" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="sede-card-telefonos">
                      {delegation.phoneLinks.map((phone) => (
                        <a key={phone.href} href={phone.href} className="sede-card-link">
                          {phone.label}
                        </a>
                      ))}
                    </span>
                  </li>
                  <li className="sede-card-dato">
                    <svg className="sede-card-icono" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <a href={`mailto:${delegation.email}`} className="sede-card-link sede-card-email">
                      {delegation.email}
                    </a>
                  </li>
                </ul>

                <div className="sede-card-pie">
                  {delegation.attention && <p className="sede-card-atencion">{delegation.attention}</p>}
                  <a
                    href={delegation.mapDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="institucional-boton sede-card-mapa"
                  >
                    <span>
                      Cómo llegar <span aria-hidden="true">↗</span>
                      <span className="institucional-sr-only">
                        {' '}
                        a {delegation.city} en Google Maps (se abre en una pestaña nueva)
                      </span>
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="institucional-receptorias">
            <strong>Receptorías departamentales:</strong> Esperanza, San Jorge, Vera, San Cristóbal,
            Tostado, Ceres y San Justo.
          </p>
        </div>
      </div>
    </section>
  );
}
