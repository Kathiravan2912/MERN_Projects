import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventCount, setEventCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  return (
    <EventContext.Provider value={{ eventCount, setEventCount }}>
      {children}
    </EventContext.Provider>
  );
};
