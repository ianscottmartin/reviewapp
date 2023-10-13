import React, { useEffect, useState } from "react";
import withNavbar from "./Layout";
import "./css/review/Reviews.css";

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('api/reviews')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data); // Check the data
                setReviews(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="reviews_container">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="reviews_container">
                <h2>Reviews</h2>
                <p>An error occurred while fetching data: {error.message}</p>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="reviews_container">
                <h2>Reviews</h2>
                <p>No reviews available.</p>
            </div>
        );
    }

    return (
        <div className="reviews_container">
            <h2>Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>{review.content}</li>
                ))}
            </ul>
        </div>
    );
}

export default withNavbar(Reviews);
