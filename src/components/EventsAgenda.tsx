'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from '../context/ModalContext';

/**
 * Banda "Capacitación y eventos" — Figma "CPCE1_Web_Fase2" (nodo 482:2248, 1440 × 677).
 * Encabezado con filtro por categoría, "Fila de eventos" desplazable (tarjetas de 300 px) y
 * "Pie" con las flechas del carrusel y el botón "Ver el calendario completo".
 * Los filtros replican las variantes "Filtro · Capacitación / Cultural / Institucional"
 * (nodos 244:1169, 244:1308 y 244:1447): cada una muestra solo las tarjetas de ese tema.
 */

type Tema = 'Capacitación' | 'Cultural' | 'Institucional';

export interface EventItem {
  id: string;
  tema: Tema;
  titulo: string;
  /** "Fecha · Etiqueta" tal como figura en la tarjeta (día + mes abreviado) */
  fecha: string;
  /** Fecha leída por lectores de pantalla y mostrada en el detalle */
  fechaLarga: string;
  /** En Figma las fechas de noviembre usan Azul base en vez de Azul acento */
  fechaTono?: 'base';
  /** Algunos eventos no tienen hora (en Figma la capa "Hora" está oculta) */
  hora?: string;
  lugar: string;
  imagen: string;
  /** Encuadre especial de la foto (Figma recorta algunas con zoom hacia una esquina) */
  encuadre?: 'zoom-abajo-derecha';
  /** Inscripción externa (solo para las actividades de capacitación) */
  inscripcionUrl?: string;
}

const URL_CAPACITACION = 'https://cpcesfe1.org.ar/capacitacion/';

// Contenido de la "Fila de eventos" de Figma, en el mismo orden que el diseño
const EVENTOS: EventItem[] = [
  {
    id: 'reforma-laboral-fal',
    tema: 'Capacitación',
    titulo: 'Reforma laboral: Fondo de Asistencia Laboral',
    fecha: '22 OCT',
    fechaLarga: '22 de octubre',
    hora: '16 h',
    lugar: 'Reconquista',
    imagen: '/images/capacitacion/evento-reforma-laboral.jpg',
    inscripcionUrl: URL_CAPACITACION,
  },
  {
    id: 'noche-de-los-museos',
    tema: 'Cultural',
    titulo: 'Noche de los Museos',
    fecha: '24 OCT',
    fechaLarga: '24 de octubre',
    lugar: 'Sede central',
    imagen: '/images/capacitacion/evento-noche-museos.jpg',
  },
  {
    id: 'inversiones-alta-volatilidad',
    tema: 'Institucional',
    titulo: 'Inversiones en contextos de alta volatilidad',
    fecha: '27 OCT',
    fechaLarga: '27 de octubre',
    hora: '18 h',
    lugar: 'Santa Fe',
    imagen: '/images/capacitacion/evento-inversiones.jpg',
  },
  {
    id: 'ciclo-cultural-brenda-bock',
    tema: 'Capacitación',
    titulo: 'Ciclo Cultural: Brenda Böck Samba Trío',
    fecha: '29 OCT',
    fechaLarga: '29 de octubre',
    hora: '20.30 h',
    lugar: 'Auditorio CPCE',
    imagen: '/images/capacitacion/evento-ciclo-cultural.jpg',
    encuadre: 'zoom-abajo-derecha',
    inscripcionUrl: URL_CAPACITACION,
  },
  {
    id: 'donacion-de-sangre',
    tema: 'Institucional',
    titulo: 'Jornada de donación voluntaria de sangre',
    fecha: '12 NOV',
    fechaLarga: '12 de noviembre',
    fechaTono: 'base',
    hora: '8:30 h',
    lugar: 'Sede Central',
    imagen: '/images/capacitacion/evento-donacion-sangre.jpg',
  },
  {
    id: 'conversatorio-arbitraje',
    tema: 'Capacitación',
    titulo: 'Conversatorio sobre arbitraje institucional',
    fecha: '11 NOV',
    fechaLarga: '11 de noviembre',
    fechaTono: 'base',
    hora: '18:30 h',
    lugar: 'Auditorio Bolsa de Comercio de Santa Fe',
    imagen: '/images/capacitacion/evento-arbitraje.jpg',
    inscripcionUrl: URL_CAPACITACION,
  },
];

type Filtro = 'Todos' | Tema;

