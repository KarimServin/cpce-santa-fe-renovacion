'use client';

import React from 'react';

interface MegaPanelProps {
  itemId?: string;
  childrenData: {
    columns: Array<{
      heading: string;
      items?: Array<{
        title: string;
        desc?: string;
        href: string;
        action?: { type: 'toast' | 'dialog' | 'link'; target?: string };
      }>;
      framed?: boolean;
      subColumns?: Array<Array<{
        title: string;
        desc?: string;
        href: string;
        action?: { type: 'toast' | 'dialog' | 'link'; target?: string };
      }>>;
    }>;
    featured?: {
      tag: string;
      title: string;
      desc: string;
      href: string;
      cta: string;
    };
  };
  isRightAligned: boolean;
  onItemAction: (action?: { type: 'toast' | 'dialog' | 'link'; target?: string }) => void;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function MegaPanel({
  itemId,
  childrenData,
  isRightAligned,
  onItemAction,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: MegaPanelProps) {
  const isSingleCol = childrenData.columns.length === 1;
  const hasFeatured = Boolean(childrenData.featured);
  const colCount = childrenData.columns.length;
  const hasFramedSubCols = childrenData.columns.some((c) => c.framed && c.subColumns);

  const noFeatClass = !hasFeatured
    ? isSingleCol
      ? 'vanguard-mega-panel--single-nofeat'
      : colCount === 2 && !hasFramedSubCols
      ? 'vanguard-mega-panel--cols-2-nofeat'
      : 'vanguard-mega-panel--no-featured'
    : '';

  const gridStyle = !hasFeatured
    ? hasFramedSubCols && colCount === 2
      ? { gridTemplateColumns: '220px 1fr' }
      : { gridTemplateColumns: `repeat(${colCount}, 1fr)` }
    : undefined;

  const themeClass = itemId ? `vanguard-mega-panel--${itemId}` : '';

  return (
    <div
      className={`vanguard-mega-panel ${
        isRightAligned ? 'vanguard-mega-panel--align-right' : ''
      } ${isSingleCol && hasFeatured ? 'vanguard-mega-panel--compact' : ''} ${noFeatClass} ${themeClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`vanguard-mega-grid ${isSingleCol && hasFeatured ? 'vanguard-mega-grid--cols-1' : ''} ${
          !hasFeatured ? 'vanguard-mega-grid--no-featured' : ''
        }`}
        style={gridStyle}
      >
        {childrenData.columns.map((col, cIdx) => {
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
                          className="vanguard-mega-item"
                          onClick={(e) => {
                            if (sub.action) {
                              e.preventDefault();
                              onItemAction(sub.action);
                            }
                          }}
                        >
                          <span className="vanguard-mega-title">{sub.title}</span>
                          {sub.desc ? <span className="vanguard-mega-desc">{sub.desc}</span> : null}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={cIdx} className={`vanguard-mega-col ${col.framed ? 'vanguard-mega-col--framed' : ''}`}>
              <span className="vanguard-mega-heading">{col.heading}</span>
              {(col.items || []).map((sub, sIdx) => (
                <a
                  key={sub.title + sIdx}
                  href={sub.href}
                  className="vanguard-mega-item"
                  onClick={(e) => {
                    if (sub.action) {
                      e.preventDefault();
                      onItemAction(sub.action);
                    }
                  }}
                >
                  <span className="vanguard-mega-title">{sub.title}</span>
                  {sub.desc ? <span className="vanguard-mega-desc">{sub.desc}</span> : null}
                </a>
              ))}
            </div>
          );
        })}

        {childrenData.featured && (
          <div className="vanguard-mega-featured">
            <span className="vanguard-featured-tag">{childrenData.featured.tag}</span>
            <h4 className="vanguard-featured-title">{childrenData.featured.title}</h4>
            <p className="vanguard-featured-desc">{childrenData.featured.desc}</p>
            <a
              href={childrenData.featured.href}
              className="vanguard-featured-cta"
              onClick={onClose}
            >
              {childrenData.featured.cta}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
