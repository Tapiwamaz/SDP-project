import React, { useEffect, useState } from "react";
import {
  ChrLeftLabel,
  CreateNotificationWrapper,
  MessageInput,
  SelectEventsInput,
  SendButton,
} from "./CreateNotification.styles";
import { fetchStorage } from "../../pages/CreateEvent/CreateEvent";
import { v4 } from "uuid";
import { auth, db } from "../../firebase_config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

export const handleChangeNoti = (change, value, setMyNotification) => {
  setMyNotification((prev) => {
    return { ...prev, [change]: value }; // Return a new object with the updated value
  });
};

export const sendNotification = async (notification, db) => {
  try {
    const notificationCollectionRef = collection(db, "Notifications");
    await addDoc(notificationCollectionRef, notification);
    toast.success("Your message has been sent");
  } catch (e) {
    console.error("Error creating notification:", e);
    throw new Error("Failed to create notification. Please try again.");
  }
};

export const  formatDateToISO = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export const handleSendButtonClick = (
  notification,
  organiser,
  events,
  db,
  auth,
  setOpen,
  sendNotification
) => {
  const sendingNotification = {
    organiser_id: auth?.currentUser?.uid,
    event_id: events[notification.eventIndex].event_id,
    message: notification.message,
  };
  sendingNotification["image_url"] = organiser.imageURL || organiser.image_url;
  sendingNotification["time"] = formatDateToISO(new Date());
  sendingNotification["notification_type"] = "organizer";
  sendingNotification["name"] = organiser.name;
  sendingNotification["notification_id"] = v4();
  sendNotification(sendingNotification, db);
  setOpen(false);
};

const CreateNotifications = ({ myEvents, setOpen }) => {
  const [filledForm, setFilledForm] = useState(false);
  const [myNotification, setMyNotification] = useState({
    message: "",
    eventIndex: -1,
  });
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (myNotification.message.length > 0 && myNotification.eventIndex !== -1) {
      setUserData(fetchStorage("userData") || {});
      setFilledForm(true);
    } else {
      setFilledForm(false);
    }
  }, [myNotification,myNotification.message]);

  return (
    <CreateNotificationWrapper>
      <SelectEventsInput
        onChange={(e) =>
          handleChangeNoti("eventIndex", e.target.value, setMyNotification)
        }
      >
        <option value="-1" selected disabled hidden>
          Select an event
        </option>
        {myEvents.map((event, index) => (
          <option value={parseInt(index)} key={index}>
            {event.name}
          </option>
        ))}
      </SelectEventsInput>
      <MessageInput
        data-testid="h"
        placeholder="Please enter your message"
        maxLength={200}
        onChange={(e) =>
          handleChangeNoti("message", e.target.value, setMyNotification)
        }
      ></MessageInput>
      <ChrLeftLabel>
        Characters left: {200 - myNotification.message.length}
      </ChrLeftLabel>
      <SendButton
        disabled={!filledForm}
        onClick={() =>
          handleSendButtonClick(
            myNotification,
            userData,
            myEvents,
            db,
            auth,
            setOpen,
            sendNotification
          )
        }
      >
        Send
      </SendButton>
    </CreateNotificationWrapper>
  );
};

export default CreateNotifications;
