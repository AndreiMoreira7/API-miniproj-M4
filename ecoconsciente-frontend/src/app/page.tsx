import { HeroSection } from '@/app/components/sections/HeroSection';
import { AirQualitySection } from '@/app/components/sections/AirQualitySection';
import { EndangeredSpeciesSection } from '@/app/components/sections/EndangeredSpeciesSection';
import { SustainableTipSection } from '@/app/components/sections/SustainableTipSection';
import { Header } from '@/app/components/layout/Header';
import { Footer } from '@/app/components/layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AirQualitySection />
        <EndangeredSpeciesSection />
        <SustainableTipSection />
      </main>
      <Footer />
    </div>
  );
}