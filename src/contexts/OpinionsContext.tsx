import React, { createContext, useContext, useState, useEffect } from "react";

export interface Opinion {
  id: string;
  topic: string;
  question: string;
  opinion: string;
  timestamp: Date;
}

interface OpinionsContextType {
  opinions: Opinion[];
  addOpinion: (opinion: Omit<Opinion, "id" | "timestamp">) => void;
}

const OpinionsContext = createContext<OpinionsContextType | undefined>(undefined);

export function OpinionsProvider({ children }: { children: React.ReactNode }) {
  const [opinions, setOpinions] = useState<Opinion[]>(() => {
    const saved = localStorage.getItem("opinions");
    if (saved) {
      return JSON.parse(saved).map((opinion: any) => ({
        ...opinion,
        timestamp: new Date(opinion.timestamp),
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("opinions", JSON.stringify(opinions));
  }, [opinions]);

  const addOpinion = (newOpinion: Omit<Opinion, "id" | "timestamp">) => {
    const opinion: Opinion = {
      ...newOpinion,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setOpinions((prev) => [opinion, ...prev]);
  };

  return (
    <OpinionsContext.Provider value={{ opinions, addOpinion }}>
      {children}
    </OpinionsContext.Provider>
  );
}

export function useOpinions() {
  const context = useContext(OpinionsContext);
  if (context === undefined) {
    throw new Error("useOpinions must be used within an OpinionsProvider");
  }
  return context;
}