import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Films from "./pages/Films";
import Create from "./pages/Create";
import Layout from "./components/Layout";

export const appIp = "18.234.119.161";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Films />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
