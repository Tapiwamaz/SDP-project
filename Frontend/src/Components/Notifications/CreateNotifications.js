import React from "react";
import {
    ChrLeftLabel,
  CreateNotificationWrapper,
  MessageInput,
  SelectEventsInput,
} from "./CreateNotification.styles";

export const handleChangeNoti = (change, value, setMyNotification) => {
    // console.log(value)
  setMyNotification((prev) => {
    prev[change] = value;
    console.log(prev)
    return prev;
  });
};

const CreateNotifications = ({ myNotification,myEvents, setMyNotification }) => {
  return (
    <CreateNotificationWrapper>
      <SelectEventsInput
        onChange={(e) =>
          handleChangeNoti("eventIndex", e.target.value, setMyNotification)
        }
      >
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
      <ChrLeftLabel>Characters left:{myNotification.message.length}</ChrLeftLabel>
    </CreateNotificationWrapper>
  );
};

export default CreateNotifications;
