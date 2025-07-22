import { useState, useEffect } from "react";

function Timer() {
    const [timeData, setTimeData] = useState({
        hour: 0,
        minute: 0,
        second: 0
    });
    const [timeLeft, setTimeLeft] = useState(0);
    const [running, setRunning] = useState(false);
    const [paused, setPaused] = useState(false);
    const [start, setStart] = useState<number | null>();
    const [time, setTime] = useState(0);    // holds the total amount of time to count down from
    const [disable, setDisabled] = useState(true);


    /* This will update the timer accordingly s.t. it doesn't lag due to the other components */
    useEffect(() => {
        let temp: number;
        if(timeLeft > 0 && running){
            temp = setInterval(() => {
                setTimeLeft((timeLeft) => time - Math.floor((Date.now() - start!) / 1000));
                console.log(timeLeft);
            }, 100);
            return () => clearInterval(temp);
        }
        else if(!paused){
            setRunning(false);
            let a = document.getElementById("timer-input") as HTMLDivElement;
            a.style.display = "block";

            a = document.getElementById("timer-face") as HTMLDivElement;
            a.style.display = "none";
        }
    }, [running, start, time, timeLeft]);


                                                    // TIMER BUTTON FUNCTIONS

    /* This function takes care of switching between the timer faces when starting the timer and setting the time up for countdown*/
    const startTimer = () => {
        let a = document.getElementById("timer-input") as HTMLDivElement;
        a.style.display = "none";

        a = document.getElementById("timer-face") as HTMLDivElement;
        a.style.display = "block";

        setTime(
            timeData.hour * 3600 + timeData.minute * 60 + timeData.second
        );
        setTimeLeft(time);
        setRunning(true);
        setStart(Date.now());
        setDisabled(false);
    }

    /* This function will tell the useEffect to stop running the interval */
    const pauseTimer = () => {
        setRunning(false);
        setPaused(true);
    }

    /* This function will tell the useEffect to continue running the interval again */
    const resumeTimer = () => {
        setRunning(true);
    }

    /* This function will reset the timer back to its original state */
    const cancelTimer = () => {
        setRunning(false);
        let a = document.getElementById("timer-input") as HTMLDivElement;
        a.style.display = "block";

        a = document.getElementById("timer-face") as HTMLDivElement;
        a.style.display = "none";
    }

    /* This function takes care of changing the value of the input for the clock face */
    const handleChange = (e: any) => {
        const {name, value} = e.target;  

         // Define limits
        const limits: Record<string, number> = {
            hour: 23,
            minute: 59,
            second: 59,
        };

        const max = limits[name] ?? 59;

        // Reject input if it exceeds the max or is less than 0
        if (value < 0 || value > max) return;

        setTimeData(prev => ({
            ...prev, [name]: value,
        }));
    }

    return (
        <>
            <div className="timer-piece" id="timer-input">
                <div className="input-piece"> {/* Hour; limit to 23 */}
                    <button onClick={() => {
                        if(timeData.hour === 23){return;}
                        setTimeData(prev => ({
                            ...prev, hour: prev.hour + 1,
                        }))
                    }}>
                        UP
                    </button>
                    <input type="number" name="hour" value={timeData.hour} onChange={handleChange} max={23} min={0}/>
                    <button onClick={() => {
                        if(timeData.hour === 0){return;}
                        setTimeData(prev => ({
                                ...prev, hour: prev.hour - 1,
                            }))
                    }}>
                        DOWN
                    </button>
                </div>
                <div className="input-piece"> {/* Minute; limit to 59, no overflow */}
                <button onClick={() => {
                        if(timeData.minute === 59){return;}
                        setTimeData(prev => ({
                            ...prev, minute: prev.minute + 1,
                        }))
                    }}>
                        UP
                    </button>
                    <input type="number" name="minute" value={timeData.minute} onChange={handleChange} max={59} min={0}/>
                    <button onClick={() => {
                        if(timeData.minute === 0){return;}
                        setTimeData(prev => ({
                                ...prev, minute: prev.minute - 1,
                            }))
                    }}>
                        DOWN
                    </button>
                </div>
                <div className="input-piece"> {/* Second; limit to 59, no overflow */}
                    <button onClick={() => {
                        if(timeData.second === 59){return;}
                        setTimeData(prev => ({
                            ...prev, second: prev.second + 1,
                        }))
                    }}>
                        UP
                    </button>
                    <input type="number" name="second" value={timeData.second} onChange={handleChange} max={59} min={0}/>
                    <button onClick={() => {
                        if(timeData.second === 0){return;}
                        setTimeData(prev => ({
                                ...prev, second: prev.second - 1,
                            }))
                    }}>
                        DOWN
                    </button>
                </div>                
            </div>

            <div className="timer-piece" id="timer-face" style={{display: "none"}}>
                <div className="number-piece"> {/* Hour; limit to 23 */}
                    {("0" + Math.floor(timeLeft/3600).toString()).slice(-2)}:
                </div>
                <div className="number-piece"> {/* Minute; limit to 59, no overflow */}
                    {("0" + Math.floor(timeLeft%3600 / 60).toString()).slice(-2)}:
                </div>
                <div className="number-piece"> {/* Second; limit to 59, no overflow */}
                    {("0" + Math.floor(timeLeft%60).toString()).slice(-2)}
                </div>                
            </div>

            <div id="timer-buttons">
                <button onClick={startTimer}>Start</button>
                <button style={{display:"none"}} onClick={resumeTimer}>Resume</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={cancelTimer} disabled={disable}>Cancel</button>
            </div>
        </>
    )
}

export default Timer