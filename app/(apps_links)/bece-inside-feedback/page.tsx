import React from 'react'
import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "BECE Inside | Feedback",
    description: "Leave a feedback for BECE Inside",
    keywords: ["BECE Inside Feedback", "Review"],
    authors: [{ name: "Usethebrains Technologies" }],
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: "https://usethebrains.com/bece-inside-feedback",
    },
  };


export default function page() {
  return (
    <div className='bg-white text-black p-10 m-10 h-full'><Link href={'https://play.google.com/store/apps/details?id=com.usethebrains.bece_inside&hl=en_US'}>
      <h5 className='text-center align-middle'>Rate BECE Inside or Write a review on Google Play</h5>
     </Link>
    </div>
  )
}
