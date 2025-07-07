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
           <h2>Terms and Conditions</h2>
        <p><em>Last updated: 1st January, 2022</em></p>
        <p>Please read these Terms and Conditions carefully before using <strong>BECE Inside</strong> mobile application operated by usethebrains.</p>
        <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all users and others who access or use this App.</p>
        <p><strong>BY ACCESSING OR USING THE SERVICE YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DISAGREE WITH ANY PART OF THE TERMS THEN YOU MAY STOP USING OUR BECE INSIDE</strong></p>
        
        <h3>Links in our App</h3>
        <p>Where our App contains links to other Apps and resources provided by third parties, these links are provided for your information only.</p>
        <p>usethebrains has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web Apps or services. You further acknowledge and agree that usethebrains shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web Apps or services.</p>
        
        <h3>Termination</h3>
        <p>We reserve the right to terminate or withhold access to this service without reason. Failure to follow the terms of service may result in us; withholding service, deleting of information, contact of authorities where appropriate (including that of police, federal authorities, government and/or government agencys) and legal action.</p>
        
        <h3>Ownership</h3>
        <p>Any use of data such as images, design, code and text require express permission from the owners. You agree not to sell, copy, resell, or commercially exploit any part of the system including (but not limited to); graphic, text, sounds, documents such as the terms of service or other content.</p>
        
        <h3>Accessing our App</h3>
        <p>Our App is made available free of charge.</p>
        <p>We do not guarantee that our App, or any content on it, will always be available or be uninterrupted. Access to our App is permitted on a temporary basis. We may suspend, withdraw, discontinue or change all or any part of our App without notice. We will not be liable to you if for any reason our App is unavailable at any time or for any period.</p>
        <p>You are responsible for making all arrangements necessary for you to have access to our App.</p>
        <p>You are also responsible for ensuring that all persons who access our App through your internet connection are aware of these terms of use and other applicable terms and conditions, and that they comply with them.</p>
        
        <h3>Limitations of use</h3>
        <p>You agree not to use the system in any way other than its intended use by the developers, staff and owner’s of usethebrains. This includes:</p>
        <ul>
            <li>The use of cheats, exploits, hacks, scripts/bots or the use of unauthorized third-party software.</li>
            <li>Modification of the system, including; files, data or communication.</li>
            <li>The use of third-party software that collects information from the service.</li>
            <li>You may not crop, edit, distribute our video or modify our video in any other way without permission.</li>
            <li>You may not use the system if for some reason it is against the law for you to do so.</li>
        </ul>
        
        <h3>Viruses</h3>
        <p>We do not guarantee that our App will be secure or free from bugs or viruses.</p>
        <p>You are responsible for configuring your information technology, computer programs and platform in order to access our App. You should use your own virus protection software.</p>
        <p>You must not misuse our App by knowingly introducing viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful. You must not attempt to gain unauthorized access to our App, the server on which our App is stored or any server, computer or database connected to our App. You must not attack our App via a denial-of-service attack or a distributed denial-of service attack. By breaching this provision, you would commit a criminal offence under the We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use our App or App will cease immediately.</p>
        
        <h3>Privacy</h3>
        <p>We collect information on you and your account with your permission, this information may be used by us for various purposes, including the improvement of the system. Information collected such as your name may be seen by other system users.</p>
        
        <h3>Changes</h3>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        
        <h3>Contact Us</h3>
        <p>If you have any questions about these Terms, please contact us.</p>
        <p><strong>Organization name:</strong> Usethebrains</p>
        <p><strong>Address:</strong> Accra- Ghana, Amasaman behind Crystal Heights international School</p>
        <p><strong>Website:</strong> <a href="https://usethebrains.com">https://usethebrains.com</a></p>
        <p><strong>Contact email address:</strong> <a href="mailto:info@usethebrains.com">info@usethebrains.com</a></p>
        <p><strong>Contact phone number:</strong> +233555872008</p>
    </div>
  )
}
