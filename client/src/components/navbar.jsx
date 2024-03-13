import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import edificio from "../assets/edificio_logo-removebg-preview.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(true);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    location.reload();
  };
  const token = localStorage.getItem("auth-token");
  // const token = "abcd";
  
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="navbar_main">
      <ul className="navbar_main1">
        <a
          href=""
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={edificio}
            alt="Logo"
            className="logo"
            style={{ height: "60px", marginLeft: "20px" }}
          />
        </a>
        <ul className={clicked ? "nav_points active" : "nav_points"}>
          <li>
            <button className="btn link">
              <NavLink to="/" className="link">
                Home
              </NavLink>
            </button>{" "}
          </li>
          <li>
            <button className="btn link">
              <NavLink to="/events" className="link">
                Events
              </NavLink>
            </button>{" "}
          </li>
          <li>
            <button className="btn link">
              <NavLink to="/ourteam" className="link">
                Team
              </NavLink>
            </button>{" "}
          </li>
          <li>
            <button className="btn link">
              <NavLink to="/registration" className="link">
                Registration
              </NavLink>
            </button>{" "}
          </li>
          <li>
            <button className="btn link">
              {(token) ? (
                <NavLink className="link" onClick={handleLogout}>
                  Logout
                </NavLink>
              ) : (
                <NavLink to="/login" className="link">
                  Login
                </NavLink>
              )}
            </button>{" "}
          </li>
          <li>
            <button className="btn link">
              {(token)
              ?
              <NavLink to="/dashboard" className="link">
                Dashboard
              </NavLink>
              :
              <NavLink to="/signup" className="link">
                Signup
              </NavLink>
              }
            </button>{" "}
          </li>
        </ul>
        <div className="mobile-nav ">
          <i
            id="bar"
            onClick={handleClick}
            className={clicked ? "fas fa-bars" : "fas fa-times"}
          ></i>
        </div>
      </ul>
    </div>
  );
}
