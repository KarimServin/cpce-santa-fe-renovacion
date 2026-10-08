'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';

export default function MatriculaModal() {
  const { isOpen, dialogKind, closeDialog, toastMessage, showToast } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isAccess = dialogKind === 'acceso';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDialog();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeDialog]);

  useEffect(() => {
    if (isOpen && !isAccess && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isAccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      inputRef.current?.focus();
      return;
    }
    const query = searchTerm.trim();
    setSearchTerm('');
    closeDialog();
    showToast(
      `Búsqueda: "${query}" (La conexión a base de datos de matrículas se activará en producción).`
    );
  };

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeDialog();
    window.open('https://ssp.contadores.org.ar', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div
        className={`dialog-backdrop ${isOpen ? 'open' : ''}`}
        id="dialog-backdrop"
        role="presentation"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeDialog();
          }
        }}
      >
        <section
          className="dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          id="main-dialog"
        >
          <div className="dialog-head">
            <h2 id="dialog-title">
              {isAccess ? 'Acceso profesional' : 'Consultar matrícula'}
            </h2>
            <button
              className="close"
              id="dialog-close"
              aria-label="Cerrar modal"
              type="button"
              onClick={closeDialog}
            >
              ×
            </button>
          </div>
          <p id="dialog-description">
            {isAccess
              ? 'Ingresá al sistema de servicios profesionales y autogestión de Cámara Primera.'
              : 'Verificá si un profesional está matriculado y habilitado para ejercer.'}
          </p>

          {isAccess ? (
            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '13px', color: 'var(--ink-secondary)', marginBottom: '18px' }}>
                Accedé al área de autogestión con tu usuario y clave institucional para tramitar legalizaciones, aranceles y consultas de estado de cuenta.
              </p>
              <a
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                href="https://ssp.contadores.org.ar"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDialog}
              >
                Ingresar a Autogestión <span aria-hidden="true">→</span>
              </a>
              <button
                className="btn"
                style={{ width: '100%' }}
                type="button"
                onClick={closeDialog}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <form id="demo-form" onSubmit={handleSubmit}>
              <label className="form-label" htmlFor="search-term">
                Número de matrícula o DNI
              </label>
              <input
                ref={inputRef}
                className="text-input"
                id="search-term"
                name="q"
                placeholder="Ej: 12345 o DNI sin puntos"
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-primary"
                style={{ marginTop: '12px', width: '100%' }}
                type="submit"
              >
                Consultar habilitación <span aria-hidden="true">→</span>
              </button>

              <p className="demo-note">
                <strong>Aviso:</strong> En la versión final, esta búsqueda consulta directamente el registro oficial de matriculados habilitados de Cámara Primera (Santa Fe).
              </p>
            </form>
          )}
        </section>
      </div>

      <div
        className={`toast ${toastMessage ? 'show' : ''}`}
        id="app-toast"
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>
    </>
  );
}
