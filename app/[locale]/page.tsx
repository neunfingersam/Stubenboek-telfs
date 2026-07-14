import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Welcome from '@/components/sections/Welcome';
import Rooms from '@/components/sections/Rooms';
import Pendler from '@/components/sections/Pendler';
import Amenities from '@/components/sections/Amenities';
import Gallery from '@/components/sections/Gallery';
import Sustainability from '@/components/sections/Sustainability';
import BookingSection from '@/components/sections/BookingSection';
import LocalEvents from '@/components/sections/LocalEvents';
import Directions from '@/components/sections/Directions';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Welcome />
        <Rooms />
        <Pendler />
        <Amenities />
        <Gallery />
        <Sustainability />
        <BookingSection />
        <LocalEvents />
        <Directions />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
