import { Form } from "formik";
import React,{ useState} from "react";

function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");

    const handleSignUp = (e) => {
        e.preventDefault();

    };

    return (
        <form onSubmit={handleSignUp}>
        <h2> Sign Up</h2>
        <label>Email:
            <input type ="email" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUpForm;
