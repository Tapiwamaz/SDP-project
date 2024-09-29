const mockEventData = [
  {
    name: "Annual Tech Conference",
    date: "2024-09-15",
    start_time: "09:00",
    end_time: "17:00",
    type: "Conference",
    venue_type: "Indoor",
    description:
      "A conference bringing together tech enthusiasts and professionals to discuss the latest in technology and innovation.",
    location: "Tech Hub Convention Center, San Francisco, CA",
  },
  {
    name: "Summer Music Festival",
    date: "2024-06-21",
    start_time: "12:00",
    end_time: "23:00",
    type: "Festival",
    venue_type: "Outdoor",
    description:
      "An all-day music festival featuring top artists from various genres, along with food trucks and other entertainment.",
    location: "Central Park, New York, NY",
  },
  {
    name: "Charity Gala",
    date: "2024-11-05",
    start_time: "18:30",
    end_time: "22:30",
    type: "Gala",
    venue_type: "Indoor",
    description:
      "An elegant evening event to raise funds for a local charity, featuring dinner, live performances, and an auction.",
    location: "Grand Ballroom, Hilton Hotel, Chicago, IL",
  },
  {
    name: "Startup Pitch Night",
    date: "2024-10-10",
    start_time: "19:00",
    end_time: "21:00",
    type: "Pitch Event",
    venue_type: "Indoor",
    description:
      "A networking event where startups pitch their venue_ideas to a panel of investors and get feedback.",
    location: "Innovation Hub, Austin, TX",
  },
  {
    name: "Yoga in the Park",
    date: "2024-08-03",
    start_time: "08:00",
    end_time: "09:30",
    type: "Wellness",
    venue_type: "Outdoor",
    description:
      "A relaxing morning yoga session in the park, open to all skill levels.",
    location: "Green Meadows Park, Seattle, WA",
  },
];

const mockEventTypes = [
  "Education",
  "Sports",
  "Political",
  "Entertainment",
  "Gaming",
  "IT",
  "Religious",
  "Online",
];

const mockLocations = [
  {
    venue_id: "FNB42",
    name: "FNB Building Room 42",
    location: "FNB42",
    capacity: 200,
    type: "Lecture Room",
  },
  {
    venue_id: "HL29",
    name: "Hall 29",
    location: "Hall 29",
    capacity: 3000,
    type: "Exam Hall",
  },
  {
    venue_id: "OGS1",
    name: "Old Grandstand Room 1",
    location: "OGS1",
    capacity: 150,
    type: "Lecture Room",
  },
  {
    venue_id: "FLD1",
    name: "Digs Field",
    location: "Digs Field",
    capacity: 1000,
    type: "Field",
  },
  {
    venue_id: "OMSH",
    name: "Old Mutual Sports Hall",
    location: "Old Mutual Sports Hall",
    capacity: 2000,
    type: "Exam Hall",
  },
];
const mockVirtualLocations = [
  {
    venue_id: "1",
    location: "Zoom",
    name: "Online",
    capacity: 1000,
    type: "Video Conferencing",
  },
  {
    venue_id: "2",
    location: "Microsoft Teams",
    name: "Online",
    capacity: 300,
    type: "Collaboration",
  },
  {
    venue_id: "3",
    location: "Google Meet",
    name: "Online",
    capacity: 250,
    type: "Video Conferencing",
  },
  {
    venue_id: "4",
    location: "Skype",
    name: "Online",
    capacity: 250,
    type: "Video Conferencing",
  },
  {
    venue_id: "5",
    location: "Webex",
    name: "Online",
    capacity: 1000,
    type: "Video Conferencing",
  },
];

const mockNotifications = [
  {
    notification_id: "notif_001",
    time: "2024-09-23T10:15:00",
    notification_type: "admin",
    message: "Your account has been verified.",
    event_id: "event_101",
    organiser_id: "org_001",
    name:"Tapiwa"
  },
  {
    notification_id: "notif_002",
    time: "2024-09-25T12:30:00",
    notification_type: "organizer",
    message: "The event 'Tech Summit' has been updated.",
    event_id: "event_102",
    organiser_id: "org_002",
    name:"Tapiwa"

  },
  {
    notification_id: "notif_003",
    time: "2024-09-26T08:00:00",
    notification_type: "edit",
    message: "Your event 'Marketing 101' has been edited successfully.",
    event_id: "event_103",
    organiser_id: "org_003",
    name:"Tapiwa"

  },
  {
    notification_id: "notif_004",
    time: "2024-09-26T09:45:00",
    notification_type: "admin",
    message: "New features have been added to your dashboard.",
    event_id: "event_104",
    organiser_id: "org_001",
    name:"Tapiwa"

  },
  {
    notification_id: "notif_005",
    time: "2024-09-27T16:15:00",
    notification_type: "organizer",
    message: "The event 'AI Conference' has been canceled.",
    event_id: "event_105",
    organiser_id: "org_002",
    name:"Tapiwa"
  },
];


export { mockEventData, mockLocations,mockEventTypes, mockVirtualLocations ,mockNotifications};
