import AuthProvider from "@/components/AuthProvider";
import "@/assets/styles/globals.css";
import "photoswipe/dist/photoswipe.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "@/componentsAdmin/AdminNavbar";

const AdminDashboardLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="fa">
        <body>
          <AdminNavbar />
          <main>{children}</main>
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default AdminDashboardLayout;
