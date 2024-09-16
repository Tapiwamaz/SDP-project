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

import Tabs from "./Components/Tabs/Tabs.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/welcome"  element={<Welcome />} />

        <Route path="/signIn"  element={<SignIn />} />
        <Route path="/logIn"  element={<Login />} />
        <Route path="/createProfile"  element={<CreateProfile />} />
        <Route path="/profile"  element={<ProfilePage />} />

        <Route path="/book" element={<BookTicket />} />


        <Route path="/event" element={<EventPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/createEvent" element={<CreateEvent />} />

        <Route path="/adminDashboard" element={<AdminDashboard />} />



      </Routes>
    </Router>

  );
}

export default App;