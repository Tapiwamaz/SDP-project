

import React, { useState, useRef } from "react";
import { auth } from "../../firebase_config.js";
import {
  ImageContainer,
  StyledButton,
  StyledImage,
  StyledInput,
  ImageButton,
  StyledBoldText,
  ClickableText,
  StyledLink,
  ErrorMessage,
  StyledText,
  ResponsiveBackground,
  ResponsiveDiv,
} from "../Universal Styles/Universal.styles.js";
import logo from "../../Images/Logo.svg.svg";
import googleLogo from "../../Images/google.svg";

import { Field } from "./CreateProfile.styles.js";

export const CreateProfile = () => {

    const IDRandom=Math.random()*101;
    const avatarURL=`https://avatar.iran.liara.run/public/${IDRandom}`;
    const userEmail=auth?.currentUser?.email;
    const userID=auth?.currentUser?.uid
    console.log(userEmail);
    
  const [profileImage, setProfileImage] = useState(avatarURL); // State to store profile image, default is the logo
  const fileInputRef = useRef(null); // Ref to trigger file input

  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result); // Set profile image to the uploaded one
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger file input
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <ResponsiveBackground>
      <ResponsiveDiv>
        <ImageContainer>
          <StyledImage src={logo} alt="Logo" />
        </ImageContainer>
        {/* <ImageContainer> */}
          <StyledBoldText>Create Profile!</StyledBoldText>
        {/* </ImageContainer> */}
        
        {/* Circular Image for Profile */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <StyledImage
            src={profileImage}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              cursor: "pointer",
              objectFit: "cover", // Ensures the image fits within the circular frame
            }}
            onClick={handleClick}
          />
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the input
            accept="image/*" // Accept only image files
            onChange={handleImageChange} // Handle file selection
          />
        </div>
        <p>Click profile image to change it</p>


        {/* Input Fields */}
        <Field>
            <h4> Nickname</h4>
            <StyledInput type="text" placeholder="Name" />

        </Field>

        <Field>

       
        <h4> Description</h4>

        <StyledInput type="text" placeholder="Tell us about yourself!" className="bottom" />
        </Field>

        <StyledButton style={{marginBottom:"20px"}}>Go to events</StyledButton>

      </ResponsiveDiv>
    </ResponsiveBackground>
  );
};
