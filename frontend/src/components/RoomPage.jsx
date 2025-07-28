import { useState, useEffect } from "react";
import {
Mic, Headphones, Settings, TimerReset, CalendarCheck2,
MessageCircleMore, BookCheck, CircleGauge, Music4, LogOut, Home, X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import PomodoroTimer from "./PomodoroTechnique";
import { axiosInstance } from "./utils/axios";
import Music from "./Music";
import Resources from "./Resources";

function RoomPage() {
const [activeTab, setActiveTab] = useState("focus");
const [showLeaveModal, setShowLeaveModal] = useState(false);
const [roomData, setRoomData] = useState(null);
const [currentUser, setCurrentUser] = useState(null);
const navigate = useNavigate();

useEffect(() => {
const fetchRoomData = async () => {
try {
    const res = await axiosInstance.get("/auth/me");
    setCurrentUser(res.data.user);

    const roomRes = await axiosInstance.get("/room/my");
    setRoomData(roomRes.data.room);
} catch (error) {
    console.error("Failed to load room data", error);
}
};
fetchRoomData();
}, []);

const handleLeaveRoom = async () => {
try {
await axiosInstance.post("/room/exit", {
    roomId: roomData?.roomId,
});
navigate("/");
} catch (error) {
console.error("Exit failed:", error);
alert("Could not exit the room. Try again.");
}
};

const tabs = [
{ id: "focus", icon: <TimerReset className="w-5 h-5" />, label: "Pomodoro" },
{ id: "tasks", icon: <BookCheck className="w-5 h-5" />, label: "Tasks" },
{ id: "goals", icon: <CalendarCheck2 className="w-5 h-5" />, label: "Goals" },
{ id: "chat", icon: <MessageCircleMore className="w-5 h-5" />, label: "Chat" },
{ id: "stats", icon: <CircleGauge className="w-5 h-5" />, label: "Progress" },
{ id: "music", icon: <Music4 className="w-5 h-5" />, label: "Music" },
];

return (
<>
<Navbar />
<div className="flex h-100 bg-[#0e1d42] text-white pt-24 mt-2 pb-2">

    <aside className="h-full w-64 bg-[#12254b] border-r border-[#24355d] flex flex-col">
    <div className="p-4 border-b border-[#24355d] flex flex-col gap-3">
        <div className="text-xl font-bold text-white">🎧 Clarify Room</div>
        <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-[#1f3463] hover:bg-[#2e3e67] text-white rounded-md transition"
        >
        <Home className="w-4 h-4" />
        Home
        </button>
        <button
        onClick={() => setShowLeaveModal(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition"
        >
        <LogOut className="w-4 h-4" />
        Exit Room
        </button>
    </div>

    <nav className="flex-1 overflow-y-auto py-4 space-y-2">
        {tabs.map((tab) => (
        <button
            key={tab.id}
            className={`flex items-center gap-3 px-6 py-3 w-full text-left hover:bg-[#2e3e67] transition rounded-md ${
            activeTab === tab.id ? "bg-[#2e3e67] text-yellow-300" : "text-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
        >
            {tab.icon}
            <span>{tab.label}</span>
        </button>
        ))}
    </nav>

    <div className="p-4 border-t border-[#24355d] flex items-center gap-4 text-gray-300">
        <Mic className="w-5 h-5" />
        <Headphones className="w-5 h-5" />
        <Settings className="w-5 h-5 ml-auto" />
    </div>
    </aside>

    <main className="flex-1 p-6 overflow-y-auto">
    {activeTab === "focus" && <PomodoroTimer />}
    {activeTab === "tasks" && <Resources/>}
    {activeTab === "goals" && <div className="text-2xl">Goals + Streaks Tracker</div>}
    {activeTab === "chat" && <div className="text-2xl">Room Chat / Messages</div>}
    {activeTab === "stats" && <div className="text-2xl">Study Stats & Logs</div>}
    {activeTab === "music" && <Music/>}
    </main>

    <aside className="w-72 bg-[#1d2d50] border-l border-[#24355d] p-4">
    <div className="text-lg font-semibold mb-4 text-white">Members ({roomData?.participants?.length || 0})</div>
    <ul className="space-y-3 text-gray-300">
        {roomData?.participants?.map((memberId, index) => (
        <li key={index} className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span>{memberId === currentUser?._id ? "You" : `User_${index + 1}`}</span>
            {roomData.createdBy === memberId && (
            <span className="ml-auto text-yellow-400 text-xs">Admin</span>
            )}
        </li>
        ))}
    </ul>
    </aside>
</div>

<Footer />

{showLeaveModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white text-black rounded-xl shadow-lg p-6 w-[300px]">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Leave Room</h2>
        <button onClick={() => setShowLeaveModal(false)} className="text-gray-500 hover:text-red-500">
            <X className="w-5 h-5" />
        </button>
        </div>
        <p className="mb-4">Are you sure you want to leave the room?</p>
        <div className="flex justify-end gap-3">
        <button
            onClick={() => setShowLeaveModal(false)}
            className="px-4 py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400"
        >
            Cancel
        </button>
        <button
            onClick={handleLeaveRoom}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
        >
            Leave
        </button>
        </div>
    </div>
    </div>
)}
</>
);
}

export default RoomPage;
