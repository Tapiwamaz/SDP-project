import { Ticket } from "../Ticket/Ticket";
import { auth, db } from "../../firebase_config";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const TicketContainer = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null); // New state for user ID

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
        const fetchTickets = async () => {
            try {
                // const user = auth.currentUser;
                // if (!user) {
                //     // Handle case where user is not authenticated
                //     console.error("No user is logged in");
                //     //return;
                // }
                console.log(userId)

                const collectionRef = collection(db, "Tickets");
                const q = query(collectionRef, where("user_id", "==", userId)); 

                const querySnapshot = await getDocs(q);
                const events = [];
                const ids = [];

                querySnapshot.forEach((doc) => {
                    console.log(doc);
                    
                    ids.push(doc.id);
                    events.push(doc.data().event_id);
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
                                    active: eventsData.active,
                                    capacity: eventsData.capacity,
                                    description: eventsData.description,
                                    type: eventsData.type,
                                    title: eventsData.name,
                                    url: eventsData.image_url,  // event image
                                    date: eventsData.date,
                                    time: eventsData.start_time,
                                    endTime: eventsData.end_time,
                                    venue: eventsData.location,
                                    total: eventsData.price,
                                    qrcode: <QRCodeSVG value={ids[i]} size={50} /> ,// QR code with ticket id
                                    eventData: eventsData
                                });
                            });
                        } else {
                            console.log(`No event found with event_id: ${events[i]}`);
                        }
                    } catch (error) {
                        console.error(`Error fetching event with event_id ${events[i]}:`, error);
                    }
                }
   
                

                setTickets(data); 
                setLoading(false); 
            } catch (error) {
                console.error("Error fetching tickets:", error);
                setLoading(false);
            }
        };

        fetchTickets(); // Fetch tickets on component mount
    }, [userId]); // Empty dependency array means this effect runs once on mount

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleTicketClick = (ticket) => {
        console.log(ticket.eventData.name);
    };

    return (
        <>
        {/* <Navbar></Navbar> */}
        
        <div>
            <h1>Tickets</h1>
            {tickets?tickets.map(ticket => (
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
            )):<p> No Bookings made</p>}
        </div>
        </>
    );
};