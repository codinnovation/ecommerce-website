import React from "react";
import Topbar from "../../admin-page/topbar";
import Header from "../../admin-page/header";

function Layout({ children, user }) {
  return (
    <>
      <div>
        <Topbar user={user} />
        <Header user={user} />
        {children}
      </div>
    </>
  );
}

export default Layout;
