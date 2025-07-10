import React from 'react'
import Image from "next/image";
export default function Hero() {
  return (
   <>
    <section className="w-full m  relative flex items-center justify-center flex-col" >
        <div className="absolute mx-[80px] top-0 z-[-2] h-screen w-screen bg-[#030010] bg-[radial-gradient(#ffffff33_1px,#030010_1px)] bg-size-[20px_20px]" />
        <div className="mx-[80px] bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative mt-[110px]">
       <div className="flex items-center justify-center mb-5">
       <div className="flex items-center justify-center py-1 px-1 pr-4 mb-4 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 w-[370px]">
            <span className="text-xs bg-[#004be0] rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">Free bece past questions & answers</span> 
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </div>
       </div>
        <div>
           {/** <h1 className="text-3xl font-extrabold sm:text-4xl  text-white text-center">unleashing potential with technology</h1> */}
           <h1 className="text-4xl font-bold text-center xl:text-[70px] xl:leading-[95px] sm:leading-[35px]">unleashing africa’s potential with technology</h1>
        {/**  <h1 className="text-4xl font-bold text-center md:text-[73px] mt-10">Potential with Technology</h1> */}
          <p className="mt-8 mx-10 sm:text-xl/relaxed text-center text-white">at usethebrains, we’re all about transforming ideas into digital realities, crafting innovative solutions that bridge the gap between imagination and execution</p>
        
        </div>
        </div>
        <div className="mt-8 mb-12 flex flex-wrap justify-center gap-4">
          <a className="block w-full rounded border border-[#004be0] bg-[#004be0] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-hidden focus:ring-3 active:text-opacity-75 sm:w-auto" href="#"> Get Started </a>
          <a className="block w-full rounded border border-[#004be0] px-12 py-3 text-sm font-medium text-white hover:bg-[#004be0] focus:outline-hidden focus:ring-3 active:bg-blue-700 sm:w-auto" href="#"> Learn More </a>
      </div>
      
    </section>
    <section>
    {/**<div className="flex justify-center items-center relative bg-[#000715]">0F0D12 */}
    <div className="flex justify-center items-center relative bg-[#030010]">
        <Image src={'/assets/group.png'} alt="banner image" height={1200} width={1200} className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"/>
        <div className="bottom-0 top-[50%] bg-linear-to-t dark:from-background left-0 right-0 z-10"></div>
      </div>
    </section>
   {/* <section className="w-full m  relative flex items-center justify-center flex-col" >
        <div className="absolute mx-[80px] top-0 z-[-2] h-screen w-screen bg-[#030010] bg-[radial-gradient(#ffffff33_1px,#030010_1px)] bg-size-[20px_20px]" />
        <div className="mx-[80px] bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative mt-[110px]">
            <div className="flex items-center justify-center mb-5">
                <div className="flex items-center justify-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 w-[360px]">
                    <span className="text-xs bg-[#004be0] rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">Free bece past questions & answers</span> 
                    <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </div>
            </div>
        <div>
       
       
       <h1 className="text-4xl font-bold text-center xl:text-[70px] xl:leading-[95px] sm:leading-[35px]">Unleashing Africa’s Potential with Technology</h1>
       <p className="mt-10 mx-10 sm:text-xl/relaxed text-center text-white">at usethebrains, we’re all about transforming ideas into digital realities, crafting innovative solutions that bridge the gap between imagination and execution</p></div>
       </div>
       <div className="mt-8 mb-12 flex flex-wrap justify-center gap-4">
            <a className="block w-full rounded border border-[#004be0] bg-[#004be0] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-hidden focus:ring-3 active:text-opacity-75 sm:w-auto" href="#"> Get Started </a>
            <a className="block w-full rounded border border-[#004be0] px-12 py-3 text-sm font-medium text-white hover:bg-[#004be0] focus:outline-hidden focus:ring-3 active:bg-blue-700 sm:w-auto" href="#"> Learn More </a>
       </div>
  </section>

<section>
    <div className="flex justify-center items-center relative bg-[#030010]">
    <Image src={'/assets/group.png'} alt="banner image" height={1200} width={1200} className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"/>
    <div className="bottom-0 top-[50%] bg-linear-to-t dark:from-background left-0 right-0 z-10"></div>
  </div>
</section>
  */}
   </>
  )
}
