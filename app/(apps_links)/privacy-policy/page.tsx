import { Link } from 'lucide-react'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "Privacy Policy | Usethebrains Technologies",
  description: "This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our site",
  keywords: ["Privacy Policy", "data protection", "user privacy", "information security", "GDPR compliance"],
  authors: [{ name: "Usethebrains Technologies" }],
  openGraph: {
    title: "Privacy Policy - usethebrains technologies",
    description: "Read our Privacy Policy to understand how we handle your personal data.",
    url: "https://usethebrains.com/privacy-policy",
    siteName: "Usethebrains Technologies",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - Usethebrains Technologies",
    description: "Learn about our Privacy Policy and how we manage your personal information.",
    site: "@usethebrains",
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://usethebrains.com/privacy-policy",
  },
};

export default function page() {
  return (
    <div className='bg-white text-black p-10 m-10'>

<p><b>Privacy Policy for Usethebrains technologies</b></p>
<p></p>
<p>Effective Date: Saturday, January 1, 2022</p>
<p></p>
<p>At Usethebrains technologies, we value your privacy and are
committed to protecting your personal information. This Privacy Policy outlines
how we collect, use, disclose, and safeguard your information when you visit
our website <Link href='http://usethebrains.com/'>usethebrains.com</Link> and use our services.</p>
<p></p>
<p><b>Information We Collect</b></p>
<p>Personal Information:</p>
<p>When you interact with our website, we may collect personal
information that you voluntarily provide, such as your name, email address,
phone number, and any other information you submit through contact forms or
other communication channels.</p>
<p></p>
<p><b>Usage Data:</b></p>
<p>We may collect information about how you access and use our
website. This information may include your IP address, browser type, device
information, pages visited, time and date of your visit, and other analytics
data.</p>
<p></p>
<p><b>How We Use Your Information</b></p>
<p>Usethebrains technologies may use the information we collect
for various purposes, including to:</p>
<p></p>
<p>Provide, maintain, and improve our website and services.</p>

<p>Communicate with you, including responding to your inquiries
and sending you updates.</p>

<p>Analyze usage trends and gather demographic information to
enhance user experience.</p>

<p>Ensure the security of our services and prevent fraud or
other malicious activities.</p>

<p>Comply with legal obligations and enforce our terms of
service.</p>
<p>Information Sharing and Disclosure</p>
<p>We do not sell or rent your personal information to third
parties. We may share your information in the following circumstances:</p>
<p></p>
<p>Service Providers: We may employ third-party companies and
individuals to facilitate our services, such as hosting providers, analytics
services, and customer support. These third parties may have access to your
personal information only to perform tasks on our behalf and are obligated not
to disclose or use it for any other purpose.</p>
<p></p>
<p>Legal Requirements: We may disclose your information if
required to do so by law or in response to valid requests by public
authorities.</p>
<p></p>
<p>Cookies and Tracking Technologies</p>
<p>Our website may use cookies and similar tracking
technologies to enhance user experience and analyze site traffic. You can
choose to accept or decline cookies. Most web browsers automatically accept
cookies, but you can modify your browser settings to decline cookies if you
prefer.</p>
<p></p>
<p><b>Security of Your Information</b></p>
<p>We take the security of your personal information seriously
and implement reasonable measures to protect it. However, no method of
transmission over the internet or electronic storage is 100% secure, and we
cannot guarantee its absolute security.</p>
<p></p>
<p><b>Links to Other Websites</b></p>
<p>Our website may contain links to external sites that are not
operated by us. We recommend reviewing the privacy policies of these
third-party sites as we have no control over their content or practices.</p>
<p></p>
<p><b>{"Children's Privac"}y</b></p>
<p>Our services are not intended for individuals under the age
of 13. We do not knowingly collect personal information from children under 13.
If we become aware that we have collected such information, we will take steps
to delete it.</p>
<p></p>
<p><b>Changes to This Privacy Policy</b></p>
<p>We may update our Privacy Policy from time to time. We will
notify you of any changes by posting the new Privacy Policy on this page with
an updated effective date. We encourage you to review this Privacy Policy
periodically for any changes.</p>
<p></p>
<p><b>Contact Us</b></p>
<p>If you have any questions about this Privacy Policy or our
practices, please contact us at:</p>
<p></p>
<p>Usethebrains technologies</p>
<p>Email: support@usethebrains.com</p>
<p>Phone: 233-55-587-2008</p>
<p>Address: Amasaman, Accra-Ghana</p>
</div>
  )
}
