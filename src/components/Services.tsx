'use client';

import React from 'react';
import { useModal } from '../context/ModalContext';

interface ServiceItem {
  name: string;
  description: string;
  theme: string;
  action?: string;
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    name: "Legalizaciones digitales",
    description: "Gestión, consulta y verificación de firmas digitales para trabajos profesionales con código QR.",
    theme: "emerald",
    icon: (
      <>
        <path d="M7 3h7l5 5v13H7zM14 3v6h5M10 14h6m-6 3h6" />
      </>
    ),
  },
  {
    name: "Matriculación profesional",
    description: "Requisitos, formularios, costos y procedimiento para la incorporación de nuevos graduados.",
    theme: "indigo",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2z" />
      </>
    ),
  },
  {
    name: "Firma digital",
    description: "Emisión, renovación y soporte técnico de certificados criptográficos autorizados ante la ONTI.",
    theme: "cyan",
    icon: (
      <>
        <path d="m4 16 9-9 4 4-9 9H4zM14 6l2-2 4 4-2 2M4 20h16" />
      </>
    ),
  },
  {
    name: "Padrón de matriculados",
    description: "Búsqueda oficial y constatación de profesionales habilitados para el ejercicio en la jurisdicción.",
    theme: "blue",
    action: "matricula",
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5M8 10h5m-5 3h3" />
      </>
    ),
  },
  {
    name: "Honorarios sugeridos",
    description: "Módulos arancelarios vigentes, pautas mínimas referenciales y calculadores técnicos.",
    theme: "amber",
    icon: (
      <path d="M4 5h16v14H4zM8 9h8M8 13h3m4 0h1M8 16h8" />
    ),
  },
  {
    name: "Normativa profesional",
    description: "Resoluciones técnicas FACPCE, circulares de Secretaría Técnica y jurisprudencia contable.",
    theme: "rose",
    icon: (
      <path d="M5 3h14v18H5zM8 7h8m-8 4h8m-8 4h5" />
    ),
  },
  {
    name: "Caja de seguridad social",
    description: "Régimen previsional, aportes obligatorios, cobertura de salud y subsidios para matriculados.",
    theme: "teal",
    icon: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    name: "Biblioteca técnica",
    description: "Doctrina especializada, modelos de notas, informes profesionales y publicaciones periódicas.",
    theme: "orange",
    icon: (
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    ),
  },
];

export default function Services() {
  const { openDialog, showToast } = useModal();

  const handleCardClick = (e: React.MouseEvent, item: ServiceItem) => {
    e.preventDefault();
    if (item.action === 'matricula') {
      openDialog('matricula');
    } else {
      showToast(`${item.name}: Módulo disponible próximamente.`);
    }
  };

  return (
    <section className="section services-section" id="servicios" aria-labelledby="servicios-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-kicker">Herramientas y gestiones</span>
            <h2 id="servicios-title">Servicios para el Profesional</h2>
          </div>
          <p className="section-subtitle">
            Accedé de forma centralizada a las principales gestiones técnicas, arancelarias y de autogestión del Consejo.
          </p>
        </div>

        <div className="service-grid">
          {services.map((item, index) => (
            <div
              key={index}
              className="service-card"
              data-theme={item.theme}
              onClick={(e) => handleCardClick(e, item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(e as any, item);
                }
              }}
            >
              <div className="service-icon-box">
                <svg
                  className="icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {item.icon}
                </svg>
              </div>

              <div className="service-body">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>

              <div className="service-action">
                <span>Acceder</span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
