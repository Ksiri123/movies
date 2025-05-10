
import { format } from "date-fns";
import { Event } from "@/data/events";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface BookingConfirmationProps {
  event: Event;
  formData: {
    name: string;
    email: string;
    seats: number;
  };
  confirmOpen: boolean;
  setConfirmOpen: (open: boolean) => void;
  handleBooking: () => void;
}

const BookingConfirmation = ({ 
  event, 
  formData, 
  confirmOpen, 
  setConfirmOpen, 
  handleBooking 
}: BookingConfirmationProps) => {
  return (
    <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Your Booking</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-4">
              <p>Please verify your booking details:</p>
              <div className="bg-muted p-4 rounded-md space-y-3">
                <div className="grid grid-cols-2">
                  <span className="font-medium">Event:</span>
                  <span>{event.title}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-medium">Date:</span>
                  <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-medium">Name:</span>
                  <span>{formData.name}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-medium">Email:</span>
                  <span>{formData.email}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-medium">Tickets:</span>
                  <span>{formData.seats}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-medium">Total Price:</span>
                  <span className="font-bold">${event.price * formData.seats}</span>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleBooking}>Confirm Booking</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookingConfirmation;
