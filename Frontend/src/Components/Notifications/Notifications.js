import React, { useEffect, useState } from "react";
import { mockEventData, mockNotifications } from "../../MockData/MockData";
import Header from "../Header/Header";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { Top, Card, StyledPlus, LoadingCard } from "./Notifications.styles";

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

const Notifications = () => {
  const navigate = useNavigate();
  const noNotification = [
    { Notifications: "no" },
    { Notifications: "no" },
    { Notifications: "no" },
    { Notifications: "no" },
    { Notifications: "no" },
  ];

  const [loaded, setLoaded] = useState(true);
  const sortedNotifications = mockNotifications.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  const [createNotificationClicked, setCreateNotificationClicked] =
    useState(false);
  const [myEvents, setMyEvents] = useState(mockEventData);

  // Fetch the count when the component mounts
  useEffect(() => {
    if (auth?.currentUser?.uid) {
      eventsByUserID(auth?.currentUser?.uid, setMyEvents);
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      {window.innerWidth<768 && <Header />}
      <Top>
      {window.innerWidth<768 &&<ArrowLeftCircleIcon width={40} onClick={() => navigate(-1)} />}
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
        mockNotifications.length > 0 ? (
          sortedNotifications.map((noti) => (
            <Card key={noti.notification_id}>
              <div className="headerNoti">
                <img
                  src={
                    "https://photographylife.com/wp-content/uploads/2018/11/Moeraki-Boulders-New-Zealand.jpg"
                  }
                  alt="profile"
                />
                <div className="leftNoti">
                  <h5> {noti.name}</h5>
                  <p>
                    {formatDistanceToNow(new Date(noti.time), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <p>{noti.message}</p>
            </Card>
          ))
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
