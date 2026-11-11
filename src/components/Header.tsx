'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useModal } from '../context/ModalContext';
import { useHeaderScroll } from './header/useHeaderScroll';
import { InstitutionalBrand } from './header/InstitutionalBrand';
import { TopBar } from './header/TopBar';
import { InstitutionLinks } from './header/InstitutionLinks';
import { VerticalMenuDrawer } from './header/VerticalMenuDrawer';

export default function Header() {
  const { openDialog, showToast } = useModal();
  const { isScrolled } = useHeaderScroll();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('institucional');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isObraSocial = activeCategoryId === 'obra-social';

  // Shortcut "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement === document.body) {
        e.preventDefault();
        const heroInput = document.querySelector('#hero-search-input') as HTMLInputElement;
        if (heroInput) {
          heroInput.focus();
          heroInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDropdownEnter = useCallback((id: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(id);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 280);
  }, []);

  const handleToggleDropdown = useCallback((id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  }, []);

  const handleItemAction = useCallback(
    (
      action?: { type: 'toast' | 'dialog' | 'link'; target?: string },
      options?: { keepMenuOpen?: boolean; categoryId?: string }
    ) => {
      if (options?.categoryId) {
        setActiveCategoryId(options.categoryId);
      }
      setActiveDropdown(null);
      if (!options?.keepMenuOpen) {
        setIsMenuOpen(false);
      }
      if (!action) return;
      if (action.type === 'dialog' && action.target) {
        openDialog(action.target);
      } else if (action.type === 'toast' && action.target) {
        showToast(action.target);
      } else if (action.type === 'link' && action.target) {
        const el = document.querySelector(action.target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [openDialog, showToast]
  );

  return (
    <header
      className={`vanguard-header ${isScrolled ? 'vanguard-header--scrolled' : 'vanguard-header--top'} ${
        isObraSocial ? 'vanguard-header--obra-social' : ''
      }`}
    >
      {/* BARRA SUPERIOR OSCURA: ¿Cómo matricularte? + redes + software profesional */}
      <TopBar onHowToRegister={() => showToast('¿Cómo matricularte?')} />

      {/* BARRA PRINCIPAL: HAMBURGUESA + LOGO (IZQ) · DSS Y CAJA (DER) */}
      <div className="vanguard-main-bar">
        <div className="vanguard-header-container">
          <div className="vanguard-unified-bar">
            <div className="vanguard-bar-left">
              <button
                type="button"
                className={`vanguard-glass-hamburger ${isMenuOpen ? 'vanguard-glass-hamburger--active' : ''} ${
                  isObraSocial ? 'vanguard-glass-hamburger--obra-social' : ''
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label="Abrir menú de navegación"
              >
                <div className="vanguard-hamburger-lines">
                  <span className="vanguard-h-line vanguard-h-line--1" />
                  <span className="vanguard-h-line vanguard-h-line--2" />
                  <span className="vanguard-h-line vanguard-h-line--3" />
                </div>
              </button>

              {/* El logo es fijo: no cambia al recorrer categorías del menú */}
              <InstitutionalBrand />
            </div>

            <div className="vanguard-bar-right">
              <InstitutionLinks onSelectWithoutLink={showToast} />
            </div>
          </div>
        </div>
      </div>

      {/* ── MENÚ VERTICAL DESPLEGABLE CON FLYOUT MULTICOLUMNA ── */}
      <VerticalMenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onItemAction={handleItemAction}
        activeItemId={activeCategoryId}
        onSelectCategory={setActiveCategoryId}
      />
    </header>
  );
}
