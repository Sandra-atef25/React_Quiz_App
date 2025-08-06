import { useEffect, useState } from "react";

function QuestionTimer({ timeout, onTimeOut }) {
    const [remainingTime, setRemainingTime] = useState(timeout);
    useEffect(() => {
        const timeOut=setTimeout(onTimeOut, timeout);
        return ()=>{
            clearTimeout(timeOut);
        }
    }, [onTimeOut, timeout]);
    useEffect(() => {
        const interval=setInterval(() => {
            setRemainingTime((prev) => prev - 100);
        }, 100);
        return()=>{
            clearInterval(interval);
        }
    }, []);
    return <progress id="question-time" value={remainingTime} max={timeout} />
}
export default QuestionTimer;