'use client';

import React from 'react';

interface Delegation {
  id: string;
  city: string;
  type: string;
  tag: string;
  title: string;
  shortAddress: string;
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
    tag: 'Sede Central · Cámara Primera',
    title: 'Santa Fe · Sede Central',
    shortAddress: 'San Lorenzo 1849',
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
    tag: 'Delegación Regional',
    title: 'Delegación Rafaela',
    shortAddress: 'Cervantes 54',
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
    tag: 'Delegación Regional',
    title: 'Delegación Reconquista',
    shortAddress: 'Chacabuco 871/873',
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
    tag: 'Delegación Regional',
    title: 'Delegación Sastre',
    shortAddress: 'Emilio Ortiz 1835',
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

export default function Chambers() {
  return (
    <section className="sedes-compact-section" id="sedes" aria-labelledby="sedes-title">
      <div className="sedes-glow-container" aria-hidden="true">
        <div className="sedes-glow-blob sedes-glow-blob--1" />
        <div className="sedes-glow-blob sedes-glow-blob--2" />
      </div>

      <div className="wrap">
        {/* Cabecera compacta */}
        <div className="sedes-header-wrap">
          <div className="sedes-header-text">
            <span className="sedes-eyebrow">
              CÁMARA PRIMERA · PRESENCIA PROVINCIAL
            </span>
            <h2 id="sedes-title" className="sedes-main-title" style={{ color: '#000000' }}>
              Sede Central y Delegaciones
            </h2>
            <p className="sedes-main-subtitle">
              Atención presencial a profesionales en Santa Fe Capital y en los centros productivos del interior provincial.
            </p>
          </div>
        </div>

        {/* Grilla moderna y compacta de 4 tarjetas directas (sin mapas pesados) */}
        <div className="sedes-cards-grid">
          {DELEGATIONS.map((delegation) => (
            <div key={delegation.id} className="sede-grid-card">
              <div className="sede-grid-card-head">
                <span className="sede-grid-card-tag">{delegation.type}</span>
                <strong className="sede-grid-card-city">{delegation.city}</strong>
              </div>

              <div className="sede-grid-card-body">
                <div className="sede-grid-info-row">
                  <svg className="sede-grid-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="sede-grid-info-text">{delegation.fullAddress}</span>
                </div>

                <div className="sede-grid-info-row">
                  <svg className="sede-grid-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="sede-grid-info-text">{delegation.hours}</span>
                </div>

                <div className="sede-grid-info-row">
                  <svg className="sede-grid-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div className="sede-grid-phones">
                    {delegation.phoneLinks.map((p, idx) => (
                      <a key={idx} href={p.href} className="sede-grid-link">
                        {p.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="sede-grid-info-row">
                  <svg className="sede-grid-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href={`mailto:${delegation.email}`} className="sede-grid-link">
                    {delegation.email}
                  </a>
                </div>
              </div>

              <div className="sede-grid-card-footer">
                <a
                  href={delegation.mapDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sede-grid-map-btn"
                  title={`Ver ubicación de ${delegation.city} en Google Maps`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                    <line x1="9" y1="3" x2="9" y2="18" />
                    <line x1="15" y1="6" x2="15" y2="21" />
                  </svg>
                  <span>Cómo llegar</span>
                </a>
                {delegation.attention && (
                  <span className="sede-grid-att" title={delegation.attention}>
                    {delegation.attention}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Receptorías informativas sutil */}
        <div className="sedes-receptorias-simple">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span><strong>Receptorías departamentales:</strong> Esperanza, San Jorge, Vera, San Cristóbal, Tostado, Ceres y San Justo.</span>
        </div>
      </div>
    </section>
  );
}
