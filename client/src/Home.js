import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import withNavbar from "./Layout";
import "./css/home/Home.css";



function Home() {
    const [signInData, setSignInData] = useState(null);
    const [signUpData, setSignUpData] = useState(null);

    
    const handleSignInSubmit = (data) => {
        setSignInData(data);
    };

    const handleSignUpSubmit = (data) => {
        setSignUpData(data);
    };

    return (
        <div className="home">
            <div className="home-background">
          
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
