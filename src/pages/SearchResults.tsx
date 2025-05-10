
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/services/movieService";
import MovieGrid from "@/components/MovieGrid";
import { Button } from "@/components/ui/button";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => searchMovies(query, page),
    enabled: !!query,
  });

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
    if (query) {
      refetch();
    }
  }, [query, refetch]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (!query) {
    return (
      <div className="text-center my-12">
        <h2 className="text-2xl font-bold mb-4">No Search Query</h2>
        <p>Please enter a movie title to search</p>
      </div>
    );
  }

  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-movie-primary animate-pulse">Searching...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 my-12">
        Error searching movies. Please try again.
      </div>
    );
  }

  const hasResults = data?.results && data.results.length > 0;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        {hasResults
          ? `Search results for "${query}"`
          : `No results found for "${query}"`}
      </h2>

      {hasResults && (
        <>
          <MovieGrid movies={data.results} />
          
          {page < (data.total_pages || 1) && (
            <div className="flex justify-center mt-8">
              <Button 
                onClick={loadMore}
                variant="outline"
                className="border-movie-primary text-movie-primary hover:bg-movie-primary/20"
              >
                Load More Results
              </Button>
            </div>
          )}
        </>
      )}

      {!hasResults && !isLoading && (
        <div className="text-center my-12 text-movie-muted">
          <p>Try searching for another movie or check your spelling</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
