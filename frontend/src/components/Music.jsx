import { useEffect, useRef, useState } from "react";
import { Play, Pause, Repeat } from "lucide-react";

const musicList = [
{
    title: "Lo-fi Chill Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
},
{
    title: "Ambient Focus Flow",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
},
{
    title: "Deep Focus Soundscape",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
},
];

const Music = () => {
const [currentTrack, setCurrentTrack] = useState(musicList[0]);
const [isPlaying, setIsPlaying] = useState(false);
const [progress, setProgress] = useState(0);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const [loop, setLoop] = useState(false);

const audioRef = useRef(null);

useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(isNaN(percent) ? 0 : percent);
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
    audio.removeEventListener("timeupdate", updateProgress);
    audio.removeEventListener("loadedmetadata", updateProgress);
    audio.removeEventListener("ended", () => setIsPlaying(false));
    };
}, [currentTrack]);

const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
    audio.pause();
    } else {
    audio.play();
    }

    setIsPlaying(!isPlaying);
};

const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;
    const newTime = (clickX / width) * audio.duration;

    audio.currentTime = newTime;
};

const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = parseFloat(e.target.value);
};

const toggleLoop = () => {
    setLoop((prev) => !prev);
    if (audioRef.current) {
    audioRef.current.loop = !loop;
    }
};

return (
    <div className="bg-[#12254b] p-6 rounded-xl shadow-lg text-white max-w-md w-full">
    <audio ref={audioRef} src={currentTrack.url} loop={loop} />

    <div className="mb-4 text-xl font-semibold">{currentTrack.title}</div>

    <div className="flex items-center gap-4">
        <button
        onClick={togglePlayback}
        className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full text-black"
        >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        <div
        className="flex-1 relative h-2 bg-gray-700 rounded overflow-hidden cursor-pointer"
        onClick={handleProgressClick}
        >
        <div
            className="absolute h-full bg-yellow-400 transition-all"
            style={{ width: `${progress}%` }}
        />
        </div>
    </div>

    <div className="flex justify-between text-xs text-gray-300 mt-1">
        <span>{Math.floor(currentTime)}s</span>
        <span>{Math.floor(duration)}s</span>
    </div>

    <div className="mt-3">
        <label className="block text-sm mb-1 text-gray-300">Volume</label>
        <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="1"
        onChange={handleVolumeChange}
        className="w-full"
        />
    </div>

    <button
        onClick={toggleLoop}
        className="mt-3 flex items-center gap-1 text-sm text-gray-300 hover:text-white"
    >
        <Repeat className="w-4 h-4" />
        Loop: {loop ? "On" : "Off"}
    </button>

    <div className="mt-4 space-y-2">
        {musicList.map((track, index) => (
        <button
            key={index}
            onClick={() => {
            setCurrentTrack(track);
            setProgress(0);
            setIsPlaying(false);
            setTimeout(() => {
                if (audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
                }
            }, 100);
            }}
            className={`block w-full text-left px-3 py-2 rounded-md ${
            currentTrack.title === track.title
                ? "bg-yellow-500 text-black"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
        >
            {track.title}
        </button>
        ))}
    </div>
    </div>
);
};

export default Music;
