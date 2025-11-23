import { createContext, useContext, useState, ReactNode } from 'react';

type RobotMode = 'header' | 'about' | 'skills' | 'work' | 'contact';

interface RobotContextType {
  mode: RobotMode;
  setMode: (mode: RobotMode) => void;
}

const RobotContext = createContext<RobotContextType | undefined>(undefined);

export const RobotProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<RobotMode>('header');

  return (
    <RobotContext.Provider value={{ mode, setMode }}>
      {children}
    </RobotContext.Provider>
  );
};

export const useRobot = () => {
  const context = useContext(RobotContext);
  if (context === undefined) {
    throw new Error('useRobot must be used within a RobotProvider');
  }
  return context;
};
