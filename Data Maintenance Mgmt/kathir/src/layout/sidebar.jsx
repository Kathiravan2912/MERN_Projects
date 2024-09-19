import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();

  // Function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  const logout = () => {
    localStorage.setItem("isAuth", "");
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <ul>
        <Link to="/Dashboard" className="text-decoration-none">
          <li className={`option ${isActive("/Dashboard") ? "active" : ""}`}>
            Dashboard
          </li>
        </Link>
      </ul>
      <h3>Employee Category</h3>
      <ul>
        <Link to="/Employee" className="text-decoration-none">
          <li className={`option ${isActive("/Employee") ? "active" : ""}`}>
            Employees
          </li>
        </Link>
      </ul>
      <h3>Customer Category</h3>
      <ul>
        <Link to="/customers" className="text-decoration-none">
          <li className={`option ${isActive("/customers") ? "active" : ""}`}>
            Customers
          </li>
        </Link>
      </ul>
      <h3>Bank Category</h3>
      <ul>
        <Link to="/bankEvent" className="text-decoration-none">
          <li className={`option ${isActive("/bankEvent") ? "active" : ""}`}>
            Bank Events
          </li>
        </Link>
        <Link to="/bankAwards" className="text-decoration-none">
          <li className={`option ${isActive("/bankAwards") ? "active" : ""}`}>
            Bank Awards
          </li>
        </Link>
      </ul>
      <h3>Admin Management</h3>
      <ul>
        <Link to="/adminManagement" className="text-decoration-none">
          <li
            className={`option ${isActive("/adminManagement") ? "active" : ""}`}
          >
            Admin Management
          </li>
        </Link>
      </ul>
      <div className="homepage-btn" id="homepage-btn" onClick={logout}>
        LOGOUT
      </div>
    </div>
  );
};

export default Sidebar;
