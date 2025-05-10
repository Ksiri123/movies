import { BASE_URL, API_KEY } from "../config/api";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieResponse {
  results: Movie[];
  total_results: number;
  total_pages: number;
  page: number;
}

// Fetch popular movies
export const fetchPopularMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }
  
  return response.json();
};

// Fetch trending movies
export const fetchTrendingMovies = async (timeWindow = "day"): Promise<MovieResponse> => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}&language=en-US`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }
  
  return response.json();
};

// For backwards compatibility with other components
export const fetchPopular = fetchPopularMovies;
export const fetchTrending = fetchTrendingMovies;

// Search movies
export const searchMovies = async (query: string, page = 1): Promise<MovieResponse> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to search movies");
  }
  
  return response.json();
};

// Get movie details
export const getMovieDetails = async (id: string): Promise<Movie> => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  
  return response.json();
};
