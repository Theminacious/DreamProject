'use client'
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinte-moving-card";

const Testimonials = () => {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
        Voices of Satisfaction
        </h2>
    <InfiniteMovingCards
      items={testimonials}
      direction="right"
      speed="slow"
    />
  </div>
  )
}

export default Testimonials



const testimonials = [
    {
      quote:
        "With their same-day delivery service, I never have to worry about missing deadlines. It's reliable and efficient, exactly what I need for my business.",
      name: "Sarah Johnson",
      title: "CEO, Tech Innovations Inc.",
    },
    {
      quote:
        "Their overnight delivery option has been a game-changer for our logistics. We can now meet urgent client demands without any hassle.",
      name: "Michael Brown",
      title: "Operations Manager, Swift Logistics",
    },
    {
      quote:
        "I'm impressed by their international shipping service. It's seamless and cost-effective, allowing us to expand our market globally with ease.",
      name: "Emily Rodriguez",
      title: "E-commerce Entrepreneur",
    },
    {
      quote:
        "Their package tracking feature is fantastic! I always know exactly where my shipments are, and the real-time updates keep me informed every step of the way.",
      name: "John Carter",
      title: "Small Business Owner",
    },
    {
      quote:
        "The secure packaging service ensures that my fragile items arrive intact. It's reassuring to know that my packages are handled with care.",
      name: "Alice Green",
      title: "Artisan Crafts Seller",
    },
  ];
  
  
  