import { useCallback } from "react";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({children}) => {
  const [events, _setEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('events') || '{}');
    _setEvents(events);
  }, []);

  const setEvents = useCallback(events => {
    _setEvents(events);
    localStorage.setItem('events', JSON.stringify(events));
  }, []);

  return (
    <EventContext.Provider value={{events, setEvents, selectedEvent, setSelectedEvent}}>
      {children}
    </EventContext.Provider>
  );
};
