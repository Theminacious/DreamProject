import React from 'react';
import Link from 'next/link';
import { Button } from './ui/moving-border'; // Adjust path as per your project structure

const HeroSectionDASH = () => {
  return (
    <div
      className='h-[30rem] md:h-[35rem]  bg-cover bg-center relative flex items-center justify-center'
      style={{
        backgroundImage: `url('/dashboard-img.jpg')`, // Replace with actual path to your image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 25%', // Adjust background position to cut from top and bottom
      }}
    >
      <div className='bg-black bg-opacity-50 absolute inset-0'></div> {/* Overlay to darken the background */}
      <div className='relative z-10 text-center text-white'>
        <h1 className='mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>
          Deliver At Your Choice
        </h1>
        <p className='mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis laboriosam qui ratione
          molestiae in quisquam dignissimos, doloribus voluptatibus. Recusandae fugit omnis impedit
          nostrum fugiat modi, explicabo odio quis atque tenetur eum aliquid totam quia quae odit
          ipsum asperiores. Fugit, accusamus?
        </p>
        <div className='mt-6'>
          <Link href='/'>
            <Button
              borderRadius='1.75rem'
              className='bg-black text-white border-neutral-200 dark:border-slate-800'
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionDASH;
