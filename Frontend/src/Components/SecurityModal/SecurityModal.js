import React, { useState, useRef } from "react";
import Confetti from "react-confetti";

import {
  ArrowLeftCircleIcon,
  CameraIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  DropFileContainer,
  ImagePreview,
  FileInput,
  UploadMediaLabel,
  IconsMediaUpload,
  DescriptionInput,
  ModalFooter,
  CancelButton,
  ImageWrapper,
  ConfirmButton,
  Loader,
  Message,
  EmergencyInfo, // Add a styled component for emergency information
} from "./SecurityModal.styles"; // Import your styled components

const SecurityModal = ({ event, onClose }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(""); // "success" or "error"
  const eventPictureRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    const data = {
      description,
      image,
      building_name: event.location,
      timestamp: new Date().toISOString(),
      status: "pending",
      id: event.id,
    };

    try {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      setSubmissionStatus("error");
    } finally {
      setLoading(false); // Stop loader
    }
    setSubmissionStatus("success");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width > img.height) {
          setImage(file);
          setImageError(null);

          const reader = new FileReader();
          reader.onloadend = () => {
            setImgSrc(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setImageError("Please upload a landscape image.");
          setImage(null);
        }
        URL.revokeObjectURL(img.src);
      };
    } else {
      setImageError("Something went wrong uploading your picture.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Report an Incident</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        {loading ? (
          // Show loader while submitting
          <Loader>Submitting...</Loader>
        ) : submissionStatus ? (
          // Show message after submission
          <>
            <Message status={submissionStatus}>
              {submissionStatus === "success" ? (
                <ul>
                  <li>Incident reported successfully!</li>
                  <li>Notification sent to security.</li>
                  <li>Admin alerted.</li>
                </ul>
              ) : (
                "Failed to report the incident. Please try again."
              )}
            </Message>
            {submissionStatus === "success" && <Confetti />}
            <EmergencyInfo>
              <h4>Emergency Services Contact Information</h4>
              <p>📞 Emergency Hotline: 911</p>
              <p>🚓 Local Police: 123-456-7890</p>
              <p>🚑 Ambulance Service: 098-765-4321</p>
              <p>📱 Security Office: 555-555-5555</p>
            </EmergencyInfo>
          </>
        ) : (
          // Render form content when not loading or after a submission attempt
          <>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "45%",
                borderRadius: "10px",
              }}
            >
              <ImageWrapper>
                {imgSrc && <ImagePreview src={imgSrc} alt="Uploaded preview" />}
                <DropFileContainer hasImage={!!imgSrc}>
                  <FileInput
                    id="security-file-upload"
                    type="file"
                    accept="image/*"
                    ref={eventPictureRef}
                    onChange={handleImageChange}
                    data-testid="file-input"
                  />
                  <UploadMediaLabel htmlFor="security-file-upload">
                    <IconsMediaUpload>
                      <CameraIcon width={30} />
                      <div id="dividerLine" />
                      <VideoCameraIcon width={30} />
                    </IconsMediaUpload>
                    <strong>
                      Please upload an image related to the incident{" "}
                    </strong>
                    {imageError && (
                      <strong style={{ color: "red" }}>{imageError}</strong>
                    )}
                  </UploadMediaLabel>
                </DropFileContainer>
              </ImageWrapper>
            </div>

            <DescriptionInput
              placeholder="Please give a detail description of the incident"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <ModalFooter>
              <CancelButton onClick={onClose}>Cancel</CancelButton>
              <ConfirmButton
                onClick={handleSubmit}
                disabled={!description} // Disable button if no description or image
              >
                Confirm
              </ConfirmButton>
            </ModalFooter>
          </>
        )}

        {/* Emergency Services Information */}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SecurityModal;
