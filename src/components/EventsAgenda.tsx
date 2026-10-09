'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';

export interface EventItem {
  id: string;
  category: string;
  tag: string;
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  location: string;
  modality: string;
  speaker: string;
  image: string;
  description: string;
  registrationUrl: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-1',
    category: 'Jornadas',
    tag: 'Tributaria',
    title: 'Jornadas Tributarias Provinciales 2026',
    date: '24 y 25 de Octubre',
    day: '24-25',
    month: 'OCT',
    time: '09:00 a 18:00 hs',
    location: 'Auditorio Sede Central & Streaming',
    modality: 'Híbrida · Presencial y Online',
    speaker: 'Comisión de Estudios Tributarios CPCE',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
    description:
      'Análisis integral de reformas fiscales provinciales, jurisprudencia reciente y criterios de liquidación con especialistas de primer nivel.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
  {
    id: 'evt-2',
    category: 'Congresos',
    tag: 'Congresos',
    title: 'Congreso de Ciencias Económicas',
    date: '12 de Noviembre',
    day: '12',
    month: 'NOV',
    time: '08:30 a 19:30 hs',
    location: 'Santa Fe Capital',
    modality: 'Presencial',
    speaker: 'Expositores Nacionales e Internacionales',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
    description:
      'El mayor encuentro profesional de la región. Conferencias magistrales, comisiones de estudio y debate sobre el futuro y transformación del ejercicio profesional.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
  {
    id: 'evt-3',
    category: 'Comunidad',
    tag: 'Comunidad CPCE',
    title: 'Encuentro Anual de Jóvenes Graduados',
    date: '28 de Noviembre',
    day: '28',
    month: 'NOV',
    time: '17:00 a 22:00 hs',
    location: 'Espacio Social y Deportivo',
    modality: 'Presencial',
    speaker: 'Comisión de Jóvenes Graduados',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop',
    description:
      'Jornada de integración profesional, talleres de inserción laboral independiente, networking entre pares y cóctel de fin de año.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
  {
    id: 'evt-4',
    category: 'Innovación',
    tag: 'Innovación',
    title: 'Seminario de IA aplicada a Finanzas',
    date: '04 de Diciembre',
    day: '04',
    month: 'DIC',
    time: '18:00 a 20:30 hs',
    location: 'Modalidad Streaming en Vivo',
    modality: 'Streaming en Vivo',
    speaker: 'Especialistas en Fintech y Analítica de Datos',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop',
    description:
      'Herramientas prácticas de Inteligencia Artificial para análisis financiero predictivo, automatización contable y toma de decisiones estratégicas.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
  {
    id: 'evt-5',
    category: 'Práctica Profesional',
    tag: 'Act. Judicial',
    title: 'Taller Práctico de Actuación Judicial',
    date: '10 de Diciembre',
    day: '10',
    month: 'DIC',
    time: '16:00 a 20:00 hs',
    location: 'Sala de Conferencias CPCE',
    modality: 'Presencial',
    speaker: 'Comisión de Actuación Judicial',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1000&auto=format&fit=crop',
    description:
      'Entrenamiento práctico para peritos judiciales: confección de informes periciales, contestación de impugnaciones y regulación de honorarios.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
];

const CATEGORIES = [
  'Todos los eventos',
  'Congresos',
  'Jornadas',
  'Innovación',
  'Comunidad',
];

export default function EventsAgenda() {
  const { showToast } = useModal();
  const [selectedCategory, setSelectedCategory] = useState('Todos los eventos');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Filtrado reactivo por categoría
  const filteredEvents = React.useMemo(() => {
    if (selectedCategory === 'Todos los eventos') return EVENTS_DATA;
    return EVENTS_DATA.filter(
      (evt) =>
        evt.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        evt.tag.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [selectedCategory]);

  // Ajustar cantidad de tarjetas visibles según tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, filteredEvents.length - visibleCards);

  // Asegurar que currentIndex no supere maxIndex al cambiar resolución o filtro
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Manejo de cambio de categoría
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Manejo de gestos táctiles (Swipe)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    } else if (isRightSwipe && currentIndex > 0) {
      handlePrev();
    }
  };

  // Apertura de modal con detalles del evento
  const openEventDetails = (event: EventItem) => {
    setActiveModalEvent(event);
  };

  const closeEventModal = () => {
    setActiveModalEvent(null);
  };

  // Manejo de teclado para modal (Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalEvent) {
        closeEventModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalEvent]);

  // Cálculo de gap dinámico
  const gap = visibleCards === 1 ? 16 : visibleCards === 2 ? 20 : 24;

  return (
    <section
      className="events-agenda-section"
      id="agenda-eventos"
      aria-labelledby="agenda-eventos-title"
    >
      {/* Halo de luz aurora decorativo que conecta con Hero y Chambers */}
      <div className="events-glow-container" aria-hidden="true">
        <div className="events-glow-blob events-glow-blob--1" />
        <div className="events-glow-blob events-glow-blob--2" />
        <div className="events-glow-blob events-glow-blob--3" />
        <div className="events-glow-blob events-glow-blob--4" />
      </div>

      <div className="wrap">
        {/* Cabecera integrada al estilo institucional de Hero, Chambers y Novedades */}
        <div className="events-header-wrap">
          <div className="events-header-text">
            <span className="events-eyebrow">
              AGENDA INSTITUCIONAL · CAPACITACIÓN Y DESARROLLO
            </span>
            <h2 id="agenda-eventos-title" className="events-agenda-title">
              Agenda de Eventos
            </h2>
            <p className="events-agenda-subtitle">
              Congresos, jornadas tributarias, seminarios y actividades de actualización organizadas por Cámara Primera.
            </p>
          </div>

          {/* Selector de categorías temáticas interactivo */}
          <div
            className="events-category-filters"
            role="tablist"
            aria-label="Filtrar eventos por categoría"
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`events-category-pill ${isActive ? 'events-category-pill--active' : ''}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewport del Carrusel */}
        <div
          className="events-carousel-viewport"
          ref={viewportRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="events-carousel-track"
            style={{
              gap: `${gap}px`,
              transform: `translateX(calc(-${currentIndex} * ((100% - ${(visibleCards - 1) * gap}px) / ${visibleCards} + ${gap}px)))`,
            }}
          >
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="event-card"
                style={{
                  width: `calc((100% - ${(visibleCards - 1) * gap}px) / ${visibleCards})`,
                }}
                onClick={() => openEventDetails(event)}
                role="button"
                tabIndex={0}
                aria-label={`Ver detalles e inscribirse a: ${event.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openEventDetails(event);
                  }
                }}
              >
                {/* Imagen de fondo con zoom fluido */}
                <img
                  className="event-card-img"
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                />

                {/* Capas de gradientes para contraste y luminosidad equilibrada */}
                <div className="event-card-overlay" />
                <div className="event-card-shimmer" />

                {/* Contenido limpio dentro de la tarjeta */}
                <div className="event-card-content">
                  {/* Fila superior: Tag único y Badge de fecha calendario */}
                  <div className="event-card-header-row">
                    <span className="event-tag-pill event-tag-pill--primary">
                      {event.tag}
                    </span>

                    {/* Insignia de fecha calendario flotante en frosted glass */}
                    <div className="event-date-badge" aria-label={`Fecha: ${event.date}`}>
                      <span className="event-date-badge-day">{event.day}</span>
                      <span className="event-date-badge-month">{event.month}</span>
                    </div>
                  </div>

                  {/* Parte inferior: Título del evento y ubicación */}
                  <div className="event-card-bottom">
                    <h3 className="event-card-title">{event.title}</h3>

                    <div className="event-location-row">
                      <svg
                        className="event-loc-icon"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                      >
                        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="event-loc-text">{event.location}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Pie de la sección de eventos */}
        <div className="events-agenda-footer">
          {/* Paginador con dots que se expanden a píldora activa */}
          <div className="events-agenda-dots" role="tablist" aria-label="Páginas de eventos">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`events-dot ${currentIndex === dotIdx ? 'events-dot--active' : ''}`}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Ir al grupo de eventos ${dotIdx + 1}`}
                aria-selected={currentIndex === dotIdx}
                role="tab"
              />
            ))}
          </div>

          <div className="events-agenda-footer-actions">
            <a
              href="/calendar"
              className="btn-agenda-all"
            >
              Ver calendario institucional
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            {/* Flechas de navegación circulares */}
            <div className="events-agenda-nav" aria-label="Navegación de carrusel">
              <button
                type="button"
                className="events-nav-btn events-nav-btn--prev"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Ver eventos anteriores"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                className="events-nav-btn events-nav-btn--next"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Ver próximos eventos"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal interactivo de detalle e inscripción a evento */}
      {activeModalEvent && (
        <div
          className="event-modal-backdrop"
          onClick={closeEventModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
        >
          <div
            className="event-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera con imagen y overlay */}
            <div className="event-modal-header">
              <img
                src={activeModalEvent.image}
                alt={activeModalEvent.title}
                className="event-modal-header-img"
              />
              <div className="event-modal-header-overlay" />
              <button
                type="button"
                className="event-modal-close-btn"
                onClick={closeEventModal}
                aria-label="Cerrar modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              <div className="event-modal-header-badges">
                <span className="event-modal-category-badge">
                  {activeModalEvent.tag}
                </span>
                <span className="event-modal-date-badge">
                  {activeModalEvent.date}
                </span>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="event-modal-body">
              <h3 id="event-modal-title" className="event-modal-title">
                {activeModalEvent.title}
              </h3>
              <p className="event-modal-desc">
                {activeModalEvent.description}
              </p>

              {/* Grilla de metadatos del evento */}
              <div className="event-modal-grid">
                <div className="event-modal-item">
                  <span className="event-modal-item-label">FECHA Y HORARIO</span>
                  <div className="event-modal-item-val">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{activeModalEvent.date} · {activeModalEvent.time}</span>
                  </div>
                </div>

                <div className="event-modal-item">
                  <span className="event-modal-item-label">MODALIDAD Y SEDE</span>
                  <div className="event-modal-item-val">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2">
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{activeModalEvent.location} ({activeModalEvent.modality})</span>
                  </div>
                </div>

                <div className="event-modal-item">
                  <span className="event-modal-item-label">DISERTANTES / ORGANIZACIÓN</span>
                  <div className="event-modal-item-val">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>{activeModalEvent.speaker}</span>
                  </div>
                </div>
              </div>

              {/* Botones de acción del modal */}
              <div className="event-modal-actions">
                <a
                  href={activeModalEvent.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-modal-btn-submit"
                  onClick={() => {
                    showToast(`Redirigiendo a inscripción: ${activeModalEvent.title}`);
                  }}
                >
                  Inscribirme online en Portal CPCE ↗
                </a>
                <button
                  type="button"
                  className="event-modal-btn-secondary"
                  onClick={() => {
                    showToast(`Recordatorio guardado para: ${activeModalEvent.title}`);
                    closeEventModal();
                  }}
                >
                  Guardar recordatorio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
