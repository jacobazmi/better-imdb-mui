import { Drawer, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TopBar from "./Header/TopBar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="fullPage">
      <TopBar className="topbar" />
      <div className="page">
        <div className="toolbar"></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
