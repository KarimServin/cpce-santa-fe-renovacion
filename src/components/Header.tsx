'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useModal } from '../context/ModalContext';
import { useHeaderScroll } from './header/useHeaderScroll';
import { InstitutionalBrand } from './header/InstitutionalBrand';
import { NavigationList } from './header/NavigationList';
import { HeaderActions } from './header/HeaderActions';
import { MobileDrawer } from './header/MobileDrawer';

export default function Header() {
  const { openDialog, showToast } = useModal();
  const { isScrolled, isPastHero } = useHeaderScroll();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Shortcut "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement === document.body) {
        e.preventDefault();
        const heroInput = document.querySelector('.hero-search-input') as HTMLInputElement;
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

  const focusSearch = useCallback(() => {
    const heroInput = document.querySelector('.hero-search-input') as HTMLInputElement;
    if (heroInput) {
      heroInput.focus();
      heroInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      showToast('Buscador activo');
    }
  }, [showToast]);

  const handleOpenAccess = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleItemAction = useCallback(
    (action?: { type: 'toast' | 'dialog' | 'link'; target?: string }) => {
      setActiveDropdown(null);
      setIsMenuOpen(false);
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
      className={`vanguard-header ${isScrolled ? 'vanguard-header--scrolled' : 'vanguard-header--top'}`}
      style={{
        backgroundColor: isScrolled
          ? 'rgba(235, 245, 255, 0.45)'
          : 'rgba(255, 255, 255, 0.22)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled
          ? '1px solid rgba(0, 118, 192, 0.12)'
          : '1px solid rgba(255, 255, 255, 0.35)',
        boxShadow: isScrolled
          ? '0 10px 32px -4px rgba(15, 23, 42, 0.16), 0 2px 8px -2px rgba(15, 23, 42, 0.08)'
          : '0 18px 48px -6px rgba(15, 23, 42, 0.16), 0 4px 14px -2px rgba(15, 23, 42, 0.06)',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="vanguard-header-container">
        {/* NIVEL 1: IDENTIDAD INSTITUCIONAL + UTILIDADES (Se contrae y desvanece suavemente al llegar a SOY) */}
        <div className={`vanguard-level-1 ${isScrolled ? 'vanguard-level-1--collapsed' : ''}`}>
          <InstitutionalBrand />

          <div className="vanguard-level-1-utilities">
            <HeaderActions
              onFocusSearch={focusSearch}
              onOpenAccess={handleOpenAccess}
              onOpenHabilitados={() => openDialog('matricula')}
            />

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="vanguard-mobile-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú de navegación"
              aria-expanded={isMenuOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={isMenuOpen ? 'M18 6L6 18M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* NIVEL 2: MENÚ DE NAVEGACIÓN + BOTÓN HOME + ACCESO (Transiciona suavemente) */}
        <div className={`vanguard-level-2-row ${isScrolled ? 'vanguard-level-2-row--scrolled' : ''}`}>
          {/* Botón Home (Casita azul eléctrico) visible al scrollear */}
          <div className="vanguard-scrolled-home-wrap">
            <a
              href="/"
              className="vanguard-scrolled-home-btn"
              aria-label="Ir al inicio"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.1 1 12h3v9a1 1 0 0 0 1 1h5v-6h4v6h5a1 1 0 0 0 1-1v-9h3L12 2.1z" />
              </svg>
            </a>
          </div>

          <nav
            className={`vanguard-level-2-pill ${isMenuOpen ? 'vanguard-level-2--open' : ''}`}
            aria-label="Navegación principal"
          >
            <NavigationList
              activeDropdown={activeDropdown}
              onDropdownEnter={handleDropdownEnter}
              onDropdownLeave={handleDropdownLeave}
              onToggleDropdown={handleToggleDropdown}
              onItemAction={handleItemAction}
              onCloseDropdown={() => setActiveDropdown(null)}
            />
          </nav>

          <div className="vanguard-scrolled-actions-wrap">
            <HeaderActions
              compact
              onFocusSearch={focusSearch}
              onOpenAccess={handleOpenAccess}
              onOpenHabilitados={() => openDialog('matricula')}
            />
          </div>
        </div>

        {/* ── MENÚ MÓVIL DESPLEGABLE ── */}
        <MobileDrawer
          isOpen={isMenuOpen && !isScrolled}
          expandedId={mobileExpanded}
          onToggleExpand={(id) => setMobileExpanded((prev) => (prev === id ? null : id))}
          onItemAction={handleItemAction}
          onOpenAccess={handleOpenAccess}
        />
      </div>
    </header>
  );
}
