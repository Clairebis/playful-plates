import React, { useEffect, useState } from "react";
import "./countdown.css"

const targetTime = new Date("2023-11-11").getTime();
function formatNumber(number) {
    return String(number).padStart(2, '0');
  }

export default function Countdown() {
    const [currentTime, setCurrentTime] = useState(Date.now());

    const timeBetween = targetTime - currentTime;
    const seconds = Math.floor((timeBetween / 1000) % 60);
    const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
    const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));

    const formattedDays = formatNumber(days);
    const formattedHours = formatNumber(hours);
    const formattedMinutes = formatNumber(minutes);
    const formattedSeconds = formatNumber(seconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* <p>Available in..</p> */}
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