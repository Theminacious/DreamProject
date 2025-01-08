
import { StickyScroll } from "./ui/sticky-scroll-reveal";


const deliveryContent = [
  {
    title: "Scheduled Deliveries",
    description:
      "Schedule deliveries at your convenience. Choose the date and time that works best for you, ensuring your packages arrive precisely when needed.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--purple-500),var(--indigo-500))] flex items-center justify-center text-white">
        Scheduled Deliveries
      </div>
    ),
  },
  {
    title: "Special Handling",
    description:
      "Require special handling for fragile items? We offer specialized packaging and handling to ensure delicate shipments reach their destination intact.",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        
        Special Handling
      </div>
    ),
  },
  {
    title: "Express Shipping",
    description:
      "Need urgent delivery? Opt for our express shipping service for swift and expedited delivery of your packages, guaranteeing fast turnaround times.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--red-500),var(--orange-500))] flex items-center justify-center text-white">
        Express Shipping
      </div>
    ),
  },
  {
    title: "Customized Solutions",
    description:
      "Tailored delivery solutions to meet your unique needs. Whether it's bulk shipments, specialized routes, or specific delivery instructions, we've got you covered.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--teal-500),var(--cyan-500))] flex items-center justify-center text-white">
        Customized Solutions
      </div>
    ),
  },
];






const Scroll = () => {
  return (
    <div>
        <StickyScroll content={deliveryContent} />
      
    </div>
  )
}



export default Scroll
