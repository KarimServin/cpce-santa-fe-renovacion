'use client';

import React from 'react';
import { HOME_CONTENT } from '../../content/home';

interface MobileDrawerProps {
  isOpen: boolean;
  expandedId: string | null;
  onToggleExpand: (id: string) => void;
  onItemAction: (action?: { type: 'toast' | 'dialog' | 'link'; target?: string }) => void;
  onOpenAccess?: () => void;
}

export function MobileDrawer({
  isOpen,
  expandedId,
  onToggleExpand,
  onItemAction,
  onOpenAccess,
}: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="vanguard-mobile-drawer" role="dialog" aria-label="Menú de navegación móvil">
      <ul className="vanguard-mobile-list">
        {HOME_CONTENT.navItems.map((item) => {
          const hasChildren = Boolean(item.children && item.children.columns && item.children.columns.length > 0);
          const isExpanded = expandedId === item.id;

          if (hasChildren && item.children) {
            return (
              <li key={item.id} className="vanguard-mobile-item">
                <button
                  type="button"
                  className="vanguard-mobile-link vanguard-mobile-link--has-drop"
                  onClick={() => onToggleExpand(item.id)}
                >
                  <span>{item.label}</span>
                  <svg
                    className={`vanguard-chevron ${isExpanded ? 'vanguard-chevron--open' : ''}`}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="vanguard-mobile-sub">
                    {item.children.columns.map((col, cIdx) => (
                      <div key={cIdx} className="vanguard-mobile-col">
                        <span className="vanguard-mobile-subheading">{col.heading}</span>
                        {(col.subColumns ? col.subColumns.flat() : (col.items || [])).map((sub, sIdx) => (
                          <a
                            key={sIdx}
                            href={sub.href}
                            className="vanguard-mobile-subitem"
                            onClick={(e) => {
                              if (sub.action) {
                                e.preventDefault();
                                onItemAction(sub.action);
                              }
                            }}
                          >
                            {sub.title}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          }

          return (
            <li key={item.id} className="vanguard-mobile-item">
              <a
                href={item.href}
                className="vanguard-mobile-link"
                onClick={(e) => {
                  if (item.action) {
                    e.preventDefault();
                    onItemAction(item.action);
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="vanguard-mobile-actions">
        <a
          href="https://ssp.contadores.org.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="vanguard-cta-navy vanguard-cta-navy--full"
          onClick={onOpenAccess}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Acceso profesional</span>
        </a>
      </div>
    </div>
  );
}
