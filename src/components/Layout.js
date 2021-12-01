import { Drawer, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TopBar from "./Header/TopBar";
import React from "react";

const Layout = ({ children, films }) => {
  return (
    <div className="fullPage">
      <TopBar className="topbar" films={films} />
      <div className="page">
        <div className="toolbar"></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
