const mockEventData = [
  {
    eventName: "Annual Tech Conference",
    eventDate: "2024-09-15",
    eventStartTime: "09:00",
    eventEndTime: "17:00",
    eventType: "Conference",
    eventVenueType: "Indoor",
    eventDescription:
      "A conference bringing together tech enthusiasts and professionals to discuss the latest in technology and innovation.",
    eventLocation: "Tech Hub Convention Center, San Francisco, CA",
  },
  {
    eventName: "Summer Music Festival",
    eventDate: "2024-06-21",
    eventStartTime: "12:00",
    eventEndTime: "23:00",
    eventType: "Festival",
    eventVenueType: "Outdoor",
    eventDescription:
      "An all-day music festival featuring top artists from various genres, along with food trucks and other entertainment.",
    eventLocation: "Central Park, New York, NY",
  },
  {
    eventName: "Charity Gala",
    eventDate: "2024-11-05",
    eventStartTime: "18:30",
    eventEndTime: "22:30",
    eventType: "Gala",
    eventVenueType: "Indoor",
    eventDescription:
      "An elegant evening event to raise funds for a local charity, featuring dinner, live performances, and an auction.",
    eventLocation: "Grand Ballroom, Hilton Hotel, Chicago, IL",
  },
  {
    eventName: "Startup Pitch Night",
    eventDate: "2024-10-10",
    eventStartTime: "19:00",
    eventEndTime: "21:00",
    eventType: "Pitch Event",
    eventVenueType: "Indoor",
    eventDescription:
      "A networking event where startups pitch their venue_ideas to a panel of investors and get feedback.",
    eventLocation: "Innovation Hub, Austin, TX",
  },
  {
    eventName: "Yoga in the Park",
    eventDate: "2024-08-03",
    eventStartTime: "08:00",
    eventEndTime: "09:30",
    eventType: "Wellness",
    eventVenueType: "Outdoor",
    eventDescription:
      "A relaxing morning yoga session in the park, open to all skill levels.",
    eventLocation: "Green Meadows Park, Seattle, WA",
  },
];

const mockEventTypes = [
  "Education",
  "Sports",
  "Political",
  "Entertainment",
  "Gaming",
  "IT",
  "Online"
];

const mockLocations = [
  {
    venue_id: "1",
    name: "Central Park",
    location: "New York, NY",
    capacity: 5000,
    type: "Park",
  },
  {
    venue_id: "2",
    name: "Madison Square Garden",
    location: "New York, NY",
    capacity: 20000,
    type: "Arena",
  },
  {
    venue_id: "3",
    name: "Staples Center",
    location: "Los Angeles, CA",
    capacity: 18000,
    type: "Arena",
  },
  {
    venue_id: "4",
    name: "Wembley Stadium",
    location: "London, UK",
    capacity: 90000,
    type: "Stadium",
  },
  {
    venue_id: "5",
    name: "Sydney Opera House",
    location: "Sydney, Australia",
    capacity: 2700,
    type: "Concert Hall",
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


export { mockEventData, mockLocations,mockEventTypes, mockVirtualLocations };