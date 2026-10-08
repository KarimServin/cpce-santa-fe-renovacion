import React from 'react';

interface FeaturedNews {
  tag: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  link: string;
  dateFormatted: string;
}

interface NewsItem {
  category: string;
  date: string;
  dateFormatted: string;
  title: string;
  description: string;
  link: string;
}

const featuredNews: FeaturedNews = {
  tag: "Secretaría Técnica",
  category: "Normativa & Modelos",
  title: "Publicación de modelos y guías de aplicación para informes profesionales",
  description: "Accedé a los nuevos modelos sugeridos por la Secretaría Técnica de Cámara Primera, elaborados conforme a las resoluciones técnicas vigentes y buenas prácticas profesionales.",
  image: "https://www.argentina.gob.ar/sites/default/files/santa_fe_puente.jpg",
  alt: "Puente Colgante de Santa Fe sobre la laguna Setúbal",
  link: "https://cpcesfe1.org.ar/noticias/",
  dateFormatted: "26 de Septiembre, 2026",
};

const recentNews: NewsItem[] = [
  {
    category: "Institucional",
    date: "2026-09-24",
    dateFormatted: "24 Sep 2026",
    title: "Reunión de Consejo Directivo y agenda de trabajo con delegaciones",
    description: "Se abordaron los principales proyectos de modernización administrativa y el plan de obras para las sedes del interior.",
    link: "https://cpcesfe1.org.ar/noticias/",
  },
  {
    category: "Capacitación",
    date: "2026-09-20",
    dateFormatted: "20 Sep 2026",
    title: "Próximas jornadas tributarias provinciales: apertura de inscripciones",
    description: "Especialistas analizarán el impacto de las recientes modificaciones normativas y jurisprudencia provincial.",
    link: "https://cpcesfe1.org.ar/noticias/",
  },
  {
    category: "Comunidad",
    date: "2026-09-15",
    dateFormatted: "15 Sep 2026",
    title: "Acto de colación y entrega de diplomas a nuevos profesionales matriculados",
    description: "Una nueva cohorte de graduados en ciencias económicas se incorporó formalmente a la matrícula de Cámara Primera.",
    link: "https://cpcesfe1.org.ar/noticias/",
  },
];

export default function News() {
  return (
    <section className="news-compact-section" id="novedades" aria-labelledby="novedades-title">
      <div className="wrap">
        {/* Cabecera con estética idéntica a Hero, Eventos y Sedes */}
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

        {/* Layout de 2 columnas: Noticia Destacada + Lista de Novedades Recientes */}
        <div className="news-unified-layout">
          {/* Noticia Principal Destacada */}
          <article className="news-featured-card">
            <div className="news-featured-media">
              <img
                src={featuredNews.image}
                alt={featuredNews.alt}
                loading="lazy"
                width={640}
                height={340}
                className="news-featured-img"
              />
              <div className="news-featured-floating-tag">
                <span className="news-pulse-dot" />
                <span>{featuredNews.tag}</span>
              </div>
            </div>

            <div className="news-featured-body">
              <div className="news-meta-row">
                <span className="news-tag-pill news-tag-pill--primary">
                  {featuredNews.category}
                </span>
                <time className="news-meta-date">{featuredNews.dateFormatted}</time>
              </div>

              <h3 className="news-featured-title">
                <a href={featuredNews.link} target="_blank" rel="noopener noreferrer">
                  {featuredNews.title}
                </a>
              </h3>

              <p className="news-featured-desc">{featuredNews.description}</p>

              <div className="news-featured-footer">
                <a
                  className="news-read-more-btn"
                  href={featuredNews.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leer noticia completa
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </article>

          {/* Columna de Noticias Secundarias en tarjetas individuales */}
          <div className="news-recent-column">
            <div className="news-column-title-bar">
              <span className="news-column-heading">MÁS NOVEDADES</span>
              <span className="news-column-count">{recentNews.length} recientes</span>
            </div>

            <div className="news-recent-cards-list">
              {recentNews.map((news, index) => (
                <article key={index} className="news-item-card">
                  <div className="news-item-top">
                    <span className="news-tag-pill">
                      {news.category}
                    </span>
                    <time dateTime={news.date} className="news-item-date">
                      {news.dateFormatted}
                    </time>
                  </div>

                  <h4 className="news-item-title">
                    <a href={news.link} target="_blank" rel="noopener noreferrer">
                      {news.title}
                    </a>
                  </h4>

                  <p className="news-item-desc">{news.description}</p>

                  <div className="news-item-bottom">
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="news-item-link"
                    >
                      Leer más
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
