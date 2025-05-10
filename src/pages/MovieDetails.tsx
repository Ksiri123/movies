
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "@/services/movieService";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, DEFAULT_POSTER, DEFAULT_BACKDROP } from "@/config/api";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: movie, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-movie-primary animate-pulse">Loading movie details...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center my-12">
        <p className="text-red-500 mb-4">Failed to load movie details</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${movie.backdrop_path}`
    : DEFAULT_BACKDROP;

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`
    : DEFAULT_POSTER;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const formattedDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  const formatRuntime = (minutes: number | undefined) => {
    if (!minutes) return "Unknown";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="animate-fade-in">
      {/* Backdrop with gradient overlay */}
      <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden -mx-4">
        <div className="absolute inset-0 bg-gradient-to-t from-movie-background via-movie-background/90 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-movie-background to-transparent z-[1]" />
        <img
          src={backdropUrl}
          alt={`${movie.title} backdrop`}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_BACKDROP;
          }}
        />
      </div>

      {/* Back button */}
      <div className="relative z-[2] -mt-[350px] md:-mt-[450px] px-4">
        <Button 
          variant="ghost"
          className="mb-4 text-movie-text hover:text-movie-primary hover:bg-movie-card/50"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>

      {/* Movie info */}
      <div className="container mx-auto relative z-[2] -mt-40 md:-mt-60 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-48 h-72 md:w-64 md:h-96 flex-shrink-0 rounded-lg overflow-hidden shadow-lg mx-auto md:mx-0">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_POSTER;
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-shadow">
              {movie.title} <span className="text-movie-muted font-normal">({releaseYear})</span>
            </h1>
            
            {movie.genres && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span 
                    key={genre.id}
                    className="bg-movie-primary/20 text-movie-primary px-2 py-1 rounded-md text-xs"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-6 text-sm text-movie-muted">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-movie-primary">
                  {(movie.vote_average / 10).toFixed(1)}
                </span>
                <span>/ 1.0</span>
              </div>
              <div>{formatRuntime(movie.runtime)}</div>
              <div>{formattedDate}</div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-movie-text/90 leading-relaxed">
                {movie.overview || "No overview available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
