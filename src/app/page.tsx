import React from 'react';
import Hero from '../components/Hero';
import EventsAgenda from '../components/EventsAgenda';
import Chambers from '../components/Chambers';
import News from '../components/News';

export default function Home() {
  return (
    <main id="inicio">
      <Hero />
      <EventsAgenda />
      <Chambers />
      <News />
    </main>
  );
}
