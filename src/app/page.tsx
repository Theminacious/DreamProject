
import HeroSection from '@/components/HeroSection'
import OurFeatures from '../components/OurFeatures'
import Scroll from '@/components/Scroll';
import Testimonials from '@/components/Testimonials';
import TechnologyWeUse from '@/components/TechnologyWeUse';

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
   <HeroSection/>
   <OurFeatures/>
   <Scroll/>
   <Testimonials/>
   <TechnologyWeUse/>
    </main>
  );
}





