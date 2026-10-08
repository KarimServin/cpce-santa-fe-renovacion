import React from 'react';
import Hero from '../components/Hero';
import EventsAgenda from '../components/EventsAgenda';
import Chambers from '../components/Chambers';
import News from '../components/News';
import Education from '../components/Education';

export default function Home() {
  return (
    <main id="inicio">
      <Hero />
      <EventsAgenda />
      <Chambers />
      <News />
      <Education />
    </main>
  );
}
