import {auth} from "../../config/firebase.js"
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useState} from "react";


export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    return (
        <div>
            <text>Welcome Back!</text>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={logIn}>Log in</button>
        </div>
    )
};