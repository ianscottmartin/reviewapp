import React, { useState, useEffect } from "react";
import withNavbar from "./Layout";
import ".//css/artist/Artists.css"
function Artists() {
    const [artists, setArtists] = useState([]);
    const [artistName, setArtistName] = useState("");
    const [artistWork, setArtistWork] = useState("");
    const [artistDescription, setArtistDescription] = useState("");
    const [selectedArtist, setSelectedArtist] = useState(null);

    useEffect(() => {
        // Fetch the list of artists when the component mounts
        fetch("/api/artists")
            .then((response) => response.json())
            .then((data) => setArtists(data))
            .catch((error) => console.error("Error fetching artists:", error));
    }, []);

    // Define function to clear the input fields
    const clearInputFields = () => {
        setArtistName("");
        setArtistWork("");
        setArtistDescription("");
    };

    // Define a function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedArtist) {
            // Edit an artist
            const updatedArtist = {
                id: selectedArtist.id,
                name: artistName,
                work: artistWork,
                description: artistDescription,
            };

            // Send a PUT (edit) request to update the artist
            fetch(`/api/artists/${selectedArtist.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedArtist),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Artist updated:", data);

                    // Reset form fields and selected artist
                    setSelectedArtist(null);
                    clearInputFields();

                    // Fetch the updated list of artists and update the state
                    fetch("/api/artists")
                        .then((response) => response.json())
                        .then((data) => setArtists(data))
                        .catch((error) => console.error("Error fetching artists:", error));
                })
                .catch((error) => console.error("Error updating artist:", error));
        } else {
            // Create a new artist
            const newArtist = {
                name: artistName,
                work: artistWork,
                description: artistDescription,
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

                    // Reset form fields
                    clearInputFields();

                    // Fetch the updated list of artists and update the state
                    fetch("/api/artists")
                        .then((response) => response.json())
                        .then((data) => setArtists(data))
                        .catch((error) => console.error("Error fetching artists:", error));
                })
                .catch((error) => console.error("Error adding artist:", error));
        }
    };

    // Function to edit an artist
    const handleEdit = (artist) => {
        setSelectedArtist(artist);
        setArtistName(artist.name);
        setArtistWork(artist.work);
        setArtistDescription(artist.description);
    };

    // Function to delete an artist
    const handleDelete = (artistId) => {
        if (window.confirm("Are you sure you want to delete this artist?")) {
            fetch(`/api/artists/${artistId}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.status === 200) {
                        // Artist deleted successfully, update the list
                        fetch("/api/artists")
                            .then((response) => response.json())
                            .then((data) => setArtists(data))
                            .catch((error) => console.error("Error fetching artists:", error));
                    } else if (response.status === 404) {
                        console.error("Artist not found.");
                    } else {
                        console.error("Error deleting artist.");
                    }
                })
                .catch((error) => console.error("Error deleting artist:", error));
        }
    };

    return (
        <div className="art_container">
            <div>
             <h2>Artists</h2>
                <div>
                 <h2>{selectedArtist ? "Edit Artist" : "Add an Artist"}</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                         Artist Name:
                         <input
                            type="text"
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                        />
                        </label>
                        <label>
                         Artist Work:
                            <input
                                type="text"
                                value={artistWork}
                                onChange={(e) => setArtistWork(e.target.value)}
                            />
                        </label>
                        <label>
                            Artist Description:
                            <input
                                type="text"
                                value={artistDescription}
                                onChange={(e) => setArtistDescription(e.target.value)}
                            />
                        </label>
                        <button type="submit">
                        {selectedArtist ? "Update Artist" : "Add Artist"}
                        </button>
                    </form>
                </div>
                {/* List of artists */}
                <ul>
                    {artists.map((artist) => (
                        <li key={artist.id}>
                            <div>
                                <strong>Artist Name:</strong> {artist.name}
                            </div>
                            <div>
                                <strong>Work:</strong> {artist.work}
                            </div>
                            <div>
                             <strong>Description:</strong> {artist.description}
                            </div>
                            <button onClick={() => handleEdit(artist)}>Edit</button>
                            <button onClick={() => handleDelete(artist.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default withNavbar(Artists);
