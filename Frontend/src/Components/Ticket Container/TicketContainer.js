import { Ticket } from "../Ticket/Ticket";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";

export const TicketContainer = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    // Handle case where user is not authenticated
                    console.error("No user is logged in");
                    return;
                }

                const collectionRef = collection(db, "Tickets");
                const q = query(collectionRef, where("userID", "==", user.uid)); // Use user.uid for dynamic user ID

                const querySnapshot = await getDocs(q);
                const events = [];
                const ids = [];

                querySnapshot.forEach((doc) => {
                    ids.push(doc.id);
                    events.push(doc.data().eventID);
                });

                const data = [];
                for (let i = 0; i < events.length; i++) {
                    const eventRef = doc(db, "Events", events[i]); // Use doc() to get a document reference
                    const eventDoc = await getDoc(eventRef);
                    const eventsData = eventDoc.data();
                    data.push({
                        id: ids[i],
                        title: eventsData.name,
                        url: eventsData.image_url,
                        date: eventsData.date,
                        time: eventsData.start_time,
                        venue: eventsData.location,
                        total: eventsData.price,
                        qrcode: <QRCodeSVG value={ids[i]} size={100} level={"H"} />
                    });
                }

                setTickets(data); // Update state with fetched data
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error("Error fetching tickets:", error);
                setLoading(false);
            }
        };

        fetchTickets(); // Fetch tickets on component mount
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) {
        return <p>Loading...</p>; // Show loading state
    }

    return (
        <div>
            {tickets.map(ticket => (
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
                />
            ))}
        </div>
    );
};