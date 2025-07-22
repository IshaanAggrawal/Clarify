    import { useState } from "react";
    import { Plus } from "lucide-react";
    import { useNavigate } from "react-router-dom";
    import toast from "react-hot-toast";
    import {axiosInstance} from "./components/utils/axios.js"; // default import
    import { useDispatch } from "react-redux";
    import { setisjoinedroom } from "./components/store/roomSlice.js";

    function JoinRoomModal() {
    const [roomId, setRoomId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleJoinRoom = async (e) => {
        e.preventDefault();

        if (!roomId.trim()) {
        toast.error("Please enter a Room ID.");
        return;
        }

        try {
        setLoading(true);

        const res = await axiosInstance.post("/room/join", {
            roomId: roomId.trim(),
            password,
        });

        if (!res?.data?.success) {
            toast.error(res?.data?.message || "Failed to join room.");
            return;
        }

        toast.success("Successfully joined the room!");
        dispatch(setisjoinedroom(true));
        navigate(`/room/${roomId.trim()}`);
        } catch (error) {
        if (error.response) {
            // Server responded with a status outside 2xx
            const status = error.response.status;
            const message = error.response.data?.message;

            if (status === 401 || status === 403) {
            toast.error(message || "Unauthorized or forbidden access.");
            } else if (status === 404) {
            toast.error("Room not found.");
            } else {
            toast.error(message || "Server error while joining room.");
            }
        } else if (error.request) {
            // Request was made but no response
            toast.error("No response from server. Check your internet.");
        } else {
            // Something else (like wrong config)
            toast.error("Unexpected error occurred while joining room.");
            console.error("Join room error:", error.message);
        }
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Join Room</h2>

            <form onSubmit={handleJoinRoom}>
            <div className="mb-4">
                <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 mb-2">
                Room ID
                </label>
                <input
                type="text"
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Room ID"
                required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Room Password
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Room Password"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
                {loading ? "Joining..." : "Join"}
            </button>

            <div className="flex gap-4 mt-5">
                <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 h-10"
                >
                Back Home
                </button>

                <button
                type="button"
                onClick={() => navigate("/create-room")}
                className="flex-1 bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 h-10"
                >
                <Plus className="w-4 h-4" />
                Create Room
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    }

    export default JoinRoomModal;