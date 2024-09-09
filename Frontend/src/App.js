import HomePage from "./Components/HomePage/HomePage";
import EventPage from "./pages/EventPage/EventPage";
import BookTicket from "./Components/BookTicket/BookTicket";
import SummaryPage from "./pages/SummaryPage/SummaryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  // const fetchEvents = async () => {
  //   try {
  //     // Using relative URL
  //     const response = await fetch("/api/Basic", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
      // });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Data received from Azure Function:", data);
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     return null;
  //   }
  // };
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/book" element={<BookTicket />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
