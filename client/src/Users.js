import React, { useEffect, useState } from "react";
import withNavbar from "./Layout";

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null); // New state for error handling

    useEffect(() => {
        fetch('api/users')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data); // Check the data
            setUsers(data);
        })
        .catch((err) => {
            console.error(err);
            setError(err); // Set the error state
        });
    }, []);

    // If there's an error, display an error message
    if (error) {
        return (
            <div>
                <h2>Users</h2>
                <p>An error occurred while fetching data: {error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
}

export default withNavbar(Users);
