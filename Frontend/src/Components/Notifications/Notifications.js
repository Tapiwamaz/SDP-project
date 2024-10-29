import React, { useEffect, useState } from "react";
import { mockEventData, mockNotifications } from "../../MockData/MockData";
import Header from "../Header/Header";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";
import {
  Top,
  Card,
  StyledPlus,
  LoadingCard,
  Message,
} from "./Notifications.styles";

import noResultsImage from "../../Images/noResults.svg";
import CreateNotifications from "./CreateNotifications";
import { ToastContainer } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase_config";

export const createNotification = (setCreateNotificationClicked) => {
  setCreateNotificationClicked((p) => !p);
};

export const eventsByUserID = async (userId, setEvents) => {
  try {
    const q = query(
      collection(db, "Events"),
      where("user_id", "==", userId),
      where("approved", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs.map((d) => d.data());
    setEvents(events);
  } catch (error) {
    console.error("Error fetching entry count:", error);
    return null;
  }
};

export const notificationsByUserID = async (userId, setNotifications) => {
  try {
    const q = query(
      collection(db, "Notifications"),
      where("notification_type", "==", "admin"),
      //where("organizer_id", "==", "AnRc51fxerhPzAdJkt8w5JhmFAN2")
      where("organizer_id", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const notifications = querySnapshot.docs.map((d) => d.data());
    setNotifications((prev) => [...prev, ...notifications]);
    // return querySnapshot.size;
    console.log(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return null;
  }
};

export const getEventIdsFromTickets = async (userId) => {
  try {
    const q = query(
      collection(db, "Tickets"),
      where("user_id", "==", userId) // Match the current user's ID
    );
    const querySnapshot = await getDocs(q);

    // Extract event_ids from the tickets
    const eventIds = querySnapshot.docs.map((d) => d.data().event_id);
    console.log(eventIds);
    return eventIds;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
};

export const getNotificationsByEventIds = async (
  eventIds,
  setNotifications
) => {
  try {
    // Query the Notifications table using event_ids from the tickets
    const q = query(
      collection(db, "Notifications"),
      where("event_id", "in", eventIds)
      //where("organizer_id", "", auth?.currentUser.uid) // Use "in" query to match multiple event_ids
    );
    const querySnapshot = await getDocs(q);

    const notifications = querySnapshot.docs.map((d) => d.data());
    // setNotifications(
    //   notifications.filter(
    //     (noti) => noti.organizer_id !== auth?.currentUser?.uid
    //   )

    setNotifications((prev) => [
      ...prev,
      ...notifications.filter(
        (noti) => noti.organizer_id !== auth?.currentUser?.uid
      ),
    ]);

    // );
  } catch (error) {
    console.error("Error fetching notifications by event IDs:", error);
    return null;
  }
};
const Notifications = () => {
  const storedUserData = localStorage.getItem("userData");
  const userData = storedUserData ? JSON.parse(storedUserData) : {};
  const navigate = useNavigate();
  const noNotification = [
    { Notifications: "no" },
    { Notifications: "no" },
    { Notifications: "no" },
    { Notifications: "no" },
    { Notifications: "no" },
  ];

  const [loaded, setLoaded] = useState(false);
  const [myNotification, setMyNotification] = useState([]);
  const sortedNotifications = myNotification.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  const [createNotificationClicked, setCreateNotificationClicked] =
    useState(false);
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    if (auth?.currentUser?.uid) {
      notificationsByUserID(auth?.currentUser?.uid, setMyNotification);
    }
  }, []);

  // Fetch the count when the component mounts
  useEffect(() => {
    if (auth?.currentUser?.uid) {
      eventsByUserID(auth?.currentUser?.uid, setMyEvents);
    }
  }, []);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      if (auth?.currentUser?.uid) {
        // Fetch notifications from the admin for the current user
        // const adminNotifications = await notificationsByUserID(
        //   auth.currentUser.uid,
        //   setMyNotification
        // );

        // If there are no admin notifications, check user tickets
        // if (adminNotifications.length === 0) {
        const eventIds = await getEventIdsFromTickets(auth.currentUser.uid);

        // const eventIds = await getEventIdsFromTickets(
        //   "7XscsMEsKIg202Eb5dwHTDa4GAW2"
        // );
        if (eventIds.length > 0) {
          await getNotificationsByEventIds(eventIds, setMyNotification);
          setLoaded(true);
        } else {
          // setMyNotification([]);
        }
        setLoaded(true);

      }
      // }
    };

    fetchUserNotifications();
    setLoaded(true)
  }, []);
  
  return (
    <div>
      <ToastContainer />
      {window.innerWidth < 768 && <Header />}
      <Top>
        <h3>Notifications</h3>
        {/* Only organizers can make notifications based on their events so if you don't any made events */}
        {myEvents.length > 0 && (
          <StyledPlus
            onClick={() => createNotification(setCreateNotificationClicked)}
          ></StyledPlus>
        )}
      </Top>
      {createNotificationClicked && (
        <CreateNotifications
          myEvents={myEvents}
          setOpen={setCreateNotificationClicked}
        />
      )}
      {loaded ? (
        myNotification.length > 0 ? (
          sortedNotifications.map((noti) => {
            const isAdmin = noti.notification_type === "admin";
            return (
              <Card key={noti.notification_id}>
                <div className="headerNoti">
                  <img
                    src={
                      isAdmin
                        ? "https://firebasestorage.googleapis.com/v0/b/sdp-project-5cfef.appspot.com/o/profileImages%2FjBHOtJ2ddSQEDacYsLM0v2KPcOM2e4b5047c-285b-4d04-a50e-d6fcf888d6ff?alt=media&token=07c9ee99-99f7-4f92-8428-2628fef0b245"
                        : noti.image_url
                    }
                    alt="profile"
                  />
                  <div className="leftNoti">
                    <h5>{isAdmin ? "Admin" : noti.name}</h5>
                    <p>
                      {formatDistanceToNow(new Date(noti.time), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <Message>
                  <p
                    style={{
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                      maxWidth: "100%",
                    }}
                  >
                    {noti.message}
                  </p>
                </Message>
              </Card>
            );
          })
        ) : (
          <>
            <img src={noResultsImage} alt="No Results" />
            <h3>No Notifications found</h3>
          </>
        )
      ) : (
        //   Loading
        noNotification.map((noti) => <LoadingCard></LoadingCard>)
      )}
    </div>
  );
};

export default Notifications;
