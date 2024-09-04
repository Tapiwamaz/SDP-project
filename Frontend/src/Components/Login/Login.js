import { auth } from "../../config/firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { ImageContainer, StyledButton, StyledImage, StyledInput, ImageButton, StyledBoldText, ClickableText, StyledLink, ErrorMessage , StyledText } from "../Universal Styles/Universal.styles.js";
import logo from '../../Images/Logo.svg.svg';
import googleLogo from '../../Images/google.svg';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = async () => {
        setErrorMessage("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            console.error(error);
        }
    };

    const signInWithGoogle = async () => {
    };

    return (
        <div>
            <ImageContainer>
                <StyledImage src={logo} alt="Logo" />
            </ImageContainer>
            <ImageContainer>
                <StyledBoldText>Welcome Back!</StyledBoldText>
            </ImageContainer>
            <StyledInput type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <StyledInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <ClickableText><StyledLink href="www.google.com">Forgot password?</StyledLink></ClickableText>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <StyledButton onClick={login}>Login</StyledButton>
            <ImageContainer>
                <StyledText>_______OR_______</StyledText>
            </ImageContainer>
            <ImageContainer>
                <StyledText size="16px">Login with</StyledText>
            </ImageContainer>
            <ImageContainer>
            <ImageButton >
                <img src={googleLogo} alt="Google" />
            </ImageButton>
            </ImageContainer>
            <ImageContainer>
                <StyledText size="16px">Don't have an account? <StyledLink>Sign in</StyledLink></StyledText>
            </ImageContainer>
            
        </div>
    )
};