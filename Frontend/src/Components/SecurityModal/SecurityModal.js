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

const incidentOptions = ["fire", "security", "health", "weather", "natural"];
const locationOptions = [
  "Dig Fields",
  "Olives and Plates Wits Club",
  "Sturrock Park",
  "Wits First Year Parking",
  "Barnato Hall",
  "West Campus Village",
  "Convocation Dining Hall",
  "DJ Du Plessis Centre",
  "Wits Judo Hall",
  "Wits Chalsty Centre",
  "Oliver Schreiner School of Law",
  "Wits Law Lawns",
  "Wits Law Clinic",
  "2nd+ Year Parking",
  "First National Bank Building",
  "David Webster Hall of Residence",
  "Wits Squash Courts",
  "Wits Hall 29",
  "Wits Commerce Library",
  "Faculty of Commerce, Law and Management CLM Building",
  "Wits Tower of Light",
  "New Commerce Building",
  "The Old Grandstand",
  "Wits Plus",
  "TW Kambule Mathematical Sciences Building",
  "Wits Science Stadium",
  "Wits CCDU",
  "Wits GoldFields Laboratories",
  "Flower Hall",
  "Wits CLTD",
  "The Chamber of Mines Building",
  "Origins Centre",
  "Palaeoscience Centre",
  "Bernard Price Building",
  "Post Graduate Club",
  "Wits Richard Ward Building",
  "Hillman Building",
  "South-West Engineering",
  "Solomon Mahlangu House",
  "Robert Sobukwe Block",
  "Wits Great Hall",
  "Wits Theatre",
  "Wits Humphrey Raikes",
  "Wits School Of Arts",
  "Wits Chris Seabrooke Music Hall",
  "The Nunnery",
  "Wits Digital Arts Division",
  "Wits University Corner",
  "Wits Gate House",
  "Oppenheimer Life Sciences",
  "Wits Physics Building",
  "Emthongeni Community Centre",
  "Wits Biology Building",
  "Umthombo Building",
  "Wartenweiler Library",
  "Geosciences Building",
  "Wits Library Lawns",
  "The Matrix",
  "Sunnyside Residence",
  "North West Engineering Building",
  "John Moffat",
  "Amphitheatre",
  "Wits School of Construction Economics and Management",
  "Old Mutual Sports Hall",
  "Wits Swimming Pool",
  "Wits Main Dining Hall",
  "Jan Smuts House",
  "East Campus Basketball Court",
  "Wits College House",
  "Mens Halls Of Residence",
  "Dalrymple House",
  "Wits Anglo American Digital Dome",
  "Bidvest Stadium",
  "Hofmeyr House",
  "Wits University Jubilee Hall",
  "Wits Rugby Stadium",
  "International House Residence",
  "The Sanctuary",
  "Bozzoli Sports Pavilion",
  "Wits Musallah",
  "Wits Language School",
  "Schonland Research Centre",
  "Schonland Research and Workshops",
  "iThemba LABS",
  "Walter Milton Oval",
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
