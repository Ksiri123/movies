
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Event } from "../data/events";

interface Booking {
  id: string;
  eventId: string;
  name: string;
  email: string;
  seats: number;
  date: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "date">) => void;
  cancelBooking: (id: string) => void;
  getBookingsByEventId: (eventId: string) => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem("eventBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("eventBookings", JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking: Omit<Booking, "id" | "date">) => {
    const newBooking = {
      ...booking,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  const getBookingsByEventId = (eventId: string) => {
    return bookings.filter((booking) => booking.eventId === eventId);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, getBookingsByEventId }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
};
