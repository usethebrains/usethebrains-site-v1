import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BECE Inside | Terms of use",
  description: "This Terms of Use outlines the rules, guidelines, and conditions that govern your access to and use of our App. By using our App, you agree to comply with these terms and any applicable laws and regulations.",
  keywords: ["Terms of use", "Terms and Conditions"],
  authors: [{ name: "Usethebrains Technologies" }],
  openGraph: {
    title: "BECE Inside - Terms of use",
    description: "Read our Terms of Use outlines the rules, guidelines, and conditions that govern your access to and use of our App",
    url: "https://usethebrains.com/bece-inside-terms-of-use",
    siteName: "Usethebrains Technologies",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "BECE Inside - Terms of use - Usethebrains Technologies",
    description: "This Terms of Use outlines the rules, guidelines, and conditions that govern your access to and use of our App. By using our App, you agree to comply with these terms and any applicable laws and regulations.",
    site: "@usethebrains",
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://usethebrains.com/bece-inside-terms-of-use",
  },
};


export default function page() {
  return (
    <div className='bg-white text-black p-10 m-10'>
      Terms of Use — BECE Inside (short & clear)

      Last updated: August 19, 2025
      Owner / Operator: Usethebrains
      Website: https://usethebrains.com

      Email: info@usethebrains.com

      Phone: +233 555 872 008
      Address: Amasaman, behind Crystal Heights International School, Accra, Ghana

      By installing or using BECE Inside you agree to these terms. If you don’t agree, please don’t use the app.

      Key points (quick)

      No login / no account required. The app works without creating an account.

      No ads. There are no advertisements in the app.

      No personal-data tie to accounts. The app does not require you to sign in or create a profile.

      1. Use of the app

      The app is provided free for BECE study and exam preparation.

      Use it only for its intended educational purpose.

      2. Prohibited actions

      Do not:

      Cheat, hack, use bots, or attempt to bypass protections.

      Modify, copy, sell, redistribute, or commercially exploit the app, its code, content, images, or videos without written permission.

      Use the app for illegal activity.

      Introduce viruses, malware, or try to access servers or data without authorization.

      If you break these rules we may suspend or remove your access and, if appropriate, report the activity to authorities.

      3. Content & ownership

      Usethebrains (or our licensors) owns the app and its content unless otherwise stated.

      You may not reuse our content for commercial purposes without permission.

      4. Links to third parties

      The app may link to third-party sites or services. We don’t control them and are not responsible for their content or policies.

      5. No warranty / Limitation of liability

      The app is provided “as is.” We don’t guarantee it will always work, be uninterrupted, or be bug-free.

      To the maximum extent allowed by law, Usethebrains is not liable for indirect, incidental, or consequential damages from using the app.

      6. Changes & termination

      We may update the app or these terms at any time. If changes are significant, we’ll try to give notice. Continued use means you accept the new terms.

      We may suspend or terminate access at any time for any reason.

      7. Governing law

      These terms are governed by the laws applicable where Usethebrains operates (Ghana).

      Contact

      Questions or concerns — email info@usethebrains.com
      or visit https://usethebrains.com
      .
    </div>
  )
}
