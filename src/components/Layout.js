import { Drawer, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TopBar from "./Header/TopBar";
import React from "react";

const Layout = ({ children, films }) => {
  return (
    <div
      className="fullPage"
      style={{
        backgroundColor: "#373a47",
        backgroundImage:
          "url('https://image.freepik.com/free-vector/seamless-pattern-with-cinema-elements_225004-1155.jpg')",
        backgroundBlendMode: "overlay",
      }}
    >
      <TopBar className="topbar" films={films} />
      <div className="page">
        <div className="toolbar"></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
