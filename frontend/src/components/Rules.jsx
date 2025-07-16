    import React, { useEffect, useRef } from "react";
    import { ShieldAlert, User, MicOff, VideoOff, AlertCircle, Clock } from "lucide-react";
    import Navbar from "./shared/Navbar";
    import Footer from "./shared/Footer";
    import { useNavigate } from "react-router-dom";
    import gsap from "gsap";
    import ScrollTrigger from "gsap/ScrollTrigger";
    gsap.registerPlugin(ScrollTrigger);
    import LocomotiveScroll from "locomotive-scroll";
    import "locomotive-scroll/dist/locomotive-scroll.css";

    const rules = [
    {
        icon: <ShieldAlert className="w-6 h-6 text-yellow-500" />, title: "Respect Others", description: "Always treat your fellow study members with kindness and professionalism. No bullying, hate speech, or discrimination of any kind.", color: "from-yellow-400 to-orange-500", bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50", borderColor: "border-yellow-200",
    },
    {
        icon: <User className="w-6 h-6 text-green-500" />, title: "Keep Your Camera/Mic Off (unless required)", description: "To minimize distractions, keep your microphone and camera off during study sessions unless the room allows or asks otherwise.", color: "from-green-400 to-emerald-500", bgColor: "bg-gradient-to-br from-green-50 to-emerald-50", borderColor: "border-green-200",
    },
    {
        icon: <MicOff className="w-6 h-6 text-red-500" />, title: "No Background Noise", description: "Ensure you're in a quiet environment. Avoid typing near your mic or playing background music that may distract others.", color: "from-red-400 to-pink-500", bgColor: "bg-gradient-to-br from-red-50 to-pink-50", borderColor: "border-red-200",
    },
    {
        icon: <VideoOff className="w-6 h-6 text-indigo-500" />, title: "No Inappropriate Content", description: "This includes your username, profile picture, and anything visible or audible in the study room.", color: "from-indigo-400 to-blue-500", bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50", borderColor: "border-indigo-200",
    },
    {
        icon: <AlertCircle className="w-6 h-6 text-pink-500" />, title: "Report Disruptions", description: "If you see or hear something against the rules, use the report button or reach out to moderators immediately.", color: "from-pink-400 to-rose-500", bgColor: "bg-gradient-to-br from-pink-50 to-rose-50", borderColor: "border-pink-200",
    },
    {
        icon: <Clock className="w-6 h-6 text-blue-500" />, title: "Focus Time is Sacred", description: "Keep chat to a minimum during focus time. Save general discussions for break periods or designated channels.", color: "from-blue-400 to-cyan-500", bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50", borderColor: "border-blue-200",
    },
    ];

    const Rules = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const rulesRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.destroy();
        scrollRef.current = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        multiplier: 1.2,
        });

        return () => {
        if (scrollRef.current) scrollRef.current.destroy();
        scrollRef.current = null;
        };
    }, []);

    useEffect(() => {
        const cards = rulesRef.current.querySelectorAll(".rule-card");
        gsap.set(cards, { opacity: 0, y: 60 });

        cards.forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
            trigger: card,
            start: "top 85%",
            scroller: containerRef.current,
            },
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.15,
            ease: "power3.out",
        });
        });
    }, []);

    return (
        <>
        <Navbar />
        <div ref={containerRef} data-scroll-container className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 text-white pt-24 mt-5">
            <div className="relative px-6 md:px-12 py-20">
            <div className="max-w-4xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Community Guidelines
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Study Room <span className="text-yellow-300">Rules</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Creating a productive and respectful environment for focused learning and collaboration.
                </p>
            </div>
            </div>

            <div className="px-6 md:px-12 py-20 bg-gradient-to-b from-gray-50 to-white text-gray-900">
            <div className="max-w-5xl mx-auto">
                <div ref={rulesRef} className="grid gap-6 md:gap-8">
                {rules.map((rule, index) => (
                    <div
                    key={index}
                    className={`rule-card relative overflow-hidden rounded-2xl p-8 shadow-md ${rule.bgColor} ${rule.borderColor} border group hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-2`}
                    >
                    <div className={`absolute inset-0 bg-gradient-to-r ${rule.color}  rounded-full blur-lg opacity-20 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="relative flex gap-6 items-start">
                        <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border group-hover:scale-110 transition-all duration-300">
                            {rule.icon}
                        </div>
                        </div>
                        <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                            {rule.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-base">
                            {rule.description}
                        </p>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${rule.color}`} />
                    </div>
                    </div>
                ))}
                </div>

                <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl">
                    <h3 className="text-xl font-semibold text-white mb-4">Ready to Start Studying?</h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                    Join our focused study community and boost your productivity with like-minded learners.
                    </p>
                    <button
                    onClick={() => navigate("/join-room")}
                    className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
                    >
                    Join Study Room
                    </button>
                </div>
                </div>

                <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <p className="text-sm text-orange-700">
                    Violating these rules may result in warnings or removal from study rooms
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        <Footer />
        </>
    );
    };

    export default Rules;