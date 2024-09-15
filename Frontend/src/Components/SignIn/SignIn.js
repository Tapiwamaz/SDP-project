import { auth, googleProvider, db } from "../../config/firebase.js"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { docRef, doc, collection, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ImageContainer, StyledButton, StyledImage, StyledInput, ImageButton, StyledBoldText, StyledLink, ErrorMessage, CheckboxContainer, StyledCheckbox, CheckboxText, StyledText, ResponsiveDiv, ResponsiveBackground } from "../Universal Styles/Universal.styles.js";
import logo from '../../Images/Logo.svg.svg';
import googleLogo from '../../Images/google.svg';

export const SignIn = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    var checkbox = document.getElementById("checkbox");

    const signin = async () => {
        setErrorMessage("");
        if (name === "" || email === "" || password === "") {
            setErrorMessage("Please fill in all fields");
            return;
        }
        if (!checkbox.checked) {
            setErrorMessage("Please agree to the Terms and Conditions");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            try {
                const docRef = doc(db, "Users", user.uid);
                await setDoc(docRef, {
                    name: name,
                    email: email
                  });
            }
            catch (error) {
                console.error(error);
            }
        }
        catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
                setErrorMessage('Password too weak');
            }
            if (errorCode === 'auth/email-already-in-use') {
                setErrorMessage('Email address already in use');
            }
            if (errorCode === 'auth/invalid-email') {
                setErrorMessage('Email address is invalid');
            }
            else {
                setErrorMessage(errorMessage);
            }
            console.error(error);
        }
    };

    const signInWithGoogle = async () => {
        setErrorMessage("");
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            try {
                const docRef = doc(db, "Users", user.uid);
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email
                  });
            }
            catch (error) {
                console.error(error);
            }
        }
        catch (error) {
            setErrorMessage(error.message);
            console.error(error);
        }
    };

    return (
        <ResponsiveBackground>
            <ResponsiveDiv>
                <ImageContainer>
                    <StyledImage src={logo} alt="Logo" />
                </ImageContainer>
                <ImageContainer>
                    <StyledBoldText>Let's get you started!</StyledBoldText>
                </ImageContainer>
                <StyledInput type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <StyledInput type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <StyledInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <CheckboxContainer>
                    <StyledCheckbox id="checkbox"/>
                    <CheckboxText>I agree to the <StyledLink>Terms and Conditions</StyledLink></CheckboxText>
                </CheckboxContainer>
                <ErrorMessage>{errorMessage}</ErrorMessage>
                <StyledButton onClick={signin}>Sign Up</StyledButton>
                
                <ImageContainer>
                    <StyledText>__________OR__________</StyledText>
                </ImageContainer>
                <ImageContainer>
                    <StyledText size="16px">Sign up with</StyledText>
                </ImageContainer>
                <ImageContainer>
                <ImageButton onClick={signInWithGoogle}>
                    <img src={googleLogo} alt="Google" />
                </ImageButton>
                </ImageContainer>
            </ResponsiveDiv>
        </ResponsiveBackground>
    )
};