import MyCalendar from "./Components/EventsCalendar/EventsCalendar";
import HomePage from "./Components/HomePage/HomePage";
import EventPage from "./pages/EventPage/EventPage";
import BookTicket from "./Components/BookTicket/BookTicket";
import SummaryPage from "./pages/SummaryPage/SummaryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./Components/Profile/ProfilePage";


import CreateEvent from "./pages/CreateEvent/CreateEvent";
import { ToastContainer } from "react-toastify";
import { Login }  from './Components/Login/Login.js';
import { SignIn } from './Components/SignIn/SignIn.js';
import { Welcome } from './Components/Welcome/Welcome.js';

import { CreateProfile } from "./Components/CreateProfile/CreateProfile.js";
import MyBooking from "./pages/MyBookings/MyBooking.js";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.js";
// import MyEvents from "./Components/ViewEvents/MyEvents/MyEvents.jsx";
import ViewMyEvents from "./pages/ViewMyEvents/ViewMyEvents.js";


import Notifications from "./Components/Notifications/Notifications.js";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" index element={<HomePage />} />
        <Route path="/welcome"  element={<Welcome />} />

        <Route path="/signIn"  element={<SignIn />} />
        <Route path="/logIn"  element={<Login />} />
        <Route path="/createProfile"  element={<><ToastContainer/><CreateProfile /></>} />
        <Route path="/profile"  element={<ProfilePage />} />
        <Route path="/myEvents"  element={<ViewMyEvents  />} />
        <Route path="/myBooking"  element={<MyBooking  />} />

        


        <Route path="/book" element={<BookTicket />} />


        <Route path="/event" element={<EventPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/createEvent" element={<CreateEvent />} />

        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/notifications" element={<Notifications />} />

        



      </Routes>
    </Router>

  );
}

export default App;