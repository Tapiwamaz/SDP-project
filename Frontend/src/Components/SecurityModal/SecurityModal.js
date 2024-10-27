import React, { useState } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  DescriptionInput,
  FlexContainer,
  Select,
  Label,
  ModalFooter,
  CancelButton,
  ConfirmButton,
  Loader,
  Message,
  EmergencyInfo,
} from "./SecurityModal.styles"; // Import styled components

const incidentOptions = ["fire", "security", "medical", "weather", "natural"];
const locationOptions = [
  "2nd+ Year Parking",
  "Amphitheatre",
  "Barnato Hall",
  "Bernard Price Building",
  "Bidvest Stadium",
  "Bozzoli Sports Pavilion",
  "Convocation Dining Hall",
  "DJ Du Plessis Centre",
  "Dalrymple House",
  "David Webster Hall of Residence",
  "Dig Fields",
  "East Campus Basketball Court",
  "Emthongeni Community Centre",
  "Faculty of Commerce, Law and Management CLM Building",
  "First National Bank Building",
  "Flower Hall",
  "Geosciences Building",
  "Hillman Building",
  "Hofmeyr House",
  "International House Residence",
  "Jan Smuts House",
  "John Moffat",
  "Mens Halls Of Residence",
  "New Commerce Building",
  "North West Engineering Building",
  "Old Mutual Sports Hall",
  "Oliver Schreiner School of Law",
  "Olives and Plates Wits Club",
  "Oppenheimer Life Sciences",
  "Origins Centre",
  "Palaeoscience Centre",
  "Post Graduate Club",
  "Robert Sobukwe Block",
  "Schonland Research Centre",
  "Schonland Research and Workshops",
  "Solomon Mahlangu House",
  "South-West Engineering",
  "Sturrock Park",
  "Sunnyside Residence",
  "TW Kambule Mathematical Sciences Building",
  "The Chamber of Mines Building",
  "The Matrix",
  "The Nunnery",
  "The Old Grandstand",
  "The Sanctuary",
  "Umthombo Building",
  "Walter Milton Oval",
  "Wartenweiler Library",
  "West Campus Village",
  "Wits Anglo American Digital Dome",
  "Wits Biology Building",
  "Wits CCDU",
  "Wits CLTD",
  "Wits Chalsty Centre",
  "Wits Chris Seabrooke Music Hall",
  "Wits College House",
  "Wits Commerce Library",
  "Wits Digital Arts Division",
  "Wits First Year Parking",
  "Wits Gate House",
  "Wits GoldFields Laboratories",
  "Wits Great Hall",
  "Wits Hall 29",
  "Wits Humphrey Raikes",
  "Wits Judo Hall",
  "Wits Language School",
  "Wits Law Clinic",
  "Wits Law Lawns",
  "Wits Library Lawns",
  "Wits Main Dining Hall",
  "Wits Musallah",
  "Wits Physics Building",
  "Wits Plus",
  "Wits Richard Ward Building",
  "Wits Rugby Stadium",
  "Wits School Of Arts",
  "Wits School of Construction Economics and Management",
  "Wits Science Stadium",
  "Wits Squash Courts",
  "Wits Swimming Pool",
  "Wits Theatre",
  "Wits Tower of Light",
  "Wits University Corner",
  "Wits University Jubilee Hall",
  "iThemba LABS",
];

const SecurityModal = ({ event, onClose }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a FormData object
    const formData = new FormData();
    formData.append("description", description);
    formData.append("building_name", location);
    formData.append("type", incidentType);
    formData.append("photo", null);
    try {
      const response = await fetch(
        "https://campussafetyapp.azurewebsites.net/incidents/report-incidents-external",
        {
          method: "POST",
          body: formData, // Send the FormData
        }
      );

      if (response.ok) {
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
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
          <Loader />
        ) : submissionStatus ? (
          <>
            <Message status={submissionStatus}>
              {submissionStatus === "success" ? (
                <p>
                  The WITS security team has received this report and will act
                  on it as soon as possible. Below are details for emergency
                  services if required immediately.
                </p>
              ) : (
                <p>
                  Failed to report the incident. Please try again. If the issue
                  persists, contact the security office. Contact details below.
                </p>
              )}
            </Message>
            <EmergencyInfo>
              <h4>Emergency Services Contact Information</h4>
              <p>📞 Emergency Hotline: 112</p>
              <p>🚓 Local Police: 10111</p>
              <p>🚑 Ambulance Service: 10177</p>
              <p>📱 Wits Security Office: 0117174444 / 0117176666</p>
            </EmergencyInfo>
          </>
        ) : (
          <>
            <FlexContainer>
              {/* Location Dropdown */}
              <div>
                <Label htmlFor="location">Select Location:</Label>
                <Select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option value="">Select a location</option>
                  {locationOptions.map((loc, index) => (
                    <option key={index} value={loc}>
                      {loc}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Incident Type Dropdown */}
              <div>
                <Label htmlFor="incidentType">Incident Type:</Label>
                <Select
                  id="incidentType"
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  required
                >
                  <option value="">Select an incident type</option>
                  {incidentOptions.map((incident, index) => (
                    <option key={index} value={incident}>
                      {incident}
                    </option>
                  ))}
                </Select>
              </div>
            </FlexContainer>

            <DescriptionInput
              placeholder="Please provide a detailed description of the incident"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <ModalFooter>
              <CancelButton onClick={onClose}>Cancel</CancelButton>
              <ConfirmButton
                onClick={handleSubmit}
                disabled={!description || !location || !incidentType}
              >
                Confirm
              </ConfirmButton>
            </ModalFooter>
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SecurityModal;
