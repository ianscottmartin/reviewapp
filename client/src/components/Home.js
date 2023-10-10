import React from "react";
import './HomePage.css';

function Home() {
    return(
    <div classname="home">
        <header className="navbar">
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/users">Users</a></li>
                <li><a href="/artists">Artists</a></li>
                <li><a href="/museums">Museums</a></li>
                <li><a href="/reviews">Reviews</a></li>
            </ul>
        </nav>
        </header>
        <div className="art-images"></div>

    </div>
    );
}

export default HomePage;