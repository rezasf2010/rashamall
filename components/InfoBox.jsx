import Link from 'next/link';

const InfoBox = ({ buttonInfo, children }) => {
  return (
    <div className="rounded-xl shadow-xl">
      <div>{children}</div>
      {buttonInfo && (
        <Link
          href={buttonInfo ? buttonInfo.link : '/'}
          className={` inline-block text-white rounded-lg px-4 py-2 hover:opacity-80 `}
        >
          {buttonInfo ? buttonInfo.text : ''}
        </Link>
      )}
    </div>
  );
};

export default InfoBox;
