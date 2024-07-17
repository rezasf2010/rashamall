import OrderCardAdmin from "@/componentsAdmin/OrderCardAdmin";

const AdminOrdersPage = () => {
  return (
    <section className="bg-blue-50 w-full">
      <div className="w-11/12 m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-3xl text-center font-semibold mb-6">
            لیست سفارش مشتری ها
          </h2>
          <div className="border border-red-500">
            <OrderCardAdmin />
          </div>
          <div>AdminOrdersPage</div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrdersPage;
