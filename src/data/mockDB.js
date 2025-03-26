// src/data/mockDB.js

export const users = [
    {
      id: "user_gibson",
      name: "Gibson",
      email: "gibson@shift.app",
      avatar: "https://i.pravatar.cc/150?u=gibson",
      bio: "Gibson loves connecting at events and discovering cool new spots.",
      gender: "male",
      interestedIn: ["female"],
      interests: ["coffee", "art", "hiking"],
      likes: [],
      matches: [],
      createdAt: "2024-01-01T00:00:00"
    },
    {
      id: "user_alex",
      name: "Alex",
      email: "alex@shift.app",
      avatar: "https://i.pravatar.cc/150?u=alex",
      bio: "Alex loves connecting at events and discovering cool new spots.",
      gender: "female",
      interestedIn: ["male"],
      interests: ["hiking", "tech", "music"],
      likes: [],
      matches: [],
      createdAt: "2024-01-02T00:00:00"
    },
    {
      id: "user_taylor",
      name: "Taylor",
      email: "taylor@shift.app",
      avatar: "https://i.pravatar.cc/150?u=taylor",
      bio: "Taylor loves connecting at events and discovering cool new spots.",
      gender: "non-binary",
      interestedIn: ["female", "male"],
      interests: ["coffee", "fitness", "tech"],
      likes: [],
      matches: [],
      createdAt: "2024-01-03T00:00:00"
    },
    {
      id: "user_jordan",
      name: "Jordan",
      email: "jordan@shift.app",
      avatar: "https://i.pravatar.cc/150?u=jordan",
      bio: "Jordan loves connecting at events and discovering cool new spots.",
      gender: "male",
      interestedIn: ["female"],
      interests: ["fitness", "music", "hiking"],
      likes: [],
      matches: [],
      createdAt: "2024-01-04T00:00:00"
    },
    {
      id: "user_morgan",
      name: "Morgan",
      email: "morgan@shift.app",
      avatar: "https://i.pravatar.cc/150?u=morgan",
      bio: "Morgan loves connecting at events and discovering cool new spots.",
      gender: "female",
      interestedIn: ["female", "male"],
      interests: ["music", "coffee", "photography"],
      likes: [],
      matches: [],
      createdAt: "2024-01-05T00:00:00"
    },
    {
      id: "user_casey",
      name: "Casey",
      email: "casey@shift.app",
      avatar: "https://i.pravatar.cc/150?u=casey",
      bio: "Casey loves connecting at events and discovering cool new spots.",
      gender: "female",
      interestedIn: ["female"],
      interests: ["tech", "art", "hiking"],
      likes: [],
      matches: [],
      createdAt: "2024-01-06T00:00:00"
    },
    {
      id: "user_skyler",
      name: "Skyler",
      email: "skyler@shift.app",
      avatar: "https://i.pravatar.cc/150?u=skyler",
      bio: "Skyler loves connecting at events and discovering cool new spots.",
      gender: "non-binary",
      interestedIn: ["male", "female", "non-binary"],
      interests: ["art", "coffee", "outdoors"],
      likes: [],
      matches: [],
      createdAt: "2024-01-07T00:00:00"
    },
    {
      id: "user_jamie",
      name: "Jamie",
      email: "jamie@shift.app",
      avatar: "https://i.pravatar.cc/150?u=jamie",
      bio: "Jamie loves connecting at events and discovering cool new spots.",
      gender: "male",
      interestedIn: ["female", "non-binary"],
      interests: ["photography", "fitness", "art"],
      likes: [],
      matches: [],
      createdAt: "2024-01-08T00:00:00"
    },
    {
      id: "user_reese",
      name: "Reese",
      email: "reese@shift.app",
      avatar: "https://i.pravatar.cc/150?u=reese",
      bio: "Reese loves connecting at events and discovering cool new spots.",
      gender: "female",
      interestedIn: ["male"],
      interests: ["casual", "tech", "social"],
      likes: [],
      matches: [],
      createdAt: "2024-01-09T00:00:00"
    },
    {
      id: "user_quinn",
      name: "Quinn",
      email: "quinn@shift.app",
      avatar: "https://i.pravatar.cc/150?u=quinn",
      bio: "Quinn loves connecting at events and discovering cool new spots.",
      gender: "male",
      interestedIn: ["male", "female"],
      interests: ["outdoors", "music", "coffee"],
      likes: [],
      matches: [],
      createdAt: "2024-01-10T00:00:00"
    }
  ];  
  
  export const likes = [
    {
      id: "like_001",
      from: "user_morgan",
      to: "user_skyler",
      timestamp: "2025-04-10T20:01:00Z",
      matched: true
    },
    {
      id: "like_002",
      from: "user_skyler",
      to: "user_morgan",
      timestamp: "2025-04-10T20:02:00Z",
      matched: true
    },
    {
      id: "like_003",
      from: "user_taylor",
      to: "user_morgan",
      timestamp: "2025-04-10T20:03:00Z",
      matched: true
    },
    {
      id: "like_004",
      from: "user_morgan",
      to: "user_taylor",
      timestamp: "2025-04-10T20:04:00Z",
      matched: true
    },
    {
      id: "like_005",
      from: "user_quinn",
      to: "user_casey",
      timestamp: "2025-04-10T20:05:00Z",
      matched: false
    },
    {
      id: "like_006",
      from: "user_jamie",
      to: "user_quinn",
      timestamp: "2025-04-10T20:06:00Z",
      matched: false
    }
  ];
  
  export const matches = [
    {
      id: "match_001",
      users: ["user_morgan", "user_skyler"],
      createdAt: "2025-04-10T20:03:00Z",
      chat: ["msg_001", "msg_002"]
    },
    {
      id: "match_002",
      users: ["user_taylor", "user_morgan"],
      createdAt: "2025-04-10T20:05:00Z",
      chat: ["msg_003", "msg_004"]
    }
  ];
  
  export const messages = [
    {
      id: "msg_001",
      sender: "user_morgan",
      receiver: "user_skyler",
      content: "Hey Skyler, nice to match with you!",
      timestamp: "2025-04-10T20:03:00Z",
      read: true
    },
    {
      id: "msg_002",
      sender: "user_skyler",
      receiver: "user_morgan",
      content: "Hey Morgan! Excited to connect.",
      timestamp: "2025-04-10T20:04:00Z",
      read: false
    },
    {
      id: "msg_003",
      sender: "user_taylor",
      receiver: "user_morgan",
      content: "Hey Morgan, you're into coffee too?",
      timestamp: "2025-04-10T20:05:00Z",
      read: true
    },
    {
      id: "msg_004",
      sender: "user_morgan",
      receiver: "user_taylor",
      content: "Absolutely! Want to hit up Cosmic this weekend?",
      timestamp: "2025-04-10T20:06:00Z",
      read: false
    }
  ];
  export const events = [
  {
    id: "event_001",
    title: "Live Music at Zilker",
    description: "An outdoor concert under the stars featuring local acoustic bands.",
    location: { name: "Zilker Park", lat: 30.266666, lng: -97.73333 },
    image: "https://placehold.co/150",
    date: "2025-04-10T19:00:00",
    tags: ["music", "outdoors", "social"],
    capacity: 120,
    attendees: ["user_alex", "user_quinn"],
    createdBy: "user_jamie"
  },
  {
    id: "event_002",
    title: "Singles Coffee Social",
    description: "A cozy morning hangout for coffee lovers and casual chats.",
    location: { name: "Cosmic Coffee", lat: 30.2301, lng: -97.7544 },
    image: "https://placehold.co/150",
    date: "2025-04-11T10:00:00",
    tags: ["coffee", "casual", "social"],
    capacity: 60,
    attendees: ["user_gibson", "user_casey", "user_morgan"],
    createdBy: "user_casey"
  },
  {
    id: "event_003",
    title: "Art & Wine Night",
    description: "Sip wine and paint something meaningful at our guided creative mixer.",
    location: { name: "ArtHouse Studio", lat: 30.265, lng: -97.742 },
    image: "https://placehold.co/150",
    date: "2025-04-12T18:30:00",
    tags: ["art", "creative", "social"],
    capacity: 40,
    attendees: ["user_jordan", "user_reese"],
    createdBy: "user_alex"
  },
  {
    id: "event_004",
    title: "Rooftop Sunset Mixer",
    description: "Drinks, DJ, and new connections — all with skyline views.",
    location: { name: "The Sunset Lounge", lat: 30.276, lng: -97.741 },
    image: "https://placehold.co/150",
    date: "2025-04-13T19:00:00",
    tags: ["music", "social", "casual"],
    capacity: 100,
    attendees: ["user_taylor", "user_skyler", "user_jamie"],
    createdBy: "user_quinn"
  },
  {
    id: "event_005",
    title: "Hike + Hang at Barton Creek",
    description: "Explore scenic trails with a chill group and post-hike snacks.",
    location: { name: "Barton Creek Greenbelt", lat: 30.256, lng: -97.769 },
    image: "https://placehold.co/150",
    date: "2025-04-14T09:00:00",
    tags: ["outdoors", "hiking", "social"],
    capacity: 30,
    attendees: ["user_alex", "user_casey"],
    createdBy: "user_gibson"
  },
  {
    id: "event_006",
    title: "Trivia Night: Couples Edition",
    description: "Team up with someone new and test your random knowledge.",
    location: { name: "The Highball", lat: 30.247, lng: -97.769 },
    image: "https://placehold.co/150",
    date: "2025-04-14T20:00:00",
    tags: ["creative", "social", "casual"],
    capacity: 80,
    attendees: ["user_morgan", "user_jordan"],
    createdBy: "user_reese"
  },
  {
    id: "event_007",
    title: "Speed Friending + Games",
    description: "Fast-paced connections with icebreakers, games, and laughs.",
    location: { name: "Radio Coffee & Beer", lat: 30.216, lng: -97.790 },
    image: "https://placehold.co/150",
    date: "2025-04-15T18:00:00",
    tags: ["casual", "social", "games"],
    capacity: 50,
    attendees: ["user_casey", "user_morgan", "user_gibson"],
    createdBy: "user_skyler"
  },
  {
    id: "event_008",
    title: "Open Mic & Mingle",
    description: "Share your voice or cheer others on — all vibes welcome.",
    location: { name: "Native Hostel", lat: 30.264, lng: -97.733 },
    image: "https://placehold.co/150",
    date: "2025-04-16T19:30:00",
    tags: ["music", "creative", "social"],
    capacity: 60,
    attendees: ["user_alex", "user_quinn", "user_jamie"],
    createdBy: "user_taylor"
  },
  {
    id: "event_009",
    title: "Picnic & Polaroids",
    description: "Bring a blanket, grab snacks, and make new memories together.",
    location: { name: "Pease Park", lat: 30.282, lng: -97.751 },
    image: "https://placehold.co/150",
    date: "2025-04-17T17:00:00",
    tags: ["outdoors", "casual", "photography"],
    capacity: 40,
    attendees: ["user_skyler", "user_gibson"],
    createdBy: "user_jamie"
  },
  {
    id: "event_010",
    title: "Board Games & Chill",
    description: "Play classic games, meet new people, and maybe find a connection.",
    location: { name: "Emerald Tavern", lat: 30.333, lng: -97.715 },
    image: "https://placehold.co/150",
    date: "2025-04-18T18:00:00",
    tags: ["casual", "creative", "games"],
    capacity: 30,
    attendees: ["user_reese", "user_quinn"],
    createdBy: "user_taylor"
  }
];

  export const checkins = [];
