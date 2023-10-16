import React, { useState, useEffect } from "react";
import withNavbar from "./Layout";
import "../src/css/review/Reviews.css";

function Reviews() {
  const [newReview, setNewReview] = useState("");
  const [selectedArtistId, setSelectedArtistId] = useState("");
  const [artists, setArtists] = useState([]); 
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch the list of artists
    fetch("/api/artists")
      .then((response) => response.json())
      .then((data) => {
        setArtists(data);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });

    // Fetch the list of reviews
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    fetch("/api/reviews")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  const handleAddReview = () => {
    if (!newReview || !selectedArtistId) {
      alert("Both content and artist are required");
      return;
    }

    fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newReview, artist_id: selectedArtistId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Review added:", data);
        setNewReview("");
        fetchReviews();
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="Write a review"
      />
      <select
        value={selectedArtistId}
        onChange={(e) => setSelectedArtistId(e.target.value)}
      >
        <option value="">Select an artist</option>
        {artists.map((artist) => (
          <option key={artist.id} value={artist.id}>
            {artist.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddReview}>Add Review</button>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>{review.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default withNavbar (Reviews);
