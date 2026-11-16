import React from 'react';
import Hero from '../components/Hero';
import News from '../components/News';
import FrequentTools from '../components/FrequentTools';
import EventsAgenda from '../components/EventsAgenda';
import Chambers from '../components/Chambers';

// Orden del Home según Figma (CPCE1_Web_Fase2 · "Home · Desktop 1441 - Héroe Sin márgenes"):
// héroe, novedades, herramientas frecuentes, capacitación y eventos, institucional.
export default function Home() {
  return (
    <main className="home-main">
      <Hero />
      <News />
      <FrequentTools />
      <EventsAgenda />
      <Chambers />
    </main>
  );
}
