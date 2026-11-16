/**
 * Contenido del menú desplegable según Figma (CPCE1_Web_Fase2 · "02 Prototipo Homepage CPCE V1",
 * frames "Menú · El Consejo", "Menú · Matrícula", "Menú · Ejercicio profesional",
 * "Menú · Actuación judicial", "Menú · Capacitación y eventos" y "Menú · Beneficios y servicios").
 *
 * Los enlaces sin `href` todavía no tienen página propia: al pulsarlos se muestra un aviso.
 */
export interface MenuLink {
  label: string;
  /** Ruta interna ("/calendar") o URL externa. */
  href?: string;
  /** Abre otro sitio (se muestra con ↗ y en una pestaña nueva cuando tenga URL). */
  external?: boolean;
}

export interface MenuGroup {
  /** Rótulo del grupo en mayúsculas (algunas secciones no lo tienen). */
  label?: string;
  links: MenuLink[];
}

export interface MenuSection {
  id: string;
  label: string;
  groups: MenuGroup[];
}

export const SITE_MENU: MenuSection[] = [
  {
    id: 'el-consejo',
    label: 'El Consejo',
    groups: [
      {
        label: 'Institucional',
        links: [
          { label: 'Historia y 75 años' },
          { label: 'Misión y visión' },
          { label: 'Autoridades' },
          { label: 'Marco legal' },
        ],
      },
      {
        label: 'Vínculos y sedes',
        links: [
          { label: 'Convenios' },
          { label: 'Consejo Responsable' },
          { label: 'Delegaciones, firmas autorizadas y oficinas' },
          { label: 'Contacto' },
        ],
      },
    ],
  },
  {
    id: 'matricula',
    label: 'Matrícula',
    groups: [
      {
        links: [
          { label: 'Inscripción y cancelación' },
          { label: 'Plan Joven' },
          { label: 'Costo de matrícula' },
          { label: 'Medios de pago' },
        ],
      },
    ],
  },
  {
    id: 'ejercicio-profesional',
    label: 'Ejercicio profesional',
    groups: [
      {
        label: 'Legalizaciones',
        links: [
          { label: 'Legalizaciones' },
          { label: 'Aranceles de legalización' },
          { label: 'Validación de etiquetas' },
          { label: 'Firma digital' },
        ],
      },
      {
        label: 'Normativa',
        links: [{ label: 'Normas profesionales' }, { label: 'Resoluciones del Consejo' }],
      },
      {
        label: 'Honorarios',
        links: [{ label: 'Honorarios mínimos sugeridos' }, { label: 'Calculador de honorarios' }],
      },
      {
        label: 'Control profesional',
        links: [
          { label: 'Tribunal de Ética' },
          { label: 'Vigilancia profesional' },
          { label: 'Denuncia de ejercicio ilegal' },
        ],
      },
    ],
  },
  {
    id: 'actuacion-judicial',
    label: 'Actuación judicial',
    groups: [
      {
        links: [
          { label: 'Inscripciones a tribunales 2027' },
          { label: 'Sorteos de peritos' },
          { label: 'Sorteos de causas (síndicos)' },
          { label: 'Tasas BNA' },
        ],
      },
    ],
  },
  {
    id: 'capacitacion-y-eventos',
    label: 'Capacitación y eventos',
    groups: [
      {
        links: [
          { label: 'Agenda completa', href: '/calendar' },
          { label: 'Capacitaciones' },
          { label: 'Eventos culturales' },
          { label: 'Sistema de Actualización Profesional', external: true },
        ],
      },
    ],
  },
  {
    id: 'beneficios-y-servicios',
    label: 'Beneficios y servicios',
    groups: [
      {
        links: [
          { label: 'Beneficios para matriculados' },
          { label: 'Servicio de asesoramiento contable' },
          { label: 'Revista Opinión Profesional' },
          { label: 'Sitios de interés' },
        ],
      },
    ],
  },
];
