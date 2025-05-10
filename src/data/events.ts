
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  image: string;
  galleryImages?: string[];
  price: number;
  availableSeats: number;
}

export const categories = [
  "all",
  "music", 
  "tech", 
  "sports", 
  "art", 
  "food", 
  "business"
];

export const events: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    date: "2025-06-15",
    time: "09:00 AM",
    location: "Convention Center, San Francisco",
    category: "tech",
    description: "Join industry leaders and innovators for our annual technology conference. Discover the latest trends, participate in workshops, and expand your professional network.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=2074&auto=format&fit=crop"
    ],
    price: 299,
    availableSeats: 500
  },
  {
    id: "2",
    title: "Summer Music Festival",
    date: "2025-07-20",
    time: "4:00 PM",
    location: "Central Park, New York",
    category: "music",
    description: "Experience the ultimate summer music festival featuring top artists from around the world. Three days of non-stop music across five stages.",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop"
    ],
    price: 150,
    availableSeats: 5000
  },
  {
    id: "3",
    title: "Basketball Championship",
    date: "2025-08-05",
    time: "7:00 PM",
    location: "Sports Arena, Los Angeles",
    category: "sports",
    description: "Watch the best basketball teams compete in the championship finals. Experience the thrill, excitement, and drama of top-level basketball.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518614368389-5160c0b0ccae?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=2033&auto=format&fit=crop"
    ],
    price: 85,
    availableSeats: 15000
  },
  {
    id: "4",
    title: "Art Exhibition: Modern Masters",
    date: "2025-06-30",
    time: "10:00 AM",
    location: "Metropolitan Museum, New York",
    category: "art",
    description: "Explore an exceptional collection of modern masterpieces from renowned artists of the 20th century. Audio guides and expert tours available.",
    image: "https://images.unsplash.com/photo-1594794312433-28be7c606dda?q=80&w=1974&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1512418408532-4056efc90616?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587826154528-3ced51db945c?q=80&w=2070&auto=format&fit=crop"
    ],
    price: 25,
    availableSeats: 200
  },
  {
    id: "5",
    title: "Food & Wine Festival",
    date: "2025-09-12",
    time: "12:00 PM",
    location: "Waterfront Park, Chicago",
    category: "food",
    description: "Indulge in a culinary adventure featuring gourmet food, premium wines, and cooking demonstrations from celebrity chefs. Taste the best local and international cuisines.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2087&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop"
    ],
    price: 75,
    availableSeats: 1000
  },
  {
    id: "6",
    title: "Business Leadership Summit",
    date: "2025-10-08",
    time: "8:30 AM",
    location: "Grand Hotel, Boston",
    category: "business",
    description: "Connect with industry leaders and learn strategies for business growth and innovation. Featuring keynote speakers, panel discussions, and networking opportunities.",
    image: "https://images.unsplash.com/photo-1560523159-4a9692d222f8?q=80&w=2036&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=2076&auto=format&fit=crop"
    ],
    price: 350,
    availableSeats: 300
  }
];
