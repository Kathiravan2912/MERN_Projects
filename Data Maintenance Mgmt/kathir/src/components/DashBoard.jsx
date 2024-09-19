import React from 'react';
import "./Dashboard.css";

const DashBoard = () => {
  return (
    <div>
   <div className="dashboard">
    <header className="header">
      <h1>Dashboard</h1>
    </header>
    <div className="stats">
      <div className="card">
        <h3>Employees</h3>
        <p id="employees-count">0</p>
      </div>
      <div className="card">
        <h3>Customers</h3>
        <p id="customers-count">0</p>
      </div>
      <div className="card">
        <h3>Events</h3>
        <p id="events-count">0</p>
      </div>
      <div className="card">
        <h3>Awards</h3>
        <p id="awards-count">0</p>
      </div>
    </div>
  </div>
  </div>
  )
}

export default DashBoard
