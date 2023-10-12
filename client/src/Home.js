// Home.js

import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import withNavbar from "./Layout";
import "./css/home/Home.css"
function Home() {
    const [signInData, setSignInData] = useState(null);
    const [signUpData, setSignUpData] = useState(null);

    // callback function
    const handleSignInSubmit = (data) => {
        setSignInData(data);
    };

    const handleSignUpSubmit = (data) => {
        setSignUpData(data);
    };

    return (
        <div className="home">
            <div className="home-background">
                <div className="art-images">
                    <img src="image1.jpg" alt="Artwork 1" />
                    <img src="image2.jpg" alt="Artwork 2" />
                    <img src="image3.jpg" alt="Artwork 3" />
                </div>
            </div>
            <div className="auth-section">
                <SignInForm onSubmit={handleSignInSubmit} />
                <SignUpForm onSubmit={handleSignUpSubmit} />
            </div>
            {signInData && <div>Sign-In Data: {JSON.stringify(signInData)}</div>}
            {signUpData && <div>Sign-Up Data: {JSON.stringify(signUpData)}</div>}
        </div>
    );
}

export default withNavbar(Home);

