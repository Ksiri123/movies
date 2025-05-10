
import MovieCard from "./MovieCard";
import { Movie } from "@/services/movieService";
import { Skeleton } from "@/components/ui/skeleton";
import { Film, TrendingUp, ThumbsUp, Gallery, Image, GalleryHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  isLoading?: boolean;
  error?: Error;
  type?: "trending" | "popular" | "default";
}

const MovieGrid = ({ movies, title, isLoading, error, type = "default" }: MovieGridProps) => {
  if (error) {
    return <div className="text-center my-12 text-red-500">Error loading movies: {error.message}</div>;
  }

  const renderIcon = () => {
    switch (type) {
      case "trending":
        return <TrendingUp className="h-6 w-6 text-movie-primary" />;
      case "popular":
        return <ThumbsUp className="h-6 w-6 text-movie-accent" />;
      default:
        return <Film className="h-6 w-6 text-movie-primary" />;
    }
  };

  const getGradientClass = () => {
    switch (type) {
      case "trending":
        return "from-movie-primary/15 via-transparent to-transparent";
      case "popular":
        return "from-movie-accent/15 via-transparent to-transparent";
      default:
        return "from-gray-800/20 via-transparent to-transparent";
    }
  };

  if (isLoading) {
    return (
      <div className={cn("my-8 rounded-lg p-6", `bg-gradient-to-r ${getGradientClass()}`)}>
        {title && (
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-shadow">
            {renderIcon()}
            <span>{title}</span>
            <GalleryHorizontal className="h-5 w-5 ml-1 text-white/70" />
          </h2>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2 animate-pulse">
              <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gradient-to-b from-movie-card to-movie-secondary/40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image className="h-10 w-10 text-white/20" />
                </div>
              </div>
              <Skeleton className="w-3/4 h-5" />
              <Skeleton className="w-1/2 h-4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center my-12 flex flex-col items-center gap-4">
        <Gallery className="h-16 w-16 text-movie-muted opacity-50" />
        <p>No movies found</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "my-8 animate-fade-in rounded-lg p-6 transition-all duration-500",
      `bg-gradient-to-r ${getGradientClass()}`
    )}>
      {title && (
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-shadow">
          {renderIcon()}
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text">{title}</span>
          <GalleryHorizontal className="h-5 w-5 ml-1 text-white/70" />
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} type={type} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
