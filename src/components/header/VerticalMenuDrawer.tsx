'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HOME_CONTENT, NavItem } from '../../content/home';

interface VerticalMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAction: (
    action?: { type: 'toast' | 'dialog' | 'link'; target?: string },
    options?: { keepMenuOpen?: boolean; categoryId?: string }
  ) => void;
  activeItemId?: string;
  onSelectCategory?: (id: string) => void;
}

export function VerticalMenuDrawer({
  isOpen,
  onClose,
  onItemAction,
  activeItemId: controlledActiveItemId,
  onSelectCategory,
}: VerticalMenuDrawerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [internalActiveId, setInternalActiveId] = useState<string>(HOME_CONTENT.navItems[0]?.id || 'institucional');
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null);
  const [selectedSubTitle, setSelectedSubTitle] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const activeItemId = controlledActiveItemId ?? internalActiveId;
  const setActiveItemId = (id: string) => {
    setInternalActiveId(id);
    onSelectCategory?.(id);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar al pulsar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll en mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  if (!isOpen) return null;

  const currentActiveItem =
    HOME_CONTENT.navItems.find((item) => item.id === activeItemId) || HOME_CONTENT.navItems[0];
  const hasSubmenu = Boolean(
    currentActiveItem?.children &&
      currentActiveItem.children.columns &&
      currentActiveItem.children.columns.length > 0
  );

  const colCount = currentActiveItem?.children?.columns?.length || 1;
  const hasFeatured = Boolean(currentActiveItem?.children?.featured);
  const hasFramedSubCols = currentActiveItem?.children?.columns?.some((c) => c.framed && c.subColumns);

  // Clase temática si es obra-social o caja
  const themeClass = currentActiveItem ? `vanguard-mega-panel--${currentActiveItem.id}` : '';

  return (
    <>
      {/* Fondo backdrop difuminado */}
      <div
        className="vertical-menu-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Flyout panel */}
      <div
        ref={drawerRef}
        className={`vertical-menu-container ${themeClass}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Botón flotante para cerrar en esquina superior */}
        <button
          type="button"
          className="vertical-menu-close-fab"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Cuerpo del menú */}
        <div className="vertical-menu-body">
          {/* COLUMNA 1 (IZQUIERDA): Categorías principales en vertical */}
          <div className="vertical-menu-categories">
            {/* Opciones principales de navegación */}
            {HOME_CONTENT.navItems.map((item: NavItem) => {
              const hasChildren = Boolean(
                item.children && item.children.columns && item.children.columns.length > 0
              );
              const isActive = activeItemId === item.id;
              const isMobileExpanded = mobileExpandedId === item.id;

              return (
                <div key={item.id} className="vertical-category-row">
                  <div
                    role="button"
                    tabIndex={0}
                    className={`vertical-category-item ${isActive ? 'vertical-category-item--active' : ''}`}
                    onMouseEnter={() => {
                      if (!isMobile) setActiveItemId(item.id);
                    }}
                    onClick={() => {
                      setActiveItemId(item.id);
                      if (isMobile) {
                        setMobileExpandedId(isMobileExpanded ? null : item.id);
                      }
                      if (!hasChildren && item.action) {
                        onItemAction(item.action, { categoryId: item.id });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveItemId(item.id);
                        if (isMobile) setMobileExpandedId(isMobileExpanded ? null : item.id);
                      }
                    }}
                  >
                    <div className="vertical-category-left">
                      <span className="vertical-category-title">{item.label}</span>
                    </div>

                    {hasChildren && (
                      <span className="vertical-category-arrow">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={isMobile && isMobileExpanded ? 'M6 9l6 6 6-6' : 'M9 18l6-6-6-6'} />
                        </svg>
                      </span>
                    )}
                  </div>

                  {/* Mobile inline acordeón */}
                  {isMobile && isMobileExpanded && hasChildren && item.children && (
                    <div className="vertical-mobile-accordion-content">
                      {item.children.columns.map((col, cIdx) => (
                        <div key={cIdx} className="vertical-mobile-group">
                          <div className="vertical-mobile-group-title">{col.heading}</div>
                          <div className="vertical-mobile-items-list">
                            {(col.subColumns ? col.subColumns.flat() : (col.items || [])).map((sub, sIdx) => (
                              <a
                                key={sIdx}
                                href={sub.href}
                                className={`vertical-subitem-link ${selectedSubTitle === sub.title ? 'vertical-subitem-link--selected' : ''}`}
                                onClick={(e) => {
                                  setActiveItemId(item.id);
                                  setSelectedSubTitle(sub.title);
                                  const isObra = item.id === 'obra-social';
                                  if (sub.action) {
                                    e.preventDefault();
                                    onItemAction(sub.action, { keepMenuOpen: isObra, categoryId: item.id });
                                  } else if (isObra) {
                                    e.preventDefault();
                                  } else {
                                    onClose();
                                  }
                                }}
                              >
                                <span className="vertical-subitem-title">{sub.title}</span>
                                {sub.desc && <span className="vertical-subitem-desc">{sub.desc}</span>}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}

                      {item.children.featured && (
                        <div className="vertical-mobile-featured-card">
                          <span className="vertical-featured-tag">{item.children.featured.tag}</span>
                          <h4 className="vertical-featured-title">{item.children.featured.title}</h4>
                          <p className="vertical-featured-desc">{item.children.featured.desc}</p>
                          <a
                            href={item.children.featured.href}
                            className="vertical-featured-cta"
                            onClick={(e) => {
                              setActiveItemId(item.id);
                              if (item.id === 'obra-social') {
                                e.preventDefault();
                                onItemAction({ type: 'toast', target: 'Obra Social - DSS' }, { keepMenuOpen: true, categoryId: item.id });
                              } else {
                                onClose();
                              }
                            }}
                          >
                            {item.children.featured.cta}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Acceso final: Consultar profesionales habilitados */}
            <div className="vertical-category-row vertical-category-row--last">
              <div
                role="button"
                tabIndex={0}
                className="vertical-category-item vertical-category-item--action"
                onClick={() => {
                  onClose();
                  onItemAction({ type: 'dialog', target: 'matricula' });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onClose();
                    onItemAction({ type: 'dialog', target: 'matricula' });
                  }
                }}
              >
                <div className="vertical-category-left">
                  <span className="vertical-category-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <polyline points="16 11 18 13 22 9" />
                    </svg>
                  </span>
                  <span className="vertical-category-title">Consultar profesionales habilitados</span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA 2 (DERECHA EN DESKTOP): MEGAPANEL CON MULTICOLUMNAS ORIGINALES */}
          {!isMobile && (
            <div className="vertical-menu-flyout">
              {hasSubmenu && currentActiveItem?.children ? (
                <div className="vertical-flyout-content-wrap">
                  {/* Encabezado de la categoría */}
                  <div className="vertical-flyout-header">
                    <h3 className="vertical-flyout-main-title">{currentActiveItem.label}</h3>
                    <div className="vertical-flyout-line" />
                  </div>

                  {/* Grilla idéntica a MegaPanel */}
                  <div
                    className={`vertical-flyout-grid ${
                      !hasFeatured ? 'vertical-flyout-grid--no-featured' : ''
                    } ${colCount === 1 && hasFeatured ? 'vertical-flyout-grid--single-featured' : ''}`}
                    style={
                      !hasFeatured
                        ? hasFramedSubCols && colCount === 2
                          ? { gridTemplateColumns: '240px 1fr' }
                          : { gridTemplateColumns: `repeat(${colCount}, minmax(210px, 1fr))` }
                        : colCount === 1
                        ? { gridTemplateColumns: '1fr 240px' }
                        : { gridTemplateColumns: `repeat(${colCount}, 1fr) 240px` }
                    }
                  >
                    {currentActiveItem.children.columns.map((col, cIdx) => {
                      if (col.framed && col.subColumns) {
                        return (
                          <div key={cIdx} className="vanguard-mega-col vanguard-mega-col--framed">
                            <div className="vanguard-framed-head">
                              <span className="vanguard-mega-heading">{col.heading}</span>
                            </div>
                            <div className="vanguard-framed-subcols">
                              {col.subColumns.map((subCol, scIdx) => (
                                <div key={scIdx} className="vanguard-framed-subcol">
                                  {subCol.map((sub, sIdx) => (
                                    <a
                                      key={sub.title + sIdx}
                                      href={sub.href}
                                      className={`vanguard-mega-item ${selectedSubTitle === sub.title ? 'vanguard-mega-item--selected' : ''}`}
                                      onClick={(e) => {
                                        setActiveItemId(currentActiveItem.id);
                                        setSelectedSubTitle(sub.title);
                                        const isObra = currentActiveItem.id === 'obra-social';
                                        if (sub.action) {
                                          e.preventDefault();
                                          onItemAction(sub.action, { keepMenuOpen: isObra, categoryId: currentActiveItem.id });
                                        } else if (isObra) {
                                          e.preventDefault();
                                        } else {
                                          onClose();
                                        }
                                      }}
                                    >
                                      <span className="vanguard-mega-title">{sub.title}</span>
                                      {sub.desc && (
                                        <span className="vanguard-mega-desc">{sub.desc}</span>
                                      )}
                                    </a>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={cIdx}
                          className={`vanguard-mega-col ${col.framed ? 'vanguard-mega-col--framed' : ''}`}
                        >
                          <span className="vanguard-mega-heading">{col.heading}</span>
                          {(col.items || []).map((sub, sIdx) => (
                            <a
                              key={sub.title + sIdx}
                              href={sub.href}
                              className={`vanguard-mega-item ${selectedSubTitle === sub.title ? 'vanguard-mega-item--selected' : ''}`}
                              onClick={(e) => {
                                setActiveItemId(currentActiveItem.id);
                                setSelectedSubTitle(sub.title);
                                const isObra = currentActiveItem.id === 'obra-social';
                                if (sub.action) {
                                  e.preventDefault();
                                  onItemAction(sub.action, { keepMenuOpen: isObra, categoryId: currentActiveItem.id });
                                } else if (isObra) {
                                  e.preventDefault();
                                } else {
                                  onClose();
                                }
                              }}
                            >
                              <span className="vanguard-mega-title">{sub.title}</span>
                              {sub.desc && (
                                <span className="vanguard-mega-desc">{sub.desc}</span>
                              )}
                            </a>
                          ))}
                        </div>
                      );
                    })}

                    {/* Tarjeta destacada si la tiene */}
                    {currentActiveItem.children.featured && (
                      <div className="vanguard-mega-featured">
                        <span className="vanguard-featured-tag">
                          {currentActiveItem.children.featured.tag}
                        </span>
                        <h4 className="vanguard-featured-title">
                          {currentActiveItem.children.featured.title}
                        </h4>
                        <p className="vanguard-featured-desc">
                          {currentActiveItem.children.featured.desc}
                        </p>
                        <a
                          href={currentActiveItem.children.featured.href}
                          className="vanguard-featured-cta"
                          onClick={(e) => {
                            setActiveItemId(currentActiveItem.id);
                            if (currentActiveItem.id === 'obra-social') {
                              e.preventDefault();
                              onItemAction({ type: 'toast', target: 'Obra Social - DSS' }, { keepMenuOpen: true, categoryId: currentActiveItem.id });
                            } else {
                              onClose();
                            }
                          }}
                        >
                          {currentActiveItem.children.featured.cta}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="vertical-flyout-empty">
                  <p>Seleccioná una sección para explorar sus trámites y resoluciones.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer del Drawer */}
        <div className="vertical-menu-footer">
          <div className="vertical-menu-footer-links">
            <a
              href="https://ssp.contadores.org.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="vertical-menu-btn-primary"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Acceso Profesional</span>
            </a>
          </div>
          <div className="vertical-menu-footer-caption">
            CPCE Santa Fe · Cámara I
          </div>
        </div>
      </div>
    </>
  );
}
