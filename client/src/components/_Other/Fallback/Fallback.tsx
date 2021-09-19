import React from "react";
import "./Fallback.scss";

const Fallback = ({ children }: { children: JSX.Element }) => {
  return <div className="spinner-container">{children}</div>;
};

export default Fallback;
