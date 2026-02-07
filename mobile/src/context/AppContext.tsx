/**
 * App Context
 * Global app state management
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  selectedBrandKitId: string | null;
  setSelectedBrandKitId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [selectedBrandKitId, setSelectedBrandKitId] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        isOnboarded,
        setIsOnboarded,
        selectedBrandKitId,
        setSelectedBrandKitId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
