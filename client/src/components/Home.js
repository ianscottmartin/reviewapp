import React from "react";
import './HomePage.css';
import 'client/src/css/home/Home.css';

function Home() {
    return(
    <div className="home">
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