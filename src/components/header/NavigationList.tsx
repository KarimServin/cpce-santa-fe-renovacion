'use client';

import React from 'react';
import { HOME_CONTENT } from '../../content/home';
import { MegaPanel } from './MegaPanel';

interface NavigationListProps {
  activeDropdown: string | null;
  onDropdownEnter: (id: string) => void;
  onDropdownLeave: () => void;
  onToggleDropdown: (id: string) => void;
  onItemAction: (action?: { type: 'toast' | 'dialog' | 'link'; target?: string }) => void;
  onCloseDropdown: () => void;
}

export function NavigationList({
  activeDropdown,
  onDropdownEnter,
  onDropdownLeave,
  onToggleDropdown,
  onItemAction,
  onCloseDropdown,
}: NavigationListProps) {
  return (
    <ul className="vanguard-nav-list">
      {HOME_CONTENT.navItems.map((item, idx) => {
        const hasChildren = Boolean(item.children && item.children.columns && item.children.columns.length > 0);
        const isOpen = activeDropdown === item.id;
        const isRightAligned = idx >= HOME_CONTENT.navItems.length - 2;

        if (hasChildren && item.children) {
          return (
            <li
              key={item.id}
              className="vanguard-nav-item vanguard-nav-item--has-drop"
              onMouseEnter={() => onDropdownEnter(item.id)}
              onMouseLeave={onDropdownLeave}
            >
              <button
                type="button"
                className={`vanguard-nav-link ${isOpen ? 'vanguard-nav-link--active' : ''}`}
                onClick={() => onToggleDropdown(item.id)}
                aria-expanded={isOpen}
              >
                <span>{item.label}</span>
                <svg className="vanguard-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {isOpen && (
                <MegaPanel
                  itemId={item.id}
                  childrenData={item.children}
                  isRightAligned={isRightAligned}
                  onItemAction={onItemAction}
                  onClose={onCloseDropdown}
                />
              )}
            </li>
          );
        }

        return (
          <li key={item.id} className="vanguard-nav-item">
            <a
              href={item.href}
              className="vanguard-nav-link"
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
  );
}
