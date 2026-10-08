'use client';

import React, { useState } from 'react';

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
  mapEmbedUrl: string;
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
    mapEmbedUrl:
      'https://maps.google.com/maps?q=San+Lorenzo+1849,+Santa+Fe,+Santa+Fe,+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed',
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
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Cervantes+54,+Rafaela,+Santa+Fe,+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed',
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
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Chacabuco+871,+Reconquista,+Santa+Fe,+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed',
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
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Emilio+Ortiz+1835,+Sastre,+Santa+Fe,+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapDirectUrl:
      'https://www.google.com/maps/search/?api=1&query=Emilio+Ortiz+1835,+Sastre,+Santa+Fe,+Argentina',
  },
];

export default function Chambers() {
  const [selectedId, setSelectedId] = useState<string>('santa-fe');

  const selected = DELEGATIONS.find((d) => d.id === selectedId) || DELEGATIONS[0];

  return (
    <section className="sedes-compact-section" id="sedes" aria-labelledby="sedes-title">
      {/* Manchas en el fondo de azul eléctrico tirando a índigo */}
      <div className="sedes-glow-container" aria-hidden="true">
        <div className="sedes-glow-blob sedes-glow-blob--1" />
        <div className="sedes-glow-blob sedes-glow-blob--2" />
        <div className="sedes-glow-blob sedes-glow-blob--3" />
        <div className="sedes-glow-blob sedes-glow-blob--4" />
      </div>

      <div className="wrap">
        {/* Cabecera con la misma estética de Hero y Eventos */}
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

          {/* Selector de pestañas horizontal visible en pantallas móviles/tablet (paleta azul/gris unificada) */}
          <div className="sedes-mobile-pills" role="tablist" aria-label="Seleccionar delegación">
            {DELEGATIONS.map((delegation) => {
              const isActive = delegation.id === selected.id;
              return (
                <button
                  key={delegation.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`sedes-pill-btn ${isActive ? 'sedes-pill-btn--active' : ''}`}
                  onClick={() => setSelectedId(delegation.id)}
                >
                  <span className="sedes-pill-dot" />
                  {delegation.city}
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout compacto: Costado (Sidebar con 4 localidades) + Card Unificada (Datos y Mapa lado a lado) */}
        <div className="sedes-unified-layout">
          {/* Costado Izquierdo: Listado de Delegaciones en paleta azulada/gris */}
          <aside className="sedes-compact-sidebar" aria-label="Listado de sedes y delegaciones">
            <div className="sedes-sidebar-title-bar">
              <span className="sedes-sidebar-heading">LOCALIDADES</span>
              <span className="sedes-count-badge">{DELEGATIONS.length} sedes</span>
            </div>

            <div className="sedes-compact-list" role="tablist" aria-orientation="vertical">
              {DELEGATIONS.map((delegation) => {
                const isActive = delegation.id === selected.id;
                return (
                  <button
                    key={delegation.id}
                    type="button"
                    role="tab"
                    id={`sede-tab-${delegation.id}`}
                    aria-selected={isActive}
                    aria-controls="sede-unified-display"
                    className={`sede-compact-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => setSelectedId(delegation.id)}
                  >
                    <div className="sede-card-top-row">
                      <span className="sede-badge-tag">
                        {delegation.type}
                      </span>
                      {isActive && <span className="sede-active-pill">ACTIVA</span>}
                    </div>

                    <div className="sede-card-main-row">
                      <div className="sede-card-info">
                        <strong className="sede-city-name">{delegation.city}</strong>
                        <span className="sede-short-address">{delegation.shortAddress}</span>
                      </div>
                      <div className="sede-card-arrow" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pastilla informativa de Receptorías */}
            <div className="sedes-receptorias-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span><strong>Receptorías:</strong> Esperanza, San Jorge, Vera, San Cristóbal, Tostado, Ceres y San Justo.</span>
            </div>
          </aside>

          {/* Lado Derecho: Contenedor integrado donde Datos y Mapa conviven en un mismo bloque compacto */}
          <div className="sedes-integrated-card" id="sede-unified-display" role="tabpanel" aria-labelledby={`sede-tab-${selected.id}`}>
            {/* Mitad izquierda del card: Datos de la sede */}
            <div className="sede-details-column">
              <div className="sede-details-header">
                <div className="sede-header-tags">
                  <span className="event-tag-pill-style">
                    {selected.tag}
                  </span>
                </div>
                <h3 className="sede-integrated-title">{selected.title}</h3>
              </div>

              {/* Ficha concisa de datos con iconos estilizados */}
              <div className="sede-compact-data-list">
                <div className="sede-compact-data-row">
                  <div className="sede-icon-circle" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="sede-data-text-col">
                    <span className="sede-field-label">Dirección</span>
                    <strong className="sede-field-value">{selected.fullAddress}</strong>
                  </div>
                </div>

                <div className="sede-compact-data-row">
                  <div className="sede-icon-circle" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="sede-data-text-col">
                    <span className="sede-field-label">Horario de atención</span>
                    <strong className="sede-field-value">{selected.hours}</strong>
                  </div>
                </div>

                <div className="sede-compact-data-row">
                  <div className="sede-icon-circle" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="sede-data-text-col">
                    <span className="sede-field-label">Teléfonos</span>
                    <div className="sede-links-wrap">
                      {selected.phoneLinks.map((p, idx) => (
                        <a key={idx} href={p.href} className="sede-link-action">
                          {p.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sede-compact-data-row">
                  <div className="sede-icon-circle" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="sede-data-text-col">
                    <span className="sede-field-label">Correo electrónico</span>
                    <a href={`mailto:${selected.email}`} className="sede-link-action">
                      {selected.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Botón de acción destacado estilo Hero / Eventos */}
              <div className="sede-bottom-actions">
                <a
                  className="sede-btn-primary"
                  href={selected.mapDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Abrir ubicación de ${selected.city} en Google Maps`}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                    <line x1="9" y1="3" x2="9" y2="18" />
                    <line x1="15" y1="6" x2="15" y2="21" />
                  </svg>
                  Abrir en Google Maps ↗
                </a>

                {selected.attention && (
                  <span className="sede-attention-pill">
                    {selected.attention}
                  </span>
                )}
              </div>
            </div>

            {/* Mitad derecha del card: El mapa de Google Maps integrado a la par */}
            <div className="sede-map-column">
              <div className="sede-map-glass-badge">
                <span className="sede-map-pulse-dot" />
                <span>Google Maps en vivo · {selected.city}</span>
                <a
                  href={selected.mapDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sede-map-external-link"
                  title="Abrir mapa a pantalla completa"
                >
                  Ampliar ↗
                </a>
              </div>

              <iframe
                key={selected.id}
                title={`Mapa interactivo de Google Maps para ${selected.title}`}
                src={selected.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="sede-integrated-iframe"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
