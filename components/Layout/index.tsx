import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface MainProps {
  children: ReactNode
}

const Layout = ({children}: MainProps) => {
  return (
    <>
      <Header/>
        <main className="container mx-auto py-4">
          {children}
        </main>
      <Footer/>
    </>
  );
};

export default Layout;