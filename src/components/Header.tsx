'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useModal } from '../context/ModalContext';
import { useHeaderScroll } from './header/useHeaderScroll';
import { InstitutionalBrand } from './header/InstitutionalBrand';
import { TopBar } from './header/TopBar';
import { InstitutionLinks } from './header/InstitutionLinks';
import { VerticalMenuDrawer } from './header/VerticalMenuDrawer';
import type { MenuLink } from '../content/menu';

/**
 * Encabezado del sitio según Figma (CPCE1_Web_Fase2 · "Encabezado"): barra superior azul,
 * barra principal blanca con botón de menú, logo del CPCE y accesos a DSS y Caja, y el
 * menú desplegable ("Menú desplegable") que se abre con el botón de menú.
 */
export default function Header() {
  const { showToast } = useModal();
  const { isScrolled } = useHeaderScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // Atajo "/" para ir al buscador del héroe
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement === document.body) {
        e.preventDefault();
        const heroInput = document.querySelector('#hero-search-input') as HTMLInputElement | null;
        if (heroInput) {
          heroInput.focus();
          heroInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Al cerrar el menú el foco vuelve al botón que lo abrió
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  }, []);

  const handlePendingLink = useCallback(
    (link: MenuLink) => {
      setIsMenuOpen(false);
      showToast(link.label);
    },
    [showToast]
  );

  return (
    <header
      ref={headerRef}
      className={`vanguard-header ${isScrolled ? 'vanguard-header--scrolled' : 'vanguard-header--top'}`}
    >
      {/* BARRA SUPERIOR: ¿Cómo matricularte? + redes + software profesional */}
      <TopBar
        onHowToRegister={() => showToast('¿Cómo matricularte?')}
        onStudent={() => showToast('¿Sos estudiante?')}
      />

      {/* BARRA PRINCIPAL: MENÚ + LOGO (IZQ) · DSS Y CAJA (DER) */}
      <div className="vanguard-main-bar">
        <div className="vanguard-header-container">
          <div className="vanguard-unified-bar">
            <div className="vanguard-bar-left">
              {/* Abierto se convierte en el "Botón · Cerrar" del diseño (círculo azul con una X) */}
              <button
                ref={menuButtonRef}
                type="button"
                className={`vanguard-glass-hamburger ${isMenuOpen ? 'vanguard-glass-hamburger--active' : ''}`}
                onClick={() => (isMenuOpen ? closeMenu() : setIsMenuOpen(true))}
                aria-expanded={isMenuOpen}
                aria-controls="site-menu"
                aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              >
                <div className="vanguard-hamburger-lines">
                  <span className="vanguard-h-line vanguard-h-line--1" />
                  <span className="vanguard-h-line vanguard-h-line--2" />
                  <span className="vanguard-h-line vanguard-h-line--3" />
                </div>
              </button>

              <InstitutionalBrand />
            </div>

            <div className="vanguard-bar-right">
              <InstitutionLinks onSelectWithoutLink={showToast} />
            </div>
          </div>
        </div>
      </div>

      <VerticalMenuDrawer
        isOpen={isMenuOpen}
        onClose={closeMenu}
        onSelectPending={handlePendingLink}
        headerRef={headerRef}
      />
    </header>
  );
}
