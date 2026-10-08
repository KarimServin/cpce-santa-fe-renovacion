// src/content/home.ts

export interface AgendaEvent {
  date: string;    // '07'
  month: string;   // 'OCT'
  title: string;
  meta: string;    // 'Híbrida · 17:00 hs'
  badge: string;
  badgeVariant: 'open' | 'limited' | 'soon';
}

export interface AccessCard {
  id: string;
  title: string;
  subtitle: string;
  icon: 'search' | 'file' | 'card' | 'calendar' | 'scale' | 'user';
  profiles: ('matriculado' | 'otros')[];
  featured?: boolean;
  action: { type: 'dialog' | 'link' | 'toast'; target: string };
}

export interface SearchSuggestion {
  id: string;
  title: string;
  group: 'Normativa' | 'Capacitación' | 'Trámites';
  type: 'dialog' | 'link' | 'toast';
  target: string;
}

export interface NavMegaItem {
  title: string;
  desc?: string;
  href: string;
  action?: { type: 'toast' | 'dialog' | 'link'; target?: string };
}

export interface NavMegaCol {
  heading: string;
  items?: NavMegaItem[];
  framed?: boolean;
  subColumns?: NavMegaItem[][];
}

export interface NavMegaFeatured {
  tag: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  shortLabel?: string;
  href: string;
  action?: { type: 'toast' | 'dialog' | 'link'; target?: string };
  children?: {
    columns: NavMegaCol[];
    featured?: NavMegaFeatured;
  };
}

export interface HomeContent {
  eyebrow: string;
  h1: { prefix: string; italic: string; suffix: string };
  subtitle: string;
  search: {
    placeholder: string;
    chips: { label: string; action: 'dialog' | 'link' | 'toast'; value: string }[];
  };
  convocatoria: {
    tag: string;
    title: string;
    cta: string;
    href: string;
  };
  events: AgendaEvent[];
  stats: { value: number; suffix: string; label: string }[];
  accessCards: AccessCard[];
  suggestions: SearchSuggestion[];
  navItems: NavItem[];
}

