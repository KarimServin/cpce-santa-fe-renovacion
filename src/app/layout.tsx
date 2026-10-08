import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Lora, Outfit, Playfair_Display, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '../context/ModalContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MatriculaModal from '../components/MatriculaModal';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const siteTitle = 'CPCE Santa Fe - Cámara Primera | Consejo Profesional de Ciencias Económicas';
const siteDescription =
  'Portal institucional oficial de Cámara Primera del Consejo Profesional de Ciencias Económicas de la Provincia de Santa Fe. Sede Central y Delegaciones. Trámites, legalizaciones, capacitaciones y consulta de profesionales matriculados.';

export const viewport: Viewport = {
  themeColor: '#002B5C',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL('https://cpcesfe1.org.ar'),
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://cpcesfe1.org.ar',
    siteName: 'CPCE Santa Fe - Cámara Primera',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/images/hero-profesional.jpg',
        width: 1200,
        height: 650,
        alt: 'Consejo Profesional de Ciencias Económicas de Santa Fe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/images/hero-profesional.jpg'],
  },
};

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'GovernmentOrganization',
      '@id': 'https://cpcesfe1.org.ar/#institution',
      name: 'Consejo Profesional de Ciencias Económicas de la Provincia de Santa Fe - Cámara Primera',
      alternateName: 'CPCE Santa Fe Cámara 1',
      url: 'https://cpcesfe1.org.ar',
      logo: 'https://cpcesfe1.org.ar/favicon.svg',
      description: siteDescription,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'San Lorenzo 1849',
        addressLocality: 'Santa Fe',
        addressRegion: 'Santa Fe',
        postalCode: 'S3000',
        addressCountry: 'AR',
        name: 'Sede Central Cámara Primera',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+54-342-459-3450',
        contactType: 'customer service',
        areaServed: 'Provincia de Santa Fe (Cámara Primera)',
        availableLanguage: 'Spanish',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://cpcesfe1.org.ar/#website',
      url: 'https://cpcesfe1.org.ar',
      name: 'CPCE Santa Fe - Cámara Primera',
      publisher: {
        '@id': 'https://cpcesfe1.org.ar/#institution',
      },
      inLanguage: 'es-AR',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-AR"
      className={`${plusJakartaSans.variable} ${instrumentSans.variable} ${lora.variable} ${outfit.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        <ModalProvider>
          <Header />
          {children}
          <Footer />
          <MatriculaModal />
        </ModalProvider>
      </body>
    </html>
  );
}
