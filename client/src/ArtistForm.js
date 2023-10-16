import React, { useState } from "react";

function ArtistForm() {
    const [artistName, setArtistName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        
        const newArtist = {
            name: artistName,
        };

        
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
                
            })
            .catch((error) => console.error("Error adding artist:", error));
    };

    return (
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
    );
}

export default ArtistForm;
