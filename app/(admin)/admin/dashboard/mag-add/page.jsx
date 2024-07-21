import MagazinePostAddForm from "@/componentsAdmin/MagazinePostAddForm";

const MagazinePostAddPage = () => {
  return (
    <section className="bg-blue-50 w-full">
      <div className="w-11/12 m-auto py-16">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <MagazinePostAddForm />
        </div>
      </div>
    </section>
  );
};

export default MagazinePostAddPage;
