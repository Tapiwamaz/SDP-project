import React, { useState, useEffect, useRef } from "react";
import {
  Page,
  ProfileImage,
  PictureWrapper,
  CountWrapper,
  Count,
  Text,
  Rating,
  Details,
  Email,
  About,
  ButtonWrapper,
  LeftSection,
  ButtonGrp,
  Stats,
  Contents,
  NavigationSection,
} from "./ProfilePage.styles";
import { EventRight } from "../HomePage/HomePage.styles.js";
import { Xicon } from "../Header/Header.styles.js";
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
import Notifications from "../Notifications/Notifications.js";

export const Profile = () => {
  const storedUserData = localStorage.getItem("userData");
  const userData = storedUserData ? JSON.parse(storedUserData) : {};

  const [profileImage, setProfileImage] = useState(userData.imageURL || null);
  const fileInputRef = useRef(null);
  const [name, setName] = useState(userData.name || "");
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(userData.description);
  const [ticketCount, setTicketCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  const [displayRight, setDisplayRight] = useState(false);

  const [screen, setScreen] = useState(null);
  const navigate = useNavigate();

  const updateSlidePercentage = () => {
    const screenWidth = window.innerWidth; // Get the current screen width

    if (screenWidth <= 768) {
      // If the screen width is 768px or less, it's a phone
      setScreen("phone");
    } else {
      // Default for larger screens
      setScreen("desktop");
    }
  };
  useEffect(() => {
    // Call updateSlidePercentage on mount and window resize
    updateSlidePercentage(); // Initial call
    window.addEventListener("resize", updateSlidePercentage);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateSlidePercentage);
  }, []);
  // file input change to update profile image
  const editImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Update preview
      setImageFile(file); // Save the file for uploading
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
        return;
      }

      // Assuming userID is unique and there's only one document
      const docRef = querySnapshot.docs[0].ref;

      // Update the document
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  // Async function to count the number of entries by user ID
  const countEntriesByUser = async (userId) => {
    try {
      const today = new Date();
      const q = query(
        collection(db, "Tickets"),
        where("user_id", "==", userId),
        where("date", ">", today)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.size; // Return the count of user entries
    } catch (error) {
      console.error("Error fetching entry count:", error);
      return 0;
    }
  };

  // Fetch the count when the component mounts
  useEffect(() => {
    const fetchCount = async () => {
      if (auth?.currentUser?.uid) {
        const count = await countEntriesByUser(auth?.currentUser?.uid);
        setTicketCount(count); // Update the entry count state
      }
    };

    fetchCount();
  }, []);

  const countEventsByUser = async (userId) => {
    try {
      const q = query(
        collection(db, "Events"),
        where("user_id", "==", userId),
        where("status", "==", "approved")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.size; // Return the count of user entries
    } catch (error) {
      console.error("Error fetching entry count:", error);
      return 0;
    }
  };

  // Fetch the count when the component mounts
  useEffect(() => {
    const fetchCount = async () => {
      if (auth?.currentUser?.uid) {
        const count = await countEventsByUser(auth?.currentUser?.uid);
        setEventCount(count); // Update the entry count state
      }
    };

    fetchCount();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      navigate("/welcome");
    } catch (err) {
      console.error(err);
    }
  };

  const eventRightRef = useRef(null);

  // Function to handle closing when clicking outside
  const handleClickOutside = (e) => {
    if (eventRightRef.current && !eventRightRef.current.contains(e.target)) {
      setDisplayRight(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {screen === "phone" && <Header />}
      <Page>
        <Contents>
          <PictureWrapper>
            <ProfileImage
              src={profileImage}
              alt="Profile"
              style={{ cursor: isEditing ? "pointer" : "default" }}
              onClick={isEditing ? () => fileInputRef.current.click() : null} // Trigger image upload only in edit mode
            />

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
                    color: "#18336C",
                    fontSize: screen === "phone" ? "1.2rem" : "1.5rem",
                  }}
                >
                  Edit picture
                </p>
              </div>
            )}
          </PictureWrapper>

          <Stats>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ fontSize: "20px", marginBottom: "10px" }}
              />
            ) : (
              <h2 style={{ color: "#18336C" }}>{name}</h2>
            )}

            <Rating>
              <StarIcon
                style={{
                  height: screen === "phone" ? "6vw" : "3vw",
                  width: screen === "phone" ? "6vh" : "3vh",
                  color: "#eaaf41",
                }}
              />
              <h4 style={{ color: "#676363" }}>{Math.ceil(userData.rating)}</h4>
            </Rating>
            <Count>
              <CountWrapper>
                <h3>{eventCount}</h3>
                <h3 style={{ color: "#18336C" }}>Events Done</h3>
              </CountWrapper>

              <CountWrapper>
                <h3>{ticketCount}</h3>
                <h3 style={{ color: "#18336C" }}>Events Attended</h3>
              </CountWrapper>
            </Count>
          </Stats>
          <Details>
            <Email>
              <h4 style={{ color: "#18336C" }}>Email</h4>
              <h4 style={{ color: "#676363" }}>{userData.email}</h4>
            </Email>
            <About>
              <h4 style={{ color: "#18336C" }}>About</h4>
              {isEditing ? (
                <div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                    style={{
                      width: "95%",
                      fontFamily: "Khula",
                      marginBottom: "10px",
                    }}
                  />
                  <button
                    onClick={() => onSaveProfile(auth?.currentUser?.uid)}
                    style={{
                      marginTop: "10px",
                      borderRadius: "1.35rem",
                      width: "auto",
                      height: screen === "phone" ? "40px" : "30px", // Larger height on phones
                    }}
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
          <NavigationSection>
            <ButtonGrp>
              <ButtonWrapper
                onClick={() =>
                  screen === "desktop"
                    ? setDisplayRight(true)
                    : navigate("/notifications")
                }
              >
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

              <ButtonWrapper onClick={handleEditClick}>
                <LeftSection>
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
          </NavigationSection>
        </Contents>
      </Page>
      {displayRight && (
        <>
          <EventRight ref={eventRightRef}>
            <Notifications></Notifications>
          </EventRight>
        </>
      )}
    </>
  );
};

export default Profile;
