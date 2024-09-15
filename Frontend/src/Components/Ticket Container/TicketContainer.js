import { Ticket } from "../Ticket/Ticket";
import { auth, db } from "../../config/firebase";
import QRCode from "qrcode.react";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";

export const TicketContainer = () => {

    const getTickets = async () => {
        const user = auth.currentUser;
        const collectionRef = collection(db, "Tickets");
        const q = query(collectionRef, where("userID", "==", 'fMgS0KN8UBXu9uW63wAfzfxPfXy1'));

        const querySnapshot = await getDocs(q);
        const events = [];
        const ids = [];

        querySnapshot.forEach((doc) => {
            ids.push(doc.id);
            events.push(doc.data().eventID);
        });
        
        const data = []
        for (let i = 0; i < events.length; i++) {
            const eventRef = collection(db, "Events", events[i]);
            const eventDoc = await getDoc(eventRef);
            const eventsData = eventDoc.data();
            data[i] = {id: ids[i], title: eventsData.name, url: eventsData.image_url, date: eventsData.date, time: eventsData.start_time, venue: eventsData.location, total: eventsData.price, qrcode: <QRCode value={ids[i]} size={100} level={"H"} />}
        }
        return data;
    }

    const data = getTickets();

    return (
        <div>
            {data.map((ticket) => {
                return (
                    <Ticket
                        title={ticket.title}
                        date={ticket.date}
                        time={ticket.time}
                        venue={ticket.venue}
                        total={ticket.total}
                        url={ticket.url}
                        qrcode={ticket.qrcode}
                        id={ticket.id}
                    />
                );
            })}
        </div>
    );

}