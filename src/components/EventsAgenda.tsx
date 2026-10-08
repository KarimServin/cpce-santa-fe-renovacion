'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';

interface EventItem {
  id: string;
  tags: string[];
  title: string;
  date: string;
  location: string;
  image: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-1',
    tags: ['Tributaria', 'Jornadas'],
    title: 'Jornadas Tributarias Provinciales 2026',
    date: '24 y 25 de Octubre',
    location: 'Auditorio Sede Central & Streaming',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'evt-2',
    tags: ['Congresos', 'Actualización'],
    title: 'Congreso de Ciencias Económicas',
    date: '12 de Noviembre',
    location: 'Santa Fe Capital',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'evt-3',
    tags: ['Comunidad CPCE', 'Networking'],
    title: 'Encuentro Anual de Jóvenes Graduados',
    date: '28 de Noviembre',
    location: 'Espacio Social y Deportivo',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'evt-4',
    tags: ['Innovación', 'Finanzas Tech'],
    title: 'Seminario de IA aplicada a Finanzas',
    date: '04 de Diciembre',
    location: 'Modalidad Streaming en Vivo',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'evt-5',
    tags: ['Act. Judicial', 'Peritajes'],
    title: 'Taller Práctico de Actuación Judicial',
    date: '10 de Diciembre',
    location: 'Sala de Conferencias CPCE',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1000&auto=format&fit=crop',
  },
];

export default function EventsAgenda() {
  const { showToast } = useModal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

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

  const maxIndex = Math.max(0, EVENTS_DATA.length - visibleCards);

  // Asegurar que currentIndex no supere maxIndex al cambiar resolución
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

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

  // Cálculo de gap y ancho de card
  const gap = visibleCards === 1 ? 16 : visibleCards === 2 ? 18 : 24;

  return (
    <section className="events-agenda-section" id="agenda-eventos" aria-labelledby="agenda-eventos-title">
      <div className="wrap">
        {/* Cabecera con título limpio y proporcionado */}
        <div className="events-agenda-head">
          <h2 id="agenda-eventos-title" className="events-agenda-title">
            Agenda de Eventos
          </h2>
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
            {EVENTS_DATA.map((event) => (
              <div
                key={event.id}
                className="event-card"
                style={{
                  width: `calc((100% - ${(visibleCards - 1) * gap}px) / ${visibleCards})`,
                }}
                onClick={() => showToast(`Inscripción a: ${event.title}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    showToast(`Inscripción a: ${event.title}`);
                  }
                }}
              >
                {/* Imagen con fallback */}
                <img
                  className="event-card-img"
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                />

                {/* Capa de contraste y gradiente */}
                <div className="event-card-overlay" />

                {/* Contenido de la tarjeta */}
                <div className="event-card-content">
                  <div className="event-card-top">
                    {/* Pills / Tags temáticas */}
                    <div className="event-tags-list">
                      {event.tags.map((tag, idx) => (
                        <span key={idx} className="event-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Título en tipografía prominente */}
                    <h3 className="event-card-title">{event.title}</h3>
                  </div>

                  {/* Pie con fecha y badge de acción interactivo */}
                  <div className="event-card-bottom">
                    <span className="event-meta-pill">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {event.date}
                    </span>
                    <span className="event-action-badge">
                      Inscribirme
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie de la sección de eventos */}
        <div className="events-agenda-footer">
          {/* Paginador con puntos / dots inferiores */}
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

          {/* Fila inferior: Botón centrado en azul eléctrico y flechas a la derecha */}
          <div className="events-agenda-footer-actions">
            <a
              href="https://cpcesfe1.org.ar/capacitacion/"
              target="_blank"
              rel="noreferrer"
              className="btn-agenda-all"
            >
              Ver toda la agenda
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            {/* Flechas de navegación en la parte inferior derecha */}
            <div className="events-agenda-nav" aria-label="Navegación de eventos">
              <button
                type="button"
                className="events-nav-btn events-nav-btn--prev"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Ver eventos anteriores"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
