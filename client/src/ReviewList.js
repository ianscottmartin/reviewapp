import React, { useState, useEffect } from "react";

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    
    fetch("/api/reviews")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data); 
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>{review.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
