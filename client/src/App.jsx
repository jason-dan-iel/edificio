import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from "./pages/events";
import Home from "./pages/home";
import Preregister from "./pages/pre-registration";
import "./App.css";
import Customcursor from "./components/cursor/cursor";
import Navbar from "./components/navbar";
import Partbg from "./components/particle";
import Comingsoon from "./pages/comingsoon";
import Ourteam from "./pages/ourteam";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Partbg />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/comingsoon" element={<Comingsoon />} />
        <Route path="/ourteam" element={<Ourteam />} />
        <Route path="/pre-registration" element={<Preregister />} />
      </Routes>
    </Router>
  );
};
export default App;
