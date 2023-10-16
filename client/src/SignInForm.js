import React, { useState } from "react";

function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignInSuccess, setIsSignInSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();

        // Client-side validation
        if (!isValidEmail(email) || !isValidPassword(password)) {
            setErrorMessage("Invalid email or password format.");
            return;
        }

        // Simulate a successful sign-in (you should replace this with a server API call)
        // If the sign-in is successful, set isSignInSuccess to true
        setIsSignInSuccess(true);

        // Clear error message
        setErrorMessage("");
    };

    const isValidEmail = (email) => {
        // Add a regular expression pattern to validate email format
        const emailPattern = /^\S+@\S+\.\S+$/;
        return emailPattern.test(email);
    };

    const isValidPassword = (password) => {
        // Add password complexity requirements (e.g., minimum length, special characters, numbers, etc.)
        return password.length >= 8;
    };

    return (
        <div>
            {isSignInSuccess ? (
                <div className="success-message">
                    Sign-in was successful! You are now logged in.
                </div>
            ) : (
                <form onSubmit={handleSignIn}>
                    <h2>Sign In</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <label>Email:
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>Password:
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">Sign In</button>
                </form>
            )}
        </div>
    );
}

export default SignInForm;
