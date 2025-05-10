
import { useState } from "react";
import { Link } from "react-router-dom";
import { events, categories } from "../data/events";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

const EventsHome = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const filteredEvents = selectedCategory === "all"
    ? events
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Upcoming Events</h1>
        <p className="text-muted-foreground">Browse and book tickets for upcoming events</p>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Badge 
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer text-sm capitalize"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      {/* Events grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map(event => (
          <Link to={`/event/${event.id}`} key={event.id}>
            <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105" 
                />
                <Badge className="absolute top-2 right-2">
                  {event.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold line-clamp-2">{event.title}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={event.date}>
                    {format(new Date(event.date), 'MMMM dd, yyyy')} at {event.time}
                  </time>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{event.location}</p>
              </CardContent>
              <CardFooter className="px-4 py-3 border-t flex justify-between items-center">
                <p className="font-medium">${event.price}</p>
                <Badge variant="outline">{event.availableSeats} seats left</Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-muted-foreground">Try selecting a different category</p>
        </div>
      )}
    </div>
  );
};

export default EventsHome;
