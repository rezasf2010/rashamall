import Skeleton from "react-loading-skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-gray-50 w-44 min-h-80 p-2 md:w-80 md:h-[28rem] lg:h-[28rem] lg:w-72 hxlg:w-80 2xl:w-96 rounded-xl shadow-2xl relative border border-gray-200 flex flex-col justify-between">
      <div>
        <div className="w-full h-auto md:h-2/3 flex rounded-t-xl justify-center items-center">
          <Skeleton height={200} width="100%" />
        </div>
        <div className="absolute top-2 left-0 px-2 md:px-4 py-1 rounded-tr-xl rounded-br-xl text-xs md:text-base md:font-bold">
          <Skeleton width={50} height={20} />
        </div>
        <div className="absolute top-[10px] right-[10px] flex justify-center items-center px-2 md:px-4 py-2 rounded-lg text-xs md:text-base md:font-bold text-center">
          <Skeleton width={50} height={20} />
        </div>
        <div className="relative px-4 py-2 flex flex-col md:h-1/3">
          <h3 className="text-xs mb-2 font-[600] md:text-sm lg:text-base">
            <Skeleton width="80%" />
          </h3>
          <div className="text-end text-xs md:text-sm font-[500] text-green-900 mb-4">
            <Skeleton width="50%" />
          </div>
        </div>
      </div>
      <div className="md:absolute md:bottom-3 flex flex-col lg:flex-row justify-between">
        <Skeleton width={100} height={36} />
      </div>
    </div>
  );
};

const HomeCategorySectionSkeleton = () => {
  return (
    <section className="border border-gray-300 bg-blue-50 w-full md:w-full p-4 rounded-2xl shadow-2xl">
      <div className="flex p-2 mb-6 text-gray-700 text-xl font-bold border-b border-gray-300">
        <Skeleton width={200} height={30} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
      </div>
    </section>
  );
};

const OrderCardSkeleton = () => {
  return (
    <div className=" text-gray-700 mb-4 flex flex-col md:flex-row items-center md:items-end gap-6 border border-gray-300 bg-gray-50 w-full p-4 rounded-2xl shadow-xl">
      <div className="info w-full flex flex-col gap-3">
        <div className="order-time">
          <Skeleton width={200} height={20} />
        </div>
        <div className="orderer">
          <Skeleton width={150} height={20} />
        </div>
        <div className="orderer-mobile">
          <Skeleton width={120} height={20} />
        </div>
        <div className="orderer-adress">
          <Skeleton width={180} height={20} />
        </div>
      </div>
      <div className="w-full flex justify-center md:justify-end">
        <Skeleton width={100} height={40} />
      </div>
    </div>
  );
};

//   const OrderCardAdminSkeleton = () => {
//     return (
//       <div className="animate-pulse text-gray-700 mb-4 flex flex-col md:flex-row items-center md:items-end gap-6 border border-gray-300 bg-gray-50 w-full p-4 rounded-2xl shadow-xl">
//         <div className="info w-full flex flex-col gap-3">
//           <div className="order-time bg-gray-200 h-4 rounded w-3/4"></div>
//           <div className="orderer bg-gray-200 h-4 rounded w-1/2"></div>
//           <div className="orderer-mobile bg-gray-200 h-4 rounded w-1/3"></div>
//           <div className="orderer-address bg-gray-200 h-4 rounded w-1/4"></div>
//         </div>
//         <div className="w-full flex justify-center md:justify-end">
//           <div className="bg-gray-200 h-8 w-24 rounded"></div>
//         </div>
//       </div>
//     );
//   };

// const OrderItemSkeleton = () => {
//     return (
//       <tr className="animate-pulse">
//         <td className="px-1 py-2 text-center bg-gray-200 rounded h-4"></td>
//         <td className="px-1 py-2 text-center bg-gray-200 rounded h-4"></td>
//         <td className="px-1 py-2 text-center bg-gray-200 rounded h-4"></td>
//         <td className="px-1 py-2 text-center bg-gray-200 rounded h-4"></td>
//         <td className="px-1 py-2 text-center bg-gray-200 rounded h-4"></td>
//       </tr>
//     );
//   };

export { OrderCardSkeleton, ProductCardSkeleton, HomeCategorySectionSkeleton };
