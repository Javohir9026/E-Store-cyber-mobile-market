import "./globals.css";
import { ToastContainer } from "react-toastify";
import Footer from "components/layout/Footer";
import Header from "components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Header />
        </header>
        <main>
          {children}
          <ToastContainer />
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
