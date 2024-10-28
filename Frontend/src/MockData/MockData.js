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
    event_id:"12"
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
    event_id:"9"
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
    event_id:"10"
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
    event_id:"11"
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
    event_id:"12"
  },
];

const mockEventTypes = [
  "Education",
  "Social",
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
    id: "01nyDCCYKFtrbxAU213F",
    venueCapacity: "30",
    venueType: "Tutorial Room",
    venueName: "WSS205",
    buildingName: "Wits Science Stadium",
    isClosed: false,
    campus: "West",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
  },
  {
    id: "05i5Vi0aZVKd8ZEzHNvw",
    campus: "East",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueType: "Lecture Venue",
    isClosed: false,
    buildingName: "Robert Sobukwe",
    venueName: "CB216A",
    venueCapacity: "30",
  },
  {
    id: "0d3b8wESKVBqty7R5vta",
    isClosed: false,
    campus: "West",
    venueCapacity: "30",
    buildingName: "First National Bank",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueType: "Tutorial Room",
    venueName: "FNB159",
  },
  {
    id: "1305ZzuCJxi2eB1k56Y5",
    venueType: "Tutorial Room",
    venueCapacity: "30",
    venueName: "LB55",
    isClosed: false,
    buildingName: "Law Building",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    campus: "West",
  },
  {
    id: "1CBqC4Cw2KaBwGqUNDyQ",
    isClosed: false,
    venueName: "NCB144",
    buildingName: "New Commerce Building",
    venueType: "Tutorial Room",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    campus: "West",
    venueCapacity: "30",
  },
  {
    id: "1CcTUfH0nhvb6BmptNwn",
    venueCapacity: "30",
    isClosed: false,
    campus: "East",
    venueName: "CB215",
    buildingName: "Robert Sobukwe",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueType: "Lecture Venue",
  },
  {
    id: "1NkbmXWSlQ0NT7FUGGi3",
    venueName: "CB38",
    campus: "East",
    venueType: "Lecture Venue",
    isClosed: false,
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    buildingName: "Robert Sobukwe",
    venueCapacity: "30",
  },
  {
    id: "1PpErcbdPEexZSDaMorM",
    venueCapacity: "30",
    buildingName: "WEC Marang Block",
    isClosed: false,
    campus: "Education",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueName: "WEC-M61",
    venueType: "Tutorial Room",
  },
  {
    id: "1w37pUFhhYL5OfwVh8kD",
    isClosed: false,
    buildingName: "WEC Centre",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueCapacity: "30",
    venueType: "Lecture Venue",
    venueName: "WEC-CC102",
    campus: "Education",
  },
  {
    id: "2P8dvlwQ5wAoyP1hrv1Y",
    venueType: "Lecture Venue",
    campus: "Education",
    venueCapacity: "30",
    venueName: "WEC-B12",
    isClosed: false,
    buildingName: "WEC Bohlaleng Block",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
  },
  {
    id: "2fWtL8mmWbYrb5IcDWdJ",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueType: "Lecture Venue",
    isClosed: false,
    venueCapacity: "30",
    buildingName: "DJ Du Plessie Building",
    campus: "West",
    venueName: "MPB2",
  },
  {
    id: "2xXSyH59I5mmvKgo7RQR",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueType: "Lecture Venue",
    buildingName: "Physics Building",
    venueName: "P114",
    campus: "East",
    isClosed: false,
    venueCapacity: "30",
  },
  {
    id: "3JIu2x0TuaeyzCF9Enng",
    venueName: "WEC-CC101",
    venueType: "Lecture Venue",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    campus: "Education",
    isClosed: false,
    buildingName: "WEC Centre",
    venueCapacity: "30",
  },
  {
    id: "3uGmWA8sHb9hMjmlyxPK",
    venueName: "FNB101",
    campus: "West",
    buildingName: "First National Bank",
    isClosed: false,
    venueCapacity: "30",
    venueType: "Tutorial Room",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
  },
  {
    id: "3xrFKHNorRbusdCVB8TO",
    venueCapacity: "30",
    venueType: "Lecture Venue",
    isClosed: false,
    buildingName: "CLM",
    venueName: "CLM24",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    campus: "West",
  },
  {
    id: "466tiPOJSKIMVPAPLz3u",
    isClosed: false,
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    campus: "Education",
    venueName: "WEC-B203",
    venueType: "Tutorial Room",
    venueCapacity: "30",
    buildingName: "WEC Bohlaleng Block",
  },
  {
    id: "4AOvRRZjH6mQQXj8iqRK",
    isClosed: false,
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueCapacity: "30",
    buildingName: "DJ Du Plessie Building",
    campus: "West",
    venueType: "Lecture Venue",
    venueName: "MPB1",
  },
  {
    id: "4QBeKwM21zFtc4WfMuxB",
    isClosed: false,
    venueType: "Tutorial Room",
    venueCapacity: "30",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    campus: "East",
    buildingName: "Robert Sobukwe",
    venueName: "CB128",
  },
  {
    id: "4tQ1kk8ZDK2JWeNWM9xa",
    isClosed: false,
    venueName: "WSS105",
    venueType: "Tutorial Room",
    buildingName: "Wits Science Stadium",
    venueCapacity: "30",
    campus: "West",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
  },
  {
    id: "52XHk5cMNZAIqslxvwlA",
    venueCapacity: "30",
    buildingName: "WEC Bohlaleng Block",
    venueName: "WEC-B108",
    campus: "Education",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    isClosed: false,
    venueType: "Tutorial Room",
  },
  {
    id: "59LIraYiXe1xI05kujlw",
    campus: "West",
    venueName: "WSS123",
    venueCapacity: "30",
    venueType: "Tutorial Room",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    isClosed: false,
    buildingName: "Wits Science Stadium",
  },
  {
    id: "5AKokHn55weivXfTIk99",
    venueCapacity: "30",
    venueType: "Tutorial Room",
    isClosed: false,
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueName: "NCB151",
    buildingName: "New Commerce Building",
    campus: "West",
  },
  {
    id: "5BDcRESKsOwW4NkVwcr2",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    buildingName: "WEC Marang Block",
    isClosed: false,
    venueCapacity: "30",
    venueName: "WEC-MU271",
    campus: "Education",
    venueType: "Tutorial Room",
  },
  {
    id: "5SY3UYioojgLkepU9UPU",
    venueName: "SH1125",
    buildingName: "Solomon Mahlangu House",
    venueType: "Tutorial Room",
    isClosed: false,
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    campus: "East",
    venueCapacity: "30",
  },
  {
    id: "5WqrPDsS5yiKWN4HvfS8",
    campus: "West",
    venueType: "Tutorial Room",
    isClosed: false,
    buildingName: "Wits Science Stadium",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueName: "WSS201",
    venueCapacity: "30",
  },
  {
    id: "5iXXknbl5Pu15o5S2BfZ",
    buildingName: "WEC Leseding Block",
    venueType: "Lecture Venue",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    isClosed: false,
    campus: "Education",
    venueName: "WEC-L20",
    venueCapacity: "30",
  },
  {
    id: "6obhVdu7SNnt6u2dyLac",
    buildingName: "WEC Marang Block",
    campus: "Education",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueType: "Tutorial Room",
    venueCapacity: "30",
    venueName: "WEC-M15",
    isClosed: false,
  },
  {
    id: "7K1mhbSZiVR9E8P0agkU",
    venueCapacity: "30",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueName: "CB127",
    isClosed: false,
    venueType: "Tutorial Room",
    buildingName: "Robert Sobukwe",
    campus: "East",
  },
  {
    id: "8E1XB5dyZ2BZrKRashX5",
    venueCapacity: "30",
    campus: "West",
    buildingName: "CLM",
    venueName: "CLM25",
    isClosed: false,
    venueType: "Lecture Venue",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
  },
  {
    id: "8OrvJcdDRySJcvqYrfMh",
    venueType: "Test Venue",
    venueName: "FLOWER-HALL",
    buildingName: "Flower Hall",
    venueCapacity: "30",
    isClosed: false,
    campus: "West",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
  },
  {
    id: "8XOpfqodgZnYbYnAwzPe",
    isClosed: false,
    buildingName: "Solomon Mahlangu House",
    venueCapacity: "30",
    campus: "East",
    venueType: "Test Venue",
    venueName: "SHWWDH",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
  },
  {
    id: "8XPbnUVGZOt9GIZjY9Fx",
    isClosed: false,
    buildingName: "New Commerce Building",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    campus: "West",
    venueCapacity: "30",
    venueName: "NCB4",
    venueType: "Lecture Venue",
  },
  {
    id: "94WNhxaJC016HTyrrP53",
    venueCapacity: "30",
    isClosed: false,
    buildingName: "Umthombo Building",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueName: "U3",
    venueType: "Lecture Venue",
    campus: "East",
  },
  {
    id: "94YP2GSoG3iuqzhyf6am",
    campus: "West",
    venueType: "Lecture Venue",
    buildingName: "First National Bank",
    isClosed: false,
    venueCapacity: "30",
    venueName: "FNB37",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
  },
  {
    id: "9MRbBXErCIphxwFovLAT",
    buildingName: "Oppenheimer Life Sciences",
    venueCapacity: "30",
    venueType: "Lecture Venue",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    isClosed: false,
    campus: "West",
    venueName: "OLS4",
  },
  {
    id: "9PDbi1gdxevolT7j1Q27",
    buildingName: "WEC Leseding Block",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueName: "WEC-L64",
    venueCapacity: "30",
    campus: "Education",
    venueType: "Tutorial Room",
    isClosed: false,
  },
  {
    id: "9jcSrTko6GROxkgK1zxb",
    isClosed: false,
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueCapacity: "30",
    venueType: "Lecture Venue",
    campus: "East",
    venueName: "U1",
    buildingName: "Umthombo Building",
  },
  {
    id: "9l7fEI8QxxwwXze7tewa",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueName: "WEC-L58",
    venueType: "Tutorial Room",
    venueCapacity: "30",
    campus: "Education",
    buildingName: "WEC Leseding Block",
    isClosed: false,
  },
  {
    id: "9xsPjFM8N9A7zkwaZ8jf",
    venueType: "Tutorial Room",
    venueCapacity: "30",
    venueName: "WEC-B250",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    campus: "Education",
    buildingName: "WEC Bohlaleng Block",
    isClosed: false,
  },
  {
    id: "ADqp8RvKIhNtCP6uD8Bb",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueName: "WEC-M80",
    campus: "Education",
    buildingName: "WEC Marang Block",
    isClosed: false,
    venueCapacity: "30",
    venueType: "Tutorial Room",
  },
  {
    id: "ATfgio5B0GOMgTuow4c1",
    campus: "East",
    venueType: "Lecture Venue",
    venueCapacity: "30",
    venueName: "SHB5",
    buildingName: "Solomon Mahlangu House",
    isClosed: false,
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
  },
  {
    id: "AYTuJ6qZyU450SLffEIW",
    venueType: "Tutorial Room",
    venueCapacity: "30",
    isClosed: false,
    venueName: "B111",
    campus: "East",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    buildingName: "Biology Building",
  },
  {
    id: "B0PBA4AAJU31DvNXsCKD",
    isClosed: false,
    venueCapacity: "30",
    buildingName: "John Moffat",
    campus: "East",
    venueName: "A2",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueType: "Lecture Venue",
  },
  {
    id: "B60fd6WjIJ5kyet5NNFY",
    venueName: "U2",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    buildingName: "Umthombo Building",
    venueType: "Lecture Venue",
    venueCapacity: "30",
    isClosed: false,
    campus: "East",
  },
  {
    id: "B7cQq6YH8ixFSPYJUwYY",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueCapacity: "30",
    venueType: "Tutorial Room",
    isClosed: false,
    campus: "East",
    venueName: "CB149",
    buildingName: "Robert Sobukwe",
  },
  {
    id: "Bk1Gz3W3NU8zo1taronC",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueCapacity: "30",
    venueName: "FNB157",
    buildingName: "First National Bank",
    isClosed: false,
    campus: "West",
    venueType: "Tutorial Room",
  },
  {
    id: "CCXr7AOBBVTmnGwa5WWA",
    venueType: "Tutorial Room",
    venueName: "WEC-LL33",
    campus: "Education",
    venueCapacity: "30",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    isClosed: false,
    buildingName: "WEC Leseding Block",
  },
  {
    id: "CMP8wqWx1nE9IctuB7DN",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    isClosed: false,
    campus: "Education",
    venueName: "WEC-L214",
    venueCapacity: "30",
    venueType: "Tutorial Room",
    buildingName: "WEC Leseding Block",
  },
  {
    id: "CZn04r7GtdpWFAFkX2an",
    campus: "Education",
    isClosed: false,
    venueType: "Lecture Venue",
    venueName: "WEC-B48",
    buildingName: "WEC Bohlaleng Block",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueCapacity: "30",
  },
  {
    id: "D3C6bdzGnPMJwKNvL43Y",
    venueName: "WSS103",
    campus: "West",
    isClosed: false,
    buildingName: "Wits Science Stadium",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueCapacity: "30",
    venueType: "Tutorial Room",
  },
  {
    id: "DDq17L6N2AqSsEzblqsr",
    venueName: "OLS7",
    isClosed: false,
    buildingName: "Oppenheimer Life Sciences",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueType: "Lecture Venue",
    venueCapacity: "30",
    campus: "West",
  },
  {
    id: "DJ0TNtxffSSqYmo52Ymi",
    isClosed: false,
    buildingName: "Old Grand Stand Building",
    campus: "West",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueName: "OGS2",
    venueCapacity: "30",
    venueType: "Tutorial Room",
  },
];

