'use client'
import DeliverForm from '@/components/Deliverydetail';

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100">


      <div className="flex justify-center mt-8 px-4">
        <div className="max-w-lg w-full">
          <DeliverForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
