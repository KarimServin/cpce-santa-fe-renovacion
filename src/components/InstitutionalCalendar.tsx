'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';
import {
  INSTITUTIONAL_EVENTS,
  CALENDAR_CATEGORIES,
  CalendarEvent,
} from '../content/calendar-data';

interface DayCellData {
  dayNumber: number;
  dateStr: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  events: CalendarEvent[];
  dayOfWeekIndex: number; // 0 = Lu, 1 = Ma, ...
}

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const WEEKDAY_NAMES_5 = ['Lu', 'Ma', 'Mie', 'Ju', 'Vi'];
const WEEKDAY_NAMES_7 = ['Lu', 'Ma', 'Mie', 'Ju', 'Vi', 'Sáb', 'Dom'];

export default function InstitutionalCalendar() {
  const { showToast } = useModal();

  // Fecha de referencia inicial: Octubre 2026 (mes del sistema y de la captura)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 1-12 (10 = Octubre)

  // Filtros y vistas
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos los eventos');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [includeWeekends, setIncludeWeekends] = useState(false); // Default: Lu - Vi (5 días) como en la captura

  // Modales
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<{
    dayNumber: number;
    monthName: string;
    events: CalendarEvent[];
  } | null>(null);

  // Fecha de hoy (9 de Octubre 2026)
  const todayDay = 9;
  const todayMonth = 10;
  const todayYear = 2026;

  // Manejadores de navegación de mes
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleGoToToday = () => {
    setCurrentMonth(todayMonth);
    setCurrentYear(todayYear);
    showToast('Navegando a Octubre 2026 (Día de hoy)');
  };

  // Filtrado de eventos por categoría y término de búsqueda
  const filteredEvents = useMemo(() => {
    return INSTITUTIONAL_EVENTS.filter((evt) => {
      const matchMonth = evt.year === currentYear && evt.month === currentMonth;
      if (!matchMonth) return false;

      const matchCategory =
        selectedCategory === 'Todos los eventos' ||
        evt.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        evt.tag.toLowerCase().includes(selectedCategory.toLowerCase());

      const matchSearch =
        searchQuery.trim() === '' ||
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [currentYear, currentMonth, selectedCategory, searchQuery]);

  // Lista de eventos de todo el mes sin filtro para badges y cálculos
  const monthTotalEventsCount = useMemo(() => {
    return INSTITUTIONAL_EVENTS.filter(
      (evt) => evt.year === currentYear && evt.month === currentMonth && !evt.isHoliday
    ).length;
  }, [currentYear, currentMonth]);

  // Generación de la grilla de semanas y días
  // Vista 5 días (Lu a Vi) o 7 días (Lu a Dom)
  const calendarWeeks = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0 = Dom, 1 = Lu, ..., 6 = Sab
    
    // Convertir a base Lunes = 0, Martes = 1, ..., Domingo = 6
    const firstDayMondayBased = (firstDayIndex + 6) % 7;

    const weeks: (DayCellData | null)[][] = [];
    let currentWeek: (DayCellData | null)[] = [];

    const numCols = includeWeekends ? 7 : 5;

    // Rellenar días en blanco antes del primer día del mes
    if (!includeWeekends) {
      // Para vista Lu-Vi: si el mes arranca jueves (firstDayMondayBased = 3), se ponen 3 espacios vacíos (Lu, Ma, Mie)
      // Si arranca sábado (5) o domingo (6), no hay días previos en la semana laboral
      const emptyDaysBefore = Math.min(firstDayMondayBased, 5);
      for (let i = 0; i < emptyDaysBefore; i++) {
        currentWeek.push(null);
      }
    } else {
      for (let i = 0; i < firstDayMondayBased; i++) {
        currentWeek.push(null);
      }
    }

    // Iterar por cada día del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentYear, currentMonth - 1, day);
      const dayOfWeek = (dateObj.getDay() + 6) % 7; // 0 = Lu, ..., 4 = Vi, 5 = Sab, 6 = Dom
      const isWeekend = dayOfWeek >= 5;

      // Si es vista de 5 días y es fin de semana, ignoramos o agrupamos si no estamos mostrando fines de semana
      if (!includeWeekends && isWeekend) {
        continue;
      }

      const dayEvents = filteredEvents.filter((evt) => evt.day === day);
      const isToday =
        day === todayDay &&
        currentMonth === todayMonth &&
        currentYear === todayYear;

      const cellData: DayCellData = {
        dayNumber: day,
        dateStr: `${day} de ${MONTH_NAMES[currentMonth - 1]} de ${currentYear}`,
        isCurrentMonth: true,
        isToday,
        isWeekend,
        events: dayEvents,
        dayOfWeekIndex: dayOfWeek,
      };

      currentWeek.push(cellData);

      // Si la semana se llenó según la cantidad de columnas
      if (currentWeek.length === numCols) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Completar la última semana con celdas nulas si quedó abierta
    if (currentWeek.length > 0) {
      while (currentWeek.length < numCols) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  }, [currentYear, currentMonth, filteredEvents, includeWeekends]);

  // Manejo de teclado para cerrar modales con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null);
        setSelectedDayEvents(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Generador de archivo .ics (iCalendar) para exportar al calendario del matriculado
  const handleExportICS = (event: CalendarEvent) => {
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const timeParts = event.time.split(':');
    const hour = parseInt(timeParts[0] || '10', 10);
    const minute = parseInt(timeParts[1] || '00', 10);

    const start = `${event.year}${pad(event.month)}${pad(event.day)}T${pad(hour)}${pad(minute)}00`;
    const end = `${event.year}${pad(event.month)}${pad(event.day)}T${pad(hour + 2)}${pad(minute)}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CPCE Santa Fe Camara Primera//ES',
      'BEGIN:VEVENT',
      `UID:${event.id}-${Date.now()}@cpcesfe1.org.ar`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description} - Disertante: ${event.speaker}`,
      `LOCATION:${event.location}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `evento-cpce-${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Descargando recordatorio .ics: ${event.title}`);
  };

  const handleShareEvent = (event: CalendarEvent) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(
        `Evento CPCE Santa Fe: "${event.title}" el ${event.day}/${event.month}/${event.year} a las ${event.time} hs. Más información: ${event.registrationUrl}`
      );
      showToast('Enlace y datos del evento copiados al portapapeles');
    } else {
      showToast('Enlace listo para compartir');
    }
  };

  const weekdaysList = includeWeekends ? WEEKDAY_NAMES_7 : WEEKDAY_NAMES_5;

  return (
    <div className="calendar-page-container">
      {/* ── SECCIÓN HERO BANNER INSTITUCIONAL (Estilo Home con Aurora) ── */}
      <section className="calendar-hero-section" aria-labelledby="calendar-main-title">
        {/* Halos de luz aurora como en Hero y Chambers */}
        <div className="calendar-aurora-bg" aria-hidden="true">
          <div className="aurora-blob aurora-blob--top-left" />
          <div className="calendar-aurora-blob calendar-aurora-blob--center" />
          <div className="calendar-aurora-blob calendar-aurora-blob--right" />
        </div>

        <div className="wrap calendar-hero-wrap">
          {/* Breadcrumbs accesibles */}
          <nav className="calendar-breadcrumbs" aria-label="Ruta de navegación">
            <a href="/" className="calendar-breadcrumb-link">Inicio</a>
            <span className="calendar-breadcrumb-sep">/</span>
            <a href="/#agenda-eventos" className="calendar-breadcrumb-link">Capacitación y eventos</a>
            <span className="calendar-breadcrumb-sep">/</span>
            <span className="calendar-breadcrumb-current">Calendario Institucional</span>
          </nav>

          <div className="calendar-hero-header">
            <div className="calendar-hero-title-group">
              <span className="calendar-hero-eyebrow">
                PORTAL INSTITUCIONAL · CPCE SANTA FE CÁMARA I
              </span>
              <h1 id="calendar-main-title" className="calendar-hero-title">
                Calendario <span className="calendar-title-serif">Institucional</span>
              </h1>
              <p className="calendar-hero-subtitle">
                Cronograma de actividades, jornadas tributarias, comisiones de estudio, cursos de posgrado y reuniones oficiales del Consejo Profesional.
              </p>
            </div>

            {/* Badges de resumen mensual */}
            <div className="calendar-stat-badges">
              <div className="calendar-stat-pill">
                <span className="calendar-stat-pill-dot" />
                <strong>{monthTotalEventsCount}</strong> actividades en {MONTH_NAMES[currentMonth - 1]}
              </div>
              <div className="calendar-stat-pill calendar-stat-pill--outline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Sede Central & Delegaciones</span>
              </div>
              <div className="calendar-stat-pill calendar-stat-pill--outline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                <span>Híbrido & Streaming</span>
              </div>
            </div>
          </div>

          {/* Barra de Filtros y Búsqueda */}
          <div className="calendar-search-filters-bar">
            {/* Buscador de actividades */}
            <div className="calendar-search-box">
              <svg
                className="calendar-search-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="calendar-search-input"
                placeholder="Buscar por tema, disertante, comisión, palabra clave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Buscar actividades en el calendario"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="calendar-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpiar búsqueda"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Categorías Temáticas */}
            <div className="calendar-categories-scroll" role="tablist" aria-label="Filtrar por área técnica">
              {CALENDAR_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`calendar-category-pill ${isActive ? 'calendar-category-pill--active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CUERPO DEL CALENDARIO INSTITUCIONAL ── */}
      <section className="calendar-main-section wrap" aria-label="Vista del Calendario">
        {/* Barra superior de controles: Vistas, Selector de Mes y Acciones */}
        <div className="calendar-controls-bar">
          {/* Selector de Vista: Mes vs Lista */}
          <div className="calendar-view-switcher" role="group" aria-label="Seleccionar formato de vista">
            <button
              type="button"
              className={`calendar-view-btn ${viewMode === 'month' ? 'calendar-view-btn--active' : ''}`}
              onClick={() => setViewMode('month')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Vista Mes</span>
            </button>
            <button
              type="button"
              className={`calendar-view-btn ${viewMode === 'list' ? 'calendar-view-btn--active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              <span>Vista Agenda</span>
            </button>
          </div>

          {/* Navegador de Mes estilo institucional idéntico a la captura: < Octubre 2026 > */}
          <div className="calendar-month-selector" aria-label="Navegador de mes">
            <button
              type="button"
              className="calendar-nav-arrow-btn"
              onClick={handlePrevMonth}
              aria-label="Mes anterior"
              title="Mes anterior"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <h2 className="calendar-month-title">
              {MONTH_NAMES[currentMonth - 1]} {currentYear}
            </h2>

            <button
              type="button"
              className="calendar-nav-arrow-btn"
              onClick={handleNextMonth}
              aria-label="Próximo mes"
              title="Próximo mes"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Acciones auxiliares: Botón Hoy y Selector de días hábiles / fin de semana */}
          <div className="calendar-actions-aux">
            <button
              type="button"
              className="calendar-today-btn"
              onClick={handleGoToToday}
              title="Volver a la fecha actual"
            >
              <span className="calendar-today-indicator" />
              <span>Hoy</span>
            </button>

            <button
              type="button"
              className={`calendar-weekend-toggle ${includeWeekends ? 'calendar-weekend-toggle--active' : ''}`}
              onClick={() => setIncludeWeekends((prev) => !prev)}
              title="Alternar entre 5 días hábiles y semana completa"
            >
              {includeWeekends ? 'Semana (7 días)' : 'Lu a Vi (5 días)'}
            </button>
          </div>
        </div>

        {/* ── MODO 1: VISTA MENSUAL (TABLA INSTITUCIONAL EXACTA DE LA CAPTURA) ── */}
        {viewMode === 'month' && (
          <div className="calendar-table-card">
            <div className="calendar-table-responsive">
              <table className="calendar-table" role="grid" aria-label={`Calendario de ${MONTH_NAMES[currentMonth - 1]} ${currentYear}`}>
                {/* Cabecera con nombres de días: Lu, Ma, Mie, Ju, Vi */}
                <thead>
                  <tr className="calendar-header-row">
                    {weekdaysList.map((dayName) => (
                      <th key={dayName} className="calendar-th" scope="col">
                        {dayName}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Grilla de semanas */}
                <tbody>
                  {calendarWeeks.map((week, weekIdx) => (
                    <tr key={`week-${weekIdx}`} className="calendar-tr">
                      {week.map((cell, cellIdx) => {
                        // Celda vacía antes o después del mes
                        if (!cell) {
                          return (
                            <td
                              key={`empty-${weekIdx}-${cellIdx}`}
                              className="calendar-td calendar-td--empty"
                              aria-hidden="true"
                            >
                              <div className="calendar-cell-inner" />
                            </td>
                          );
                        }

                        const hasEvents = cell.events.length > 0;
                        const visibleEvents = cell.events.slice(0, 2);
                        const extraEventsCount = cell.events.length - 2;

                        return (
                          <td
                            key={`day-${cell.dayNumber}`}
                            className={`calendar-td ${cell.isToday ? 'calendar-td--today' : ''} ${hasEvents ? 'calendar-td--has-events' : ''}`}
                            tabIndex={0}
                            aria-label={`${cell.dayNumber} de ${MONTH_NAMES[currentMonth - 1]}: ${cell.events.length} actividades`}
                          >
                            <div className="calendar-cell-inner">
                              {/* Cabecera de la celda del día */}
                              <div className="calendar-day-header">
                                <span
                                  className={`calendar-day-number ${cell.isToday ? 'calendar-day-number--today' : ''}`}
                                >
                                  {cell.dayNumber}
                                </span>
                                {cell.isToday && (
                                  <span className="calendar-today-badge">HOY</span>
                                )}
                              </div>

                              {/* Lista de eventos del día con el formato exacto de la captura: • HH:MM | Título */}
                              <div className="calendar-events-list">
                                {visibleEvents.map((evt) => {
                                  if (evt.isHoliday) {
                                    return (
                                      <div
                                        key={evt.id}
                                        className="calendar-event-item calendar-event-item--holiday"
                                        onClick={() => setSelectedEvent(evt)}
                                        title={evt.title}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && setSelectedEvent(evt)}
                                      >
                                        <span className="calendar-holiday-pill">Feriado</span>
                                        <span className="calendar-event-title">{evt.title}</span>
                                      </div>
                                    );
                                  }

                                  return (
                                    <div
                                      key={evt.id}
                                      className="calendar-event-item"
                                      onClick={() => setSelectedEvent(evt)}
                                      title={`${evt.time} hs - ${evt.title} (${evt.speaker})`}
                                      role="button"
                                      tabIndex={0}
                                      onKeyDown={(e) => e.key === 'Enter' && setSelectedEvent(evt)}
                                    >
                                      <span className="calendar-event-time">
                                        •{evt.time} |
                                      </span>
                                      <span className="calendar-event-title">
                                        {evt.title}
                                      </span>
                                    </div>
                                  );
                                })}

                                {/* Botón "Ver todos (N)" exactamente como en la captura en el día 13 */}
                                {extraEventsCount > 0 && (
                                  <button
                                    type="button"
                                    className="calendar-ver-todos-btn"
                                    onClick={() =>
                                      setSelectedDayEvents({
                                        dayNumber: cell.dayNumber,
                                        monthName: MONTH_NAMES[currentMonth - 1],
                                        events: cell.events,
                                      })
                                    }
                                    aria-label={`Ver todas las ${cell.events.length} actividades del día ${cell.dayNumber}`}
                                  >
                                    Ver todos ({cell.events.length})
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── MODO 2: VISTA AGENDA / LISTA CRONOLÓGICA ── */}
        {viewMode === 'list' && (
          <div className="calendar-list-view">
            {filteredEvents.length === 0 ? (
              <div className="calendar-empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <h3>No se encontraron actividades</h3>
                <p>No hay eventos registrados en este período con los filtros seleccionados.</p>
                <button
                  type="button"
                  className="calendar-reset-filter-btn"
                  onClick={() => {
                    setSelectedCategory('Todos los eventos');
                    setSearchQuery('');
                  }}
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              <div className="calendar-list-grid">
                {filteredEvents.map((evt) => {
                  const isTodayEvent =
                    evt.day === todayDay &&
                    evt.month === todayMonth &&
                    evt.year === todayYear;

                  return (
                    <article
                      key={evt.id}
                      className={`calendar-list-card ${isTodayEvent ? 'calendar-list-card--today' : ''}`}
                      onClick={() => setSelectedEvent(evt)}
                    >
                      <div className="calendar-list-date-box">
                        <span className="calendar-list-day-num">{evt.day}</span>
                        <span className="calendar-list-month-text">
                          {MONTH_NAMES[evt.month - 1].slice(0, 3).toUpperCase()}
                        </span>
                        {isTodayEvent && <span className="calendar-list-today-tag">HOY</span>}
                      </div>

                      <div className="calendar-list-info">
                        <div className="calendar-list-top-meta">
                          <span className="calendar-list-cat-badge">{evt.category}</span>
                          <span className="calendar-list-modality-badge">
                            {evt.modality}
                          </span>
                          <span className="calendar-list-time-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {evt.time} hs
                          </span>
                        </div>

                        <h3 className="calendar-list-title">{evt.title}</h3>
                        <p className="calendar-list-speaker">
                          <strong>Disertante:</strong> {evt.speaker}
                        </p>
                        <p className="calendar-list-desc">{evt.description}</p>
                      </div>

                      <div className="calendar-list-actions">
                        <button
                          type="button"
                          className="calendar-list-btn-detail"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(evt);
                          }}
                        >
                          Ver detalle
                        </button>
                        <button
                          type="button"
                          className="calendar-list-btn-ics"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExportICS(evt);
                          }}
                          title="Descargar recordatorio .ics"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          .ics
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── PIE DE LA SECCIÓN CALENDARIO: Accesos rápidos y sincronización ── */}
        <div className="calendar-footer-strip">
          <div className="calendar-strip-info">
            <span className="calendar-strip-icon">ℹ️</span>
            <div>
              <strong>Información para matriculados:</strong> Los cursos computan créditos para el Sistema Federal de Actualización y Capacitación Continua (SFAP).
            </div>
          </div>
          <div className="calendar-strip-links">
            <a
              href="https://cpcesfe1.org.ar/capacitacion/"
              target="_blank"
              rel="noopener noreferrer"
              className="calendar-strip-link-btn"
            >
              Portal Capacitación CPCE ↗
            </a>
            <button
              type="button"
              className="calendar-strip-link-btn calendar-strip-link-btn--secondary"
              onClick={() => showToast('Descargando cronograma mensual de Octubre 2026 en PDF')}
            >
              Descargar cronograma (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* ── MODAL 1: DETALLE COMPLETO DE EVENTO ── */}
      {selectedEvent && (
        <div
          className="calendar-modal-backdrop"
          onClick={() => setSelectedEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cal-modal-title"
        >
          <div
            className="calendar-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del modal con badges y botón de cierre */}
            <div className="calendar-modal-header">
              <div className="calendar-modal-badges">
                <span className="calendar-modal-badge-cat">
                  {selectedEvent.category}
                </span>
                <span className="calendar-modal-badge-mod">
                  {selectedEvent.modality}
                </span>
              </div>
              <button
                type="button"
                className="calendar-modal-close-btn"
                onClick={() => setSelectedEvent(null)}
                aria-label="Cerrar ventana"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="calendar-modal-body">
              <span className="calendar-modal-eyebrow">
                ACTIVIDAD OFICIAL · CPCE SANTA FE CÁMARA I
              </span>
              <h3 id="cal-modal-title" className="calendar-modal-title">
                {selectedEvent.title}
              </h3>

              <p className="calendar-modal-desc">
                {selectedEvent.description}
              </p>

              {/* Ficha técnica del evento */}
              <div className="calendar-modal-meta-grid">
                <div className="calendar-modal-meta-item">
                  <span className="calendar-modal-label">FECHA Y HORARIO</span>
                  <div className="calendar-modal-val">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0076C0" strokeWidth="2.2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>
                      {selectedEvent.day} de {MONTH_NAMES[selectedEvent.month - 1]} de {selectedEvent.year} · {selectedEvent.time} hs
                    </span>
                  </div>
                </div>

                <div className="calendar-modal-meta-item">
                  <span className="calendar-modal-label">LUGAR Y SEDE</span>
                  <div className="calendar-modal-val">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0076C0" strokeWidth="2.2">
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>

                <div className="calendar-modal-meta-item">
                  <span className="calendar-modal-label">DISERTANTE / ORGANIZADOR</span>
                  <div className="calendar-modal-val">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0076C0" strokeWidth="2.2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>{selectedEvent.speaker}</span>
                  </div>
                </div>
              </div>

              {/* Botones de acción institucional */}
              <div className="calendar-modal-actions">
                <a
                  href={selectedEvent.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="calendar-modal-btn-primary"
                  onClick={() =>
                    showToast(`Redirigiendo a inscripción: ${selectedEvent.title}`)
                  }
                >
                  Inscribirme online en Portal CPCE ↗
                </a>

                <div className="calendar-modal-btn-row">
                  <button
                    type="button"
                    className="calendar-modal-btn-sec"
                    onClick={() => handleExportICS(selectedEvent)}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Guardar en calendario (.ics)</span>
                  </button>

                  <button
                    type="button"
                    className="calendar-modal-btn-sec"
                    onClick={() => handleShareEvent(selectedEvent)}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <span>Compartir</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: "VER TODOS" - RESUMEN DE ACTIVIDADES DEL DÍA ── */}
      {selectedDayEvents && (
        <div
          className="calendar-modal-backdrop"
          onClick={() => setSelectedDayEvents(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="day-modal-title"
        >
          <div
            className="calendar-modal-card calendar-modal-card--day"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="calendar-modal-header">
              <div>
                <span className="calendar-modal-eyebrow">AGENDA DIARIA</span>
                <h3 id="day-modal-title" className="calendar-modal-title" style={{ fontSize: '20px', margin: 0 }}>
                  Actividades del {selectedDayEvents.dayNumber} de {selectedDayEvents.monthName}
                </h3>
              </div>
              <button
                type="button"
                className="calendar-modal-close-btn"
                onClick={() => setSelectedDayEvents(null)}
                aria-label="Cerrar resumen del día"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="calendar-modal-body">
              <div className="calendar-day-modal-list">
                {selectedDayEvents.events.map((evt) => (
                  <div
                    key={evt.id}
                    className="calendar-day-modal-card"
                    onClick={() => {
                      setSelectedDayEvents(null);
                      setSelectedEvent(evt);
                    }}
                  >
                    <div className="calendar-day-modal-card-top">
                      <span className="calendar-event-time" style={{ fontSize: '13px', fontWeight: 700 }}>
                        • {evt.time} hs |
                      </span>
                      <span className="calendar-list-cat-badge">{evt.category}</span>
                      <span className="calendar-list-modality-badge">{evt.modality}</span>
                    </div>

                    <h4 className="calendar-day-modal-card-title">{evt.title}</h4>
                    <p className="calendar-day-modal-card-speaker">
                      <strong>Disertante:</strong> {evt.speaker}
                    </p>
                    <p className="calendar-day-modal-card-desc">{evt.description}</p>

                    <div className="calendar-day-modal-card-bottom">
                      <span className="calendar-day-modal-card-loc">📍 {evt.location}</span>
                      <span className="calendar-day-modal-card-cta">Ver detalles completos →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
