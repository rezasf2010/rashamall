import AuthProvider from "@/components/AuthProvider";
import AdminNavbar from "@/componentsAdmin/AdminNavbar";
import "@/assets/styles/globals.css";
import "@/assets/styles/hero.css";
import "photoswipe/dist/photoswipe.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const AdminLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="fa">
        <body className="flex flex-row min-h-screen">
          <AdminNavbar />
          <main className="flex-grow p-6 lg:mr-64">{children}</main>
          {/* <ToastContainer /> */}
        </body>
      </html>
    </AuthProvider>
  );
};

export default AdminLayout;
