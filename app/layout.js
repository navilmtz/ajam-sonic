import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
config.autoAddCss = false;

export default function RootLayout({ children }) { 
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        <Header/>
        <main>
            {children}
        </main>
        <Footer />
        <Script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"></Script>
      </body>
    </html>
  );
}
