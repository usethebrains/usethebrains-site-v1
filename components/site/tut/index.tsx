import React from 'react'
import { Code, Smartphone, BrainCircuit, Cloud } from 'lucide-react';

export default function Tut() {
  return (
    <section className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]">
      <div className="sm:mx-[5px] md:mx-[40px]">
        <div className="py-8 lg:py-16 mx-auto max-w-screen-xl sm:px-0 md:px-4">
          <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-white dark:text-white md:text-4xl px-[25px] sm:px-0">
              Our Technology Services</h2>
          
          {/**1st FOUR FEATURED START*/}
          <div className="grid justify-items-center grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6 px-[30px] sm:px-0">
            <div className="overflow-hidden rounded-lg border border-[#27272a] bg-gradient-to-br from-[#09090B] to-[#13131f] shadow-md hover:shadow-xl transition-all duration-300 group hover:border-[#004be0]/30">
              <div className="h-40 bg-gradient-to-r from-[#004be0]/20 to-[#004be0]/5 flex items-center justify-center">
                <Code className="h-20 w-20 text-[#004be0]" />
              </div>
              <div className="p-4 sm:p-6"><a href="#">
                <h3 className="text-lg font-medium text-[#ffffff]">
                  Custom Software Development</h3></a>

    <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
    We build tailored software solutions designed to meet your specific business needs. 
    Our expert developers create scalable, secure, and high-performance applications 
    using modern technologies and best practices.
    </p>

    <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#004be0]">
    Contact us

      <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
        &rarr;
      </span>
            </a></div>
            </div>
<div className="overflow-hidden rounded-lg border border-[#27272a] bg-gradient-to-br from-[#09090B] to-[#13131f] shadow-md hover:shadow-xl transition-all duration-300 group hover:border-[#004be0]/30">
  <div className="h-40 bg-gradient-to-r from-[#004be0]/20 to-[#004be0]/5 flex items-center justify-center">
    <Smartphone className="h-20 w-20 text-[#004be0]" />
  </div>

  <div className="p-4 sm:p-6">
    <a href="#">
      <h3 className="text-lg font-medium text-[#ffffff]">
      Mobile App Development
      </h3>
    </a>

    <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
    Transform your ideas into powerful mobile experiences. We develop native and 
    cross-platform applications for iOS and Android that are intuitive, responsive, 
    and feature-rich, helping you connect with your customers wherever they are.
    </p>

    <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#004be0]">
    Contact us

      <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
        &rarr;
      </span>
    </a>
  </div>
</div>
<div className="overflow-hidden rounded-lg border border-[#27272a] bg-gradient-to-br from-[#09090B] to-[#13131f] shadow-md hover:shadow-xl transition-all duration-300 group hover:border-[#004be0]/30">
  <div className="h-40 bg-gradient-to-r from-[#004be0]/20 to-[#004be0]/5 flex items-center justify-center">
    <BrainCircuit className="h-20 w-20 text-[#004be0]" />
  </div>

  <div className="p-4 sm:p-6">
    <a href="#">
      <h3 className="text-lg font-medium text-[#ffffff]">
      AI & Machine Learning Solutions
      </h3>
    </a>

    <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
    Harness the power of artificial intelligence for your business. Our AI solutions 
    include predictive analytics, natural language processing, computer vision, and 
    custom machine learning models that drive innovation and efficiency in your operations.
    </p>

    <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#004be0]">
    Contact us

      <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
        &rarr;
      </span>
    </a>
  </div>
</div>
<div className="overflow-hidden rounded-lg border border-[#27272a] bg-gradient-to-br from-[#09090B] to-[#13131f] shadow-md hover:shadow-xl transition-all duration-300 group hover:border-[#004be0]/30">
  <div className="h-40 bg-gradient-to-r from-[#004be0]/20 to-[#004be0]/5 flex items-center justify-center">
    <Cloud className="h-20 w-20 text-[#004be0]" />
  </div>

  <div className="p-4 sm:p-6">
    <a href="#">
      <h3 className="text-lg font-medium text-[#ffffff]">
      Cloud Computing & DevOps
      </h3>
    </a>

    <p className="mt-2 line-clamp-3 text-sm/relaxed text-[#7f858e]">
    Optimize your infrastructure with our cloud computing and DevOps services. We help 
    businesses migrate to the cloud, implement CI/CD pipelines, automate deployments, 
    and manage containerized applications for improved scalability and reliability.
    </p>

    <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#004be0]">
    Contact us

      <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 ">
        &rarr;
      </span>
    </a>
  </div>
</div>
          </div>
          
        </div>
     </div>
</section>
  )
}