
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EventNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold">Event not found</h2>
      <p className="text-muted-foreground mt-2">The event you're looking for doesn't exist.</p>
      <Button className="mt-4" onClick={() => navigate("/events")}>
        Back to Events
      </Button>
    </div>
  );
};

export default EventNotFound;
