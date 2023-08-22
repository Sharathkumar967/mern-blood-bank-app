import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("user", user); // Log the entire user object
  const navigate = useNavigate();

  // logout handler
  const handleLogout = () => {
    const shouldLogout = window.confirm("Are you sure you want to logout?");
    if (shouldLogout) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand h1">
            <BiDonateBlood color="red" />
            Blood Bank App
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <BiUserCircle /> Welcome{" "}
                {user?.user.name ||
                  user?.user.hospitalName ||
                  user?.user.oraganizationName}{" "}
                &nbsp;
                <span className="badge bg-secondary">{user?.user.role}</span>
              </p>
            </li>
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
