import React, { useState } from "react";

function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");

    const handleSignIn = (e) => {
        e.preventDefault();

    };

    return (
        <form onSubmit={handleSignIn}>
        <h2> Sign In</h2>
        <label>Email:
            <input type ="email" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Sign In</button>
        </form>
    );
}

export default SignInForm;