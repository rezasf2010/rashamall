import AdminLogin from "@/componentsAdmin/AdminLogin";

// /admin
const AdminPage = () => {
  return (
    <div className=" w-full h-screen bg-blue-50 gap-4 flex flex-col items-center justify-center sm:justify-center lg:justify-center">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white flex justify-center px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <AdminLogin />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
