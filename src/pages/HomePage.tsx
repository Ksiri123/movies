
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingMovies, fetchPopularMovies } from "@/services/movieService";
import MovieGrid from "@/components/MovieGrid";
import { Button } from "@/components/ui/button";
import { Film, TrendingUp, ThumbsUp, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"trending" | "popular">("trending");

  // Use the appropriate query based on the active tab
  const { data, isLoading, error } = useQuery({
    queryKey: [activeTab],
    queryFn: () => {
      return activeTab === "trending" 
        ? fetchTrendingMovies() 
        : fetchPopularMovies();
    },
  });

  const handleTabChange = (tab: "trending" | "popular") => {
    setActiveTab(tab);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl flex items-center gap-2">
          <Film className="h-8 w-8 text-movie-primary" />
          Discover Movies
        </h1>
        <p className="text-muted-foreground">Find your next favorite film from our collection.</p>
      </div>

      <div className="flex space-x-2 pb-4">
        <Button
          variant={activeTab === "trending" ? "default" : "outline"}
          onClick={() => handleTabChange("trending")}
          className={activeTab === "trending" ? "bg-movie-primary hover:bg-movie-primary/90" : ""}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Trending
        </Button>
        <Button
          variant={activeTab === "popular" ? "default" : "outline"}
          onClick={() => handleTabChange("popular")}
          className={activeTab === "popular" ? "bg-movie-accent hover:bg-movie-accent/90" : ""}
        >
          <ThumbsUp className="mr-2 h-4 w-4" />
          Popular
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate("/events")} 
          className="border-movie-secondary text-movie-secondary hover:bg-movie-secondary/10"
        >
          <Ticket className="mr-2 h-4 w-4" />
          Events
        </Button>
      </div>

      <MovieGrid 
        movies={data?.results || []} 
        isLoading={isLoading} 
        error={error as Error} 
        title={activeTab === "trending" ? "Trending Movies" : "Popular Movies"}
        type={activeTab}
      />
    </div>
  );
};

export default HomePage;
