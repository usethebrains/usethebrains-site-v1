import React from 'react'
import Openai from "@/components/svgs/openai";
import Hubspot from "@/components/svgs/hubspot";
import Intercom from "@/components/svgs/intercom";
import Make from "@/components/svgs/make";
import Pingdom from "@/components/svgs/pingdom";
import Stripe from "@/components/svgs/stripe";
import Webflow from "@/components/svgs/webflow";
import Wordpress from "@/components/svgs/wordpress";

export default function FeatHero() {
  return (
    <section className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]">
    <div className="max-w-7xl mx-auto mt-16 px-4 md:px-8">
      <div className="py-8 lg:py-16">
        <h2 className="mb-8 lg:mb-16 text-3xl font-bold tracking-tight leading-tight text-center text-white md:text-5xl">You'll be in good company</h2>
        
        {/**1st FOUR FEATURED START*/}
        <div className="grid items-start justify-items-center grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          
          {/**1*/}
          <div className="items-start justify-center block w-full px-4 py-6 sm:p-8 rounded-lg bg-[#09090B]/95 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
            <Hubspot />
          </div>
          {/**2*/}
          <div className="items-start justify-center block w-full px-4 py-6 sm:p-8 rounded-lg bg-[#09090B]/95 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <Intercom />
          </div>
          {/**3*/}
          <div className="items-start justify-center block w-full px-4 py-6 sm:p-8 rounded-lg bg-[#09090B]/95 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
            <Make/>
          </div>
          {/**4*/}
          <div className="items-start justify-center block w-full px-4 py-6 sm:p-8 rounded-lg bg-[#09090B]/95 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <Pingdom/>
          </div>
          {/**5*/}
          <div className="items-start justify-center block w-full px-4 py-6 sm:p-8 rounded-lg bg-[#09090B]/95 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
            <Openai/>
          </div>
           {/**6*/}
          <div className="items-start justify-center block w-full px-4 py-6 sm:p-8 rounded-lg bg-[#09090B]/95 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
           <Wordpress/>
          </div>
           {/**7*/}
          <div className="items-start justify-center block w-full px-4 py-6 sm:p-8 rounded-lg bg-[#09090B]/95 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
           <Stripe/>
          </div>
          {/**8*/}
          <div className="items-start justify-center block w-full px-4 py-6 sm:p-8 rounded-lg bg-[#09090B]/95 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
            <Webflow/>
          </div>
        </div>
  </div>
</div>
</section>
  )
}
