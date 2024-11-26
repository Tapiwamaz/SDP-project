import { auth, googleProvider, db } from "../../firebase_config.js"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { docRef, doc, collection, setDoc,query,where,getDocs } from "firebase/firestore";
import { useState } from "react";
import { ImageContainer, StyledButton, StyledImage, StyledP, InputWrapper, StyledInput, ImageButton, EyeIcon, StyledBoldText, StyledLink, ErrorMessage, CheckboxContainer, StyledCheckbox, CheckboxText, StyledText, ResponsiveDiv, ResponsiveBackground } from "../Universal Styles/Universal.styles.js";
import logo from '../../Images/Logo.svg.svg';
import googleLogo from '../../Images/google.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useNavigate } from "react-router";

export const SignIn = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);
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
                        
                        //console.log("User data stored in local storage:", userData);
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
                        
                        //console.log("User data stored in local storage:", userData);
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
                    <StyledBoldText>Let's get you started!</StyledBoldText>
                </ImageContainer>
                <StyledP>
                    <input style={{width: '100%', height: '100%', border: 'none', outline: 'none'}} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                </StyledP>
                <StyledP>
                    <input style={{width: '100%', height: '100%', border: 'none', outline: 'none'}} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </StyledP>
                <StyledP>
                <input style={{width: '100%', height: '100%', border: 'none', outline: 'none', marginRight: '40px'}} type={visible?"text":"password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <div onClick={() => setVisible(!visible)}>
                    {visible ? <FaEyeSlash /> : <FaEye />}
                </div>
                </StyledP>
                <CheckboxContainer>
                    <StyledCheckbox id="checkbox"/>
                    <CheckboxText>I agree to the <StyledLink href='./TandC.html' target="_blank">Terms and Conditions</StyledLink></CheckboxText>
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