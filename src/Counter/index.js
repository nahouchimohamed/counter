import React, { useState, useEffect, useRef } from 'react';
import './counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [image, setImage] = useState(null);
  const intervalRef = useRef(null);

  const startCounter = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stopCounter = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const restartCounter = () => {
    setCount(0);
    startCounter();
  };

  const fetchRandomImage = async () => {
    try {
      const response = await fetch('https://source.unsplash.com/random');
      setImage(response.url);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (count === 10) {  // Change this value as needed for the animation cycle
      stopCounter();
      fetchRandomImage();
    }
  }, [count]);

  return (
    <div>
      <div>Count: {count}</div>
      {image && <img src={image} alt="Random" />}
      <button onClick={startCounter}>Start</button>
      <button onClick={stopCounter}>Stop</button>
      <button onClick={restartCounter}>Restart</button>
    </div>
  );
};

export default Counter;
