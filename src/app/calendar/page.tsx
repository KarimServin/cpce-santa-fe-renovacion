import React from 'react';
import type { Metadata } from 'next';
import InstitutionalCalendar from '../../components/InstitutionalCalendar';

export const metadata: Metadata = {
  title: 'Calendario Institucional | CPCE Santa Fe - Cámara Primera',
  description:
    'Cronograma oficial de capacitaciones, jornadas tributarias, reuniones de comisiones y actividades institucionales del Consejo Profesional de Ciencias Económicas de Santa Fe.',
  openGraph: {
    title: 'Calendario Institucional | CPCE Santa Fe',
    description:
      'Cronograma oficial de capacitaciones, jornadas tributarias, reuniones de comisiones y actividades institucionales.',
    url: 'https://cpcesfe1.org.ar/calendar',
    siteName: 'CPCE Santa Fe - Cámara Primera',
  },
};

export default function CalendarPage() {
  return (
    <main id="calendario-institucional">
      <InstitutionalCalendar />
    </main>
  );
}
