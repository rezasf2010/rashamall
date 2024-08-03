import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { GlobalProvider } from "@/context/UserGlobalContext";
import "@/assets/styles/globals.css";
import "@/assets/styles/hero.css";
import "photoswipe/dist/photoswipe.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata = {
  title: "RashaMall",
  description:
    "online shopping, shopping electronic devices, shopping Home apliances",
  keywords: "online, home apliances, electronic devices",
  language: "fa",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang="fa">
          <body className="w-full flex flex-col items-center">
            <Navbar />
            <main className="w-full flex flex-col items-center">
              {children}
            </main>
            <Footer />
            <ToastContainer theme="colored" />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
