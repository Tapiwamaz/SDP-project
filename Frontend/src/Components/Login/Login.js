// import { auth, googleProvider } from "../../config/firebase.js"
import { auth,googleProvider ,db} from "../../firebase_config.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { ImageContainer, StyledButton, StyledImage, StyledInput, ImageButton, StyledBoldText, ClickableText, StyledLink, ErrorMessage , StyledText, ResponsiveBackground, ResponsiveDiv } from "../Universal Styles/Universal.styles.js";
import logo from '../../Images/Logo.svg.svg';
import googleLogo from '../../Images/google.svg';

import { query,where,getDocs,collection } from "firebase/firestore";

import { useNavigate } from "react-router";



export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate=useNavigate();


    const login = async () => {
        setErrorMessage("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
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
            console.log("Success");
        }
        catch (error) {
            console.error(error);
        }
    };

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
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
            // console.log(auth?.currentUser?.uid);

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
            <StyledInput type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <StyledInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
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
                <StyledText size="16px">Don't have an account? <StyledLink href="../SignIn/SignIn.js">Sign in</StyledLink></StyledText>
            </ImageContainer>
            
        </ResponsiveDiv>
        </ResponsiveBackground>
        
    )
};