const mockVirtualLocations = [
  {
    id: "discord_mock",
    timeSlots: [
      "08:00",
      "09:00",
      "10:15",
      "11:15",
      "12:30",
      "14:15",
      "15:15",
      "16:15",
    ],
    venueType: "Online Meeting Platform",
    isClosed: false,
    venueName: "Discord",
    venueCapacity: "25",
  },
  {
    id: "zoom_mock",
    timeSlots: [
      "08:30",
      "09:30",
      "10:45",
      "11:45",
      "13:00",
      "14:30",
      "15:30",
      "16:30",
    ],
    venueType: "Online Meeting Platform",
    isClosed: false,
    venueName: "Zoom",
    venueCapacity: "100",
  },
  {
    id: "skype_mock",
    timeSlots: [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:30",
      "15:00",
      "16:00",
      "17:00",
    ],
    venueType: "Online Meeting Platform",
    isClosed: false,
    venueName: "Skype",
    venueCapacity: "50",
  },
  {
    id: "msteams_mock",
    timeSlots: [
      "08:15",
      "09:15",
      "10:30",
      "11:30",
      "12:45",
      "14:30",
      "15:30",
      "16:30",
    ],
    venueType: "Online Meeting Platform",
    isClosed: false,
    venueName: "Microsoft Teams",
    venueCapacity: "250",
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
    name:"Tapiwa",
    image_url:"vvwrvwrvrbwbr"
  },
  {
    notification_id: "notif_002",
    time: "2024-09-25T12:30:00",
    notification_type: "organizer",
    message: "The event 'Tech Summit' has been updated.",
    event_id: "event_102",
    organiser_id: "org_002",
    name:"Tapiwa",
    image_url:"vvwrvwrvrbwbr"


  },
  {
    notification_id: "notif_003",
    time: "2024-09-26T08:00:00",
    notification_type: "edit",
    message: "Your event 'Marketing 101' has been edited successfully.",
    event_id: "event_103",
    organiser_id: "org_003",
    name:"Tapiwa",
    image_url:"vvwrvwrvrbwbr"


  },
  {
    notification_id: "notif_004",
    time: "2024-09-26T09:45:00",
    notification_type: "admin",
    message: "New features have been added to your dashboard.",
    event_id: "event_104",
    organiser_id: "org_001",
    name:"Tapiwa",
    image_url:"vvwrvwrvrbwbr"


  },
  {
    notification_id: "notif_005",
    time: "2024-09-27T16:15:00",
    notification_type: "organizer",
    message: "The event 'AI Conference' has been canceled.",
    event_id: "event_105",
    organiser_id: "org_002",
    name:"Tapiwa",
    image_url:"vvwrvwrvrbwbr"

  },
];


export { mockEventData, mockLocations,mockEventTypes, mockVirtualLocations ,mockNotifications};
