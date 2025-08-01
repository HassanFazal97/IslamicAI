// ChatContext.js
import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [preferences, setPreferences] = useState({});

  return (
    <ChatContext.Provider value={{ sessions, setSessions, currentSession, setCurrentSession, preferences, setPreferences }}>
      {children}
    </ChatContext.Provider>
  );
}
