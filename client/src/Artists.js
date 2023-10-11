// Artists.js

import React, { useState, useEffect } from "react";
import withNavbar from "./Layout";

function Artists() {
    const [artists, setArtists] = useState([]);
    const [artistName, setArtistName] = useState("");

    useEffect(() => {
        // Fetch the list of artists when the component mounts
        fetch("/api/artists")
            .then((response) => response.json())
            .then((data) => setArtists(data))
            .catch((error) => console.error("Error fetching artists:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an artist object with the form data
        const newArtist = {
            name: artistName,
        };

        // Send a POST request to add the artist
        fetch("/api/artists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newArtist),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Artist added:", data);
                
                // After adding the artist
                // Fetch the updated list of artists and update the state
                fetch("/api/artists")
                    .then((response) => response.json())
                    .then((data) => setArtists(data))
                    .catch((error) => console.error("Error fetching artists:", error));
            })
            .catch((error) => console.error("Error adding artist:", error));
    };

    return (
        <div>
            <h2>Artists</h2>
            {/* List of artists */}
            <ul>
                {artists.map((artist) => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>

            {/* ArtistForm component */}
            <div>
                <h2>Add an Artist</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Artist Name:
                        <input
                            type="text"
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                        />
                    </label>
                    <button type="submit">Add Artist</button>
                </form>
            </div>
        </div>
    );
}

export default withNavbar(Artists);