// "Filtro por categoría" (chips de Figma)
const FILTROS: Filtro[] = ['Todos', 'Capacitación', 'Cultural', 'Institucional'];

// "Fila de eventos": separación de 28 px entre tarjetas
const ROW_ID = 'events-fila';

export default function EventsAgenda() {
  const { showToast } = useModal();
  const [filtro, setFiltro] = useState<Filtro>('Todos');
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [eventoActivo, setEventoActivo] = useState<EventItem | null>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const eventos = useMemo(
    () => (filtro === 'Todos' ? EVENTOS : EVENTOS.filter((evt) => evt.tema === filtro)),
    [filtro]
  );

  // Estado de las flechas según la posición de desplazamiento de la fila
  const updateArrows = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    setCanPrev(row.scrollLeft > 4);
    setCanNext(row.scrollLeft + row.clientWidth < row.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    updateArrows();
    row.addEventListener('scroll', updateArrows, { passive: true });
    const observer = new ResizeObserver(updateArrows);
    observer.observe(row);
    return () => {
      row.removeEventListener('scroll', updateArrows);
      observer.disconnect();
    };
  }, [updateArrows]);

  // Al cambiar de filtro la fila vuelve al inicio
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollTo({ left: 0, behavior: 'auto' });
    updateArrows();
  }, [filtro, updateArrows]);

  // Avanza o retrocede de a una tarjeta (ancho de tarjeta + separación)
  const scrollByCard = (direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector<HTMLElement>('.events-card');
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : row.clientWidth * 0.8;
    row.scrollBy({ left: direction * step });
  };

  const openEvento = (evento: EventItem, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setEventoActivo(evento);
  };

  const closeEvento = useCallback(() => {
    setEventoActivo(null);
    lastTriggerRef.current?.focus();
  }, []);

  // Modal: Escape para cerrar, foco inicial en "Cerrar" y bloqueo del scroll de la página
  useEffect(() => {
    if (!eventoActivo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeEvento();
    };
    window.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [eventoActivo, closeEvento]);

  return (
    <section className="events-band" id="agenda-eventos" aria-labelledby="agenda-eventos-title">
      {/* "Aurora blob center (#0052FF 28% / #0EA5E9 16%, blur 52)" — nodos 482:2250 y 482:2249 */}
      <div className="events-aurora events-aurora--izquierda" aria-hidden="true" />
      <div className="events-aurora events-aurora--derecha" aria-hidden="true" />

      {/* "Sección · Capacitación y eventos" (1286 × 517 en x = 77) */}
      <div className="events-container">
        {/* "Encabezado" */}
        <div className="events-header">
          <h2 id="agenda-eventos-title" className="events-title">
            Capacitación y eventos
          </h2>

          {/* "Filtro por categoría" */}
          <div className="events-filters" role="group" aria-label="Filtrar eventos por categoría">
            {FILTROS.map((item) => {
              const isActive = filtro === item;
              return (
                <button
                  key={item}
                  type="button"
                  className={`events-chip${isActive ? ' events-chip--active' : ''}`}
                  aria-pressed={isActive}
                  aria-controls={ROW_ID}
                  onClick={() => setFiltro(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <p className="events-sr-only" aria-live="polite">
          {filtro === 'Todos'
            ? `Mostrando ${eventos.length} eventos`
            : `Mostrando ${eventos.length} ${eventos.length === 1 ? 'evento' : 'eventos'} de ${filtro}`}
        </p>

        {/* "Fila de eventos": se desplaza dentro de su propio contenedor */}
        <ul id={ROW_ID} ref={rowRef} className="events-row" aria-label="Próximos eventos">
          {eventos.map((evento) => (
            <li key={evento.id} className="events-card">
              {/* "Foto (proporción fija)" */}
              <div className="events-card-photo">
                <Image
                  src={evento.imagen}
                  alt=""
                  fill
                  sizes="276px"
                  className={`events-card-img${
                    evento.encuadre ? ` events-card-img--${evento.encuadre}` : ''
                  }`}
                />
              </div>

              {/* "Etiqueta de tema" */}
              <span className="events-card-tag">{evento.tema}</span>

              {/* "Contenido" */}
              <div className="events-card-content">
                <h3 className="events-card-title">
                  <button
                    type="button"
                    className="events-card-trigger"
                    aria-haspopup="dialog"
                    onClick={(e) => openEvento(evento, e.currentTarget)}
                  >
                    {evento.titulo}
                  </button>
                </h3>

                {/* "Hora y lugar" */}
                <div className="events-card-meta">
                  {evento.hora && (
                    <span className="events-card-meta-item">
                      <img src="/images/capacitacion/icono-hora.svg" alt="" width={16} height={16} />
                      <span className="events-sr-only">Hora: </span>
                      <span className="events-card-meta-text">{evento.hora}</span>
                    </span>
                  )}
                  <span className="events-card-meta-item events-card-meta-item--lugar">
                    <img src="/images/capacitacion/icono-lugar.svg" alt="" width={16} height={16} />
                    <span className="events-sr-only">Lugar: </span>
                    <span className="events-card-meta-text">{evento.lugar}</span>
                  </span>
                </div>
              </div>

              {/* "Fecha · Etiqueta" */}
              <span
                className={`events-card-date${
                  evento.fechaTono === 'base' ? ' events-card-date--base' : ''
                }`}
              >
                <span aria-hidden="true">{evento.fecha}</span>
                <span className="events-sr-only">{evento.fechaLarga}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* "Pie": controles del carrusel y botón pastilla */}
        <div className="events-footer">
          <div className="events-arrows">
            <button
              type="button"
              className="events-arrow"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              aria-controls={ROW_ID}
              aria-label="Ver eventos anteriores"
            >
              <img src="/images/capacitacion/flecha-anterior.svg" alt="" width={40} height={40} />
            </button>
            <button
              type="button"
              className="events-arrow"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              aria-controls={ROW_ID}
              aria-label="Ver eventos siguientes"
            >
              <img src="/images/capacitacion/flecha-siguiente.svg" alt="" width={40} height={40} />
            </button>
          </div>

          {/* "Botón · Pastilla · Ver el calendario completo" */}
          <Link href="/calendar" className="events-calendar-btn">
            <span>Ver el calendario completo</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Detalle del evento (diálogo) */}
      {eventoActivo &&
        createPortal(
          <div className="events-modal-backdrop" onClick={closeEvento}>
            <div
              className="events-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="events-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="events-modal-media">
                <Image
                  src={eventoActivo.imagen}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 560px"
                  className={`events-card-img${
                    eventoActivo.encuadre ? ` events-card-img--${eventoActivo.encuadre}` : ''
                  }`}
                />
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="events-modal-close"
                  onClick={closeEvento}
                  aria-label="Cerrar detalle del evento"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
                <span
                  className={`events-card-date events-modal-date${
                    eventoActivo.fechaTono === 'base' ? ' events-card-date--base' : ''
                  }`}
                >
                  {eventoActivo.fecha}
                </span>
              </div>

              <div className="events-modal-body">
                <span className="events-card-tag">{eventoActivo.tema}</span>
                <h3 id="events-modal-title" className="events-modal-title">
                  {eventoActivo.titulo}
                </h3>

                <dl className="events-modal-grid">
                  <div className="events-modal-item">
                    <dt>Fecha y horario</dt>
                    <dd>
                      <img src="/images/capacitacion/icono-hora.svg" alt="" width={16} height={16} />
                      {eventoActivo.hora
                        ? `${eventoActivo.fechaLarga} · ${eventoActivo.hora}`
                        : eventoActivo.fechaLarga}
                    </dd>
                  </div>
                  <div className="events-modal-item">
                    <dt>Lugar</dt>
                    <dd>
                      <img src="/images/capacitacion/icono-lugar.svg" alt="" width={16} height={16} />
                      {eventoActivo.lugar}
                    </dd>
                  </div>
                </dl>

                <div className="events-modal-actions">
                  {eventoActivo.inscripcionUrl ? (
                    <a
                      href={eventoActivo.inscripcionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="events-calendar-btn events-modal-primary"
                      onClick={() => showToast(`Redirigiendo a inscripción: ${eventoActivo.titulo}`)}
                    >
                      Inscribirme en el portal CPCE
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link href="/calendar" className="events-calendar-btn events-modal-primary">
                      Ver en el calendario
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                  <button
                    type="button"
                    className="events-modal-secondary"
                    onClick={() => {
                      showToast(`Recordatorio guardado para: ${eventoActivo.titulo}`);
                      closeEvento();
                    }}
                  >
                    Guardar recordatorio
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
