'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useModal } from '../context/ModalContext';
import { useHeaderScroll } from './header/useHeaderScroll';
import { InstitutionalBrand } from './header/InstitutionalBrand';
import { HeaderActions } from './header/HeaderActions';
import { VerticalMenuDrawer } from './header/VerticalMenuDrawer';

export default function Header() {
  const { openDialog, showToast } = useModal();
  const { isScrolled, isPastHero } = useHeaderScroll();

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
      style={{
        backgroundColor: isScrolled
          ? isObraSocial
            ? 'rgba(255, 245, 235, 0.55)'
            : 'rgba(235, 245, 255, 0.45)'
          : 'rgba(255, 255, 255, 0.22)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled
          ? isObraSocial
            ? '1px solid rgba(234, 88, 12, 0.22)'
            : '1px solid rgba(0, 118, 192, 0.12)'
          : '1px solid rgba(255, 255, 255, 0.35)',
        boxShadow: isScrolled
          ? '0 10px 32px -4px rgba(15, 23, 42, 0.16), 0 2px 8px -2px rgba(15, 23, 42, 0.08)'
          : '0 18px 48px -6px rgba(15, 23, 42, 0.16), 0 4px 14px -2px rgba(15, 23, 42, 0.06)',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="vanguard-header-container">
        {/* BARRA ÚNICA ULTRA-FINA: HAMBURGUESA GLASSMORFA (IZQ) + LOGO CENTRADO (CENTRO) + ACCESOS (DER) */}
        <div className="vanguard-unified-bar">
          {/* LADO IZQUIERDO: BOTÓN HAMBURGUESA GLASSMORFO */}
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
              <span className="vanguard-hamburger-label">MENÚ</span>
            </button>
          </div>

          {/* CENTRO: LOGO INSTITUCIONAL CENTRADO */}
          <div className="vanguard-bar-center">
            <InstitutionalBrand isObraSocial={isObraSocial} />
          </div>

          {/* LADO DERECHO: BUSCADOR + ACCESO PROFESIONAL */}
          <div className="vanguard-bar-right">
            <HeaderActions
              compact={isScrolled}
              onFocusSearch={focusSearch}
              onOpenAccess={handleOpenAccess}
              onOpenHabilitados={() => openDialog('matricula')}
            />
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
      </div>
    </header>
  );
}
