// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import '../css/navbar/NavBar.css';

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/artists">Artists</Link>
      <Link to="/museums">Museums</Link>
      <Link to="/reviews">Reviews</Link>
      <Link to="/users">Users</Link>
    </nav>
  );
}

export default NavBar;

