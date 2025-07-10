import React from 'react'
import { FaPython, FaRaspberryPi, FaMicrochip } from "react-icons/fa6";
import { SiScratch , SiTinkercad, SiArduino } from "react-icons/si";

export default function Bootcamps() {
  return (
    <section className="bg-[#000000]">
    <div className="max-w-(--breakpoint-xl) px-4 py-8 sm:px-6 sm:py-12 lg:px-3 lg:py-6">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
      <div className="p-8 md:p-12 lg:px-12 lg:py-24">
      <div className="text-left">
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">Mission RoboCode</h2>
  
        <p className="hidden max-w-lg text-[#7f858e] md:mt-6 md:block md:text-lg md:leading-relaxed">
        Join us on a Fun-Filled Journey to Build, Program, and Bring Your Robots to Life! – secure your spot now and join our
        community of innovative learners
        </p>
  
        <div className="mt-4 sm:mt-8">
        <a className="block w-full xl:w-[280px] rounded-full border border-[#27272a] px-12 py-3 text-sm font-medium text-white sm:w-auto" href="#">
          Register Yours Today</a>
        </div>
      </div>
    </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <a
            className="block rounded-xl border border-[#27272a] p-4 shadow-xs "
            href="#"
          >
            <span className="inline-block rounded-lg bg-[#141419] p-3">
            <FaRaspberryPi />
            </span>
  
            <h2 className="mt-2 font-bold text-white">Raspberry Pi</h2>
  
            <p className="hidden sm:mt-1 sm:block sm:text-sm text-[#7f858e]">
            Hardware and robotics control
            </p>
          </a>
  
          <a
            className="block rounded-xl border border-[#27272a] p-4 shadow-xs "
            href="#"
          >
            <span className="inline-block rounded-lg bg-[#141419] p-3">
            <FaPython />
            </span>
  
            <h2 className="mt-2 font-bold text-white">Python</h2>
  
            <p className="hidden sm:mt-1 sm:block sm:text-sm text-[#7f858e]">
            Master the Art of Coding Robots
            </p>
          </a>
  
          <a
            className="block rounded-xl border border-[#27272a] p-4 shadow-xs "
            href="#"
          >
            <span className="inline-block rounded-lg bg-[#141419] p-3">
            <SiTinkercad  />
            </span>
  
            <h2 className="mt-2 font-bold text-white">Tinkercad</h2>
  
            <p className="hidden sm:mt-1 sm:block sm:text-sm text-[#7f858e]">
            Virtual environments to build and code
            </p>
          </a>
  
          <a
            className="block rounded-xl border border-[#27272a] p-4 shadow-xs "
            href="#"
          >
            <span className="inline-block rounded-lg bg-[#141419] p-3">
            <FaMicrochip   />
            </span>
  
            <h2 className="mt-2 font-bold text-white">Microcontroller </h2>
  
            <p className="hidden sm:mt-1 sm:block sm:text-sm text-[#7f858e]">
            Execute instructions to control electronics
            </p>
          </a>
  
          <a
            className="block rounded-xl border border-[#27272a] p-4 shadow-xs "
            href="#"
          >
            <span className="inline-block rounded-lg bg-[#141419] p-3">
            <SiScratch />
            </span>
  
            <h2 className="mt-2 font-bold text-white">Scratch</h2>
  
            <p className="hidden sm:mt-1 sm:block sm:text-sm text-[#7f858e]">
            Create interactive stories and games
            </p>
          </a>
  
          <a
            className="block rounded-xl border border-[#27272a] p-4 shadow-xs "
            href="#"
          >
            <span className="inline-block rounded-lg bg-[#141419] p-3">
            <SiArduino  />
            </span>
  
            <h2 className="mt-2 font-bold text-white">Arduino</h2>
  
            <p className="hidden sm:mt-1 sm:block sm:text-sm text-[#7f858e]">
            Reading inputs and controlling outputs
            </p>
          </a>
        </div>
      </div>
    </div>
  </section>
  )
}
