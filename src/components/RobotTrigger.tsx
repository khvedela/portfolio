import { useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useRobot } from '../context/RobotContext';

interface RobotTriggerProps {
  mode: 'header' | 'about' | 'skills' | 'work' | 'contact';
  className?: string;
  children: React.ReactNode;
}

const RobotTrigger = ({ mode, className, children }: RobotTriggerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, margin: "0px 0px -20% 0px" });
  const { setMode } = useRobot();

  useEffect(() => {
    if (isInView) {
      setMode(mode);
    }
  }, [isInView, mode, setMode]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default RobotTrigger;
