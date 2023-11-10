import React, { useEffect, useState } from "react";
import "./countdown.css";

// Setting the target time for the countdown (November 11, 2023)
const targetTime = new Date("2023-11-11").getTime();

// Function to format a number with leading zeros if needed
function formatNumber(number) {
  return String(number).padStart(2, "0");
}
// Countdown component function
export default function Countdown() {
  // State to store the current time
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Calculating the time difference between the target time and current time
  const timeBetween = targetTime - currentTime;
  // Calculating days, hours, minutes, and seconds
  const seconds = Math.floor((timeBetween / 1000) % 60);
  const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
  const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));

  // Formatting the days, hours, minutes, and seconds
  const formattedDays = formatNumber(days);
  const formattedHours = formatNumber(hours);
  const formattedMinutes = formatNumber(minutes);
  const formattedSeconds = formatNumber(seconds);

  // Effect to update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="counter">
        <div className="counter-box">
          <div className="counter-number">{formattedDays}</div>
          <p>days</p>
        </div>

        <div className="counter-box">
          <div className="counter-number">{formattedHours}</div>
          <p>hours</p>
        </div>

        <div className="counter-box">
          <div className="counter-number">{formattedMinutes}</div>
          <p>mins</p>
        </div>

        <div className="counter-box">
          <div className="counter-number">{formattedSeconds}</div>
          <p>secs</p>
        </div>
      </div>
    </>
  );
}
