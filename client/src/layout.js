import React from "react";

import Navbar from "./Components/Navbar.js";
import Footer from "./Components/footer.js";

function Layout(props) {
  return (
    <div className="flex flex-col w-full items-center min-h-screen justify-between">
      <Navbar />
      {props.children}
      <Footer/>
    </div>
  );
}

export default Layout;
