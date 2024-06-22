'use client'
import Link from 'next/link'
import cardData from '../data/cardData.json'
import { Button } from './ui/moving-border'
import { BackgroundGradient } from './ui/background-gradient'

interface Features {
    id: number,
    title: string,
    description: string,
    estimatedTime: string,
    availability: string,
    contact?: string,
    featureDetails?: string,
}

const OurFeatures = () => {
    const ourFeatures = cardData.features as Features[] // Type assertion

    return (
        <div className='py-12 bg-gray-900'>
            <div>
                <div className='text-center'>
                    <h2 className='text-base text-teal-600 font-semibold tracking-wide uppercase'>Our Features</h2>
                    <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl'>Go through our features and services</p>
                </div>
            </div>
            <div className='mt-10'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
                    {ourFeatures.map((feature) => (
                        <div key={feature.id} className='flex justify-center'>
                            <BackgroundGradient>
                                <div className="flex flex-col p-6 rounded-[22px]
                                h-full 
                                overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:bg-indigo-400 hover:text-gray-900">
                                    {/* <img src={feature.image} alt={feature.title} className="object-contain w-full h-40 mb-4 rounded-md" /> */}
                                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                                    <p className="mt-2 text-sm text-gray-300">{feature.description}</p>
                                    <p className="mt-2 text-sm text-gray-300"><strong>Availability:</strong> {feature.availability}</p>
                                    <p className="mt-2 text-sm text-gray-300"><strong>Estimated Time:</strong> {feature.estimatedTime}</p>
                                    {feature.contact && (
                                        <p className="mt-2 text-sm text-gray-300"><strong>Contact:</strong> {feature.contact}</p>
                                    )}
                                    {feature.featureDetails && (
                                        <p className="mt-2 text-sm text-gray-300"><strong>Details:</strong> {feature.featureDetails}</p>
                                    )}
                                </div>
                            </BackgroundGradient>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-20 text-center'>
                <Link href={'/features'}>
                    <Button
                        borderRadius="1.75rem"
                        className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
                    >Get To Know Us</Button>
                </Link>
            </div>
        </div>
    )
}

export default OurFeatures
