import { auth, googleProvider, db } from "../../firebase_config.js"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { docRef, doc, collection, setDoc,query,where,getDocs } from "firebase/firestore";
import { useState } from "react";
import { ImageContainer, StyledButton, StyledImage, StyledInput, ImageButton, StyledBoldText, StyledLink, ErrorMessage, CheckboxContainer, StyledCheckbox, CheckboxText, StyledText, ResponsiveDiv, ResponsiveBackground } from "../Universal Styles/Universal.styles.js";
import logo from '../../Images/Logo.svg.svg';
import googleLogo from '../../Images/google.svg';

import { useNavigate } from "react-router";

export const SignIn = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    var checkbox = document.getElementById("checkbox");
    const navigate=useNavigate();


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
            await createUserWithEmailAndPassword(auth, email, password);
            // navigate('/createProfile');
            const user = auth.currentUser;
            if (user) {
                const userCollectionRef = collection(db, "Users"); // Replace with your collection name
                const q = query(userCollectionRef, where("user_id", "==", user.uid));
                const querySnapshot = await getDocs(q);
              
                if (!querySnapshot.empty) {//user is already there
                    querySnapshot.forEach((doc) => {
                        const userData = doc.data();
                        
                        localStorage.setItem("userData", JSON.stringify(userData));
                        
                        console.log("User data stored in local storage:", userData);
                      }); 
                    navigate('/')

                }
                else{
                    navigate('/createProfile')

                }

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
            await signInWithPopup(auth, googleProvider);
            // navigate('/createProfile');
            const user = auth.currentUser;
            if (user) {
                const userCollectionRef = collection(db, "Users"); // Replace with your collection name
                const q = query(userCollectionRef, where("user_id", "==", user.uid));
                const querySnapshot = await getDocs(q);
                           
              
                if (!querySnapshot.empty) {//user is already there
                    querySnapshot.forEach((doc) => {
                        const userData = doc.data();
                        
                        localStorage.setItem("userData", JSON.stringify(userData));
                        
                        console.log("User data stored in local storage:", userData);
                      });   
                    navigate('/')


                }
                else{
                    navigate('/createProfile')

                }

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