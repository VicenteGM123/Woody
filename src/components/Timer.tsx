import React, { useState, useEffect, useRef } from "react";

interface TimerProps {
  updateTimeFunction: (status: number) => void;
}

const Timer = ({ updateTimeFunction }: TimerProps) => {
  const [isRunning, setIsRunning] = useState(true);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [lastTimeUpdate, setLastTimeUpdate] = useState(0);
  const intervalRef = useRef(-1);
  const intervalUpdateRef = useRef(-1);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      intervalUpdateRef.current = setInterval(() => {
        setLastTimeUpdate(seconds + minutes * 60 + hours * 3600);
        updateTimeFunction(60);
      }, 60000);
    } else {
      clearInterval(intervalRef.current);
      clearInterval(intervalUpdateRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(intervalUpdateRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((prevMinutes) => prevMinutes + 1);
    }
    if (minutes === 60) {
      setMinutes(0);
      setHours((prevHours) => prevHours + 1);
    }
  }, [seconds, minutes]);

  const toggleTimer = () => {
    const updateSeconds =
      seconds + minutes * 60 + hours * 3600 - lastTimeUpdate;
    setLastTimeUpdate(seconds + minutes * 60 + hours * 3600);
    updateTimeFunction(updateSeconds);
    setIsRunning(!isRunning);
  };

  const handleUnload = () => {
    return updateTimeFunction(seconds);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  });

  return (
    <>
      <div className="timer">
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-3 focus:outline-none"
        onClick={toggleTimer}
      >
        {isRunning ? "Parar tiempo" : "Reanudar tiempo"}
      </button>
    </>
  );
};

export default Timer;
