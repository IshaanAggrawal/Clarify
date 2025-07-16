    import { Plus } from 'lucide-react';
    import { useNavigate } from 'react-router-dom';
    import { useDispatch, useSelector } from 'react-redux';
    import { setdescription, setroomName, setPassword } from './components/store/roomSlice';

    const CreateRoom = () => {
    const { roomName, description, password } = useSelector((store) => store.room);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch('/api/rooms', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomName, description, password }),
        });

        const data = await res.json();
        if (res.ok) {
            console.log('Room created:', data.room);
            navigate('/rooms');
        } else {
            alert(data.message);
        }
        } catch (err) {
        alert(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Create a New Room</h2>

        <form onSubmit={handleCreate} className="space-y-5">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
            <input
                type="text"
                value={roomName}
                onChange={(e) => dispatch(setroomName(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room name"
                required
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
                value={description}
                onChange={(e) => dispatch(setdescription(e.target.value))}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What's this room about?"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Set a room password (optional)"
            />
            </div>

            <div className="flex gap-4 mt-6">
            <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 h-10"
            >
                Back Home
            </button>

            <button
                type="submit"
                className="flex-1 bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 h-10"
            >
                <Plus className="w-4 h-4" />
                Create Room
            </button>
            </div>
        </form>
        </div>
    );
    };

    export default CreateRoom;
    import React from 'react';