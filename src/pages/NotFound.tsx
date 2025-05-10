
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-5xl font-bold mb-4 text-movie-primary">404</h1>
      <p className="text-xl text-movie-text mb-6">Oops! We couldn't find that page</p>
      <p className="text-movie-muted mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved to another location.
      </p>
      <Button asChild>
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
