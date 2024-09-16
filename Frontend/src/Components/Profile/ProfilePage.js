import React, { useState, useEffect, useRef } from "react";
import {
  Wrapper,
  ProfileImage,
  Summary,
  EventsGrp,
  Count,
  Text,
  Rating,
  Details,
  Email,
  About,
  ButtonWrapper,
  LeftSection,
  ButtonGrp,
  Numbers,
} from "./ProfilePage.styles";
import profileimg from "../../Images/profileimg.jpg";
import {
  StarIcon,
  BellIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowRightIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Header from "../Header/Header";

const Profile = () => {
  const storedUserData = localStorage.getItem("userData");
  const userData = storedUserData ? JSON.parse(storedUserData) : {};

  // State to store the selected image or fallback to user's current image
  const [profileImage, setProfileImage] = useState(userData.imageURL || null);
  const fileInputRef = useRef(null); // Reference to hidden file input
  const [name, setName] = useState(userData.name || ""); // Store name

  // Handle file input change to update profile image
  const editImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      console.log(imageUrl); // Set the new image in state
    }
  };

  // Trigger the hidden file input when the image is clicked

  const handleFileInputClick = () => {
    fileInputRef.current.click(); // Programmatically click the file input
  };

  const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit mode
  const [description, setDescription] = useState(userData.description); // To store the updated description

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSaveClick = () => {
    setIsEditing(false); // Disable editing mode and save changes
    // You can also add logic here to save the updated description (e.g., send it to an API)
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Update description state on change
  };

  return (
    <>
      <Wrapper>
        <Summary>
          <ProfileImage
            src={profileImage}
            alt="Profile"
            style={{ cursor: isEditing ? "pointer" : "default" }}
            onClick={isEditing ? () => fileInputRef.current.click() : null} // Trigger image upload only in edit mode
          />

          {/* Conditionally show file input when editing */}
          {isEditing && (
            <div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={editImage}
                style={{ display: "none" }}
              />
              <p
                onClick={handleFileInputClick}
                style={{
                  cursor: "pointer",
                  color: "blue",
                }}
              >
                Edit picture
              </p>
            </div>
          )}
        </Summary>

        <Numbers>
          {/* Name Field */}
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ fontSize: "20px", marginBottom: "10px" }}
            />
          ) : (
            <h2>{name}</h2>
          )}

          <Rating>
            <StarIcon style={{ height: "3vh", width: "3vw", color: "black" }} />
            <h4 style={{ color: "#676363" }}>{userData.rating}</h4>
          </Rating>
          <Count>
            <EventsGrp>
              <h3>26</h3>
              <h3>Events Done</h3>
            </EventsGrp>

            <EventsGrp>
              <h3>26</h3>
              <h3>Events Attended</h3>
            </EventsGrp>
          </Count>
        </Numbers>
        <Details>
          <Email>
            <h4>Email</h4>
            <h4 style={{ color: "#676363" }}>{userData.email}</h4>
          </Email>
          <About>
            <h4>About</h4>
            {isEditing ? (
              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  style={{
                    width: "100%",
                    fontSize: "12px",
                    marginBottom: "10px",
                  }}
                />
                <button onClick={handleSaveClick} style={{ marginTop: "10px" }}>
                  Save
                </button>
              </div>
            ) : (
              <h4 style={{ color: "#676363" }}>
                {description || "Click to add a description"}
              </h4>
            )}
          </About>
        </Details>
        <ButtonGrp>
          <ButtonWrapper>
            <LeftSection>
              <BellIcon
                style={{ height: "27px", width: " 22px", color: "black" }}
              />

              <Text>Notifications</Text>
            </LeftSection>
            <ArrowRightIcon
              style={{ height: "27px", width: " 22px", color: "black" }}
            />
          </ButtonWrapper>

          <ButtonWrapper>
            <LeftSection onClick={handleEditClick}>
              <PencilIcon
                style={{ height: "27px", width: "22px", color: "black" }}
              >
                {/* <LogoutIcon /> */}
              </PencilIcon>

              <Text>Edit Profile</Text>
            </LeftSection>
            <ArrowRightIcon
              style={{ height: "27px", width: " 22px", color: "black" }}
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <LeftSection>
              <ArrowRightStartOnRectangleIcon
                style={{ height: "27px", width: "22px", color: "black" }}
                isLogout={true}
              >
                {/* <LogoutIcon /> */}
              </ArrowRightStartOnRectangleIcon>

              <Text isLogout={true}>Log Out</Text>
            </LeftSection>
            <ArrowRightIcon
              style={{ height: "27px", width: " 22px", color: "black" }}
            />
          </ButtonWrapper>
        </ButtonGrp>
      </Wrapper>
    </>
  );
};

export default Profile;