export const HOME_CONTENT: HomeContent = {
  eyebrow: 'Portal institucional · CPCE Santa Fe',
  h1: {
    prefix: 'El Consejo de ',
    italic: 'Ciencias Económicas',
    suffix: ' de Santa Fe',
  },
  subtitle:
    'Normativa, honorarios, capacitación y novedades de la profesión, y tus gestiones cuando las necesites.',
  search: {
    placeholder: 'Buscar normas, aranceles, cursos, trámites...',
    chips: [
      { label: 'Honorarios vigentes', action: 'toast', value: 'Módulos Arancelarios 2026' },
      { label: 'Normativa', action: 'toast', value: 'Normativa FACPCE' },
      { label: 'Cursos', action: 'link', value: '#capacitacion' },
      { label: 'Legalizaciones', action: 'toast', value: 'Legalizaciones digitales' },
    ],
  },
  convocatoria: {
    tag: 'Convocatoria 2027',
    title: 'Auxiliares de justicia',
    cta: 'Inscripción y requisitos →',
    href: '#novedades',
  },
  events: [
    {
      date: '07',
      month: 'OCT',
      title: 'Curso Práctico: Firma Digital, Token y Seguridad Técnica',
      meta: 'Híbrida · 17:00 hs',
      badge: 'Inscripción abierta',
      badgeVariant: 'open',
    },
    {
      date: '09',
      month: 'OCT',
      title: 'Jornada FACPCE: Actualización de Resoluciones Técnicas',
      meta: 'Presencial · 09:30 hs',
      badge: 'Cupos limitados',
      badgeVariant: 'limited',
    },
    {
      date: '15',
      month: 'OCT',
      title: 'Taller de Práctica Tributaria y Liquidación de Ganancias',
      meta: 'Virtual · 18:00 hs',
      badge: 'Próximamente',
      badgeVariant: 'soon',
    },
  ],
  stats: [
    { value: 2400, suffix: '+', label: 'Matriculados' },
    { value: 60, suffix: '', label: 'Años de historia' },
    { value: 4, suffix: '', label: 'Delegaciones' },
  ],
  accessCards: [
    {
      id: 'honorarios',
      title: 'Honorarios',
      subtitle: 'Aranceles y tablas vigentes',
      icon: 'card',
      profiles: ['matriculado', 'otros'],
      action: { type: 'toast', target: 'Módulos Arancelarios 2026' },
    },
    {
      id: 'matricula',
      title: 'Verificar matrícula',
      subtitle: 'Consulta de estado y padrón',
      icon: 'search',
      profiles: ['matriculado', 'otros'],
      featured: true,
      action: { type: 'dialog', target: 'matricula' },
    },
    {
      id: 'peritos',
      title: 'Peritos',
      subtitle: 'Actuación judicial y listas',
      icon: 'scale',
      profiles: ['matriculado', 'otros'],
      action: { type: 'toast', target: 'Registro de Peritos' },
    },
    {
      id: 'legalizaciones',
      title: 'Legalizaciones',
      subtitle: 'Trámites digitales y QR',
      icon: 'file',
      profiles: ['matriculado'],
      action: { type: 'toast', target: 'Legalizaciones digitales' },
    },
    {
      id: 'miconsejo',
      title: 'Mi Consejo',
      subtitle: 'Portal de autogestión',
      icon: 'user',
      profiles: ['matriculado'],
      action: { type: 'toast', target: 'Portal Mi Consejo' },
    },
    {
      id: 'agenda',
      title: 'Agenda',
      subtitle: 'Cursos, eventos y jornadas',
      icon: 'calendar',
      profiles: ['matriculado', 'otros'],
      action: { type: 'link', target: '#capacitacion' },
    },
  ],
  suggestions: [
    { id: '1', title: 'Honorarios Sugeridos 2026', group: 'Normativa', type: 'toast', target: 'Módulos Arancelarios' },
    { id: '2', title: 'Resoluciones Técnicas FACPCE', group: 'Normativa', type: 'toast', target: 'Resoluciones Técnicas' },
    { id: '3', title: 'Código de Ética Profesional', group: 'Normativa', type: 'toast', target: 'Código de Ética' },
    { id: '4', title: 'Ciclo de Actualización Impositiva', group: 'Capacitación', type: 'link', target: '#capacitacion' },
    { id: '5', title: 'Jornadas de Auditoría y Contabilidad', group: 'Capacitación', type: 'link', target: '#capacitacion' },
    { id: '6', title: 'Verificación de Matrícula', group: 'Trámites', type: 'dialog', target: 'matricula' },
    { id: '7', title: 'Padrón de Profesionales', group: 'Trámites', type: 'dialog', target: 'matricula' },
    { id: '8', title: 'Legalización de Trabajos Digitales', group: 'Trámites', type: 'toast', target: 'Legalización Digital' },
  ],
  navItems: [
    {
      id: 'institucional',
      label: 'Institucional',
      href: '#institucional',
      children: {
        columns: [
          {
            heading: 'Vínculos y Presencia',
            items: [
              { title: 'Convenios', desc: 'Acuerdos universitarios, comerciales y beneficios', href: '#institucional', action: { type: 'toast', target: 'Convenios Institucionales' } },
              { title: 'Sede y Delegaciones', desc: 'Sede Central y delegaciones en la provincia', href: '#sedes' },
              { title: 'Contacto', desc: 'Mesa de ayuda, teléfonos y atención al profesional', href: '#contacto', action: { type: 'toast', target: 'Formulario de Contacto' } },
            ],
          },
          {
            heading: 'Normativa',
            items: [
              { title: 'Marco Legal', desc: 'Ley de creación y reglamentación del Consejo', href: '#institucional', action: { type: 'toast', target: 'Marco Legal' } },
              { title: 'Resoluciones del Consejo', desc: 'Disposiciones vigentes y resoluciones de Mesa Directiva', href: '#resoluciones', action: { type: 'toast', target: 'Resoluciones del Consejo' } },
              { title: 'Política de Calidad', desc: 'Certificación ISO 9001 en procesos de gestión', href: '#institucional', action: { type: 'toast', target: 'Política de Calidad ISO 9001' } },
            ],
          },
          {
            heading: 'Institución y Origen',
            items: [
              { title: 'Autoridades', desc: 'Mesa Directiva y Consejo Directivo vigente', href: '#institucional', action: { type: 'toast', target: 'Autoridades Institucionales' } },
              { title: 'Historia', desc: '60 años al servicio de los profesionales', href: '#institucional', action: { type: 'toast', target: 'Historia Institucional' } },
              { title: 'Misión / Visión', desc: 'Principios rectores y compromiso ético', href: '#institucional', action: { type: 'toast', target: 'Misión y Visión' } },
            ],
          },
        ],
      },
    },
    {
      id: 'legalizaciones-matriculas',
      label: 'Legalizaciones y Matrículas',
      shortLabel: 'Legalizaciones',
      href: '#legalizaciones',
      children: {
        columns: [
          {
            heading: 'Matriculación',
            items: [
              { title: 'Inscripción / Cancelación', desc: 'Altas, bajas y rehabilitación de matrícula', href: '#servicios', action: { type: 'toast', target: 'Inscripción / Cancelación de Matrícula' } },
              { title: 'Beneficios', desc: 'Subsidios, convenios y coberturas exclusivas', href: '#servicios', action: { type: 'toast', target: 'Beneficios para Matriculados' } },
              { title: 'Costo de Matrícula', desc: 'Aranceles vigentes y cuotas periódicas', href: '#servicios', action: { type: 'toast', target: 'Costo de Matrícula' } },
              { title: 'Padrón de Matriculados', desc: 'Búsqueda pública y verificación de profesionales habilitados', href: '#servicios', action: { type: 'dialog', target: 'matricula' } },
            ],
          },
          {
            heading: 'Legalizaciones',
            framed: true,
            subColumns: [
              [
                { title: 'Normas Profesionales', desc: 'Disposiciones y marco técnico (FACPCE)', href: '#normas', action: { type: 'toast', target: 'Normas Profesionales FACPCE' } },
                { title: 'Resolución Técnica Vigente', desc: 'Normas contables y de auditoría', href: '#rt', action: { type: 'toast', target: 'Resoluciones Técnicas Vigentes' } },
                { title: 'Calcular Honorarios', desc: 'Calculadora de aranceles orientativos', href: '#honorarios', action: { type: 'toast', target: 'Calculadora de Honorarios' } },
                { title: 'Consulta de Aranceles', desc: 'Tablas y módulos de legalización', href: '#aranceles', action: { type: 'toast', target: 'Consulta de Aranceles' } },
              ],
              [
                { title: 'Certificación de Firma', desc: 'Validación digital y presencial', href: '#firma', action: { type: 'toast', target: 'Certificación de Firma' } },
                { title: 'Documentación Técnica', desc: 'Guías, informes y modelos tipo', href: '#tecnica', action: { type: 'toast', target: 'Documentación Técnica' } },
                { title: 'Checklist: Presentación de Trabajos', desc: 'Requisitos y control previo de entrega', href: '#checklist', action: { type: 'toast', target: 'Checklist Presentación de Trabajos' } },
                { title: 'Memorandos', desc: 'Circulares y doctrina de consulta (FACPCE)', href: '#memorandos', action: { type: 'toast', target: 'Memorandos FACPCE' } },
              ],
            ],
          },
        ],
      },
    },
    {
      id: 'servicios',
      label: 'Servicios y Trámites',
      shortLabel: 'Servicios',
      href: '#servicios',
      children: {
        columns: [
          {
            heading: 'Control Profesional',
            items: [
              { title: 'Denuncia Ejercicio Ilegal', desc: 'Canal formal para denunciar ejercicio no habilitado', href: '#servicios', action: { type: 'toast', target: 'Denuncia por Ejercicio Ilegal' } },
              { title: 'Tribunal de Ética', desc: 'Normas deontológicas, causas y código ético', href: '#servicios', action: { type: 'toast', target: 'Tribunal de Ética' } },
              { title: 'Vigilancia', desc: 'Fiscalización y control del ejercicio profesional', href: '#servicios', action: { type: 'toast', target: 'Vigilancia Profesional' } },
            ],
          },
          {
            heading: 'Actuaciones Judiciales',
            framed: true,
            items: [
              { title: 'Sorteo Peritos', desc: 'Designaciones de peritos y auxiliares de la justicia', href: '#servicios', action: { type: 'toast', target: 'Sorteo de Peritos' } },
              { title: 'Sorteo Causas', desc: 'Asignación y consulta de expedientes judiciales', href: '#servicios', action: { type: 'toast', target: 'Sorteo de Causas' } },
              { title: 'Inscripciones 2027', desc: 'Apertura de registro y presentación de requisitos', href: '#servicios', action: { type: 'toast', target: 'Inscripciones Periciales 2027' } },
              { title: 'Tasas Activas y Pasivas BNA', desc: 'Evolución de tasas del Banco Nación para liquidaciones', href: '#servicios', action: { type: 'toast', target: 'Tasas BNA Activas y Pasivas' } },
            ],
          },
        ],
      },
    },
    {
      id: 'capacitacion',
      label: 'Capacitación y eventos',
      href: '#capacitacion',
      children: {
        columns: [
          {
            heading: 'Cursos & Eventos',
            items: [
              { title: 'Firma Digital & Seguridad', desc: 'Próximo curso: 07 OCT · 17:00 hs', href: '#capacitacion' },
              { title: 'Jornada FACPCE RT', desc: 'Actualización en Resoluciones Técnicas · 09 OCT', href: '#capacitacion' },
              { title: 'Práctica Tributaria', desc: 'Taller de liquidación impositiva · 15 OCT', href: '#capacitacion' },
            ],
          },
        ],
        featured: {
          tag: 'Capacitación Destacada',
          title: 'Ciclo Impositivo 2026',
          desc: 'Capacitación práctica presencial e híbrida con especialistas.',
          cta: 'Inscribirse ahora →',
          href: '#capacitacion',
        },
      },
    },
    {
      id: 'obra-social',
      label: 'Obra Social',
      shortLabel: 'Obra Social',
      href: '#dss',
      children: {
        columns: [
          {
            heading: 'Departamento de Servicios Sociales (DSS)',
            items: [
              { title: 'Planes y Cobertura', desc: 'Atención médica integral para vos y tu familia', href: '#dss', action: { type: 'toast', target: 'Obra Social - DSS' } },
              { title: 'Cartilla de Prestadores', desc: 'Médicos, clínicas, farmacias y convenios', href: '#dss', action: { type: 'toast', target: 'Cartilla DSS' } },
              { title: 'Reintegros y Subsidios', desc: 'Gestión online de solicitudes y beneficios', href: '#dss', action: { type: 'toast', target: 'Reintegros DSS' } },
            ],
          },
        ],
        featured: {
          tag: 'Salud y Cobertura',
          title: 'Servicios Sociales DSS',
          desc: 'Atención integral, prestadores y beneficios médicos para el matriculado y su familia.',
          cta: 'Conocer cobertura →',
          href: '#dss',
        },
      },
    },
    {
      id: 'caja',
      label: 'Caja',
      shortLabel: 'Caja',
      href: '#css',
      children: {
        columns: [
          {
            heading: 'Caja de Seguridad Social (CSS)',
            items: [
              { title: 'Sistema Previsional', desc: 'Régimen de aportes, jubilaciones y pensiones', href: '#css', action: { type: 'toast', target: 'Caja de Previsión - CSS' } },
              { title: 'Estado de Cuenta & Aportes', desc: 'Consulta de períodos, pagos y comprobantes', href: '#css', action: { type: 'toast', target: 'Consulta Aportes CSS' } },
              { title: 'Líneas de Préstamos', desc: 'Financiamiento personal y asistencia solidaria', href: '#css', action: { type: 'toast', target: 'Préstamos CSS' } },
            ],
          },
        ],
        featured: {
          tag: 'Previsión y Aportes',
          title: 'Seguridad Social CSS',
          desc: 'Régimen previsional, jubilaciones, subsidios y asistencia financiera.',
          cta: 'Consultar sistema →',
          href: '#css',
        },
      },
    },
    {
      id: 'comunicaciones',
      label: 'Comunicaciones',
      shortLabel: 'Comunicaciones',
      href: '#novedades',
      children: {
        columns: [
          {
            heading: 'Canales y Publicaciones',
            items: [
              { title: 'Novedades', desc: 'Comunicados oficiales y actualidad institucional', href: '#novedades' },
              { title: 'La Revista', desc: 'Edición digital e institucional de ciencias económicas', href: '#revista', action: { type: 'toast', target: 'La Revista Institucional' } },
            ],
          },
        ],
      },
    },
  ],
};
