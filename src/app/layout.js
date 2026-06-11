import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mohammed Abdullah | Executive Pastry Chef in UAE",
  description: "Portfolio of Mohammed Abdullah, an Executive Pastry Chef with over 30 years of experience in luxury hotels across the UAE. Fine dining, banqueting, and artisian desserts.",
  keywords: "Executive Pastry Chef, UAE Pastry Chef, Dubai Pastry Chef, Mohammed Abdullah, Luxury Hotel Desserts, Fine Dining Pastry, Showcase Pastries",
  openGraph: {
    title: "Mohammed Abdullah | Executive Pastry Chef",
    description: "30+ years crafting exquisite pastry experiences across the UAE's most prestigious luxury hotels.",
    url: "https://mohammedabdullah-pastry.com", // update with real domain later
    siteName: "Mohammed Abdullah Portfolio",
    images: [
      {
        url: "/ali_profile.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Abdullah | Executive Pastry Chef",
    description: "30+ years crafting exquisite pastry experiences in the UAE.",
    images: ["/ali_profile.jpg"],
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👨‍🍳</text></svg>',
  },
  alternates: {
    canonical: "https://mohammedabdullah-pastry.com",
  },
};

export default function RootLayout({ children }) {
  // JSON-LD structured data for Answer Engine Optimization (AEO) and SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohammed Abdullah",
    "jobTitle": "Executive Pastry Chef",
    "url": "https://mohammedabdullah-pastry.com",
    "image": "https://mohammedabdullah-pastry.com/ali_profile.jpg",
    "description": "Executive Pastry Chef with over 30 years of experience crafting exquisite pastry experiences across the UAE's luxury hotels.",
    "knowsAbout": [
      "Fine Dining Plating",
      "High-Volume Banqueting",
      "Fondant & Sugar Art",
      "Artisanal Viennoiserie",
      "HACCP Compliance",
      "Menu Engineering",
      "Chocolate Tempering"
    ],
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "Grand Millennium Business Bay"
      },
      {
        "@type": "Organization",
        "name": "Rixos Bab Al Bahr"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
