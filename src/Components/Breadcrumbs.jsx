import React from "react";
import { Link } from "react-router-dom";
const Breadcrumbs = ({ data, activeName }) => {
  return (
    <div className="flex items-center overflow-x-auto ml-5 mt-4 z-[1000] whitespace-nowrap py-4">
      {data.map((item, index) => (
        <div
          className={`${
            item.name === activeName ? "text-primary" : "text-black"
          } text-sm text-black font-semibold md:text-sm `}
        >
          <Link to={item.link}>{item.name}</Link>
          {index !== data.length - 1 && <span className="px-3">/</span>}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;