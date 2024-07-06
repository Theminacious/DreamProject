'use client'
import DeliverForm from '@/components/Deliverydetail';
import HeroSectionDASH from '@/components/HeroSectionDASH';
import TypeWriter from '@/components/TypeWriter'

const Page = () => {
  return (
    <div className="min-h-screen ">
      <HeroSectionDASH/>
      <TypeWriter/>
      
          <DeliverForm />
          </div>
  );
};

export default Page;
