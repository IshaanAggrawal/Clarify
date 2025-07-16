    import { useState } from "react";
    import { Mic, Headphones, Settings, Users, TimerReset, CalendarCheck2, MessageCircleMore, BookCheck, CircleGauge, Music4 } from "lucide-react";
    import Navbar from './shared/Navbar'
    import Footer from './shared/Footer'

        function RoomPage() {
        const [activeTab, setActiveTab] = useState("focus");

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
        <div className="flex h-screen bg-[#0b1532] text-white pt-24 mt-2">
        {/* Sidebar */}
        <aside className="w-64 bg-[#0c1b3b] border-r border-[#3a3b3f] flex flex-col">
            <div className="p-4 text-xl font-bold border-b border-[#3a3b3f]">Clarify Room</div>
            <nav className="flex-1 overflow-y-auto py-4 space-y-2">
            {tabs.map((tab) => (
                <button
                key={tab.id}
                className={`flex items-center gap-3 px-6 py-3 w-full text-left hover:bg-[#3a3b3f] transition rounded-md ${
                    activeTab === tab.id ? "bg-[#3a3b3f] text-yellow-300" : "text-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
                >
                {tab.icon}
                <span>{tab.label}</span>
                </button>
            ))}
            </nav>
            <div className="p-4 border-t border-[#3a3b3f] flex items-center gap-4">
            <Mic className="w-5 h-5" />
            <Headphones className="w-5 h-5" />
            <Settings className="w-5 h-5 ml-auto" />
            </div>
        </aside>

        {/* Main Area */}
        <main className="flex-1 p-6 overflow-y-auto">
            {activeTab === "focus" && <div className="text-2xl">Pomodoro Timer UI</div>}
            {activeTab === "tasks" && <div className="text-2xl">Task Manager</div>}
            {activeTab === "goals" && <div className="text-2xl">Goals + Streaks Tracker</div>}
            {activeTab === "chat" && <div className="text-2xl">Room Chat / Messages</div>}
            {activeTab === "stats" && <div className="text-2xl">Study Stats & Logs</div>}
            {activeTab === "music" && <div className="text-2xl">Ambient Music & Playlists</div>}
        </main>

        {/* Members List */}
        <aside className="w-72 bg-[#2b2d31] border-l border-[#3a3b3f] p-4">
            <div className="text-lg font-semibold mb-4">Members (10)</div>
            <ul className="space-y-3">
            {[...Array(10)].map((_, i) => (
                <li key={i} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span>User_{i + 1}</span>
                </li>
            ))}
            </ul>
        </aside>
        </div>
        <Footer/>
        </>
        )
        }

        export default RoomPage
