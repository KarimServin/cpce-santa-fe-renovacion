'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { SITE_MENU, MenuLink } from '../../content/menu';

interface VerticalMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  /** Enlace sin página propia todavía: el encabezado muestra un aviso. */
  onSelectPending: (link: MenuLink) => void;
  /** Encabezado: el panel se ubica justo debajo de su borde inferior. */
  headerRef: React.RefObject<HTMLElement | null>;
  /** Botón de menú del encabezado: el "Botón · Cerrar" se dibuja exactamente encima. */
  anchorRef: React.RefObject<HTMLElement | null>;
}

interface Anchor {
  top: number;
  left: number;
  size: number;
}

const MOBILE_QUERY = '(max-width: 1023px)';

/**
 * Menú desplegable según Figma (frames "Menú · …"): un fondo gris cubre toda la pantalla,
 * incluido el encabezado; encima quedan solo el "Botón · Cerrar" (círculo azul con una X, en
 * el lugar del botón de menú) y el panel blanco de 920 px con radio 42 bajo el encabezado,
 * con la lista de secciones a la izquierda (280 px) y el contenido de la sección activa a la
 * derecha (640 px). En pantallas angostas las secciones se despliegan como acordeón.
 */
export function VerticalMenuDrawer({
  isOpen,
  onClose,
  onSelectPending,
  headerRef,
  anchorRef,
}: VerticalMenuDrawerProps) {
  const [activeId, setActiveId] = useState(SITE_MENU[0].id);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [top, setTop] = useState(0);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const firstItemRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // El panel arranca en el borde inferior del encabezado (168 px en desktop, donde es fijo) y
  // el botón de cerrar va justo encima del botón de menú
  useLayoutEffect(() => {
    if (!isOpen) return;
    const measure = () => {
      // En celulares el encabezado se desplaza con la página: si ya subió, el panel va arriba
      setTop(Math.max(0, Math.round(headerRef.current?.getBoundingClientRect().bottom ?? 0)));
      const button = anchorRef.current?.getBoundingClientRect();
      setAnchor(button ? { top: button.top, left: button.left, size: button.width } : null);
    };
    measure();
    // Si se abre mientras el encabezado se anima (entrada o compactado), se vuelve a medir al terminar
    const settle = window.setTimeout(measure, 800);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener('resize', measure);
    };
  }, [isOpen, headerRef, anchorRef]);

  // Mientras está abierto: sin scroll de fondo, Escape cierra y el foco entra al menú
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    firstItemRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const activeSection = SITE_MENU.find((section) => section.id === activeId) ?? SITE_MENU[0];

  const renderLink = (link: MenuLink) => {
    const label = link.external ? `${link.label} ↗` : link.label;
    if (link.href) {
      return link.external ? (
        <a className="site-menu-link" href={link.href} target="_blank" rel="noopener noreferrer" onClick={onClose}>
          {label}
        </a>
      ) : (
        <Link className="site-menu-link" href={link.href} onClick={onClose}>
          {label}
        </Link>
      );
    }
    return (
      <button type="button" className="site-menu-link" onClick={() => onSelectPending(link)}>
        {label}
      </button>
    );
  };

  const renderGroups = (sectionId: string) => {
    const section = SITE_MENU.find((s) => s.id === sectionId);
    if (!section) return null;
    return (
      <div className="site-menu-groups">
        {section.groups.map((group, index) => (
          <div key={group.label ?? index} className="site-menu-group">
            {group.label && <p className="site-menu-group-label">{group.label.toUpperCase()}</p>}
            <ul className="site-menu-group-links">
              {group.links.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const chevron = (active: boolean) => (
    <img
      src={active ? '/images/header/icono-chevron-activo.svg' : '/images/header/icono-chevron.svg'}
      alt=""
      width={16}
      height={16}
      className="site-menu-chevron"
    />
  );

  // Se monta en document.body para que el fondo cubra toda la pantalla, encabezado incluido
  return createPortal(
    <>
      <div className="site-menu-backdrop" onClick={onClose} aria-hidden="true" />
      {anchor && (
        <button
          type="button"
          className="site-menu-close"
          style={{ top: anchor.top, left: anchor.left, width: anchor.size, height: anchor.size }}
          onClick={onClose}
          aria-label="Cerrar menú de navegación"
        >
          <img src="/images/header/icono-cerrar.svg" alt="" width={24} height={24} />
        </button>
      )}
      <div className="site-menu-layer" style={{ top }}>
        <div className="vanguard-header-container">
          <nav
            id="site-menu"
            className="site-menu-panel"
            aria-label="Menú principal"
            style={{ maxHeight: `calc(100vh - ${top}px - 16px)` }}
          >
            <ul className="site-menu-sections">
              {SITE_MENU.map((section, index) => {
                const isActive = isMobile ? expandedId === section.id : activeId === section.id;
                return (
                  <li key={section.id}>
                    <button
                      ref={index === 0 ? firstItemRef : undefined}
                      type="button"
                      className={`site-menu-section-btn ${isActive ? 'site-menu-section-btn--active' : ''}`}
                      aria-expanded={isMobile ? isActive : undefined}
                      aria-current={!isMobile && isActive ? 'true' : undefined}
                      onMouseEnter={isMobile ? undefined : () => setActiveId(section.id)}
                      onFocus={isMobile ? undefined : () => setActiveId(section.id)}
                      onClick={() =>
                        isMobile
                          ? setExpandedId((current) => (current === section.id ? null : section.id))
                          : setActiveId(section.id)
                      }
                    >
                      <span>{section.label}</span>
                      {chevron(isActive)}
                    </button>
                    {isMobile && isActive && <div className="site-menu-accordion">{renderGroups(section.id)}</div>}
                  </li>
                );
              })}
            </ul>

            {!isMobile && (
              <div className="site-menu-content">
                <p className="site-menu-title">{activeSection.label}</p>
                {renderGroups(activeSection.id)}
              </div>
            )}
          </nav>
        </div>
      </div>
    </>,
    document.body
  );
}
