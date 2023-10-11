import React, { useState, useEffect } from "react";
import withNavbar from "./Layout";

function Artists() {
    // const [artists, setArtists]= useState([]);

    // useEffect(()=> {
    //     fetch("http://localhost:5000/api/artists")
    //         .then((response) => response.json())
    //         .then((data) => {
    //         setArtists(data);
    //          })
    //         .catch((error) => {
    //             console.error("Error fetching artist data", error);
    //         });

    // }, []);

    return (
        <div>
            <h2>Artists</h2>

        </div>
    );
}

export default withNavbar(Artists);