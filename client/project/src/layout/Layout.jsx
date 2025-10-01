import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import GridBackground from "../background/GridBackground"
import { ScrollToTop } from "../pages/ScrollToTop";

export const Layout = ({ children }) => {

  return (
    <>
    
      <Nav />
      {/* <div className="pt-[90px] sm:pt-0"> */}
      <div className="pt-[50px] sm:pt-0">
<GridBackground className=''>
      <ScrollToTop />
        <Outlet />
    </GridBackground>

      </div>
    </>
  );
};
