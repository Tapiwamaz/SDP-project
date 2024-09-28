

import React, { useState, useRef } from "react";
import { auth } from "../../firebase_config.js";
import {
  ImageContainer,
  StyledButton,
  StyledImage,
  StyledInput,
  StyledBoldText,
  ResponsiveBackground,
  ResponsiveDiv,
  ErrorMessage
} from "../Universal Styles/Universal.styles.js";

import logo from "../../Images/Logo.svg.svg";

import { Field } from "./CreateProfile.styles.js";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

//firebase
import { db } from "../../firebase_config.js";
import { collection, addDoc,query,where,getDocs } from "firebase/firestore"; // Import Firestore methods

import { useNavigate } from "react-router";

export const CreateProfile = () => {

    const IDRandom=Math.random()*101;
    const avatarURL=`https://avatar.iran.liara.run/public/${IDRandom}`;
    const userEmail=auth?.currentUser?.email;
    const userID=auth?.currentUser?.uid
    console.log(userID);
    
    
  const [profileImage, setProfileImage] = useState(avatarURL); // State to store profile image, default is the logo
  const[name,setName]=useState(null);
  const[description,setDescription]=useState(null);
  const[error,setError]=useState("");


  const fileInputRef = useRef(null); // Ref to trigger file input
  const navigate=useNavigate();

  // // Function to handle image upload
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => setProfileImage(reader.result); // Set profile image to the uploaded one
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Function to trigger file input
  // const handleClick = () => {
  //   fileInputRef.current.click();
  // };

  const newAvatar=()=>{
    const IDRand=Math.random()*101;
    setProfileImage(`https://avatar.iran.liara.run/public/${IDRand}`);

  }

  const postUser = async () => {
    const userCollectionRef = collection(db, "Users"); // Replace with your collection name
    const q = query(userCollectionRef, where("user_id", "==", userID));
    const querySnapshot = await getDocs(q);
    if(name && description && profileImage && userEmail && userID && querySnapshot.empty){
      try {
        await addDoc(collection(db, "Users"), {
          name: name,
          description: description,
          imageURL: profileImage,
          email: userEmail,
          user_id: userID,
          rating:0
        });
        setError(null)
        localStorage.setItem("userData", JSON.stringify({name:name,description:description,imageURL:profileImage,email:userEmail,rating:0}));
        navigate('/')


        console.log("User added successfully!");
      } catch (error) {
        console.error("Error adding user: ", error);
      }

    }
    else{
      console.log("please enter");
      
      setError("Please enter fields")

    }
   
  };

  return (
    <ResponsiveBackground>
      <ResponsiveDiv>
      {/* <backgroundCard> */}

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
              // cursor: "pointer",
              objectFit: "cover", // Ensures the image fits within the circular frame
            }}
            // onClick={handleClick}
          />
          {/* Hidden File Input */}
          {/* <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the input
            accept="image/*" // Accept only image files
            onChange={handleImageChange} // Handle file selection
          /> */}
        </div>
        <button onClick={newAvatar} style={{display:"flex", alignItems:"center",gap:"2px",height:"24px",borderRadius:'10px'}}>
          <ArrowPathIcon style={{
            height:"20px"
          }}/>
          <p> Generate new avatar</p>
          </button>
        {/* <p>Click profile image to change it</p> */}


        {/* Input Fields */}
        <Field>
            <h4> Nickname</h4>
            <StyledInput type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} />

        </Field>

        <Field>

       
        <h4> Description</h4>

        <StyledInput type="text" placeholder="Tell us about yourself!" className="bottom" onChange={(e)=>setDescription(e.target.value)}/>
        </Field>
        <ErrorMessage>{error}</ErrorMessage>

        <StyledButton style={{marginBottom:"20px"}} onClick={postUser}>Go to events</StyledButton>

      </ResponsiveDiv>
      {/* </backgroundCard> */}

    </ResponsiveBackground>
  );
};
