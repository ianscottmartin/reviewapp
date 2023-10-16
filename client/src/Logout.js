import React from "react";
import { useHistory } from "react-router-dom";
import withNavbar from "./Layout";
function Logout() {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear the authentication token
        history.push("/login"); // Redirect to the login page after logout
    };

    return (
        <div>
            <h2>Logout</h2>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default withNavbar(Logout);
