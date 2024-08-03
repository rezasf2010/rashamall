import AdminNavbar from "@/componentsAdmin/AdminNavbar";
import { AdminGlobalProvider } from "@/context/AdminGlobalContext";
import AdminAuthProvider from "@/componentsAdmin/AdminAuthProvider";
import "@/assets/styles/globals.css";
import "@/assets/styles/hero.css";
import "photoswipe/dist/photoswipe.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = ({ children }) => {
  return (
    <AdminGlobalProvider>
      <html lang="fa">
        <body className="flex flex-row min-h-screen">
          <AdminAuthProvider>
            <AdminNavbar />
            <main className="flex-grow bg-blue-50 px-6 py-16 lg:mr-64">
              {children}
            </main>
            <ToastContainer theme="colored" />
          </AdminAuthProvider>
        </body>
      </html>
    </AdminGlobalProvider>
  );
};

export default AdminLayout;
