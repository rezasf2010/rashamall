// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/globals.css";

const AdminLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        {/* <ToastContainer /> */}
      </body>
    </html>
  );
};

export default AdminLayout;
