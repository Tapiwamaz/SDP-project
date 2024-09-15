import { auth, googleProvider } from "../../firebase_config.js"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { ImageContainer, StyledButton, StyledImage, StyledInput, ImageButton, StyledBoldText, ClickableText, StyledLink, ErrorMessage , StyledText, ResponsiveBackground, ResponsiveDiv } from "../Universal Styles/Universal.styles.js";
import logo from '../../Images/Logo.svg.svg';
import googleLogo from '../../Images/google.svg';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    var emailInput = document.getElementById("emailInput");
    var passwordInput = document.getElementById("passwordInput");

    const login = async () => {
        setErrorMessage("");
        if (email === "" || password === "") {
            setErrorMessage("Please fill in all fields");
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Success");
        }
        catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                passwordInput.value = "";
                setErrorMessage('Incorrect password');
            }
            if (errorCode === 'auth/user-not-found') {
                emailInput.value = "";
                passwordInput.value = "";
                setErrorMessage('User not found');
            }
            if (errorCode === 'auth/invalid-email') {
                emailInput.value = "";
                passwordInput.value = "";
                setErrorMessage('Invalid email address');
            }
            else {
                setErrorMessage(errorMessage);
            }
            console.error(error);
        }
    };

    const loginWithGoogle = async () => {
        setErrorMessage("");
        try {
            await signInWithPopup(auth, googleProvider);
        }
        catch (error) {
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
                <StyledBoldText>Welcome Back!</StyledBoldText>
            </ImageContainer>
            <StyledInput id="emailInput" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <StyledInput id="passwordInput" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <ClickableText><StyledLink href="www.google.com">Forgot password?</StyledLink></ClickableText>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <StyledButton onClick={login}>Login</StyledButton>
            <ImageContainer>
                <StyledText>__________OR__________</StyledText>
            </ImageContainer>
            <ImageContainer>
                <StyledText size="16px">Login with</StyledText>
            </ImageContainer>
            <ImageContainer>
            <ImageButton onClick={loginWithGoogle}>
                <img src={googleLogo} alt="Google" />
            </ImageButton>
            </ImageContainer>
            <ImageContainer>
                <StyledText size="16px">Don't have an account? <StyledLink href="../SignIn/SignIn.js">Sign up</StyledLink></StyledText>
            </ImageContainer>
            
        </ResponsiveDiv>
        </ResponsiveBackground>
        
    )
};