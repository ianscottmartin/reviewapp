import React from "react";
import '../css/home/Home.css';
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

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
            <div className= "home-background">
                <div className="art-images">
                    <img src="image1.jpg" alt="Artwork 1"/>
                    <img src="image2.jpg" alt="Artwork 2"/>
                    <img src="image3.jpg" alt="Artwork 3"/>
                </div>
            </div>
        </div>
    );
}

export default Home;