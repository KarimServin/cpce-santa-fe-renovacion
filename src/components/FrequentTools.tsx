'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useModal } from '../context/ModalContext';

/**
 * Sección "Herramientas frecuentes" del Home
 * (Figma · "Banda · Trámites frecuentes" 482:2387 › "Sección · Herramientas frecuentes" 482:2390).
 *
 * "Filtro por perfil" (Soy: …) que cambia la "Fila de prueba · trámites": tarjetas de trámite
 * de 201 × 144 en un carrusel horizontal con el "Pie · carrusel" (flechas anterior/siguiente).
 * Las variantes de cada perfil salen de los marcos "Filtro · Herramientas · …" (273:1117,
 * 273:1235, 273:1353) de la página "02 Prototipo Homepage CPCE V1".
 */

const ICONOS = '/images/herramientas';

type ProfileId = 'matriculado' | 'quiero-matricularme' | 'actuacion-judicial' | 'publico-general';

interface Tool {
  title: string;
  /** Ícono de 32 × 32 (se pinta con máscara para poder cambiar de color en el hover) */
  icon: string;
  action: () => void;
}

interface Profile {
  id: ProfileId;
  label: string;
  tools: Tool[];
}

// "Chip de perfil" en el orden del "Filtro por perfil"
const PROFILE_LABELS: Record<ProfileId, string> = {
  matriculado: 'Matriculado',
  'quiero-matricularme': 'Quiero matricularme',
  'actuacion-judicial': 'Actuación judicial',
  'publico-general': 'Público general y empresas',
};

const PROFILE_ORDER: ProfileId[] = [
  'matriculado',
  'quiero-matricularme',
  'actuacion-judicial',
  'publico-general',
];

