'use client';

import dynamic from 'next/dynamic';

const ClipLoader = dynamic(() => import('react-spinners/ClipLoader'), {
  ssr: false,
});

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
