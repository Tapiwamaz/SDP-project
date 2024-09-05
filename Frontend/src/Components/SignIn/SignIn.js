import { auth, googleProvider } from "../../config/firebase.js"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { ImageContainer, StyledButton, StyledImage, StyledInput, ImageButton, StyledBoldText, ClickableText, StyledLink, ErrorMessage, CheckboxContainer, StyledCheckbox, CheckboxText, StyledText } from "../Universal Styles/Universal.styles.js";
import logo from '../../Images/Logo.svg.svg';
import googleLogo from '../../Images/google.svg';

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("User with this email already exists");

    const signin = async () => {
        setErrorMessage("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            console.error(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <ImageContainer>
                <StyledImage src={logo} alt="Logo" />
            </ImageContainer>
            <ImageContainer>
                <StyledBoldText>Welcome Back!</StyledBoldText>
            </ImageContainer>
            <StyledInput type="email" placeholder="Name" onChange={(e) => setEmail(e.target.value)} />
            <StyledInput type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <StyledInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <CheckboxContainer>
                <StyledCheckbox />
                <CheckboxText>I agree to the <StyledLink>Terms and Conditions</StyledLink></CheckboxText>
            </CheckboxContainer>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <StyledButton onClick={signin}>Sign in</StyledButton>
            
            <ImageContainer>
                <StyledText>__________OR__________</StyledText>
            </ImageContainer>
            <ImageContainer>
                <StyledText size="16px">Sign in with</StyledText>
            </ImageContainer>
            <ImageContainer>
            <ImageButton onClick={signInWithGoogle}>
                <img src={googleLogo} alt="Google" />
            </ImageButton>
            </ImageContainer>
        </div>
    )
};