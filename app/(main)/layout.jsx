import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "RashaMall",
  description:
    "online shopping, shopping electronic devices, shopping Home apliances",
  keywords: "online, home apliances, electronic devices",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="w-full flex flex-col items-center">
        <Navbar />
        <main className="w-full flex flex-col items-center">{children}</main>
        <Footer />
        {/* <ToastContainer /> */}
      </body>
    </html>
  );
};

export default MainLayout;
