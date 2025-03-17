import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  // logout method to logout the user and remove the token from the local session
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navabar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="footer"
          onClick={() => setMenu("contact us")}
          className={menu === "contact us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      {/* Veg / Non-Veg Filter
      <div className="filter-buttons">
        <button
          className="filter-btn all"
          onClick={() => setCategoryFilter("")}
        >
          All
        </button>
        <button
          className="filter-btn veg"
          onClick={() => setCategoryFilter("veg")}
        >
          🟢 Veg
        </button>
        <button
          className="filter-btn non-veg"
          onClick={() => setCategoryFilter("non-veg")}
        >
          🔴 Non-Veg
        </button>
      </div> */}

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" className="icon" />

        <div className="navbar-cart">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Cart" className="icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "cart-dot"}></div>
        </div>

        {/* Login / Profile */}
        {!token ? (
          <button className="login-btn" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="nav-profile">
            <img src={assets.profile_icon} alt="Profile" className="icon" />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>LogOut</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
