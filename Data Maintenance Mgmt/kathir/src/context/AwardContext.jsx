import React, { createContext, useState } from 'react';

export const AwardContext = createContext();

export const AwardProvider = ({ children }) => {
  const [awardCount, setAwardCount] = useState(0);

  return (
    <AwardContext.Provider value={{ awardCount, setAwardCount }}>
      {children}
    </AwardContext.Provider>
  );
};
