// src/content/calendar-data.ts

export interface CalendarEvent {
  id: string;
  year: number;
  month: number; // 1-12 (10 = Octubre)
  day: number;
  time: string; // '19:00'
  title: string;
  category: string;
  tag: string;
  speaker: string;
  location: string;
  modality: 'Híbrida' | 'Presencial' | 'Virtual / Streaming';
  description: string;
  registrationUrl: string;
  isHoliday?: boolean;
}

export const CALENDAR_CATEGORIES = [
  'Todos los eventos',
  'Finanzas e Inversiones',
  'Inteligencia Artificial',
  'Tributaria y Fiscal',
  'Management y Gestión',
  'Concursal y Judicial',
  'Laboral y Deontología',
] as const;

export const INSTITUTIONAL_EVENTS: CalendarEvent[] = [
  // ── OCTUBRE 2026 ───────────────────────────────────────────────
  // Jueves 1 Octubre
  {
    id: 'oct-1-1',
    year: 2026,
    month: 10,
    day: 1,
    time: '19:00',
    title: 'Finanzas para PyMEs',
    category: 'Finanzas e Inversiones',
    tag: 'Finanzas Corporativas',
    speaker: 'Lic. Fernando Morán · Comisión de Finanzas CPCE',
    location: 'Auditorio Sede Central & Streaming',
    modality: 'Híbrida',
    description:
      'Herramientas prácticas para optimizar el capital de trabajo, fuentes alternativas de financiamiento en el mercado de capitales y gestión de tesorería para PyMEs de la región.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Viernes 2 Octubre
  {
    id: 'oct-2-1',
    year: 2026,
    month: 10,
    day: 2,
    time: '16:00',
    title: 'Ciclo de Management: 1° Reunión',
    category: 'Management y Gestión',
    tag: 'Liderazgo & Gestión',
    speaker: 'Lic. Valeria Fontana · Especialista en Gestión Organizacional',
    location: 'Sala de Comisiones Sede Central',
    modality: 'Presencial',
    description:
      'Primera reunión del ciclo anual de actualización en liderazgo de equipos, metodologías ágiles en estudios contables y rediseño de procesos de atención profesional.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
  {
    id: 'oct-2-2',
    year: 2026,
    month: 10,
    day: 2,
    time: '16:00',
    title: 'Nuevas generaciones, nuevos inversores: La inteligencia artificial y la transformación de las finanzas',
    category: 'Inteligencia Artificial',
    tag: 'IA & Mercado',
    speaker: 'Dr. Ignacio Gómez y Comisión de Innovación',
    location: 'Aula Virtual CPCE · Transmisión en vivo',
    modality: 'Virtual / Streaming',
    description:
      'El impacto de los algoritmos predictivos y generativos en la toma de decisiones financieras personales y corporativas. Perfil de los nuevos inversores digitales.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Lunes 5 Octubre
  {
    id: 'oct-5-1',
    year: 2026,
    month: 10,
    day: 5,
    time: '18:30',
    title: 'FAL: del marco normativo a las soluciones del mercado',
    category: 'Finanzas e Inversiones',
    tag: 'Mercado Financiero',
    speaker: 'Dra. Marcela Rossi · Especialista en Regulación Financiera',
    location: 'Auditorio Sede Central & Zoom',
    modality: 'Híbrida',
    description:
      'Fondo de Ahorro y Liquidez: análisis exhaustivo de la reglamentación, garantías, operatividad bancaria y soluciones de inversión para empresas y profesionales.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Martes 6 Octubre
  {
    id: 'oct-6-1',
    year: 2026,
    month: 10,
    day: 6,
    time: '15:00',
    title: 'La inteligencia artificial y la transformación de las finanzas',
    category: 'Inteligencia Artificial',
    tag: 'Fintech e IA',
    speaker: 'Ing. Santiago Peralta & Mg. Carolina Ruiz',
    location: 'Canal Streaming CPCE',
    modality: 'Virtual / Streaming',
    description:
      'Herramientas avanzadas de modelado con IA para proyecciones de flujo de fondos, automatización de balances y mitigación de errores de conciliación.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Miércoles 7 Octubre
  {
    id: 'oct-7-1',
    year: 2026,
    month: 10,
    day: 7,
    time: '9:30',
    title: 'Introducción a la gestión de riesgos',
    category: 'Management y Gestión',
    tag: 'Auditoría & Riesgos',
    speaker: 'CPN Martín Valdés · Consultor en Control Interno',
    location: 'Sede Central San Lorenzo 1849',
    modality: 'Presencial',
    description:
      'Metodología COSO y matrices de riesgo aplicadas al diagnóstico empresarial, gobernanza corporativa y prevención de contingencias tributarias y legales.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
  {
    id: 'oct-7-2',
    year: 2026,
    month: 10,
    day: 7,
    time: '15:30',
    title: 'XVIII Jornadas de Actualización de Jurisprudencia para Síndicos Concursales',
    category: 'Concursal y Judicial',
    tag: 'Sindicatura Concursal',
    speaker: 'Comisión de Actuación Judicial y Magistrados Invitados',
    location: 'Salón de Actos Manuel Belgrano CPCE',
    modality: 'Presencial',
    description:
      'Encuentro anual sobre procesos falenciales, acuerdos preventivos extrajudiciales, verificación tempestiva y aranceles judiciales en la provincia de Santa Fe.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Jueves 8 Octubre
  {
    id: 'oct-8-1',
    year: 2026,
    month: 10,
    day: 8,
    time: '11:00',
    title: 'Inserción Laboral, RIFL y PER: qué regula cada uno y cuándo aplicarlo',
    category: 'Laboral y Deontología',
    tag: 'Derecho Laboral',
    speaker: 'Dra. Silvana Bertone · Comisión de Estudios Laborales',
    location: 'Auditorio Central & Transmisión Web',
    modality: 'Híbrida',
    description:
      'Régimen de Incentivo y Fomento Laboral, Programas de Empleo Registrado y convenios colectivos vigentes. Casos prácticos de liquidación de sueldos y aportes.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Viernes 9 Octubre (HOY)
  {
    id: 'oct-9-1',
    year: 2026,
    month: 10,
    day: 9,
    time: '15:00',
    title: 'Invertir con criterio en la era digital: Información, planificación y protección frente a la desinformación y los nuevos riesgos',
    category: 'Finanzas e Inversiones',
    tag: 'Educación Financiera',
    speaker: 'Lic. Gonzalo Arana y Lic. Carla Méndez',
    location: 'Auditorio Sede Central & Zoom Pro',
    modality: 'Híbrida',
    description:
      'Criterios analíticos para profesionales y clientes ante esquemas de inversión digital no regulados, activos tokenizados y estrategias de custodia de fondos.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Lunes 12 Octubre (Feriado Nacional)
  {
    id: 'oct-12-1',
    year: 2026,
    month: 10,
    day: 12,
    time: '00:00',
    title: 'Feriado Nacional: Día del Respeto a la Diversidad Cultural',
    category: 'Laboral y Deontología',
    tag: 'Feriado Nacional',
    speaker: 'Sede Central y Delegaciones cerradas',
    location: 'Provincia de Santa Fe',
    modality: 'Presencial',
    description: 'No habrá atención al público presencial. Los sistemas de legalizaciones digitales permanecen 100% operativos.',
    registrationUrl: 'https://cpcesfe1.org.ar/',
    isHoliday: true,
  },

  // Martes 13 Octubre (3 eventos -> Ver todos (3))
  {
    id: 'oct-13-1',
    year: 2026,
    month: 10,
    day: 13,
    time: '9:30',
    title: 'FAL: del marco normativo a las soluciones del mercado',
    category: 'Finanzas e Inversiones',
    tag: 'Regulación Financiera',
    speaker: 'Comisión de Finanzas y Mercado de Capitales',
    location: 'Aula Híbrida 2 · Sede Central',
    modality: 'Híbrida',
    description: 'Segunda sesión de consultas y taller práctico sobre aplicación del Fondo de Ahorro y Liquidez.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
  {
    id: 'oct-13-2',
    year: 2026,
    month: 10,
    day: 13,
    time: '16:00',
    title: 'Taller de Actualización en Ganancias y Bienes Personales',
    category: 'Tributaria y Fiscal',
    tag: 'Impuestos Directos',
    speaker: 'CPN Gustavo Benítez · Comisión de Tributación',
    location: 'Auditorio Central CPCE',
    modality: 'Presencial',
    description: 'Criterios de valuación, deducciones admitidas y jurisprudencia del Tribunal Fiscal de la Nación.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
  {
    id: 'oct-13-3',
    year: 2026,
    month: 10,
    day: 13,
    time: '18:30',
    title: 'Mesa de Consultas Tributarias en Vivo',
    category: 'Tributaria y Fiscal',
    tag: 'Consultorio Profesional',
    speaker: 'Panel de Especialistas CPCE Santa Fe',
    location: 'Streaming en vivo por Canal CPCE',
    modality: 'Virtual / Streaming',
    description: 'Espacio participativo donde los matriculados pueden consultar dudas prácticas y casos complejos de liquidación.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Miércoles 14 Octubre
  {
    id: 'oct-14-1',
    year: 2026,
    month: 10,
    day: 14,
    time: '9:00',
    title: 'Ciclo de Actualidad y Práctica Tributaria: 7° Reunión',
    category: 'Tributaria y Fiscal',
    tag: 'Práctica Tributaria',
    speaker: 'Comisión de Estudios Tributarios CPCE',
    location: 'Auditorio Sede Central & YouTube Live',
    modality: 'Híbrida',
    description: 'Séptima reunión del ciclo anual de práctica fiscal. Análisis de resoluciones generales de AFIP y normativa provincial API.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
  {
    id: 'oct-14-2',
    year: 2026,
    month: 10,
    day: 14,
    time: '19:00',
    title: 'Introducción a la toma de decisión y análisis de gestión de riesgo - Con apoyo de IA',
    category: 'Inteligencia Artificial',
    tag: 'IA Aplicada',
    speaker: 'Mg. Leonardo Rossi & Equipo de Transformación Digital',
    location: 'Aula Virtual CPCE',
    modality: 'Virtual / Streaming',
    description:
      'Modelado de escenarios probabilísticos mediante herramientas de IA para directivos y asesores contables en contextos de incertidumbre económica.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Jueves 15 Octubre
  {
    id: 'oct-15-1',
    year: 2026,
    month: 10,
    day: 15,
    time: '10:00',
    title: 'Inteligencia Artificial generativa aplicada al análisis de estados contables',
    category: 'Inteligencia Artificial',
    tag: 'Estados Contables',
    speaker: 'Dr. Alejandro Varela · Consultor en Analytics Financiero',
    location: 'Auditorio Sede Central & Streaming',
    modality: 'Híbrida',
    description:
      'Extracción automática de ratios, detección de anomalías y generación de síntesis explicativas de notas a los estados contables con LLMs locales y en la nube.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Viernes 16 Octubre
  {
    id: 'oct-16-1',
    year: 2026,
    month: 10,
    day: 16,
    time: '16:00',
    title: 'Encuentro de Ética Profesional y Responsabilidad del Matriculado',
    category: 'Laboral y Deontología',
    tag: 'Tribunal de Ética',
    speaker: 'Miembros del Tribunal de Ética Profesional CPCE',
    location: 'Sede Central Santa Fe',
    modality: 'Presencial',
    description:
      'Reflexión sobre deberes deontológicos, secreto profesional, firma responsable y límites en la actuación como asesor y auditor independiente.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Lunes 19 Octubre
  {
    id: 'oct-19-1',
    year: 2026,
    month: 10,
    day: 19,
    time: '17:00',
    title: 'Auditoría Digital: Herramientas Python y Automatización de Procesos',
    category: 'Inteligencia Artificial',
    tag: 'Auditoría Tecnológica',
    speaker: 'Comisión de Informática y Nuevas Tecnologías',
    location: 'Aula Virtual CPCE',
    modality: 'Virtual / Streaming',
    description:
      'Scripts prácticos para muestreo estadístico, cruce de comprobantes electrónicos con libros de IVA digital y verificación masiva de CUITs.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Martes 20 Octubre
  {
    id: 'oct-20-1',
    year: 2026,
    month: 10,
    day: 20,
    time: '15:00',
    title: 'Procedimiento Tributario Provincial: Ley Tarifaria y Código Fiscal',
    category: 'Tributaria y Fiscal',
    tag: 'API Santa Fe',
    speaker: 'Dra. Patricia Salvatierra · Especialista en Derecho Tributario',
    location: 'Auditorio Sede Central',
    modality: 'Híbrida',
    description:
      'Análisis pormenorizado del procedimiento recursivo ante la Administración Provincial de Impuestos (API) y últimas reformas al Código Fiscal santafesino.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Miércoles 21 Octubre
  {
    id: 'oct-21-1',
    year: 2026,
    month: 10,
    day: 21,
    time: '18:30',
    title: 'Ciclo de Management: 2° Reunión',
    category: 'Management y Gestión',
    tag: 'Gestión de Estudios',
    speaker: 'Lic. Valeria Fontana',
    location: 'Sala de Conferencias CPCE',
    modality: 'Presencial',
    description: 'Fijación estratégica de honorarios, tableros de control de rentabilidad por cliente y propuesta de valor del estudio contable moderno.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Jueves 22 Octubre
  {
    id: 'oct-22-1',
    year: 2026,
    month: 10,
    day: 22,
    time: '10:00',
    title: 'Prevención de Lavado de Activos: Sujetos Obligados y Normas UIF',
    category: 'Management y Gestión',
    tag: 'Normativa UIF',
    speaker: 'Dr. Hernán Cafferata · Especialista en Compliance',
    location: 'Auditorio Sede Central & Streaming',
    modality: 'Híbrida',
    description:
      'Obligaciones para profesionales matriculados como sujetos obligados ante la UIF. Matrices de debida diligencia y reporte de operaciones sospechosas.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Viernes 23 Octubre
  {
    id: 'oct-23-1',
    year: 2026,
    month: 10,
    day: 23,
    time: '16:00',
    title: 'Taller Práctico de Actuación Judicial para Peritos Contables',
    category: 'Concursal y Judicial',
    tag: 'Peritajes Judiciales',
    speaker: 'Comisión de Actuación Judicial CPCE',
    location: 'Sede Central San Lorenzo 1849',
    modality: 'Presencial',
    description:
      'Confección de puntos de pericia en fueros laboral, civil y comercial. Contestación de traslados, impugnaciones y pedido de regulación de honorarios periciales.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Lunes 26 Octubre
  {
    id: 'oct-26-1',
    year: 2026,
    month: 10,
    day: 26,
    time: '9:00',
    title: 'Conclusiones de las Jornadas Tributarias Provinciales 2026',
    category: 'Tributaria y Fiscal',
    tag: 'Doctrina Tributaria',
    speaker: 'Relatores Generales de las Jornadas',
    location: 'Auditorio Central & Transmisión Federal',
    modality: 'Híbrida',
    description:
      'Presentación de las ponencias aprobadas, documentos de trabajo y recomendaciones técnicas elaboradas durante las Jornadas Tributarias Provinciales.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Martes 27 Octubre
  {
    id: 'oct-27-1',
    year: 2026,
    month: 10,
    day: 27,
    time: '16:30',
    title: 'Planificación Financiera y Régimen Simplificado para PyMEs',
    category: 'Finanzas e Inversiones',
    tag: 'Finanzas PyME',
    speaker: 'CPN Esteban Larrea',
    location: 'Aula Virtual CPCE',
    modality: 'Virtual / Streaming',
    description:
      'Herramientas de planificación fiscal y financiera en regímenes simplificados. Transición hacia el régimen general sin asfixia de liquidez.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Miércoles 28 Octubre
  {
    id: 'oct-28-1',
    year: 2026,
    month: 10,
    day: 28,
    time: '18:00',
    title: 'Consultorio de Práctica Profesional Contable: RT 54 y NIIF',
    category: 'Management y Gestión',
    tag: 'Resoluciones Técnicas',
    speaker: 'Comisión de Estudios Contables CPCE',
    location: 'Sede Central Santa Fe',
    modality: 'Presencial',
    description:
      'Espacio de consulta sobre la Norma Unificada Argentina de Contabilidad (RT 54). Modelos de balance, notas complementarias y transiciones.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Jueves 29 Octubre
  {
    id: 'oct-29-1',
    year: 2026,
    month: 10,
    day: 29,
    time: '11:00',
    title: 'Régimen Penal Tributario y Responsabilidad del Profesional',
    category: 'Tributaria y Fiscal',
    tag: 'Derecho Penal Fiscal',
    speaker: 'Dr. Rodolfo Gianfelici · Abogado y Docente Universitario',
    location: 'Auditorio Sede Central & Zoom Pro',
    modality: 'Híbrida',
    description:
      'Delitos de evasión simple y agravada. Análisis de la figura del partícipe necesario y dictámenes periciales en causas penales económicas.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // Viernes 30 Octubre
  {
    id: 'oct-30-1',
    year: 2026,
    month: 10,
    day: 30,
    time: '17:00',
    title: 'Cierre de Ciclo de Actualización Impositiva 2026',
    category: 'Tributaria y Fiscal',
    tag: 'Balance Anual',
    speaker: 'Autoridades y Docentes del Ciclo',
    location: 'Auditorio Central CPCE & Brindis de Cierre',
    modality: 'Presencial',
    description:
      'Balance de las 8 reuniones del año, entrega de constancias de acreditación continua FACPCE y brindis de fin de ciclo con colegas matriculados.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // ── NOVIEMBRE 2026 ─────────────────────────────────────────────
  {
    id: 'nov-4-1',
    year: 2026,
    month: 11,
    day: 4,
    time: '18:00',
    title: 'Seminario de Automatización Contable con Machine Learning',
    category: 'Inteligencia Artificial',
    tag: 'Innovación',
    speaker: 'Comisión de Informática CPCE',
    location: 'Plataforma Virtual CPCE',
    modality: 'Virtual / Streaming',
    description: 'Herramientas de software libre para conciliación masiva de cuentas bancarias y libros de IVA.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
  {
    id: 'nov-12-1',
    year: 2026,
    month: 11,
    day: 12,
    time: '08:30',
    title: 'Congreso de Ciencias Económicas: Transformación y Futuro',
    category: 'Management y Gestión',
    tag: 'Congreso Anual',
    speaker: 'Disertantes Nacionales e Internacionales',
    location: 'Centro de Convenciones Santa Fe',
    modality: 'Presencial',
    description: 'El mayor encuentro profesional de la región. Conferencias magistrales, comisiones técnicas y debate sobre el futuro del ejercicio.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
  {
    id: 'nov-28-1',
    year: 2026,
    month: 11,
    day: 28,
    time: '17:00',
    title: 'Encuentro Anual de Jóvenes Graduados',
    category: 'Laboral y Deontología',
    tag: 'Comunidad CPCE',
    speaker: 'Comisión de Jóvenes Graduados',
    location: 'Espacio Social y Deportivo CPCE',
    modality: 'Presencial',
    description: 'Jornada de integración profesional, talleres de inserción laboral independiente, networking entre pares y cóctel de fin de año.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },

  // ── SEPTIEMBRE 2026 ───────────────────────────────────────────
  {
    id: 'sep-18-1',
    year: 2026,
    month: 9,
    day: 18,
    time: '17:00',
    title: 'Jornada de Peritajes Contables en Fuero Laboral',
    category: 'Concursal y Judicial',
    tag: 'Peritos',
    speaker: 'Comisión de Actuación Judicial',
    location: 'Sede Central Santa Fe',
    modality: 'Presencial',
    description: 'Actualización en liquidación de indemnizaciones, intereses y doctrina de la Corte Suprema Provincial.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
  {
    id: 'sep-25-1',
    year: 2026,
    month: 9,
    day: 25,
    time: '15:30',
    title: 'Finanzas Sostenibles y Criterios ESG para Empresas de la Región',
    category: 'Finanzas e Inversiones',
    tag: 'ESG & Sustentabilidad',
    speaker: 'Mg. Lucila Castagnino',
    location: 'Auditorio Central CPCE',
    modality: 'Híbrida',
    description: 'Reportes de sostenibilidad, bonos verdes y acceso a líneas de crédito preferenciales para empresas sustentables.',
    registrationUrl: 'https://cpcesfe1.org.ar/capacitacion/',
  },
];
