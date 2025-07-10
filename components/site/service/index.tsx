import React from 'react'
import { FaPhp ,FaGraduationCap, FaReact, FaAndroid} from "react-icons/fa6";
import { LuBrainCircuit } from "react-icons/lu";
import { VscRemoteExplorer } from "react-icons/vsc";
import { GrCloudComputer } from "react-icons/gr";
import { LiaCertificateSolid } from "react-icons/lia";
import { BsSmartwatch } from "react-icons/bs";

export default function Service() {
  return (
    <section className="bg-[#000000] text-white">
  <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-8 sm:px-6 sm:py-12 lg:px-6 lg:py-16">
    <div className="mx-auto max-w-lg text-center">
      {/**HEADERS SERVICES START */}
      <h2 className="text-3xl font-bold sm:text-4xl">Our Services</h2>
      <p className="mt-4 text-gray-300">
     Our services is designed to address the unique challenges facing companies and to maximize individual potential in the technology sector. {`Here's`} a glimpse into what we offer


      </p>
    </div>
    


    
    {/**GROUP SERVICES 1-9 */}
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

{/**------------ */}
<div className="bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text block rounded-xl border border-[#27272a] p-8 shadow-xl transition ">
  <span className="inline-block rounded bg-[#09090B] p-2 text-white">
  <FaAndroid />
  </span>

  <a href="#">
    <h2 className="mt-0.5 text-lg font-extrabold text-white">
    Mobile App Development
    </h2>
  </a>
{/**<p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]"> */}
  <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
  Create a powerful connection with your customers! Our team of expert mobile app developers
   brings innovative ideas to life, crafting custom apps tailored to engage and grow your business
  </p>

  <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#7f858e]">
    Find out more

    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
      &rarr;
    </span>
  </a>
</div>

<div className="bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text block rounded-xl border border-[#27272a] p-8 shadow-xl transition ">
  <span className="inline-block rounded bg-[#09090B] p-2 text-white">
  <LuBrainCircuit />
  </span>

  <a href="#">
    <h2 className="mt-0.5 text-lg font-extrabold text-white">
    AI and Machine Learning
    </h2>
  </a>

  <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
  Empower your business with intelligence! Leverage advanced AI and machine 
  learning solutions from our team of data science experts to automate processes, 
  gain insights, and make informed decisions for long-term success
  </p>

  <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#7f858e]">
    Find out more

    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
      &rarr;
    </span>
  </a>
</div>


<div className="bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text block rounded-xl border border-[#27272a] p-8 shadow-xl transition ">
  <span className="inline-block rounded bg-[#09090B] p-2 text-white">
  <FaReact />
  </span>

  <a href="#">
    <h2 className="mt-0.5 text-lg font-extrabold text-white">
    Web Development
    </h2>
  </a>

  <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
  Make your mark online! Our skilled web developers design and build dynamic, 
  responsive websites to showcase your brand, attract new customers, and maximize your digital presenc
  </p>

  <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#7f858e]">
    Find out more

    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
      &rarr;
    </span>
  </a>
</div>
{/**bg-[#09090B]  */}
<div className="bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text block rounded-xl border border-[#27272a] p-8 shadow-xl transition ">
  <span className="inline-block rounded bg-[#09090B] p-2 text-white">
  <FaPhp />
  </span>

  <a href="#">
    <h2 className="mt-0.5 text-lg font-extrabold text-white text-center sm:text-left">
    Coding Bootcamps
    </h2>
  </a>

  <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
  Launch a successful tech career! Join our immersive coding bootcamps, led by 
  experienced instructors, to gain hands-on experience with the latest technologies
   and become a sought-after developer in {`today's`} industry
  </p>

  <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#7f858e]">
    Find out more

    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
      &rarr;
    </span>
  </a>
</div>

<div className="bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text block rounded-xl border border-[#27272a] p-8 shadow-xl transition ">
  <span className="inline-block rounded bg-[#09090B] p-2 text-white">
  <LiaCertificateSolid />
  </span>

  <a href="#">
    <h2 className="mt-0.5 text-lg font-extrabold text-white">
    IT Certifications
    </h2>
  </a>

  <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
  Gain an edge in your career! Earn recognized IT certifications through our 
  comprehensive training programs, designed to provide you with in-demand skills 
  and knowledge to advance your professional growth
  </p>

  <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#7f858e]">
    Find out more

    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
      &rarr;
    </span>
  </a>
</div>

<div className="bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text block rounded-xl border border-[#27272a] p-8 shadow-xl transition ">
  <span className="inline-block rounded bg-[#09090B] p-2 text-white">
  <GrCloudComputer />
  </span>

  <a href="#">
    <h2 className="mt-0.5 text-lg font-extrabold text-white">
    Cloud Computing Training
    </h2>
  </a>

  <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
  Transform your business with the power of the cloud! Our cloud computing experts guide you through the process of migrating, 
  implementing, and managing cloud solutions to increase efficiency, reduce costs, and maximize potential
  </p>

  <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#7f858e]">
    Find out more

    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
      &rarr;
    </span>
  </a>
</div>

<div className="bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text block rounded-xl border border-[#27272a] p-8 shadow-xl transition ">
  <span className="inline-block rounded bg-[#09090B] p-2 text-white">
  <BsSmartwatch />
  </span>

  <a href="#">
    <h2 className="mt-0.5 text-lg font-extrabold text-white">
    IoT Solutions
    </h2>
  </a>

  <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
  Connect and optimize your world! Our Internet of Things (IoT) specialists 
  design and develop custom solutions to integrate smart devices, streamline 
  processes, and create seamless experiences for a more connected future
  </p>

  <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#7f858e]">
    Find out more

    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
      &rarr;
    </span>
  </a>
</div>

<div className="bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text block rounded-xl border border-[#27272a] p-8 shadow-xl transition ">
  <span className="inline-block rounded bg-[#09090B] p-2 text-white">
  <FaGraduationCap />
  </span>

  <a href="#">
    <h2 className="mt-0.5 text-lg font-extrabold text-white">
    Corporate Training
    </h2>
  </a>

  <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
  Empower your team for success! Engage our corporate training services to develop
   customized programs that enhance the skills and knowledge of your employees, 
   fostering productivity, innovation, and growth
  </p>

  <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#7f858e]">
    Find out more

    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
      &rarr;
    </span>
  </a>
</div>


<div className="bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text block rounded-xl border border-[#27272a] p-8 shadow-xl transition ">
  <span className="inline-block rounded bg-[#09090B] p-2 text-white">
  <VscRemoteExplorer />
  </span>

  <a href="#">
    <h2 className="mt-0.5 text-lg font-extrabold text-white">
    IT Consulting
    </h2>
  </a>

  <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
  Navigate technology challenges with confidence! Our experienced IT consultants provide 
  expert guidance and recommendations to help you make informed decisions, implement effective 
  strategies, and achieve your business goals
  </p>

  <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#7f858e]">
    Find out more

    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
      &rarr;
    </span>
  </a>
</div>





    </div>
  </div>
</section>
  )
}
