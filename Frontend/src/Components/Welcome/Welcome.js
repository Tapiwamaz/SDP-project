import { ImageContainer, StyledImage, StyledBoldText, StyledText, StyledButton, ResponsiveDiv, ResponsiveBackground } from "../Universal Styles/Universal.styles.js";
import logo from '../../Images/Logo.svg.svg';

export const Welcome = () => {
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
                <StyledButton>Sign in</StyledButton>
                <ImageContainer>
                    <StyledText>__________OR__________</StyledText>
                </ImageContainer>
                <StyledButton>Login</StyledButton>
                <ImageContainer></ImageContainer>
            </ResponsiveDiv>
        </ResponsiveBackground>
    )
}