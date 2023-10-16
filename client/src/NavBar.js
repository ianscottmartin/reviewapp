import React from 'react';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is authenticated

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the authentication token
  };

  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/artists">Artists</a></li>
        <li><a href="/users">Users</a></li>
        <li><a href="/museums">Museums</a></li>
        <li><a href="/reviews">Reviews</a></li>
        <li><a href="/logout">Logout</a></li>
        {isAuthenticated && (
          <li>
            <a href="/logout" onClick={handleLogout}>Logout</a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
