import { useState } from "react";
import { HeaderContainer, ImageButton, Title, SearchInput } from "./Header.styles";
import search from "../../Images/search.svg";
import arrow from "../../Images/arrow.svg";

export const Header = () => {

    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleSearchClick = () => {
        setIsSearchActive(true);
    }


    return (
        <HeaderContainer>
            <ImageButton>
                <img src={arrow} alt="Back" />
            </ImageButton>
            <Title>My Bookings</Title>
            {isSearchActive ? (
            <SearchInput type="text" placeholder="Search..." autoFocus  onBlur={() => {setIsSearchActive(false);}}/>
            ) : (
            <ImageButton onClick={handleSearchClick}>
            <img src={search} alt="Search" />
            </ImageButton>
            )}
        </HeaderContainer>
    );
}