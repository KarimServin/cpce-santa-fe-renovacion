'use client';

import React, { useState } from 'react';
import HeroBand from './HeroBand';
import { useModal } from '../context/ModalContext';

// Atajos de búsqueda del diseño (Figma · "Héroe · Sin márgenes" › "Buscador/Atajos de búsqueda")
const SUGGESTED_SEARCHES = ['Trámites frecuentes', 'Normas', 'Resoluciones', 'Cursos'];

// Aviso destacado debajo del buscador (Figma · "Aviso destacado")
const FEATURED_NOTICE = 'Campaña de donación voluntaria de sangre';

export default function Hero() {
  const { showToast } = useModal();
  const [searchTerm, setSearchTerm] = useState('');

  const runSearch = (term: string) => {
    const query = term.trim();
    if (query) {
      showToast(`Buscando: "${query}"`);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(searchTerm);
  };

  const handleSuggestion = (term: string) => {
    setSearchTerm(term);
    runSearch(term);
  };

  return (
    <section className="hero-section" id="inicio" aria-labelledby="hero-title">
      <HeroBand>
        <div className="hero-center">
          <h1 id="hero-title" className="hero-center-title">
            Te damos la bienvenida al Consejo
          </h1>

          <div className="hero-search-block">
            <form className="hero-center-search" onSubmit={handleSearch} role="search">
              <input
                id="hero-search-input"
                type="text"
                className="hero-center-input"
                placeholder="Buscar trámites, normas, resoluciones o cursos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar en el portal"
                autoComplete="off"
              />
              <button type="submit" className="hero-center-submit">
                Buscar
              </button>
            </form>

            <div className="hero-suggestions" role="group" aria-label="Búsquedas sugeridas">
              {SUGGESTED_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  className="hero-suggestion-chip"
                  onClick={() => handleSuggestion(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-notice-wrap">
            <button type="button" className="hero-notice" onClick={() => showToast(FEATURED_NOTICE)}>
              <span className="hero-notice-text">{FEATURED_NOTICE}</span>
              <span className="hero-notice-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </HeroBand>
    </section>
  );
}
