import React from 'react';

const items = [
  "Cursos de actualización tributaria, contable, societaria y laboral",
  "Modalidad híbrida: transmisión en vivo por streaming y clases presenciales",
  "Certificados de asistencia y aprobación con validación digital",
  "Aranceles preferenciales para profesionales matriculados al día",
];

export default function Education() {
  return (
    <section className="education-section" id="capacitacion" aria-labelledby="capacitacion-title">
      <div className="wrap">
        <div className="education-box">
          <div className="education-text">
            <span className="edu-kicker">Desarrollo Profesional Continuo</span>
            <h2 id="capacitacion-title">
              Capacitación y formación técnica permanente
            </h2>
            <p className="edu-desc">
              El Consejo brinda una nutrida agenda de actividades académicas dictadas por especialistas de trayectoria nacional para acompañar los desafíos del ejercicio diario.
            </p>

            <ul className="edu-list">
              {items.map((item, index) => (
                <li key={index}>
                  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="education-sidebar">
            <div className="action-card">
              <span className="action-badge">Ciclo Académico 2026</span>
              <h3>Calendario de Cursos y Jornadas</h3>
              <p>Conocé el cronograma completo de actividades programadas para este cuatrimestre e inscribite online.</p>
              <a
                className="btn btn-education"
                href="https://cpcesfe1.org.ar/capacitacion/"
                target="_blank"
                rel="noreferrer"
              >
                Ver oferta académica ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
