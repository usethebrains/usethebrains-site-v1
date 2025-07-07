import React from 'react'
import Image from 'next/image'
import { FaFacebook , FaXTwitter, FaYoutube, FaGithub, FaLinkedin, FaTiktok} from "react-icons/fa6";
import Link from 'next/link'

const Footer = () => {
  const iconstyle = {
    color: '#004be0',
  };
  return (
    <footer className="bg-[#000000]">
    <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <div className="flex justify-center text-white sm:justify-start">
          <aside className="flex items-center gap-2 ">
          <Image
            src={'/assets/usethebrainslogocircle.png'}
            width={35}
            height={35}
            alt="plur logo"
            className="bg-[#004be0] rounded-full p-1"
          />
           <span className="text-xl font-bold"> usethebrains</span>
          </aside>
          </div>
  
          <p className="mt-6 max-w-md text-center leading-relaxed text-[#7F858E] sm:max-w-xs sm:text-left">
          We are a tech startup based in Accra - Ghana, committed to digital transformation via advanced technology solutions
          </p>
  
          <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
            <li>
              <Link href={"https://web.facebook.com/usethebrains"}>
                <span className="sr-only">Facebook</span> 
                <FaFacebook style={iconstyle}/>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <span className="sr-only">Tiktok</span>
                <FaTiktok style={iconstyle}/>
              </Link>
            </li>
            <li>
              <Link href={"https://www.linkedin.com/company/usethebrains-technologies"}>
                <span className="sr-only">Facebook</span>
                <FaLinkedin style={iconstyle}/>
              </Link>
            </li>
            <li>
              <Link href={"https://twitter.com/usethebrains"}>
                <span className="sr-only">twitter</span>
                <FaXTwitter style={iconstyle}/>
              </Link>
            </li>
            <li>
              <Link href={"https://www.youtube.com/@usethebrains"}>
                <span className="sr-only">Youtube</span>
                <FaYoutube style={iconstyle}/>
              </Link>
            </li>
            <li>
              <Link href={"https://github.com/usethebrains"}>
                <span className="sr-only">Github</span>
                <FaGithub style={iconstyle}/>
              </Link>
            </li>
  
         
          </ul>
        </div>
  
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
          {/**About */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-[#FFFFFF]">About Us</p>
  
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a className="text-[#7f858e] transition hover:text-white/75" href="#">
                  Company Mission 
                </a>
              </li>
  
              <li>
                <a className="text-[#7f858e] transition hover:text-white/75" href="#">
                  Meet the Team
                </a>
              </li>
  
              <li>
                <a className="text-[#7f858e] transition hover:text-white/75" href="#">
                   Project
                </a>
              </li>
  
              <li>
                <a className="text-[#7f858e] transition hover:text-white/75" href="#"> Careers </a>
              </li>
            </ul>
          </div>
  
          {/**SERVICES */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-[#FFFFFF]">Our Services</p>
  
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a className="text-[#7f858e] transition hover:text-white/75" href="#">
                Web Development
                
                </a>
              </li>
  
              <li>
                <a className="text-[#7f858e] transition hover:text-white/75" href="#">Marketing  </a>
              </li>
  
              <li>
                <a className="text-[#7f858e] transition hover:text-white/75" href="#">Modern CMS </a>
              </li>
  
              <li>
                <a className="text-[#7f858e] transition hover:text-white/75" href="#"> Wordpress Site</a>
              </li>
            </ul>
          </div>
  
          {/**HELPFUL LINKS */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-[#FFFFFF]">Helpful Links</p>
  
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a className="text-[#7f858e] transition hover:text-white/75" href="#"> BECE Question </a>
              </li>
              <li>
                <a className="text-[#7f858e] transition hover:text-white/75" href="#"> GES Quiz </a>
              </li>
  
              <li>
                <a className="text-[#7f858e] transition hover:text-white/75" href="#"> Tiny Exam Report Card </a>
              </li>
  
              <li>
                <a
                  className="group flex items-center sm:items-start justify-center sm:justify-start gap-1.5"
                  href="#"
                >
                  <span className="text-[#7F858E] transition group-hover:text-white/75">
                    Live Chat
                  </span>
  
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFFFFF] opacity-75"
                    ></span>
                    <span className="relative inline-flex size-2 rounded-full bg-[#FFFFFF]"></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
  
          {/**CONTACT US */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-[#FFFFFF]">Contact Us</p>
  
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a
                  className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0 text-[#004be0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
  
                  <span className="flex-1 text-[#7F858E]">info@usethebrains.com</span>
                </a>
              </li>
  
              <li>
                <a
                  className="flex items-center justify-center gap-1.5"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0 text-[#004be0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
  
                  <span className="flex-1 text-[#7F858E]">+233-55-587-2008</span>
                </a>
              </li>
              
  
              <li
                className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 shrink-0 text-[#004be0]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
  
                <address className="-mt-0.5 flex-1 not-italic text-[#7F858E]">
                 Amasaman, Ghana
                </address>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      <div className="mt-12 border-t border-[#27272a] pt-6">
        <div className="text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-sm text-[#7F858E]">
            {/**<span className="block sm:inline">All rights reserved | </span> */}
  
            <Link 
              className="inline-block text-[#7F858E] transition hover:text-white/75" 
              href="/terms"
            > 
              Terms & Conditions
            </Link>
  
            <span> | </span>
  
            <Link 
              className="inline-block text-[#7F858E] transition hover:text-white/75" 
              href="/privacy"
            > 
              Privacy Policy
            </Link>
          </p>
  
          <p className="mt-4 text-sm text-[#7F858E] sm:order-first sm:mt-0">Copyright &copy; 2025 Usethebrains Technologies</p>
        </div>
      </div>
    </div>
  </footer>
  )
}
export default Footer