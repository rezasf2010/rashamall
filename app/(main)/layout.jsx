import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { GlobalProvider } from "@/context/GlobalContext";
import "@/assets/styles/globals.css";
import "@/assets/styles/hero.css";
import "photoswipe/dist/photoswipe.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "RashaMall",
  description:
    "online shopping, shopping electronic devices, shopping Home apliances",
  keywords: "online, home apliances, electronic devices",
  language: "fa",
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="fa">
          <body className="w-full flex flex-col items-center">
            <Navbar />
            <main className="w-full flex flex-col items-center">
              {children}
            </main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
