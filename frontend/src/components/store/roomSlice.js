    import { createSlice } from '@reduxjs/toolkit';

    const initialState = {
    isjoinedroom: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    roomName: '',
    description: '',
    password: '',
    roomId: '',
    };

    const roomSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setroomName: (state, action) => {
        state.roomName = action.payload;
        },
        setdescription: (state, action) => {
        state.description = action.payload;
        },
        setPassword: (state, action) => {
        state.password = action.payload;
        },
        setroomId: (state, action) => {
        state.roomId = action.payload;
        },
        setisjoinedroom: (state, action) => {
        state.isjoinedroom = action.payload;
        },
        setIsCheckingAuth: (state, action) => {
        state.isCheckingAuth = action.payload;
        },
        setOnlineUsers: (state, action) => {
        state.onlineUsers = action.payload;
        },
        setSocket: (state, action) => {
        state.socket = action.payload;
        },
        disconnectSocket: (state) => {
        if (state.socket?.connected) {
            state.socket.disconnect();
        }
        state.socket = null;
        },
    },
    });

    export const {
    setroomName,
    setdescription,
    setPassword, // ✅ Exported
    setroomId,
    setisjoinedroom,
    setIsCheckingAuth,
    setOnlineUsers,
    setSocket,
    disconnectSocket,
    } = roomSlice.actions;

    export default roomSlice.reducer;
