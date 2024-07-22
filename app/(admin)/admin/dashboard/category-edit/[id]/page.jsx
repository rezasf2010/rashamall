import CategoryEditForm from "@/componentsAdmin/CategoryEditForm";

const CategoryEditPage = () => {
  return (
    <section className="w-full">
      <div className="w-11/12 m-auto">
        <div className="bg-white px-3 md:px-6 py-8 mb-4 shadow-md rounded-md border">
          <CategoryEditForm />
        </div>
      </div>
    </section>
  );
};

export default CategoryEditPage;
