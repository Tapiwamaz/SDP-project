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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db, auth, storage } from "../../firebase_config.js";
import { v4 } from "uuid";

import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";

const Profile = () => {
  const storedUserData = localStorage.getItem("userData");
  const userData = storedUserData ? JSON.parse(storedUserData) : {};
  const UsersCollectionRef = collection(db, "Users");

  const [profileImage, setProfileImage] = useState(userData.imageURL || null);
  const fileInputRef = useRef(null);
  const [name, setName] = useState(userData.name || "");
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(userData.description);
  const navigate=useNavigate();

  // file input change to update profile image
  const editImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Update preview
      setImageFile(file); // Save the file for uploading
      console.log(imageUrl);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const onSaveProfile = async () => {
    let updatedImageURL = profileImage;

    if (imageFile) {
      try {
        // Upload the new profile image to storage
        const imageRef = ref(
          storage,
          `profileImages/${userData.user_id + v4()}`
        );
        await uploadBytes(imageRef, imageFile);
        updatedImageURL = await getDownloadURL(imageRef); // Get the new image URL after upload
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }
    updateDocumentByUserID(auth?.currentUser?.uid, {
      name: name,
      description: description,
      imageURL: updatedImageURL,
    });

    localStorage.setItem(
      "userData",
      JSON.stringify({
        name: name,
        description: description,
        imageURL: updatedImageURL,
        email: userData.email,
        user_id: auth?.currentUser?.uid,
        rating: 0,
      })
    );
    setIsEditing(false);
  };

  async function updateDocumentByUserID(userID, updateData) {
    // Reference to the collection
    const usersCollectionRef = collection(db, "Users");

    // Query for the document with the specific userID
    const q = query(
      usersCollectionRef,
      where("user_id", "==", auth?.currentUser?.uid)
    );

    try {
      // Execute the query
      const querySnapshot = await getDocs(q);

      // Check if a document exists
      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      // Assuming userID is unique and there's only one document
      const docRef = querySnapshot.docs[0].ref;

      // Update the document
      await updateDoc(docRef, updateData);

      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  // const handleImageChange = (event, setImageSrc, setImage, setImageError) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const img = new Image();
  //     img.src = URL.createObjectURL(file);
  //     img.onload = () => {
  //       URL.revokeObjectURL(img.src); // Clean up memory
  //     };
  //   } else {
  //     setImageError("Something went wrong uploading your picture");
  //   }
  // };

  //
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userData');
      navigate('/welcome');
    } catch (err) {
      console.error(err);
    }
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
                <button
                  onClick={() => onSaveProfile(auth?.currentUser?.uid)}
                  style={{ marginTop: "10px" }}
                >
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
          <ButtonWrapper onClick={logout}>
            <LeftSection >
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
