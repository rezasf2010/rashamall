import Link from "next/link";

const Breadcrumb = ({ pathSegments }) => {
  return (
    <div className="flex px-2 text-gray-700 text-sm border-b-2 border-gray-300 ml-2">
      {pathSegments.map((segment, index) => (
        <span key={index}>
          {index > 0 && " / "}
          {segment.link ? (
            <Link
              href={segment.link}
              className="text-orange-400 hover:underline ml-2"
            >
              {segment.name}
            </Link>
          ) : (
            <span>{segment.name}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
