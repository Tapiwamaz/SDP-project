import { ImageContainer, StyledImage, StyledBoldText, StyledText, StyledButton, ResponsiveDiv, ResponsiveBackground } from "../Universal Styles/Universal.styles.js";
import logo from '../../Images/Logo.svg.svg';
import { useNavigate } from "react-router";

export const Welcome = () => {
    const navigate = useNavigate();
    const sign=()=>{
        navigate('/signIn');
    }
    const login=()=>{
        navigate('/logIn');
    }

    return (
        <ResponsiveBackground>
            <ResponsiveDiv>
                <ImageContainer>
                    <StyledImage src={logo} alt="Logo" />
                </ImageContainer>
                <ImageContainer>
                    <StyledBoldText>Let's get you started!</StyledBoldText>
                </ImageContainer>
                <ImageContainer>
                    <StyledText size="16px">To continue please</StyledText>
                </ImageContainer>
                <StyledButton onClick={sign}>Sign up</StyledButton>
                <ImageContainer>
                    <StyledText>__________OR__________</StyledText>
                </ImageContainer>
                <StyledButton onClick={login}>Login</StyledButton>
                <ImageContainer></ImageContainer>
            </ResponsiveDiv>
        </ResponsiveBackground>
    )
}