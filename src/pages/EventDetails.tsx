
import { useState } from "react";
import { useParams } from "react-router-dom";
import { events } from "../data/events";
import { Button } from "@/components/ui/button";
import { useBookings } from "@/context/BookingContext";
import { useToast } from "@/hooks/use-toast";

// Import our new components
import EventHeader from "@/components/events/EventHeader";
import BookingForm from "@/components/events/BookingForm";
import BookingConfirmation from "@/components/events/BookingConfirmation";
import EventNotFound from "@/components/events/EventNotFound";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addBooking } = useBookings();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    seats: 1,
  });
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    seats: "",
  });

  const event = events.find(event => event.id === id);

  if (!event) {
    return <EventNotFound />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "seats" ? parseInt(value) || 0 : value,
    }));

    // Clear validation error when user types
    setValidationErrors(prev => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      seats: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (formData.seats < 1) {
      errors.seats = "At least 1 seat is required";
      isValid = false;
    } else if (formData.seats > event.availableSeats) {
      errors.seats = `Only ${event.availableSeats} seats available`;
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleBookNowClick = () => {
    if (validateForm()) {
      setConfirmOpen(true);
    }
  };

  const handleBooking = () => {
    addBooking({
      eventId: event.id,
      name: formData.name,
      email: formData.email,
      seats: formData.seats,
    });

    setOpen(false);
    setConfirmOpen(false);
    
    toast({
      title: "Booking confirmed!",
      description: `You've successfully booked ${formData.seats} seat(s) for ${event.title}`,
    });

    setFormData({
      name: "",
      email: "",
      seats: 1,
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <EventHeader event={event} />

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-2xl font-bold">${event.price}</p>
          <p className="text-sm text-muted-foreground">per person</p>
        </div>

        <BookingForm
          event={event}
          open={open}
          setOpen={setOpen}
          formData={formData}
          validationErrors={validationErrors}
          handleInputChange={handleInputChange}
          handleBookNowClick={handleBookNowClick}
        />

        <BookingConfirmation
          event={event}
          formData={formData}
          confirmOpen={confirmOpen}
          setConfirmOpen={setConfirmOpen}
          handleBooking={handleBooking}
        />
      </div>
    </div>
  );
};

export default EventDetails;
