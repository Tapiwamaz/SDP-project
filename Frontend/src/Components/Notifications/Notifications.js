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

export const createNotification = (setCreateNotificationClicked) => {
  setCreateNotificationClicked((p) => !p);
};
export const fetchEvents = () => {};

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

  // useEffect (() => {
  // fetch my Events
  // },[])

  return (
    <div>
      <ToastContainer/>
      <Header />
      <Top>
        <ArrowLeftCircleIcon width={40} onClick={() => navigate(-1)} />
        <h3>Notifications</h3>
        <StyledPlus
          onClick={() => createNotification(setCreateNotificationClicked)}
        ></StyledPlus>
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
