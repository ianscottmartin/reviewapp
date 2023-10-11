import React, { useEffect, useState } from "react";
import withNavbar from "./Layout";

function Artists() {
    const [artists, setArtists] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('api/artists')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setArtists(data);
            })
            .catch((err) => {
                console.error(err);
                setError(err);
            });
    }, []);

    if (error) {
        return (
            <div>
                <h2>Artists</h2>
                <p>An error occurred while fetching data: {error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Artists</h2>
            <ul>
                {artists.map((artist) => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default withNavbar(Artists);
