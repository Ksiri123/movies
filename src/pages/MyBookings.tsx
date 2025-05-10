
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBookings } from "@/context/BookingContext";
import { events } from "../data/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { Calendar, User, Mail, Ticket } from "lucide-react";

const MyBookings = () => {
  const { bookings, cancelBooking } = useBookings();
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);

  // Sort bookings by date (newest first)
  const sortedBookings = [...bookings].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getEventDetails = (eventId: string) => {
    return events.find(event => event.id === eventId);
  };

  const handleCancelBooking = () => {
    if (bookingToCancel) {
      cancelBooking(bookingToCancel);
      setBookingToCancel(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">No Bookings Yet</h2>
        <p className="text-muted-foreground mt-2">You haven't booked any events yet.</p>
        <Button className="mt-4" asChild>
          <Link to="/events">Browse Events</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">My Bookings</h1>
        <p className="text-muted-foreground">View and manage your event bookings</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedBookings.map(booking => {
          const event = getEventDetails(booking.eventId);
          
          if (!event) return null;
          
          return (
            <Card key={booking.id} className="overflow-hidden h-full">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{format(new Date(event.date), 'MMMM dd, yyyy')} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.seats} {booking.seats > 1 ? 'tickets' : 'ticket'}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/event/${event.id}`}>View Event</Link>
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" onClick={() => setBookingToCancel(booking.id)}>
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will cancel your booking for "{event.title}". This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setBookingToCancel(null)}>No, keep my booking</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelBooking}>
                        Yes, cancel booking
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
