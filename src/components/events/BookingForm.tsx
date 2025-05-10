
import { useState } from "react";
import { Event } from "@/data/events";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Ticket, User, Mail, CreditCard } from "lucide-react";

interface BookingFormProps {
  event: Event;
  open: boolean;
  setOpen: (open: boolean) => void;
  formData: {
    name: string;
    email: string;
    seats: number;
  };
  validationErrors: {
    name: string;
    email: string;
    seats: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBookNowClick: () => void;
}

const BookingForm = ({ 
  event, 
  open, 
  setOpen, 
  formData, 
  validationErrors, 
  handleInputChange,
  handleBookNowClick 
}: BookingFormProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Ticket className="h-5 w-5" />
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Reserve Your Tickets
          </DialogTitle>
          <DialogDescription>
            Complete your details below to book tickets for {event.title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="font-medium flex items-center gap-1.5">
              <User className="h-4 w-4" />
              Full Name *
            </Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Enter your full name" 
              value={formData.name} 
              onChange={handleInputChange}
              className={validationErrors.name ? "border-red-500" : ""}
              aria-required="true"
            />
            {validationErrors.name && (
              <p className="text-xs text-red-500 mt-1">{validationErrors.name}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-medium flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              Email Address *
            </Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="your.email@example.com" 
              value={formData.email} 
              onChange={handleInputChange}
              className={validationErrors.email ? "border-red-500" : ""}
              aria-required="true"
            />
            {validationErrors.email && (
              <p className="text-xs text-red-500 mt-1">{validationErrors.email}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="seats" className="font-medium flex items-center gap-1.5">
              <Ticket className="h-4 w-4" />
              Number of Tickets *
            </Label>
            <Input 
              id="seats" 
              name="seats" 
              type="number" 
              min={1} 
              max={event.availableSeats}
              placeholder="1" 
              value={formData.seats} 
              onChange={handleInputChange}
              className={validationErrors.seats ? "border-red-500" : ""}
              aria-required="true"
            />
            {validationErrors.seats && (
              <p className="text-xs text-red-500 mt-1">{validationErrors.seats}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Maximum {event.availableSeats} tickets available
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between items-center p-3 bg-muted rounded-md">
              <span className="font-medium flex items-center gap-1.5">
                <CreditCard className="h-4 w-4" />
                Total Price:
              </span>
              <span className="font-bold text-lg">${event.price * formData.seats}</span>
            </div>
            <Button type="button" className="w-full" onClick={handleBookNowClick}>
              Proceed to Book
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
