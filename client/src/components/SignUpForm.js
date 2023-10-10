import { Form } from "formik";
import React,{ useState} from "react";

function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");


    const handleSignUp = (e) => {
        e.preventDefault();

    };

    return (
        <form onSubmit={handleSignUp}>
        <h2> Sign Up</h2>
        <label>Email:
            <input type ="email" 
            placeholder="Enter email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
        />
        </label>Password:
            <input type ="password" 
            placeholder="Enter password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            />
        <label>Confirm Password:
            <input type ="password" 
            placeholder="Confirm password"
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            />
        </label>
        <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUpForm;
