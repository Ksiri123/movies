
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL, POSTER_SIZE, DEFAULT_POSTER } from "@/config/api";
import { Card } from "@/components/ui/card";
import { Movie } from "@/services/movieService";
import { useState } from "react";
import { TrendingUp, ThumbsUp, Image, Gallery } from "lucide-react";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  type?: "trending" | "popular" | "default";
}

const MovieCard = ({ movie, type = "default" }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`
    : DEFAULT_POSTER;

  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : "N/A";

  const rating = movie.vote_average ? (movie.vote_average / 10).toFixed(1) : "?";
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    e.currentTarget.src = DEFAULT_POSTER;
  };

  const getBorderColor = () => {
    if (type === "trending") return "border-movie-primary";
    if (type === "popular") return "border-movie-accent";
    return "border-transparent";
  };
  
  return (
    <Link to={`/movie/${movie.id}`}>
      <Card 
        className={cn(
          "rounded-lg overflow-hidden h-full bg-movie-card border-movie-card transition-all duration-300 transform hover:scale-105 hover:shadow-xl",
          isHovered ? `shadow-lg ${type === "trending" ? "shadow-movie-primary/30" : type === "popular" ? "shadow-movie-accent/30" : "shadow-white/20"}` : "",
          getBorderColor()
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[2/3] relative group">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-movie-card">
              <div className="w-10 h-10 border-4 border-movie-primary/30 border-t-movie-primary rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={posterUrl} 
            alt={movie.title} 
            className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

          {/* Rating badge with pulse effect on hover */}
          <div className={`absolute top-2 right-2 ${isHovered ? "bg-movie-primary" : type === "trending" ? "bg-movie-primary/80" : "bg-movie-accent/80"} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm transition-all duration-300 ${isHovered ? "scale-110" : ""}`}>
            {rating}
          </div>

          {/* Type indicator with icons */}
          {type === "trending" && (
            <div className="absolute top-2 left-2 bg-movie-primary text-white rounded-full p-1.5 transition-transform duration-300 hover:scale-110">
              <TrendingUp size={16} />
            </div>
          )}
          {type === "popular" && (
            <div className="absolute top-2 left-2 bg-movie-accent text-white rounded-full p-1.5 transition-transform duration-300 hover:scale-110">
              <ThumbsUp size={16} />
            </div>
          )}

          {/* Image gallery indicator */}
          {movie.backdrop_path && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Gallery size={16} />
            </div>
          )}
        </div>
        <div className="p-4 relative">
          <h3 className="font-semibold text-sm truncate group-hover:text-movie-primary transition-colors duration-300">{movie.title}</h3>
          <p className="text-movie-muted text-xs mt-1">{releaseYear}</p>
          
          {/* Only show on hover */}
          {isHovered && (
            <div className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-movie-primary to-movie-accent transform translate-y-1/2 opacity-80"></div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default MovieCard;
