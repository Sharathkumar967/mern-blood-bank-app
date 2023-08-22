import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children, user }) => {
  return (
    <>
      <div className="header">
        <Header user={user} />
      </div>
      <div className="row g-0">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">{children}</div>
      </div>
    </>
  );
};

export default Layout;
