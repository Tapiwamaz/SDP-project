import { Ticket } from "../Ticket/Ticket";
import { NavbarContainer, NavItem } from "../Navbar/Navbar.styles.js";
import { auth, db } from "../../firebase_config";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import EventDisplay from "../EventDisplay/EventDisplay";
import { EventRight } from "../HomePage/HomePage.styles";
import { Xicon } from "../Header/Header.styles";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const TicketContainer = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // New state for user ID
  const [screen, setScreen] = useState(null);
  const [Load, setLoad] = useState(true);
  const [tick, setTick] = useState(null);
  const [EventsDisplay, setEventsDisplay] = useState(null);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set userId when the user is authenticated
      } else {
        setUserId(null); // Handle unauthenticated state
      }
    });
    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  useEffect(() => {
    const screenWidth = window.innerWidth; // need to adjust the slide percentage based on screen size
    if (screenWidth <= 768) {
      // Closer to full width on small screens
      setScreen("phone");
    } else {
      // Default for larger screens
      setScreen("desktop");
    }
    const fetchTickets = async () => {
      try {
        // const user = auth.currentUser;
        // if (!user) {
        //     // Handle case where user is not authenticated
        //     console.error("No user is logged in");
        //     //return;
        // }
        console.log(userId);

        const collectionRef = collection(db, "Tickets");
        const q = query(collectionRef, where("user_id", "==", userId));

        const querySnapshot = await getDocs(q);
        const events = [];
        const ids = [];
        const ratings = [];

        querySnapshot.forEach((doc) => {
          console.log(doc);
          ids.push(doc.id);
          events.push(doc.data().event_id);
          ratings.push(doc.data().rated);
        });
        console.log(events);
        console.log(ids);

        const data = [];
        // for (let i = 0; i < events.length; i++) {
        //     const eventRef = doc(db, "Events", events[i]);
        //     const eventDoc = await getDoc(eventRef);
        //     const eventsData = eventDoc.data();
        //     console.log(eventsData);

        //     data.push({
        //         id: ids[i],
        //         title: eventsData.name,
        //         url: eventsData.image_url,
        //         date: eventsData.date,
        //         time: eventsData.start_time,
        //         venue: eventsData.location,
        //         total: eventsData.price,
        //         qrcode: <QRCodeSVG value={ids[i]} size={50} />
        //     });
        // }
        for (let i = 0; i < events.length; i++) {
          try {
            // Create a query to fetch the event where the "event_id" field matches the events[i]
            const q = query(
              collection(db, "Events"),
              where("event_id", "==", events[i])
            );

            // Execute the query
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const eventsData = doc.data();
                console.log(eventsData);

                // Push the event data into the array
                data.push({
                  id: ids[i], // ticket id
                  rated: ratings[i], // ticket rating
                  active: eventsData.active,
                  capacity: eventsData.capacity,
                  description: eventsData.description,
                  type: eventsData.type,
                  title: eventsData.name,
                  url: eventsData.image_url, // event image
                  date: eventsData.date,
                  time: eventsData.start_time,
                  endTime: eventsData.end_time,
                  venue: eventsData.location,
                  total: eventsData.price,
                  qrcode: <QRCodeSVG value={ids[i]} size={50} />, // QR code with ticket id
                  eventData: eventsData,
                });
              });
            } else {
              console.log(`No event found with event_id: ${events[i]}`);
            }
          } catch (error) {
            console.error(
              `Error fetching event with event_id ${events[i]}:`,
              error
            );
          }
        }

        setTickets(data);
        data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          if (dateA === dateB) {
            return a.time.localeCompare(b.time);
          }
          return dateA - dateB;
        });

        if (activeTab === 'Upcoming') {
          setTickets(data.filter((ticket) => new Date(ticket.date) >= new Date()));
        }
        if (activeTab === 'Completed') {
          setTickets(data.filter((ticket) => new Date(ticket.date) < new Date()));
        }
        if (activeTab === 'Canceled') {
          setTickets(data.filter((ticket) => ticket.active === false));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      }
    };

    fetchTickets(); // Fetch tickets on component mount
  }, [userId, activeTab]); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleTicketClick = (ticket) => {
    setLoad(true);
    const event = ticket.eventData;
    if (screen === "desktop") {
      setTick(ticket);
      setEventsDisplay(event);
    } else {
      // Create a new object that only includes the properties you need
      const serializableTicket = {
        id: ticket.id,
        name: ticket.name,
        rated: ticket.rated,
      };
      navigate("/event", {
        state: { event , ticket: serializableTicket },
      });
    }
  };

  return (
    <>
      {/* <Navbar></Navbar> */}

      <div>
        <h1>Tickets</h1>
        <NavbarContainer>
          <NavItem
            isActive={activeTab === 'Upcoming'}
            onClick={() => setActiveTab('Upcoming')}
          >
            Upcoming
          </NavItem>
          <NavItem
            isActive={activeTab === 'Completed'}
            onClick={() => setActiveTab('Completed')}
          >
            Completed
          </NavItem>
          <NavItem
            isActive={activeTab === 'Canceled'}
            onClick={() => setActiveTab('Canceled')}
          >
            Canceled
          </NavItem>
        </NavbarContainer>
        {tickets ? (
          tickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              title={ticket.title}
              date={ticket.date}
              time={ticket.time}
              venue={ticket.venue}
              total={ticket.total}
              url={ticket.url}
              qrcode={ticket.qrcode}
              id={ticket.id}
              onClick={() => handleTicketClick(ticket)}
            />
          ))
        ) : (
          <p> No Bookings made</p>
        )}
        {EventsDisplay && (
          <>
            <EventRight>
              <Xicon
                onClick={() => setEventsDisplay(null)}
                style={{ color: "black" }}
              ></Xicon>

              <EventDisplay
                events={EventsDisplay}
                loading={Load}
                setLoading={setLoad}
                ticket={tick}
              ></EventDisplay>
            </EventRight>
          </>
        )}
      </div>
    </>
  );
};
