'use client';

import React, { useState } from 'react';
import HeroBand from './HeroBand';
import { useModal } from '../context/ModalContext';

export default function Hero() {
  const { showToast, openDialog } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [userProfile, setUserProfile] = useState<'Matriculado' | 'Estudiante/Graduado' | 'Perito/Síndico' | 'Público General'>('Matriculado');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      showToast(`Buscando: "${searchTerm}"`);
    }
  };

  return (
    <section className="hero-section" id="inicio" aria-labelledby="hero-title">
      <HeroBand>
        <div className="hero-minimal-wrap">
          <p className="hero-minimal-eyebrow">
            NUEVA WEB · CPCE SANTA FE CÁMARA I
          </p>
          <h1 id="hero-title" className="hero-minimal-title">
            Te damos la bienvenida al Consejo
          </h1>

          {/* Buscador minimalista integrado */}
          <form className="hero-minimal-search" onSubmit={handleSearch} role="search">
            <svg
              className="hero-search-input-icon"
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
              className="hero-minimal-input"
              placeholder="Buscar trámites, normas, resoluciones, cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar en el portal"
            />
            {searchTerm && (
              <button
                type="button"
                className="hero-search-clear-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Limpiar búsqueda"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            <button type="submit" className="hero-search-submit-btn">
              Buscar
            </button>
          </form>

          {/* Selector de perfil Soy */}
          <div className="hero-profile-selector-wrap" role="group" aria-label="Selecciona tu perfil">
            <span className="hero-profile-label">SOY:</span>
            <div className="hero-profile-buttons">
              {(['Matriculado', 'Estudiante/Graduado', 'Perito/Síndico', 'Público General'] as const).map((profile) => (
                <button
                  key={profile}
                  type="button"
                  className={`hero-profile-btn ${userProfile === profile ? 'hero-profile-btn--active' : ''}`}
                  onClick={() => setUserProfile(profile)}
                >
                  {profile}
                </button>
              ))}
            </div>
          </div>

          {/* Accesos rápidos para Matriculado (Cards Glassmorphic Refinadas) */}
          {userProfile === 'Matriculado' && (
            <div key={userProfile} className="hero-matriculado-actions" aria-label="Accesos rápidos para matriculados">
              {[
                {
                  tag: 'GESTIÓN EN LÍNEA',
                  title: 'Acceso al Software',
                  desc: 'Autogestión profesional y expedientes',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  ),
                },
                {
                  tag: 'COMUNICACIÓN',
                  title: 'Acceso al Webmail',
                  desc: 'Correo institucional @cpcesfe.org.ar',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                },
                {
                  tag: 'SEGURIDAD TÉCNICA',
                  title: 'Token y firma digital',
                  desc: 'Validación de certificados y soporte',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  ),
                },
                {
                  tag: 'ARANCELES VIGENTES',
                  title: 'Honorarios',
                  desc: 'Escalas mínimas y tablas éticas',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  ),
                },
                {
                  tag: 'SEGUIMIENTO',
                  title: 'Consulta de trámites',
                  desc: 'Estado de legalizaciones y trámites',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  ),
                },
              ].map((btn) => (
                <button
                  key={btn.title}
                  type="button"
                  className="hero-action-card"
                  onClick={() => showToast(btn.title)}
                >
                  <div className="hero-action-card-header">
                    <span className="hero-action-card-icon">{btn.icon}</span>
                    <span className="hero-action-card-tag">{btn.tag}</span>
                  </div>
                  <h3 className="hero-action-card-title">{btn.title}</h3>
                  <p className="hero-action-card-desc">{btn.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Accesos rápidos para Perito/Síndico */}
          {userProfile === 'Perito/Síndico' && (
            <div key={userProfile} className="hero-matriculado-actions" aria-label="Accesos rápidos para peritos y síndicos">
              {[
                {
                  tag: 'TRIBUNALES',
                  title: 'Sorteo Peritos',
                  desc: 'Designaciones y listas judiciales',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
                    </svg>
                  ),
                },
                {
                  tag: 'EXPEDIENTES',
                  title: 'Sorteo Causas',
                  desc: 'Asignación de causas y fueros',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  ),
                },
                {
                  tag: 'CONVOCATORIA',
                  title: 'Inscripciones 2027',
                  desc: 'Requisitos y registro de postulantes',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <polyline points="16 11 18 13 22 9" />
                    </svg>
                  ),
                },
                {
                  tag: 'FINANCIERO',
                  title: 'Tasas BNA',
                  desc: 'Tasas activas y pasivas Banco Nación',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  ),
                },
                {
                  tag: 'HONORARIOS',
                  title: 'Aranceles Periciales',
                  desc: 'Pautas regulatorias y escalas',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  ),
                },
              ].map((btn) => (
                <button
                  key={btn.title}
                  type="button"
                  className="hero-action-card"
                  onClick={() => showToast(btn.title)}
                >
                  <div className="hero-action-card-header">
                    <span className="hero-action-card-icon">{btn.icon}</span>
                    <span className="hero-action-card-tag">{btn.tag}</span>
                  </div>
                  <h3 className="hero-action-card-title">{btn.title}</h3>
                  <p className="hero-action-card-desc">{btn.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Accesos rápidos para Estudiante / Graduado */}
          {userProfile === 'Estudiante/Graduado' && (
            <div key={userProfile} className="hero-matriculado-actions" aria-label="Accesos rápidos para estudiantes y graduados">
              {[
                {
                  tag: 'TRÁMITE INICIAL',
                  title: 'Matricularme',
                  desc: 'Requisitos y pasos para iniciar tu matrícula',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" y1="8" x2="19" y2="14" />
                      <line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                  ),
                },
                {
                  tag: 'PROPUESTA DE VALOR',
                  title: 'Conocé los beneficios',
                  desc: 'Subsidios, convenios, red profesional y servicios',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ),
                },
                {
                  tag: 'CAPACITACIÓN',
                  title: 'Cursos',
                  desc: 'Formación continua y actualización profesional',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                      <path d="M8 7h8M8 11h8" />
                    </svg>
                  ),
                },
                {
                  tag: 'NUEVOS PROFESIONALES',
                  title: 'Plan Joven',
                  desc: 'Acompañamiento, bonificaciones y primeras prácticas',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
              ].map((btn) => (
                <button
                  key={btn.title}
                  type="button"
                  className="hero-action-card"
                  onClick={() => showToast(btn.title)}
                >
                  <div className="hero-action-card-header">
                    <span className="hero-action-card-icon">{btn.icon}</span>
                    <span className="hero-action-card-tag">{btn.tag}</span>
                  </div>
                  <h3 className="hero-action-card-title">{btn.title}</h3>
                  <p className="hero-action-card-desc">{btn.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Accesos rápidos para Público General */}
          {userProfile === 'Público General' && (
            <div key={userProfile} className="hero-matriculado-actions" aria-label="Accesos rápidos para público general">
              {[
                {
                  tag: 'PROFESIONALES',
                  title: 'Padrón Matriculados',
                  desc: 'Búsqueda y verificación de profesionales habilitados',
                  action: () => openDialog('matricula'),
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <polyline points="16 11 18 13 22 9" />
                    </svg>
                  ),
                },
                {
                  tag: 'INSTITUCIONAL',
                  title: 'Convenios',
                  desc: 'Acuerdos universitarios, comerciales y beneficios',
                  action: () => showToast('Convenios Institucionales'),
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  ),
                },
                {
                  tag: 'CONTROL ÉTICO',
                  title: 'Denuncias',
                  desc: 'Canal formal para denunciar ejercicio no habilitado',
                  action: () => showToast('Denuncia por Ejercicio Ilegal'),
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  ),
                },
                {
                  tag: 'AGENDA',
                  title: 'Eventos',
                  desc: 'Jornadas, encuentros y actividades académicas',
                  action: () => {
                    const el = document.querySelector('#agenda-eventos');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else showToast('Eventos del Consejo');
                  },
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  ),
                },
                {
                  tag: 'COMUNICACIÓN',
                  title: 'Novedades',
                  desc: 'Noticias oficiales y actualidad de la profesión',
                  action: () => {
                    const el = document.querySelector('#novedades');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else showToast('Novedades del Consejo');
                  },
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                      <path d="M18 14h-8" />
                      <path d="M15 18h-5" />
                      <path d="M10 6h8v4h-8V6Z" />
                    </svg>
                  ),
                },
              ].map((btn) => (
                <button
                  key={btn.title}
                  type="button"
                  className="hero-action-card"
                  onClick={btn.action}
                >
                  <div className="hero-action-card-header">
                    <span className="hero-action-card-icon">{btn.icon}</span>
                    <span className="hero-action-card-tag">{btn.tag}</span>
                  </div>
                  <h3 className="hero-action-card-title">{btn.title}</h3>
                  <p className="hero-action-card-desc">{btn.desc}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </HeroBand>
    </section>
  );
}
