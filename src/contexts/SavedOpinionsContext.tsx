import React, { createContext, useContext, useState, useEffect } from "react";
import { Opinion } from "./OpinionsContext";

interface SavedOpinionsContextType {
  savedOpinions: Opinion[];
  saveOpinion: (opinion: Opinion) => void;
  removeSavedOpinion: (id: string) => void;
  isOpinionSaved: (id: string) => boolean;
}

const SavedOpinionsContext = createContext<SavedOpinionsContextType | undefined>(undefined);

export function SavedOpinionsProvider({ children }: { children: React.ReactNode }) {
  const [savedOpinions, setSavedOpinions] = useState<Opinion[]>(() => {
    const saved = localStorage.getItem("savedOpinions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedOpinions", JSON.stringify(savedOpinions));
  }, [savedOpinions]);

  const saveOpinion = (opinion: Opinion) => {
    setSavedOpinions((prev) => {
      if (!prev.some((item) => item.id === opinion.id)) {
        return [opinion, ...prev];
      }
      return prev;
    });
  };

  const removeSavedOpinion = (id: string) => {
    setSavedOpinions((prev) => prev.filter((opinion) => opinion.id !== id));
  };

  const isOpinionSaved = (id: string) => {
    return savedOpinions.some((opinion) => opinion.id === id);
  };

  return (
    <SavedOpinionsContext.Provider value={{ savedOpinions, saveOpinion, removeSavedOpinion, isOpinionSaved }}>
      {children}
    </SavedOpinionsContext.Provider>
  );
}

export function useSavedOpinions() {
  const context = useContext(SavedOpinionsContext);
  if (context === undefined) {
    throw new Error("useSavedOpinions must be used within a SavedOpinionsProvider");
  }
  return context;
}