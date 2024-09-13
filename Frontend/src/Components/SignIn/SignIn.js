import { auth,googleProvider } from "../../firebase_config.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { ImageContainer, StyledButton, StyledImage, StyledInput, ImageButton, StyledBoldText, StyledLink, ErrorMessage, CheckboxContainer, StyledCheckbox, CheckboxText, StyledText, ResponsiveDiv, ResponsiveBackground } from "../Universal Styles/Universal.styles.js";
import logo from '../../Images/Logo.svg.svg';
import googleLogo from '../../Images/google.svg';

import { useNavigate } from "react-router";
import { collection,query,where,getDocs } from "firebase/firestore";
import { db } from "../../firebase_config.js";

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate=useNavigate();

    const signin = async () => {
        setErrorMessage("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // navigate('/createProfile');
            const user = auth.currentUser;
            if (user) {
                const userCollectionRef = collection(db, "Users"); // Replace with your collection name
                const q = query(userCollectionRef, where("userID", "==", user.uid));
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
            console.error(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            // navigate('/createProfile');
            const user = auth.currentUser;
            if (user) {
                const userCollectionRef = collection(db, "Users"); // Replace with your collection name
                const q = query(userCollectionRef, where("userID", "==", user.uid));
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
                    <StyledBoldText>Get started!</StyledBoldText>
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
            </ResponsiveDiv>
        </ResponsiveBackground>
    )
};