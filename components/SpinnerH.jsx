"use client";

import dynamic from "next/dynamic";

const PulseLoader = dynamic(() => import("react-spinners/PulseLoader"), {
  ssr: false,
});

const SpinnerH = ({ loading }) => {
  return (
    <PulseLoader
      color="#00366b"
      cssOverride={{}}
      loading={loading}
      margin={2}
      size={10}
      speedMultiplier={1}
    />
  );
};

export default SpinnerH;
