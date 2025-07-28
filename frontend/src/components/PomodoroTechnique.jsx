    import { useState, useRef, useEffect } from "react";

    function PomodoroTimer() {
    const FOCUS_TIME = 3; // in seconds for quick testing
    const BREAK_TIME = 3;

    const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState("focus"); // "focus" or "break"
    const [completedSessions, setCompletedSessions] = useState([]);
    const intervalRef = useRef(null);

    const formatTime = (s) => {
        const m = Math.floor(s / 60).toString().padStart(2, "0");
        const sec = (s % 60).toString().padStart(2, "0");
        return `${m}:${sec}`;
    };

    const startTimer = () => {
        if (intervalRef.current) return;

        setIsRunning(true);
        intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
            if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);

            const isFocus = mode === "focus";
            const nextMode = isFocus ? "break" : "focus";

            if (isFocus) {
                const timestamp = new Date().toLocaleString();
                setCompletedSessions((prevSessions) => [...prevSessions, timestamp]);
            }

            setMode(nextMode);
            setSecondsLeft(nextMode === "focus" ? FOCUS_TIME : BREAK_TIME);

            return nextMode === "focus" ? FOCUS_TIME : BREAK_TIME;
            }

            return prev - 1;
        });
        }, 1000);
    };

    const pauseTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);
    };

    const resetTimer = () => {
        pauseTimer();
        setSecondsLeft(mode === "focus" ? FOCUS_TIME : BREAK_TIME);
    };

    const clearSessions = () => {
        setCompletedSessions([]);
    };

    useEffect(() => {
        return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className="bg-[#12254b] rounded-xl p-8 shadow-lg max-w-3xl w-full mx-auto text-white space-y-6">
        <h2 className="text-2xl font-semibold tracking-wide text-center">
            {mode === "focus" ? "Focus Session" : "Break Time"}
        </h2>

        <div className="text-6xl font-mono text-yellow-300 text-center">
            {formatTime(secondsLeft)}
        </div>

        <div className="flex justify-center gap-4">
            {!isRunning ? (
            <button
                onClick={startTimer}
                className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
            >
                Start
            </button>
            ) : (
            <button
                onClick={pauseTimer}
                className="px-6 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black transition"
            >
                Pause
            </button>
            )}

            <button
            onClick={resetTimer}
            className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
            Reset
            </button>
        </div>

        <div className="mt-6 bg-[#0c1b3b] p-4 rounded-lg border border-[#3a3b3f]">
            <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">
                Completed Focus Sessions: {completedSessions.length}
            </h3>
            {completedSessions.length > 0 && (
                <button
                onClick={clearSessions}
                className="text-sm text-red-400 hover:underline"
                >
                Clear All
                </button>
            )}
            </div>

            {completedSessions.length === 0 ? (
            <p className="text-gray-400">No sessions completed yet.</p>
            ) : (
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-200">
                {completedSessions.map((session, i) => (
                <li key={i}>{session}</li>
                ))}
            </ul>
            )}
        </div>
        </div>
    );
    }

    export default PomodoroTimer;
