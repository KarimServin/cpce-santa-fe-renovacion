'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useModal } from '../context/ModalContext';
import { INSTITUTIONAL_EVENTS, CalendarEvent } from '../content/calendar-data';

interface DayCellData {
  dayNumber: number;
  dateStr: string;
  isToday: boolean;
  events: CalendarEvent[];
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

export default function InstitutionalCalendar() {
  const { showToast } = useModal();

  // Fecha inicial de referencia: Octubre 2026 (mes de la captura oficial)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 1-12 (10 = Octubre)

  // Modales interactivos
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<{
    dayNumber: number;
    monthName: string;
    events: CalendarEvent[];
  } | null>(null);

  // Fecha actual del sistema (Viernes 9 de Octubre 2026)
  const todayDay = 9;
  const todayMonth = 10;
  const todayYear = 2026;

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
    showToast('Navegando a la fecha actual');
  };

  // Eventos del mes activo
  const monthEvents = useMemo(() => {
    return INSTITUTIONAL_EVENTS.filter(
      (evt) => evt.year === currentYear && evt.month === currentMonth
    );
  }, [currentYear, currentMonth]);

  // Grilla mensual de 5 columnas institucionales (Lu a Vi)
  const calendarWeeks = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0 = Dom, 1 = Lu, ..., 6 = Sab
    const firstDayMondayBased = (firstDayIndex + 6) % 7; // 0 = Lu, ..., 4 = Vi

    const weeks: (DayCellData | null)[][] = [];
    let currentWeek: (DayCellData | null)[] = [];

    // Celdas vacías al inicio de la semana laboral
    const emptyDaysBefore = Math.min(firstDayMondayBased, 5);
    for (let i = 0; i < emptyDaysBefore; i++) {
      currentWeek.push(null);
    }

