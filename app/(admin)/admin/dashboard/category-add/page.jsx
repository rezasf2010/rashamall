import CategoryAddFrom from "@/componentsAdmin/CategoryAddFrom";

const CategoryAddPage = () => {
  return (
    <section className="w-full">
      <div className="lg:w-11/12 lg:m-auto flex justify-center">
        <div className="bg-white w-full px-6 py-8 mb-4 shadow-md rounded-md border">
          <CategoryAddFrom />
        </div>
      </div>
    </section>
  );
};

export default CategoryAddPage;
