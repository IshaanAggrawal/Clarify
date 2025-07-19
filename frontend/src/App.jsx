import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { setIsCheckingAuth, setAuthUser } from './components/store/authSlice';
import Register from './components/auth/Register';
import Home from './components/Home';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from './components/utils/axios';
import Login from './components/auth/Login';
import Account from './Account';
import Error from './components/auth/Error';
import JoinRoomModal from './JoinRoomModal';
import CreateRoom from './CreateRoom';
import RoomPage from './components/RoomPage';
import Rules from './components/Rules';
import Analytics from './components/Analytics';

function App() {
  const { isCheckingAuth, authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // ⬇ Smooth scroll fix on route change
  useEffect(() => {
    const scrollContainer = document.querySelector("#scroll-container");

    setTimeout(() => {
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  }, [pathname]);

  // ⬇ Check auth state once
  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setIsCheckingAuth(true));
      try {
        const res = await axiosInstance.get("/auth/check");
        console.log("CHECK AUTH RESPONSE:", res.data);
        dispatch(setAuthUser(res.data));
      } catch (error) {
        dispatch(setAuthUser(null));
        console.log("Error in auth check:", error);
      } finally {
        dispatch(setIsCheckingAuth(false));
      }
    };
    checkAuth();
  }, [dispatch]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!authUser ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={authUser ? <Account /> : <Navigate to="/signup" />}
        />
        <Route 
          path="/rules"
          element={<Rules/>} 
        />
        <Route
          path="/join-room"
          element={authUser ? <JoinRoomModal /> : <Navigate to="/signup" />}
        />
        <Route
          path="/create-room"
          element={authUser ? <CreateRoom /> : <Navigate to="/signup" />}
        />
        <Route
          path="/todolist"
          element={authUser ? <Analytics /> : <Navigate to="/signup" />}
        />
        <Route
          path="/room/:roomId"
          element={authUser ? <RoomPage /> : <Navigate to="/signup" />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
