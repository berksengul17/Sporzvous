import { User, useUserContext } from "@/context/UserProvider";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";

export type Team = {
  teamId: number;
  teamName: string;
  users: User[];
  score: number;
};

// Define the type for an event
export type Event = {
  eventId: number;
  title: string;
  sport: string;
  locationCity: string;
  locationDistrict: string;
  participants: number;
  maxParticipants: number;
  teamNumber: number;
  eventDate: string;
  eventTime: string;
  skillRating: number;
  locationIndex: string;
  isEventOver: number;
  organizer: User;
  organizerImage?: string;
  latitude: number;
  longitude: number;
  teams: Team[];
};

type CreateEvent = Omit<Event, "eventId" | "teams">;

type Filter = {
  location: string;
  date: string;
  rating: number;
};

// Define the type for the context
type EventContextType = {
  events: Event[];
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  fetchAllEvents: () => Promise<void>;
  fetchMyEvents: () => Promise<Event[]>;
  fetchEvent: (id: number) => Promise<Event>;
  addEvent: (event: CreateEvent) => Promise<void>;
  updateEvent: (id: number, updatedEvent: Event) => void;
  removeEvent: (id: number) => void;
  filterEvents: () => Promise<void>;
  addScore: (
    eventId: number,
    firstTeamScore: string,
    secondTeamScore: string
  ) => Promise<void>;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL + "/api/event";

// Create the context
const EventContext = createContext<EventContextType | null>(null);

// EventProvider component
export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<Filter>({
    location: "All",
    date: "All",
    rating: 0,
  });

  const fetchAllEvents = async () => {
    const response = await axios.get(`${API_URL}/get-events/${user.userId}`);
    setEvents(response.data);
  };

  const fetchMyEvents = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/get-my-events/${user.userId}`
      );
      console.log("RESPONSE", response.data);

      const events = response.data.map((event: Event) => {
        console.log("Processing event:", event);
        return {
          ...event,
          eventTime: event.eventTime.slice(0, 5),
        };
      });

      console.log("MY EVENTS", events);

      return events;
    } catch (error) {
      console.log("Error fetching my events:", error);
    }
  };

  const fetchEvent = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/get-event/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addEvent = async (event: CreateEvent) => {
    try {
      const response = await axios.post(`${API_URL}/create`, event);
      fetchAllEvents(); // Optionally update events state if needed
    } catch (err) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (axios.isAxiosError(err)) {
        // err is an AxiosError here
        if (err.response && err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error; // Use the error message from the backend
        } else if (err instanceof Error) {
          // Handle other types of errors (non-Axios errors)
          errorMessage = err.response?.data;
        }
      }
      throw new Error(errorMessage); // Throw the error so it can be caught in the component
    }
  };

  const updateEvent = (id: number, updatedEvent: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.eventId === id ? { ...event, ...updatedEvent } : event
      )
    );
  };

  const removeEvent = (id: number) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.eventId !== id)
    );
  };

  const filterEvents = async () => {
    try {
      let startDate;
      let endDate;
      let currDate: Date = new Date();
      switch (filter.date) {
        case "All":
          startDate = null;
          endDate = null;
          break;
        case "Today":
          startDate = currDate.toISOString().split("T")[0];
          endDate = currDate.toISOString().split("T")[0];
          break;
        case "This Week":
          const first = currDate.getDate() - currDate.getDay();
          const last = first + 6;
          startDate = currDate.toISOString().split("T")[0];
          endDate = new Date(currDate.setDate(last))
            .toISOString()
            .split("T")[0];
          break;
        case "This Month":
          const year = currDate.getFullYear();
          const month = currDate.getMonth() + 1;
          endDate = new Date(year, month, 0).toISOString().split("T")[0];
          break;
      }

      const filteredEvents = await axios.get(`${API_URL}/filter`, {
        params: {
          locationDistrict: filter.location === "All" ? null : location,
          startDate,
          endDate,
          minRating: filter.rating,
        },
      });

      setEvents(
        filteredEvents.data.map((event: Event) => ({
          ...event,
          eventTime: event.eventTime.slice(0, 5),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addScore = async (
    eventId: number,
    teamAScore: string,
    teamBScore: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("firstTeamScore", teamAScore);
      formData.append("secondTeamScore", teamBScore);

      await axios.post(`${API_URL}/addScore/${eventId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    }
  };

  const value = {
    events,
    filter,
    setFilter,
    fetchAllEvents,
    fetchMyEvents,
    fetchEvent,
    addEvent,
    updateEvent,
    removeEvent,
    filterEvents,
    addScore,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within a EventProvider");
  }
  return context;
};