    // Recorrido de los días del mes (solo Lu-Vi)
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentYear, currentMonth - 1, day);
      const dayOfWeek = (dateObj.getDay() + 6) % 7;

      // Omitir sábados y domingos (calendario laboral Lu-Vi)
      if (dayOfWeek >= 5) continue;

      const dayEvents = monthEvents.filter((evt) => evt.day === day);
      const isToday =
        day === todayDay &&
        currentMonth === todayMonth &&
        currentYear === todayYear;

      currentWeek.push({
        dayNumber: day,
        dateStr: `${day} de ${MONTH_NAMES[currentMonth - 1]} de ${currentYear}`,
        isToday,
        events: dayEvents,
      });

      if (currentWeek.length === 5) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 5) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  }, [currentYear, currentMonth, monthEvents]);

  // Cerrar modales con Escape
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

  // Exportar .ics
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

  return (
    <div className="calendar-page-container">
      {/* ── CABECERA CON EL ESTILO EXACTO DEL HOME ── */}
      <section className="calendar-hero-section" aria-labelledby="calendar-main-title">
        {/* Halos de luz aurora idénticos al Home */}
        <div className="calendar-aurora-bg" aria-hidden="true">
          <div className="aurora-blob aurora-blob--top-left" />
          <div className="calendar-aurora-blob calendar-aurora-blob--center" />
        </div>

        <div className="wrap calendar-hero-wrap">
          {/* Breadcrumb discreto */}
          <nav className="calendar-breadcrumbs" aria-label="Ruta de navegación">
            <a href="/" className="calendar-breadcrumb-link">Inicio</a>
            <span className="calendar-breadcrumb-sep">/</span>
            <span className="calendar-breadcrumb-current">Calendario Institucional</span>
          </nav>

          <div className="calendar-header-text">
            <p className="hero-minimal-eyebrow">
              CAPACITACIÓN & ACTUALIZACIÓN PROFESIONAL
            </p>
            <h1 id="calendar-main-title" className="hero-minimal-title">
              Calendario Institucional
            </h1>
            <p className="hero-minimal-subtitle">
              Cronograma oficial de cursos, jornadas tributarias, comisiones de estudio y actividades del Consejo Profesional de Ciencias Económicas.
            </p>
          </div>
        </div>
      </section>

      {/* ── CUERPO PRINCIPAL DEL CALENDARIO INSTITUCIONAL ── */}
      <section className="calendar-main-section wrap" aria-label="Calendario de actividades">
        {/* Barra superior con navegación de mes idéntica a la captura */}
        <div className="calendar-nav-header">
          <div className="calendar-nav-empty-spacer" aria-hidden="true" />

          {/* Selector de Mes Centrado: < Octubre 2026 > */}
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

          {/* Botón Hoy para volver al día actual */}
          <div className="calendar-nav-actions">
            <button
              type="button"
              className="calendar-today-btn"
              onClick={handleGoToToday}
              title="Ir al mes actual"
            >
              <span className="calendar-today-indicator" />
              <span>Hoy</span>
            </button>
          </div>
        </div>

        {/* ── TABLA INSTITUCIONAL (EXACTA A LA CAPTURA) ── */}
        <div className="calendar-table-card">
          <div className="calendar-table-responsive">
            <table
              className="calendar-table"
              role="grid"
              aria-label={`Calendario institucional de ${MONTH_NAMES[currentMonth - 1]} ${currentYear}`}
            >
              <thead>
                <tr className="calendar-header-row">
                  {WEEKDAY_NAMES_5.map((dayName) => (
                    <th key={dayName} className="calendar-th" scope="col">
                      {dayName}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {calendarWeeks.map((week, weekIdx) => (
                  <tr key={`week-${weekIdx}`} className="calendar-tr">
                    {week.map((cell, cellIdx) => {
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

                      const visibleEvents = cell.events.slice(0, 2);
                      const extraEventsCount = cell.events.length - 2;

                      return (
                        <td
                          key={`day-${cell.dayNumber}`}
                          className={`calendar-td ${cell.isToday ? 'calendar-td--today' : ''}`}
                        >
                          <div className="calendar-cell-inner">
                            {/* Número de día */}
                            <div className="calendar-day-header">
                              <span
                                className={`calendar-day-number ${cell.isToday ? 'calendar-day-number--today' : ''}`}
                              >
                                {cell.dayNumber}
                              </span>
                            </div>

                            {/* Lista de eventos con formato idéntico a la captura: • HH:MM | Título */}
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
                                    title={`${evt.time} hs - ${evt.title}`}
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

                              {/* Ver todos (3) tal como figura en la captura */}
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

        {/* ── NOTA AL PIE INSTITUCIONAL ── */}
        <div className="calendar-footer-strip">
          <div className="calendar-strip-info">
            <span className="calendar-strip-dot" />
            <div>
              <strong>Consejo Profesional de Ciencias Económicas:</strong> Las actividades computan créditos para el Sistema Federal de Actualización y Capacitación Continua (SFAP).
            </div>
          </div>
          <div className="calendar-strip-links">
            <a
              href="https://cpcesfe1.org.ar/capacitacion/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ minHeight: '38px', padding: '0 18px', fontSize: '13px' }}
            >
              Portal Capacitación CPCE ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── MODAL DE DETALLE DEL EVENTO ── */}
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
                aria-label="Cerrar modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="calendar-modal-body">
              <span className="hero-minimal-eyebrow" style={{ fontSize: '11px', marginBottom: '6px' }}>
                CPCE SANTA FE · CÁMARA PRIMERA
              </span>
              <h3 id="cal-modal-title" className="calendar-modal-title">
                {selectedEvent.title}
              </h3>

              <p className="calendar-modal-desc">
                {selectedEvent.description}
              </p>

              <div className="calendar-modal-meta-grid">
                <div className="calendar-modal-meta-item">
                  <span className="calendar-modal-label">FECHA Y HORARIO</span>
                  <div className="calendar-modal-val">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0d6efd" strokeWidth="2.2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>
                      {selectedEvent.day} de {MONTH_NAMES[selectedEvent.month - 1]} · {selectedEvent.time} hs
                    </span>
                  </div>
                </div>

                <div className="calendar-modal-meta-item">
                  <span className="calendar-modal-label">MODALIDAD Y SEDE</span>
                  <div className="calendar-modal-val">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0d6efd" strokeWidth="2.2">
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>

                <div className="calendar-modal-meta-item">
                  <span className="calendar-modal-label">DISERTANTE / ORGANIZADOR</span>
                  <div className="calendar-modal-val">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0d6efd" strokeWidth="2.2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>{selectedEvent.speaker}</span>
                  </div>
                </div>
              </div>

              <div className="calendar-modal-actions">
                <a
                  href={selectedEvent.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: '100%', minHeight: '44px' }}
                  onClick={() =>
                    showToast(`Inscripción a: ${selectedEvent.title}`)
                  }
                >
                  Inscribirme online en Portal CPCE ↗
                </a>

                <button
                  type="button"
                  className="btn"
                  style={{ width: '100%', minHeight: '40px' }}
                  onClick={() => handleExportICS(selectedEvent)}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Guardar en mi calendario (.ics)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL "VER TODOS" PARA DÍAS CON MÚLTIPLES ACTIVIDADES ── */}
      {selectedDayEvents && (
        <div
          className="calendar-modal-backdrop"
          onClick={() => setSelectedDayEvents(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="calendar-modal-card"
            style={{ maxWidth: '640px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="calendar-modal-header">
              <div>
                <span className="hero-minimal-eyebrow" style={{ fontSize: '11px', marginBottom: '4px' }}>
                  AGENDA DIARIA
                </span>
                <h3 className="calendar-modal-title" style={{ fontSize: '19px', margin: 0 }}>
                  Actividades del {selectedDayEvents.dayNumber} de {selectedDayEvents.monthName}
                </h3>
              </div>
              <button
                type="button"
                className="calendar-modal-close-btn"
                onClick={() => setSelectedDayEvents(null)}
                aria-label="Cerrar modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="calendar-modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedDayEvents.events.map((evt) => (
                  <div
                    key={evt.id}
                    className="calendar-day-item-card"
                    onClick={() => {
                      setSelectedDayEvents(null);
                      setSelectedEvent(evt);
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className="calendar-event-time" style={{ fontSize: '13px' }}>
                        • {evt.time} hs |
                      </span>
                      <span className="calendar-modal-badge-cat" style={{ fontSize: '11px', padding: '2px 8px' }}>
                        {evt.category}
                      </span>
                      <span className="calendar-modal-badge-mod" style={{ fontSize: '11px', padding: '2px 8px' }}>
                        {evt.modality}
                      </span>
                    </div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#0b192c', fontWeight: 700 }}>
                      {evt.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                      <strong>Disertante:</strong> {evt.speaker}
                    </p>
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
