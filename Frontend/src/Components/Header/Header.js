import { HeaderContainer, ImageButton, Title } from "./Header.styles";
import search from "../../Images/search.svg";
import arrow from "../../Images/arrow.svg";

export const Header = () => {

    return (
        <HeaderContainer>
            <ImageButton>
                <img src={arrow} alt="Back" />
            </ImageButton>
            <Title>My Bookings</Title>
            <ImageButton>
                <img src={search} alt="Search" />
            </ImageButton>
        </HeaderContainer>
    );
}