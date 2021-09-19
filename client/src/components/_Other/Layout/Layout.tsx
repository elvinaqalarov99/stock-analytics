import { IChildren } from "../../../interfaces/children.interface";

const Layout = ({ children }: IChildren) => {
  return (
    <>
      <main id="main">{children}</main>
    </>
  );
};

export default Layout;
