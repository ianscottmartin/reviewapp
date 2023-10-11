import React, { useEffect, useState } from "react";
import withNavbar from "./Layout";

function Museums() {
    const [museums, setMuseums] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('api/museums')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setMuseums(data);
            })
            .catch((err) => {
                console.error(err);
                setError(err);
            });
    }, []);

    if (error) {
        return (
            <div>
                <h2>Museums</h2>
                <p>An error occurred while fetching data: {error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Museums</h2>
            <ul>
                {museums.map((museum) => (
                    <li key={museum.id}>{museum.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default withNavbar(Museums);
