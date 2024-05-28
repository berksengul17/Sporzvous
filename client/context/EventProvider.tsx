import { User, useUserContext } from "@/context/UserProvider";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

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
};

type CreateEvent = Omit<Event, "eventId">;

// Define the type for the context
type EventContextType = {
  events: Event[];
  fetchAllEvents: () => Promise<void>;
  fetchMyEvents: () => Promise<Event[]>;
  fetchEvent: (id: number) => Promise<Event>;
  addEvent: (event: CreateEvent) => void;
  updateEvent: (id: number, updatedEvent: Event) => void;
  removeEvent: (id: number) => void;
  filterEvents: (
    sport: string,
    location: string,
    date: string,
    rating: number
  ) => Promise<void>;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL + "/api/event";

// Create the context
const EventContext = createContext<EventContextType | null>(null);

// EventProvider component
export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();
  const [errorAddEvent, setErrorAddEvent] = useState("");
  const [events, setEvents] = useState<Event[]>([
    {
      eventId: 1,
      title: "Sert Tenis",
      sport: "Tennis",
      locationCity: "İzmir",
      locationDistrict: "Urla",
      participants: 2,
      maxParticipants: 2,
      teamNumber: 2,
      eventDate: "2024-06-12",
      eventTime: "07:00",
      skillRating: 3,
      locationIndex: "1",
      isEventOver: 1,
      organizer: {
        userId: 1,
        image: "profile1.jpg",
        email: "email1@test.com",
        username: "serttenisçi",
        fullName: "Emrecan Çuhadar",
        age: 29,
        gender: "Male",
        favoriteSport: "Table Tennis",
      },
    },
    {
      eventId: 2,
      title: "Çağanın halısaha",
      sport: "Football",
      locationCity: "İzmir",
      locationDistrict: "Bornova",
      participants: 14,
      maxParticipants: 14,
      teamNumber: 2,
      eventDate: "2024-06-15",
      eventTime: "16:00",
      skillRating: 4,
      locationIndex: "2",
      isEventOver: 1,
      organizer: {
        userId: 2,
        image: "profile2.jpg",
        email: "email2@test.com",

        username: "caanozsir",
        fullName: "Çağan Özsır",
        age: 34,
        gender: "Male",
        favoriteSport: "Football",
      },
    },
    {
      eventId: 3,
      title: "halısaha",
      sport: "Football",
      locationCity: "İzmir",
      locationDistrict: "Urla",
      participants: 10,
      maxParticipants: 12,
      teamNumber: 1,
      eventDate: "2024-06-18",
      eventTime: "21:00",
      skillRating: 2,
      locationIndex: "3",
      isEventOver: 0,
      organizer: {
        userId: 3,
        image: "profile3.jpg",
        email: "email3@test.com",
        username: "Phytox",
        fullName: "Berk Şengül",
        age: 26,
        gender: "Male",
        favoriteSport: "Football",
      },
    },
    {
      eventId: 4,
      title: "Football Match",
      sport: "Football",
      locationCity: "London",
      locationDistrict: "Hyde Park",
      participants: 14,
      maxParticipants: 22,
      teamNumber: 2,
      eventDate: "2024-06-20",
      eventTime: "14:00",
      skillRating: 5,
      locationIndex: "4",
      isEventOver: 0,
      organizer: {
        userId: 4,
        image: "profile4.jpg",
        email: "email4@test.com",
        username: "soccer_fan",
        fullName: "Samantha Reed",
        age: 32,
        gender: "Female",
        favoriteSport: "Football",
      },
    },
    {
      eventId: 5,
      title: "İyte Basket",
      sport: "Basketball",
      locationCity: "İzmir",
      locationDistrict: "Urla",
      participants: 6,
      maxParticipants: 8,
      teamNumber: 2,
      eventDate: "2024-06-22",
      eventTime: "18:00",
      skillRating: 3,
      locationIndex: "5",
      isEventOver: 0,
      organizer: {
        userId: 5,
        image: "profile5.jpg",
        email: "email5@test.com",
        username: "NightRaiden",
        fullName: "Emre Erol",
        age: 28,
        gender: "Male",
        favoriteSport: "Football",
      },
    },
  ]);

  useEffect(() => {
    fetchAllEvents();
  }, [user]);

  const fetchAllEvents = async () => {
    const response = await axios.get(`${API_URL}/get-events/${user.userId}`);
    setEvents(response.data);
  };

  const fetchMyEvents = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/get-my-events/${user.userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
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
      setErrorAddEvent(""); // Clear any previous errors
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

      setErrorAddEvent(errorMessage);
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

  const filterEvents = async (
    sport: string,
    location: string,
    date: string,
    rating: number
  ) => {
    try {
      const today = new Date();

      let dateFilter;
      switch (date) {
        case "All":
          dateFilter = null;
          break;
        case "Today":
          dateFilter = today.toISOString().split("T")[0];
          break;
        case "This Week":
          const lastWeek = new Date();
          lastWeek.setDate(today.getDate() - 7);
          dateFilter = lastWeek.toISOString().split("T")[0];
          break;
        case "This Month":
          const lastMonth = new Date();
          lastMonth.setMonth(today.getMonth() - 1);
          dateFilter = lastMonth.toISOString().split("T")[0];
          break;
      }

      const filteredEvents = await axios.get(`${API_URL}/filter`, {
        params: {
          sport: sport === "All" ? null : sport,
          locationDistrict: location === "All" ? null : location,
          eventDate: dateFilter,
          minRating: rating,
        },
      });
      console.log("filtered events", filteredEvents.data);
      setEvents(filteredEvents.data);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    events,
    setEvents,
    fetchAllEvents,
    fetchMyEvents,
    fetchEvent,
    addEvent,
    updateEvent,
    removeEvent,
    filterEvents,
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
