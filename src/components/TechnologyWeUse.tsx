'use client'
import Link from "next/link"
import { HoverEffect } from "./ui/card-hover-effect"
import { Meteors } from "./ui/meteors"


const TechnologyWeUse = () => {
  return (
    <div className="p-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Technology We Use</h2>
          
          <p className="mt-2 text-xl leading-8 font-extrabold md tracking-tight text-white sm:text-4xl">Innovative Technology Driving Our Delivery Services</p>
        </div>
        <div className="mt-10">
        <HoverEffect items={technologyWeUse}/>
        
        </div>
        <div className="mt-10 text-center">
          <Link href={'/'}
          className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-teal-600 border border-transparent rounded-md shadow-lg hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 active:bg-teal-700 transition-transform transform hover:-translate-y-1">
          View All
          </Link>
        </div>

      </div>
      
      
    </div>
  )
}


export default TechnologyWeUse


export const technologyWeUse = [
  {
    title: "Real-time Tracking",
    description: "Our advanced GPS tracking system allows customers to track their deliveries in real-time.",
    link: "/technology/real-time-tracking"
  },
  {
    title: "Automated Dispatch System",
    description: "We use an automated system to efficiently assign delivery tasks to our drivers.",
    link: "/technology/automated-dispatch"
  },
  {
    title: "Secure Payment Gateway",
    description: "Our secure payment gateway ensures safe and quick transactions.",
    link: "/technology/secure-payment"
  },
  {
    title: "AI-Powered Route Optimization",
    description: "Our AI algorithms optimize delivery routes for maximum efficiency and reduced delivery times.",
    link: "/technology/route-optimization"
  },
  {
    title: "Digital Proof of Delivery",
    description: "Customers receive digital proof of delivery, including photos and electronic signatures.",
    link: "/technology/digital-proof"
  },
  {
    title: "Customer Support Chatbot",
    description: "Our AI-driven chatbot provides instant support and answers to common questions around the clock.",
    link: "/technology/chatbot-support"
  }
]
