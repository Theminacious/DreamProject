import React from 'react'
import Link from 'next/link'
import { Spotlight } from './ui/Spotlight'
import { Button } from './ui/moving-border'

const HeroSection = () => {
  return (
    <div className='h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0 '>
    <Spotlight  className='-top-40 left-0 md:left-60 md:-top-20' fill='white'/>
      <div className='p-4 relative z-10 w-full text-center'>
        <h1 className='mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 '>
          Deliver At Your Choice
        </h1>
        <p className='mt-4 font-normal text-base md:text-lg text-neutral-300 max-1-lg mx-auto'>
          Dropngo is your go-to solution for convenient and reliable delivery services. Whether you need to send a package across town or across the country, we&apos;ve got you covered. Our platform ensures timely and secure deliveries, giving you peace of mind. Experience the ease of scheduling and tracking your deliveries with Dropngo.
        </p>
        <div className='mt-4'>
        <Link href={"/"}>
            <Button
             borderRadius="1.75rem"
        className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >Get Started</Button>
            </Link>
        </div>
        
      </div>
      
    </div>
  )
}

export default HeroSection
