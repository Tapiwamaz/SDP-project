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
    toast.success("Your message has been sent")
  } catch (e) {
    console.error("Error creating notification:", e);
    throw new Error("Failed to create notification. Please try again.");
  }
};

export const handleSendButtonClick = (notification, organiser, events,db,auth,setOpen) => {
  const sendingNotification = {
    organiser_id: auth?.currentUser?.uid,
    event_id: events[notification.eventIndex].event_id,
    message: notification.message,
  };
  sendingNotification["image_url"] = organiser.image_url || organiser.imageURL;
  sendingNotification["time"] = new Date().toLocaleDateString();
  sendingNotification["notification_type"] = "organizer";
  sendingNotification["name"] = organiser.name;
  sendingNotification["notification_id"] = v4();
  sendNotification(sendingNotification,db);
  setOpen(false)
};

const CreateNotifications = ({ myEvents ,setOpen}) => {
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
  }, [myNotification]);

  return (
    <CreateNotificationWrapper>
      <SelectEventsInput
        onChange={(e) =>
          handleChangeNoti("eventIndex", e.target.value, setMyNotification)
        }
      >
        <option value="none" selected disabled hidden>
          Select an event
        </option>
        {myEvents.map((event, index) => (
          <option value={parseInt(index)} key={index}>
            {event.name}
          </option>
        ))}
      </SelectEventsInput>
      <MessageInput
        placeholder="Please enter your message"
        maxLength={200}
        onChange={(e) =>
          handleChangeNoti("message", e.target.value, setMyNotification)
        }
      />
      <ChrLeftLabel>
        Characters left: {200 - myNotification.message.length}
      </ChrLeftLabel>
      <SendButton
        disabled={!filledForm}
        onClick={() =>
          handleSendButtonClick(myNotification, userData, myEvents,db,auth, setOpen)
        }
      >
        Send
      </SendButton>
    </CreateNotificationWrapper>
  );
};

export default CreateNotifications;
