import React, { useState } from "react";

function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();

        // Client-side validation
        if (!isValidEmail(email) || !isValidPassword(password) || password !== confirmPassword) {
            setErrorMessage("Invalid email, password, or password confirmation.");
            return;
        }

        // Simulate a successful signup (you should replace this with a server API call)
        // If the signup is successful, set isSignupSuccess to true
        setIsSignupSuccess(true);

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
            {isSignupSuccess ? (
                <div className="success-message">
                    Signup was successful! You can now log in with your new account.
                </div>
            ) : (
                <form onSubmit={handleSignUp}>
                    <h2>Sign Up</h2>
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
                    <label>Confirm Password:
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">Sign Up</button>
                </form>
            )}
        </div>
    );
}

export default SignUpForm;
