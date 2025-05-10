
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, GalleryHorizontal, Image } from "lucide-react";
import { format } from "date-fns";
import { Event } from "@/data/events";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EventHeaderProps {
  event: Event;
}

const EventHeader = ({ event }: EventHeaderProps) => {
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  
  return (
    <>
      <div className="rounded-lg overflow-hidden relative">
        {!mainImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/80">
            <div className="w-12 h-12 border-4 border-movie-primary/30 border-t-movie-primary rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={event.image} 
          alt={event.title} 
          className={cn(
            "w-full h-64 object-cover md:h-96 transition-all duration-500",
            mainImageLoaded ? "opacity-100" : "opacity-0",
            "hover:scale-105 transition-transform duration-700"
          )}
          onLoad={() => setMainImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <Badge className="capitalize bg-movie-primary hover:bg-movie-primary/90">{event.category}</Badge>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text">{event.title}</h1>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-muted-foreground group hover:text-white transition-colors duration-300">
            <Calendar className="h-5 w-5 text-movie-primary group-hover:scale-110 transition-transform duration-300" />
            <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground group hover:text-white transition-colors duration-300">
            <Clock className="h-5 w-5 text-movie-primary group-hover:scale-110 transition-transform duration-300" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground group hover:text-white transition-colors duration-300">
            <MapPin className="h-5 w-5 text-movie-primary group-hover:scale-110 transition-transform duration-300" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground group hover:text-white transition-colors duration-300">
            <Users className="h-5 w-5 text-movie-primary group-hover:scale-110 transition-transform duration-300" />
            <span>{event.availableSeats} seats available</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            About this event
          </h2>
          <p className="text-muted-foreground leading-relaxed">{event.description}</p>
        </div>

        {event.galleryImages && event.galleryImages.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              Event Gallery
              <GalleryHorizontal className="h-5 w-5 text-movie-primary" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {event.galleryImages.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden h-48 group relative hover:shadow-lg hover:shadow-movie-primary/20 transition-all duration-300">
                  <img 
                    src={image} 
                    alt={`${event.title} gallery ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Image className="h-8 w-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventHeader;
