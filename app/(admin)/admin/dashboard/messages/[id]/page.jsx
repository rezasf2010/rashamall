import React from "react";
import MessageDetail from "@/componentsAdmin/MessageDetail";

const AdminMessagePage = () => {
  return (
    <section className="w-full">
      <div className="w-11/12 m-auto">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <MessageDetail />
        </div>
      </div>
    </section>
  );
};

export default AdminMessagePage;
