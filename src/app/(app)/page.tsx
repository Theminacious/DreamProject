
import HeroSection from '@/components/HeroSection'
import OurFeatures from '@/components/OurFeatures'
import Scroll from '@/components/Scroll';
import Testimonials from '@/components/Testimonials';
import TechnologyWeUse from '@/components/TechnologyWeUse';
import MeetOurTeam from '@/components/MeetOurTeam';
import Footer from '@/components/Footer';



export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased ">
   <HeroSection/>
   <OurFeatures/>
   <Scroll/>
   <Testimonials/>
   <TechnologyWeUse/>
   <MeetOurTeam/>
   <Footer/>

    </main>
  );
}





