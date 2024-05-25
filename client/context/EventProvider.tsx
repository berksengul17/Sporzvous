import React, { createContext, useContext, useState } from "react";
import { User, UserProvider } from "@/context/UserProvider";

// Define the type for an event
type Event = {
  id: number;
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

// Define the type for the context
type EventContextType = {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: number, updatedEvent: Event) => void;
  removeEvent: (id: number) => void;
};

// Create the context
const EventContext = createContext<EventContextType | null>(null);

// EventProvider component
export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
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
        id: "1",
        image: "profile1.jpg",
        username: "serttenisçi",
        fullName: "Emrecan Çuhadar",
        age: "29",
        gender: "Male",
        favoriteSport: "Table Tennis",
      },
    },
    {
      id: 2,
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
        id: "2",
        image: "profile2.jpg",
        username: "caanozsir",
        fullName: "Çağan Özsır",
        age: "34",
        gender: "Male",
        favoriteSport: "Football",
      },
    },
    {
      id: 3,
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
        id: "3",
        image: "profile3.jpg",
        username: "Phytox",
        fullName: "Berk Şengül",
        age: "26",
        gender: "Male",
        favoriteSport: "Football",
      },
    },
    {
      id: 4,
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
        id: "4",
        image: "profile4.jpg",
        username: "soccer_fan",
        fullName: "Samantha Reed",
        age: "32",
        gender: "Female",
        favoriteSport: "Football",
      },
    },
    {
      id: 5,
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
        id: "5",
        image: "profile5.jpg",
        username: "NightRaiden",
        fullName: "Emre Erol",
        age: "28",
        gender: "Male",
        favoriteSport: "Football",
      },
    },
  ]);

  const addEvent = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const updateEvent = (id: number, updatedEvent: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    );
  };

  const removeEvent = (id: number) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const value = { events, setEvents, addEvent, updateEvent, removeEvent };

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
