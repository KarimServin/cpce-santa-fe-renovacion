import React from 'react';

interface MainNews {
  tag: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  link: string;
  dateFormatted: string;
}

interface GridNewsItem {
  id: string;
  category: string;
  tag?: string;
  title: string;
  image: string;
  alt: string;
  link: string;
  dateFormatted: string;
}

const mainNews: MainNews = {
  tag: "Fondo FAL",
  category: "Laboral & Seguridad Social",
  title: "Conferencia sobre el Fondo de Asistencia Laboral: Inscribite a la reunión del 13/10",
  description: "Exposición especial sobre la operatividad del fondo, esquemas de aportes, entidades habilitadas y su impacto en el ejercicio profesional.",
  image: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=900&auto=format&fit=crop&q=80",
  alt: "Conferencia sobre el Fondo de Asistencia Laboral",
  link: "https://cpcesfe1.org.ar/noticias/",
  dateFormatted: "13 Oct 2026",
};

const secondaryNews: GridNewsItem[] = [
  {
    id: "ciclo-abc",
    category: "Capacitación",
    tag: "Ciclo ABC",
    title: "Séptima edición del Ciclo ABC: ya te podés inscribir en la séptima reunión",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80",
    alt: "Séptima edición del Ciclo ABC",
    link: "https://cpcesfe1.org.ar/noticias/",
    dateFormatted: "08 Oct 2026",
  },
  {
    id: "auxiliar-justicia",
    category: "Poder Judicial",
    tag: "Auxiliares 2027",
    title: "Ya se encuentra abierta la inscripción para actuar como Auxiliar de Justicia 2027",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
    alt: "Inscripción Auxiliares de Justicia 2027",
    link: "https://cpcesfe1.org.ar/noticias/",
    dateFormatted: "05 Oct 2026",
  },
  {
    id: "premio-belgrano",
    category: "Institucional",
    tag: "Premio Belgrano",
    title: "Lanzamos el Premio Dr. Manuel Belgrano 2026: ¡podés presentar tu trabajo hasta el 30/10!",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80",
    alt: "Premio Dr. Manuel Belgrano 2026",
    link: "https://cpcesfe1.org.ar/noticias/",
    dateFormatted: "02 Oct 2026",
  },
  {
    id: "ganancias-arca",
    category: "Tributario",
    tag: "ARCA",
    title: "Ganancias 2025: nueva prórroga para la presentación de la Declaración Jurada",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    alt: "ARCA - Prórroga Ganancias 2025",
    link: "https://cpcesfe1.org.ar/noticias/",
    dateFormatted: "29 Sep 2026",
  },
];

export default function News() {
  return (
    <section className="news-compact-section" id="novedades" aria-labelledby="novedades-title">
      <div className="wrap">
        {/* Cabecera institucional */}
        <div className="news-header-wrap">
          <div className="news-header-text">
            <span className="news-eyebrow">
              COMUNICACIÓN INSTITUCIONAL · CPCE SANTA FE
            </span>
            <h2 id="novedades-title" className="news-main-title" style={{ color: '#000000' }}>
              Novedades y Comunicados
            </h2>
            <p className="news-main-subtitle">
              Resoluciones, dictámenes técnicos, actualidad profesional y anuncios oficiales de Cámara Primera.
            </p>
          </div>

          <a
            className="news-btn-all"
            href="https://cpcesfe1.org.ar/noticias/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver todas las noticias ↗
          </a>
        </div>

        {/* Layout estilo Bento / Grilla Editorial: 1 Grande Izquierda + Grilla 2x2 Derecha */}
        <div className="news-bento-layout">
          {/* Tarjeta Principal Izquierda */}
          <article className="news-main-featured-card">
            <a
              href={mainNews.link}
              target="_blank"
              rel="noopener noreferrer"
              className="news-main-card-link"
              aria-label={mainNews.title}
            >
              <div className="news-main-img-wrap">
                <img
                  src={mainNews.image}
                  alt={mainNews.alt}
                  loading="lazy"
                  width={720}
                  height={520}
                  className="news-main-img"
                />
                <div className="news-main-floating-tag">
                  <span className="news-pulse-dot" />
                  <span>{mainNews.tag}</span>
                </div>
              </div>

              <div className="news-main-white-box">
                <div className="news-card-meta-row">
                  <span className="news-tag-pill news-tag-pill--primary">
                    {mainNews.category}
                  </span>
                  <time className="news-meta-date">{mainNews.dateFormatted}</time>
                </div>

                <h3 className="news-main-headline">
                  {mainNews.title}
                </h3>

                <p className="news-main-desc">
                  {mainNews.description}
                </p>

                <div className="news-main-action-row">
                  <span className="news-action-text">
                    Leer noticia completa
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </article>

          {/* Grilla 2x2 Derecha */}
          <div className="news-grid-right" role="region" aria-label="Novedades destacadas">
            {secondaryNews.map((news) => (
              <article key={news.id} className="news-grid-card">
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-grid-card-link"
                  aria-label={news.title}
                >
                  <div className="news-grid-img-wrap">
                    <img
                      src={news.image}
                      alt={news.alt}
                      loading="lazy"
                      width={380}
                      height={200}
                      className="news-grid-img"
                    />
                    <span className="news-grid-floating-tag">
                      {news.category}
                    </span>
                  </div>

                  <div className="news-grid-white-box">
                    <h4 className="news-grid-headline">
                      {news.title}
                    </h4>

                    <div className="news-grid-meta-footer">
                      <time className="news-grid-date">{news.dateFormatted}</time>
                      <span className="news-grid-more-link">
                        Leer más ↗
                      </span>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
