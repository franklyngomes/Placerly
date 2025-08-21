import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Placerly",
  description: "Wealth management made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Placerly</title>

        {/* <!-- ======= Google Font =======--> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&amp;display=swap"
          rel="stylesheet"
        />
        {/* <!-- End Google Font--> */}

        {/* <!-- ======= Styles =======--> */}
        <link href="/assets/vendors/bootstrap/bootstrap.min.css" rel="stylesheet" />
        <link
          href="/assets/vendors/bootstrap-icons/font/bootstrap-icons.min.css"
          rel="stylesheet"
        />
        <link href="/assets/vendors/glightbox/glightbox.min.css" rel="stylesheet" />
        <link href="/assets/vendors/swiper/swiper-bundle.min.css" rel="stylesheet" />
        <link href="/assets/vendors/aos/aos.css" rel="stylesheet" />
        {/* <!-- End Styles--> */}

        {/* <!-- ======= Theme Style =======--> */}
        <link href="/assets/css/style.css" rel="stylesheet" />
        {/* <!-- End Theme Style--> */}

        {/* <!-- ======= Apply theme =======--> */}
      </head>
      <body>
        {children}

        <script src="/assets/vendors/bootstrap/bootstrap.bundle.min.js" defer />
        <script src="/assets/vendors/gsap/gsap.min.js" defer></script>
        <script src="/assets/vendors/imagesloaded/imagesloaded.pkgd.min.js" defer></script>
        <script src="/assets/vendors/isotope/isotope.pkgd.min.js" defer></script>
        <script src="/assets/vendors/glightbox/glightbox.min.js" defer></script>
        <script src="/assets/vendors/swiper/swiper-bundle.min.js" defer></script>
        <script src="/assets/vendors/aos/aos.js" defer></script>
        <script src="/assets/vendors/purecounter/purecounter.js" defer></script>
        <script src="/assets/js/custom.js" defer></script>
        <script src="/assets/js/send_email.js" defer></script>
      </body>
    </html>
  );
}
