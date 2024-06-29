"use client";

import { PulseLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

const LoadingPage = ({ loading }) => {
  return (
    <PulseLoader
      color="#1F305E"
      loading={loading}
      cssOverride={override}
      size={15}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;
