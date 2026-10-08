'use client';

import React from 'react';

interface HeaderActionsProps {
  onFocusSearch: () => void;
  onOpenAccess?: () => void;
  onOpenHabilitados?: () => void;
  compact?: boolean;
}

export function HeaderActions({
  onFocusSearch,
  onOpenAccess,
  onOpenHabilitados,
  compact = false,
}: HeaderActionsProps) {
  if (compact) {
    return (
      <div className="vanguard-scrolled-actions">
        <a
          href="https://ssp.contadores.org.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="vanguard-cta-navy vanguard-cta-navy--compact"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Acceso</span>
        </a>
      </div>
    );
  }

  return (
    <>
      {/* Padrón de Matriculados CTA */}
      <button
        type="button"
        className="vanguard-cta-dark"
        onClick={onOpenHabilitados}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <polyline points="16 11 18 13 22 9" />
        </svg>
        <span>Padrón de matriculados</span>
      </button>

      {/* Acceso Profesional CTA */}
      <a
        href="https://ssp.contadores.org.ar"
        target="_blank"
        rel="noopener noreferrer"
        className="vanguard-cta-navy"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span>Acceso profesional</span>
      </a>
    </>
  );
}
