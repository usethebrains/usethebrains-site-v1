import React from 'react'
import Image from "next/image";

export default function MainHero() {
  return (
 <>
    <section className="w-full h-full relative flex items-center justify-center flex-col" >
    {/** <div className="absolute mx-[80px] top-0 z-[-2] h-screen w-screen bg-[#030010] bg-[radial-gradient(#ffffff33_1px,#030010_1px)] bg-size-[20px_20px]" /> */}
      <div className="absolute mx-0 lg:mx-[80px] top-0 z-[-2] h-screen w-screen bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-size-[20px_20px]" />
      <div className="mx-0 lg:mx-[80px] bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative mt-[90px]">
     <div className="flex items-center justify-center mb-5">
     {/**DESKTOP */}
     <div className="hidden sm:flex w-[380px] items-center justify-center py-1 px-1 pr-4 mb-2 text-sm text-white rounded-full bg-gray-800">
          <span className="text-xs bg-[#004be0] rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">Free bece past questions & answers</span> 
          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
       </div>
       {/**MOBILE */}
       <div className="sm:hidden flex w-[260px] items-center justify-center py-1 px-1 pr-4 mb-2 text-sm text-white rounded-full bg-gray-800">
          <span className="text-xs bg-[#004be0] rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">free bece questions</span> 
          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
       </div>
     </div>
     {/**---------------------------------------------------------------- */}
     {/**<h1 className="text-[42px] font-bold text-center xl:text-[74px] xl:leading-[85px] sm:leading-[35px]"> */}
      <div>
        <h1 className="px-[20px] sm:px-0 text-[32px] font-extrabold sm:font-bold text-left sm:text-center sm:text-[74px] sm:leading-[100px] leading-[50px]">
          Unleashing Africa’s</h1>
          <h1 className="px-[20px] sm:px-0 text-[32px] font-extrabold sm:font-bold text-left sm:text-center sm:text-[74px] sm:leading-[100px] leading-[50px]">Potential With Technologies</h1>
        <p className="mx-[20px] mt-4 sm:mt-8 sm:mx-10 sm:text-xl/relaxed text-left sm:text-center text-white">
          at usethebrains, we’re all about transforming ideas into digital realities, 
          crafting innovative solutions that bridge the gap between imagination and execution</p>
      
      </div>
      </div>
      <div className="mt-8 mb-12 flex flex-wrap justify-center gap-4 mx-6">
        <a className="block w-full text-center rounded border border-[#004be0] bg-[#004be0] px-12 py-3 text-sm font-medium text-white sm:w-auto" href="#"> 
        Get Started </a>
        <a className="block w-full rounded text-center border border-[#004be0] px-12 py-3 text-sm font-medium text-white sm:w-auto" href="#">
           Learn More </a>
    </div>
    
  </section>
    <section>
    <div className="flex justify-center items-center relative bg-[#09090B] mt-5">
        <Image src={'/assets/group.png'} alt="banner image" height={1200} width={1200} className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"/>
       {/** <div className="bottom-0 top-[50%] bg-linear-to-t dark:from-background left-0 right-0 z-10"></div> */}
      </div>
    </section>
    <section>
      {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}
    </section>
 </>
  )
}
