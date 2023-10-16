import React, { useState, useEffect } from "react";
import "../src/css/review/Reviews.css";
import withNavbar from "./Layout";

function Reviews() {
  const [newReview, setNewReview] = useState("");
  const [selectedArtistId, setSelectedArtistId] = useState("");
  const [artists, setArtists] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null); // Track the review being edited

  useEffect(() => {
    
    fetch("/api/artists")
      .then((response) => response.json())
      .then((data) => {
        setArtists(data);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });

    
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

    if (editingReview) {
      
      fetch(`/api/reviews/${editingReview}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newReview, artist_id: selectedArtistId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Review updated:", data);
          setEditingReview(null); 
          fetchReviews();
        })
        .catch((error) => {
          console.error("Error updating review:", error);
        });
    } else {
      
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
          setSelectedArtistId("");
          fetchReviews();
        })
        .catch((error) => {
          console.error("Error adding review:", error);
        });
    }
  };

  const handleEditReview = (reviewId) => {
    
    const reviewToEdit = reviews.find((review) => review.id === reviewId);
    if (reviewToEdit) {
      setEditingReview(reviewToEdit.id);
      setNewReview(reviewToEdit.content);
      setSelectedArtistId(reviewToEdit.artist_id);
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Review deleted:", data);
          fetchReviews();
        })
        .catch((error) => {
          console.error("Error deleting review:", error);
        });
    }
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
      <button onClick={handleAddReview}>{editingReview ? "Update Review" : "Add Review"}</button>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {editingReview === review.id ? (
              <div>
                <input type="text" value={newReview} onChange={(e) => setNewReview(e.target.value)} />
                <select value={selectedArtistId} onChange={(e) => setSelectedArtistId(e.target.value)}>
                  <option value="">Select an artist</option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              review.content
            )}
            <button onClick={() => handleEditReview(review.id)}>Edit</button>
            <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withNavbar(Reviews);
