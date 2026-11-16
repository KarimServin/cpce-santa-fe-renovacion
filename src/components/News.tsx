import React from 'react';
import Image from 'next/image';

/**
 * Novedades según Figma (CPCE1_Web_Fase2 · "Banda · Novedades", nodo 482:2116):
 * encabezado con "Novedades" + pastilla "Ver todas las novedades" y, debajo, la "Grilla"
 * blanca con una "Tarjeta de novedad" grande a la izquierda y una "Columna" de 2 × 2
 * tarjetas chicas a la derecha. Detrás, el "Aurora blob center" (decorativo).
 *
 * Cada tarjeta es entera clicable: el enlace va en el título y se estira sobre la tarjeta
 * (así el nombre accesible del enlace es solo el título).
 */

interface NewsItem {
  id: string;
  category: string;
  /** Fecha ISO para el atributo dateTime */
  date: string;
  /** Fecha tal como se muestra en el diseño (dd/mm/aaaa) */
  dateLabel: string;
  title: string;
  summary?: string;
  image: string;
  alt: string;
  href: string;
}

const NOTICIAS_URL = 'https://cpcesfe1.org.ar/noticias/';

// "Tarjeta de novedad" grande (I482:2118;27:232)
const featuredNews: NewsItem = {
  id: 'jornadas-agropecuarias-binacionales',
  category: 'Institucional',
  date: '2026-10-15',
  dateLabel: '15/10/2026',
  title: 'II Jornadas Agropecuarias Binacionales',
  summary:
    'Profesionales de Argentina y Uruguay se reunieron en Santa Fe para analizar la actualidad del sector agropecuario.',
  image: '/images/novedades/jornadas-agropecuarias-binacionales.jpg',
  alt: 'Profesionales de Argentina y Uruguay reunidos en las Jornadas Agropecuarias Binacionales',
  href: NOTICIAS_URL,
};

// "Columna" de la derecha: "Fila 1" y "Fila 2", dos tarjetas por fila
const secondaryNews: NewsItem[] = [
  {
    id: 'hms-aranceles-octubre-2026',
    category: 'Ejercicio profesional',
    date: '2026-10-01',
    dateLabel: '01/10/2026',
    title: 'Actualización de HMS y aranceles · octubre 2026',
    image: '/images/novedades/actualizacion-hms-aranceles.jpg',
    alt: 'Planilla de cálculo con valores de honorarios y aranceles',
    href: NOTICIAS_URL,
  },
  {
    id: 'beneficio-token',
    category: 'Beneficios',
    date: '2026-09-28',
    dateLabel: '28/09/2026',
    title: 'Nuevo beneficio: token sin cargo',
    image: '/images/novedades/beneficio-token.jpg',
    alt: 'Mano conectando un token de seguridad USB a una computadora portátil',
    href: NOTICIAS_URL,
  },
  {
    id: 'auxiliar-de-justicia',
    category: 'Actuación Judicial',
    date: '2026-09-25',
    dateLabel: '25/09/2026',
    title: 'Ya se encuentra abierta la inscripción para actuar como Auxiliar de Justicia',
    image: '/images/novedades/auxiliar-de-justicia.jpg',
    alt: 'Estatua de la Justicia con los ojos vendados sosteniendo una balanza',
    href: NOTICIAS_URL,
  },
  {
    id: 'rt-54-nua',
    category: 'Normativa',
    date: '2026-09-20',
    dateLabel: '20/09/2026',
    title: 'Contenido exclusivo RT 54 NUA para matriculados',
    image: '/images/novedades/rt54-nua.jpg',
    alt: 'Persona revisando documentos contables junto a una calculadora',
    href: NOTICIAS_URL,
  },
];

interface NewsCardProps {
  item: NewsItem;
  featured?: boolean;
}

function NewsCard({ item, featured = false }: NewsCardProps) {
  return (
    <article className={featured ? 'news-card news-card--featured' : 'news-card'}>
      {/* "Imagen (proporción fija)" */}
      <div className="news-card-media">
        {featured ? (
          // La tarjeta grande usa el recorte de Figma (imagen ampliada y desplazada)
          <div className="news-card-crop">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 1023px) 120vw, 760px"
              className="news-card-img"
            />
          </div>
        ) : (
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 305px"
            className="news-card-img"
          />
        )}
      </div>

      {/* "Categoría y fecha" */}
      <div className="news-card-meta">
        <span className="news-card-tag">{item.category}</span>
        <time className="news-card-date" dateTime={item.date}>
          {item.dateLabel}
        </time>
      </div>

      <h3 className="news-card-title">
        <a className="news-card-link" href={item.href} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </h3>

      {item.summary && <p className="news-card-summary">{item.summary}</p>}
    </article>
  );
}

export default function News() {
  return (
    <section className="news-band" id="novedades" aria-labelledby="novedades-title">
      {/* "Aurora blob center": resplandor azul difuso detrás de la grilla */}
      <div className="news-aurora" aria-hidden="true" />

      <div className="news-container">
        {/* "Encabezado" */}
        <div className="news-header">
          <h2 id="novedades-title" className="news-title">
            Novedades
          </h2>
          {/* "Botón · Pastilla · Ver todas las novedades" */}
          <a className="news-all-btn" href={NOTICIAS_URL} target="_blank" rel="noopener noreferrer">
            <span>Ver todas las novedades</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* "Grilla" */}
        <div className="news-grid">
          <NewsCard item={featuredNews} featured />

          {/* "Columna" (Fila 1 + Fila 2) */}
          <div className="news-column">
            {secondaryNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
