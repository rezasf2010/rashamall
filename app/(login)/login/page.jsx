import AdminLogin from "@/componentsAdmin/AdminLogin";

// /login
const HomePage = () => {
  return (
    <div className=" w-full h-screen gap-4 flex flex-col items-center justify-center sm:justify-center lg:justify-center">
      <div className="container m-auto max-w-2xl">
        <div className="bg-white flex justify-center px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <AdminLogin />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
