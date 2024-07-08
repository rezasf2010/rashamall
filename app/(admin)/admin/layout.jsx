import AuthProvider from "@/components/AuthProvider";
import "@/assets/styles/globals.css";
import "photoswipe/dist/photoswipe.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const AdminLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="fa">
        <body className="w-full h-full flex flex-col items-center">
          <main className="w-full flex flex-col items-center">{children}</main>
          {/* <ToastContainer /> */}
        </body>
      </html>
    </AuthProvider>
  );
};

export default AdminLayout;