export default function FrequentTools() {
  const { showToast, openDialog } = useModal();
  const [profileId, setProfileId] = useState<ProfileId>('matriculado');
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);

  // Lleva a otra sección del Home si existe; si no, avisa con un toast
  const goToSection = useCallback(
    (selector: string, fallback: string) => {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else showToast(fallback);
    },
    [showToast],
  );

  const toast = (message: string) => () => showToast(message);

  const profiles: Record<ProfileId, Profile> = {
    // Figma 482:2390 (estado "Matriculado")
    matriculado: {
      id: 'matriculado',
      label: PROFILE_LABELS.matriculado,
      tools: [
        { title: 'Legalizaciones', icon: `${ICONOS}/icono-legalizaciones.svg`, action: toast('Legalizaciones') },
        {
          title: 'Honorarios y aranceles',
          icon: `${ICONOS}/icono-honorarios.svg`,
          action: toast('Honorarios y aranceles'),
        },
        { title: 'Medios de pago', icon: `${ICONOS}/icono-medios-de-pago.svg`, action: toast('Medios de pago') },
        { title: 'Firma digital', icon: `${ICONOS}/icono-firma-digital.svg`, action: toast('Token y firma digital') },
        {
          title: 'Asesoramiento contable',
          icon: `${ICONOS}/icono-asesoramiento.svg`,
          action: toast('Asesoramiento contable'),
        },
        {
          title: 'Capacitaciones',
          icon: `${ICONOS}/icono-capacitaciones.svg`,
          action: () => goToSection('#agenda-eventos', 'Capacitaciones'),
        },
        { title: 'Beneficios', icon: `${ICONOS}/icono-beneficios.svg`, action: toast('Beneficios') },
      ],
    },
    // Figma 273:1117 "Filtro · Herramientas · Quiero matricularme"
    'quiero-matricularme': {
      id: 'quiero-matricularme',
      label: PROFILE_LABELS['quiero-matricularme'],
      tools: [
        {
          title: 'Requisitos e inscripción',
          icon: `${ICONOS}/icono-legalizaciones.svg`,
          action: toast('Requisitos e inscripción a la matrícula'),
        },
        { title: 'Plan Joven', icon: `${ICONOS}/extra-icono-plan-joven.svg`, action: toast('Plan Joven') },
        {
          title: 'Costo de matrícula',
          icon: `${ICONOS}/extra-icono-costo-matricula.svg`,
          action: toast('Costo de matrícula'),
        },
        { title: 'Medios de pago', icon: `${ICONOS}/icono-medios-de-pago.svg`, action: toast('Medios de pago') },
        {
          title: 'Beneficios para matriculados',
          icon: `${ICONOS}/icono-beneficios.svg`,
          action: toast('Beneficios para matriculados'),
        },
        {
          title: 'Contacto',
          icon: `${ICONOS}/extra-icono-contacto.svg`,
          action: () => goToSection('#institucional', 'Contacto'),
        },
      ],
    },
    // Figma 273:1235 "Filtro · Herramientas · Actuación judicial"
    'actuacion-judicial': {
      id: 'actuacion-judicial',
      label: PROFILE_LABELS['actuacion-judicial'],
      tools: [
        {
          title: 'Inscripciones a tribunales',
          icon: `${ICONOS}/extra-icono-tribunales.svg`,
          action: toast('Inscripciones a tribunales'),
        },
        {
          title: 'Sorteos de peritos',
          icon: `${ICONOS}/extra-icono-sorteo-peritos.svg`,
          action: toast('Sorteos de peritos'),
        },
        {
          title: 'Sorteos de causas',
          icon: `${ICONOS}/extra-icono-sorteo-causas.svg`,
          action: toast('Sorteos de causas'),
        },
        { title: 'Tasas BNA', icon: `${ICONOS}/extra-icono-tasas.svg`, action: toast('Tasas BNA') },
        {
          title: 'Calculador de honorarios',
          icon: `${ICONOS}/icono-honorarios.svg`,
          action: toast('Calculador de honorarios'),
        },
        { title: 'Resoluciones', icon: `${ICONOS}/extra-icono-resoluciones.svg`, action: toast('Resoluciones') },
      ],
    },
    // Figma 273:1353 "Filtro · Herramientas · Público general y empresas"
    'publico-general': {
      id: 'publico-general',
      label: PROFILE_LABELS['publico-general'],
      tools: [
        {
          title: 'Buscar profesional habilitado',
          icon: `${ICONOS}/extra-icono-buscar-profesional.svg`,
          action: () => openDialog('matricula'),
        },
        {
          title: 'Denuncia de ejercicio ilegal',
          icon: `${ICONOS}/extra-icono-denuncia.svg`,
          action: toast('Denuncia por ejercicio ilegal'),
        },
        {
          title: 'Delegaciones y contacto',
          icon: `${ICONOS}/extra-icono-delegaciones.svg`,
          action: () => goToSection('#institucional', 'Delegaciones y contacto'),
        },
      ],
    },
  };

  const profile = profiles[profileId];

  // Estado de las flechas según la posición del carrusel
  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 1);
    setCanNext(track.scrollLeft < maxScroll - 1);
  }, []);

  // La lista se vuelve a montar con cada perfil (key), así que los oyentes se enganchan de nuevo
  // y el carrusel arranca desde el inicio
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = 0;
    updateArrows();
    track.addEventListener('scroll', updateArrows, { passive: true });
    const observer = new ResizeObserver(updateArrows);
    observer.observe(track);
    return () => {
      track.removeEventListener('scroll', updateArrows);
      observer.disconnect();
    };
  }, [profileId, updateArrows]);

  // Avanza o retrocede una tarjeta (ancho de la tarjeta + separación)
  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('.frequent-tools-item');
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      className="frequent-tools-band"
      id="herramientas-frecuentes"
      aria-labelledby="frequent-tools-title"
    >
      {/* "Aurora blob center (#0052FF 28% / #0EA5E9 16%, blur 52)" (482:2388 y 482:2389) */}
      <span className="frequent-tools-aurora frequent-tools-aurora--left" aria-hidden="true" />
      <span className="frequent-tools-aurora frequent-tools-aurora--right" aria-hidden="true" />

      <div className="frequent-tools-inner">
        {/* "Encabezado · Herramientas frecuentes" */}
        <header className="frequent-tools-header">
          <span className="frequent-tools-accent" aria-hidden="true" />
          <h2 id="frequent-tools-title" className="frequent-tools-title">
            Herramientas frecuentes
          </h2>
        </header>

        {/* "Contenedor · Filtro por perfil" */}
        <div className="frequent-tools-filter-wrap">
          <div className="frequent-tools-filter" role="group" aria-label="Soy: filtrar herramientas por perfil">
            <span className="frequent-tools-filter-label" aria-hidden="true">
              Soy:
            </span>
            {PROFILE_ORDER.map((id) => {
              const active = id === profileId;
              return (
                <button
                  key={id}
                  type="button"
                  className={`frequent-tools-chip${active ? ' frequent-tools-chip--active' : ''}`}
                  aria-pressed={active}
                  onClick={() => setProfileId(id)}
                >
                  {PROFILE_LABELS[id]}
                </button>
              );
            })}
          </div>
        </div>

        {/* "Fila de prueba · trámites" */}
        <ul
          ref={trackRef}
          id="frequent-tools-track"
          className="frequent-tools-track"
          aria-label={`Herramientas para ${profile.label.toLowerCase()}`}
        >
          {/* La clave incluye el perfil para que las tarjetas se vuelvan a montar (y aparezcan
              con un fundido) al cambiar de perfil */}
          {profile.tools.map((tool) => (
            <li key={`${profile.id}-${tool.title}`} className="frequent-tools-item">
              {/* "Tarjeta de trámite" */}
              <button type="button" className="frequent-tools-card" onClick={tool.action}>
                <span
                  className="frequent-tools-card-icon"
                  aria-hidden="true"
                  style={{ WebkitMaskImage: `url(${tool.icon})`, maskImage: `url(${tool.icon})` }}
                />
                <span className="frequent-tools-card-title">{tool.title}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* "Pie · carrusel" › "Flechas" ("Flecha de carrusel": Anterior/Siguiente · Normal/Deshabilitado).
            Las variantes que no vienen del diseño son el espejo de las que sí. */}
        <div className="frequent-tools-arrows">
          <button
            type="button"
            className="frequent-tools-arrow"
            aria-label="Herramientas anteriores"
            aria-controls="frequent-tools-track"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
          >
            <img
              src={`${ICONOS}/${canPrev ? 'flecha-siguiente-normal.svg' : 'flecha-anterior-deshabilitada.svg'}`}
              alt=""
              width={40}
              height={40}
              className={canPrev ? 'frequent-tools-arrow-img--mirror' : undefined}
            />
          </button>
          <button
            type="button"
            className="frequent-tools-arrow"
            aria-label="Herramientas siguientes"
            aria-controls="frequent-tools-track"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
          >
            <img
              src={`${ICONOS}/${canNext ? 'flecha-siguiente-normal.svg' : 'flecha-anterior-deshabilitada.svg'}`}
              alt=""
              width={40}
              height={40}
              className={canNext ? undefined : 'frequent-tools-arrow-img--mirror'}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
