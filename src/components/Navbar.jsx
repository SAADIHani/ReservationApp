import React from "react";
import logoImage from "../assets/Logo_Yassir_2023.png";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <img src={logoImage} className="logo-image" alt="Yassir Logo" />
      <h1 className="navbar-title">Reservations</h1>
    </div>
  );
};

export default Navbar;
