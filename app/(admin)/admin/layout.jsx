import "@/assets/styles/globals.css";
import "photoswipe/dist/photoswipe.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const AdminLayout = ({ children }) => {
  return (
    <html lang="fa">
      <body>
        <main>{children}</main>
        {/* <ToastContainer /> */}
      </body>
    </html>
  );
};

export default AdminLayout;
