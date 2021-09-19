import { IChildren } from "../../../interfaces/children.interface";

const Layout = ({ children }: IChildren) => {
  return (
    <>
      <main className="container py-3">{children}</main>
    </>
  );
};

export default Layout;
