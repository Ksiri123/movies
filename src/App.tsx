
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

// Event Booking App
import EventsHome from "./pages/EventsHome";
import EventDetails from "./pages/EventDetails";
import MyBookings from "./pages/MyBookings";
import { BookingProvider } from "./context/BookingContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BookingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Movie App Routes */}
              <Route index element={<HomePage />} />
              <Route path="movie/:id" element={<MovieDetails />} />
              <Route path="search" element={<SearchResults />} />
              
              {/* Event Booking App Routes */}
              <Route path="events" element={<EventsHome />} />
              <Route path="event/:id" element={<EventDetails />} />
              <Route path="my-bookings" element={<MyBookings />} />
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </BookingProvider>
  </QueryClientProvider>
);

export default App;
