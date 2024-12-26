import { useState, useEffect } from "react";

function DigitalClock() {
    
    const [time, setTime] = useState(new Date());
    const [is24HourFormat, setIs24HourFormat] = useState(false); 
    const [isRunning, setIsRunning] = useState(true); 

    
    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        
        if (is24HourFormat) {
            
            return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
        } else {
            
            const period = hours >= 12 ? 'PM' : 'AM';
            const hours12 = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
            return `${padZero(hours12)}:${padZero(minutes)}:${padZero(seconds)} ${period}`;
        }
    };

   
    const padZero = (num) => (num < 10 ? `0${num}` : num);

   
    const toggleFormat = () => setIs24HourFormat(!is24HourFormat);

    
    const toggleClock = () => setIsRunning(!isRunning);

    
    useEffect(() => {
       
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup on unmount or when clock is stopped
        return () => clearInterval(intervalId);
    }, [isRunning]); 

    return (
        <div className="clock-container">
            <div className="clock">
                <h2>{formatTime(time)}</h2>
                <p>{time.toLocaleString('en-us', { weekday: 'long' })}</p>
            <div className="controls">
                <button onClick={toggleFormat}>
                    Switch to {is24HourFormat ? "12-hour" : "24-hour"} format
                </button>
                <button onClick={toggleClock}>
                    {isRunning ? "Stop" : "Start"} Clock
                </button>
            </div>
            </div>

        </div>
    );
}

export default DigitalClock;
