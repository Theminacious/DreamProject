"use client";
import { TypewriterEffect } from "../components/ui/typewriter-effect";

export default function TypewriterEffectDemo() {
  const words = [
    {
      text: "Get",
    },
    {
      text: "Your",
    },
    {
      text: "Service",
    },
    {
      text: "AT",
    },
    {
        text:"Low"
    },
    {
      text: "Cost.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
      
      <TypewriterEffect words={words} className="text-2xl md:text-4xl lg:text-6xl mt-10 mb-4" />
     
  );
}
