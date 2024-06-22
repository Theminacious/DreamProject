import HeroSection from '@/components/HeroSection'
import OurFeatures from '../components/OurFeatures'
import Scroll from '@/components/scroll';


export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
   <HeroSection/>
   <OurFeatures/>
   <Scroll/>
    </main>
  );
}
