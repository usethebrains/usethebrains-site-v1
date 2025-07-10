import React from 'react'
import Fivestar from "@/components/svgs/fivestar";
import Image from "next/image";

export default function Review() {
  return (
<section className="bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-size-[20px_20px]">
  <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
      Read trusted reviews from our customers
    </h2>

    <div className="mt-8 [column-fill:balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
      
    {/**TESTIMONY 1 */}
      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg border border-[#27272a] p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-4">
            <Image
              alt=""
              src={'/assets/testavatar/danielowusu.png'}
              className="size-14 rounded-full object-cover"
              width={40}
              height={40}
            />

            <div>
           
              <Fivestar />
              <p className="mt-0.5 text-lg font-medium text-white">Daniel Owusu</p>
            </div>



          </div>

          <p className="mt-4 text-[#7f858e]">
          Attended their coding bootcamp and gained a strong foundation in 
          programming concepts. Instructors were passionate and provided excellent resources. 
          Would definitely consider attending another program with them
          </p>
        </blockquote>
      </div>


      {/**TESTIMONY 2 */}
      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg border border-[#27272a] p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-4">
          <Image
              alt=""
              src={'/assets/testavatar/hannahtetteh.png'}
              className="size-14 rounded-full object-cover"
              width={40}
              height={40}
            />

            <div>
            <Fivestar />

              <p className="mt-0.5 text-lg font-medium text-white">Hannah Tetteh</p>
            </div>
          </div>

          <p className="mt-4 text-[#7f858e]">
          Worked with them on a web development project, and they delivered 
          a high-quality product on time and on budget. Would definitely work with them again
          </p>
        </blockquote>
      </div>


      {/**TESTIMONY 3 */}
      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg border border-[#27272a] p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-4">
          <Image
              alt=""
              src={'/assets/testavatar/nancynyarko.png'}
              className="size-14 rounded-full object-cover"
              width={40}
              height={40}
            />

            <div>
            <Fivestar />

              <p className="mt-0.5 text-lg font-medium text-white">Nancy Nyarko</p>
            </div>
          </div>

          <p className="mt-4 text-[#7f858e]">
          Attended their IT consulting session and gained valuable insights 
          into optimizing our tech infrastructure. The consultants provided clear 
          recommendations and effective solutions
          </p>
        </blockquote>
      </div>


    {/**TESTIMONY 4 */}
      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg border border-[#27272a] p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-4">
          <Image
              alt=""
              src={'/assets/testavatar/wilsonkofiaddo.png'}
              className="size-14 rounded-full object-cover"
              width={40}
              height={40}
            />

            <div>
            <Fivestar />

              <p className="mt-0.5 text-lg font-medium text-white">Wilson Kofi M. Addo</p>
            </div>
          </div>

          <p className="mt-4 text-[#7f858e]">
         I highly recommend usethebrains for any mobile app development project, and I was blown away 
          by their expertise and professionalism. 
 From the initial consultation to the final product delivery, they kept me informed every step of the way,
  and their team went above and beyond to ensure that the app met my specific requirements.
  The end result exceeded my expectations. </p>
        </blockquote>
      </div>


     {/**TESTIMONY 5 */}
      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg border border-[#27272a] p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-4">
          <Image
              alt=""
              src={'/assets/testavatar/owusuansah.png'}
              className="size-14 rounded-full object-cover"
              width={40}
              height={40}
            />

            <div>
            <Fivestar />

              <p className="mt-0.5 text-lg font-medium text-white">Owusu Ansah</p>
            </div>
          </div>

          <p className="mt-4 text-[#7f858e]">
          The robotics course offered engaging, hands-on instruction and provided 
          valuable insights into the design, programming, and operation of robotic systems
          </p>
        </blockquote>
      </div>



      {/**TESTIMONY 6 */}
      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg border border-[#27272a] p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-4">
          <Image
              alt=""
              src={'/assets/testavatar/jessicaandison.png'}
              className="size-14 rounded-full object-cover"
              width={40}
              height={40}
            />

            <div>
            <Fivestar />

              <p className="mt-0.5 text-lg font-medium text-white">Jessica Andison</p>
            </div>
          </div>

          <p className="mt-4 text-[#7f858e]">
          {`I'm`} thrilled with my new IoT project setup. The kit arrived promptly, well-packed, and 
          in perfect condition. Setting it up was a breeze,
           following the clear instructions provided by your team.
          </p>
        </blockquote>
      </div>



        {/**TESTIMONY 7 */}
      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg border border-[#27272a] p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-4">
          <Image
              alt=""
              src={'/assets/testavatar/kevinamevenkuedith.png'}
              className="size-14 rounded-full object-cover"
              width={40}
              height={40}
            />

            <div>
            <Fivestar />

              <p className="mt-0.5 text-lg font-medium text-white">Kevin Amevenku Edith</p>
            </div>
          </div>

          <p className="mt-4 text-[#7f858e]">
          Innovative solutions from this tech startup. {`I'm`} impressed!
          </p>
        </blockquote>
      </div>


      {/**TESTIMONY 8 */}
      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg border border-[#27272a] p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-4">
          <Image
              alt=""
              src={'/assets/testavatar/anabananaakua.png'}
              className="size-14 rounded-full object-cover"
              width={40}
              height={40}
            />

            <div>
            <Fivestar />

              <p className="mt-0.5 text-lg font-medium text-white">Anaba Nana Akua</p>
            </div>
          </div>

          <p className="mt-4 text-[#7f858e]">
          For those seeking a user interface that is modern and ease to use, your search ends here
          </p>
        </blockquote>
      </div>




      {/**TESTIMONY 9 */}
      <div className="mb-8 sm:break-inside-avoid">
        <blockquote className="rounded-lg border border-[#27272a] p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-4">
          <Image
              alt=""
              src={'/assets/testavatar/delanyolatifa.png'}
              className="size-14 rounded-full object-cover"
              width={40}
              height={40}
            />

            <div>
            <Fivestar />

              <p className="mt-0.5 text-lg font-medium text-white">Delanyo Latifa</p>
            </div>
          </div>

          <p className="mt-4 text-[#7f858e]">
          I had a remote IT consultation with them, and I was thoroughly impressed by their level of expertise and professionalism. 
          From the initial contact to the resolution of my issue, they were responsive, knowledgeable, 
          and patient in explaining each step of the process. 
          They diagnosed an issue with my network that had been plaguing me for weeks and provided clear 
          instructions on how to resolve it, saving me both time and travel expenses
          </p>
        </blockquote>
      </div>


    </div>
  </div>
</section>
  )
}
