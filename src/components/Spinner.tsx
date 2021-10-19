import React from "react";

interface Props {}

const Spinner: React.FC<Props> = () => {
  return (
    <div
      className={`fixed top-0 left-0 z-50 block w-full h-full bg-indigo-100 opacity-75`}
    >
      <span className="relative block w-0 h-0 mx-auto my-0 opacity-75 top-1/3">
        <div
          className={`w-32 h-32 border-t-4 border-b-4 rounded-full animate-spin border-indigo-700`}
        ></div>
      </span>
    </div>
  );
};

export default Spinner;
