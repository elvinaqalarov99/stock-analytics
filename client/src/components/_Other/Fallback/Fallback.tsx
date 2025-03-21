import { IChildren } from "../../../interfaces/children.interface";

const Fallback = ({ children }: IChildren) => {
  return <div className="spinner-container">{children}</div>;
};

export default Fallback;
