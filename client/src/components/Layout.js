// Layout.js
import React from "react";
import NavBar from "./NavBar";

function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
