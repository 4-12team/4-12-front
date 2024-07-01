import React from "react";

function DetailLoading() {
  return (
    <div className="mt-10 w-full animate-pulse p-4 ">
      <div className="flex gap-2">
        <div className="h-10 w-10 rounded-full bg-gray-400" />
        <div className="mt-2 h-5 w-[200px] rounded-lg bg-gray-400" />
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <div className="h-5 w-[230px] rounded-lg bg-gray-400" />
        <div className="h-5 w-[250px] rounded-lg bg-gray-400" />
        <div className="h-5 w-[270px] rounded-lg bg-gray-400" />
      </div>
      <div className="mt-28 h-16 w-full rounded-lg bg-gray-400" />
    </div>
  );
}

export default DetailLoading;
