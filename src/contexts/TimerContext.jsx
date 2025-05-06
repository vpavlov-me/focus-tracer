import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [note, setNote] = useState('');
  const [initialTime, setInitialTime] = useState(25 * 60);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startTimer = useCallback(() => {
    if (!taskName) {
      alert('Пожалуйста, введите название задачи');
      return;
    }
    setIsRunning(true);
  }, [taskName]);

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
    saveSession();
  };

  const setTime = (minutes) => {
    const seconds = minutes * 60;
    setInitialTime(seconds);
    setTimeLeft(seconds);
  };

  const saveSession = () => {
    if (!taskName) return;

    const session = {
      taskName,
      timeSpent: formatTime(initialTime - timeLeft),
      note,
      date: new Date().toISOString()
    };

    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    sessions.push(session);
    localStorage.setItem('sessions', JSON.stringify(sessions));

    setTaskName('');
    setNote('');
  };

  useEffect(() => {
    let timerId;
    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            saveSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [isRunning, timeLeft]);

  const value = {
    timeLeft,
    isRunning,
    taskName,
    note,
    initialTime,
    setTime,
    startTimer,
    pauseTimer,
    stopTimer,
    setTaskName,
    setNote,
    formatTime
  };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
} 