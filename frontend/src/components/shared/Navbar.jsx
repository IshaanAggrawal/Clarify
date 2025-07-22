import { Search, Globe, Bookmark, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { authUser } = useSelector((store) => store.auth);
  const {isjoinedroom}=useSelector((store) => store.room);
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-wrap items-center justify-between px-6 py-3 border-b shadow-sm bg-white z-50 fixed top-0 left-0">
      {/* Left: Logo & Menu */}
      <div className="flex items-center gap-6">
        <img
          src="/clarify.png"
          alt="clarify logo"
          className="object-contain cursor-pointer w-30 h-20"
          onClick={() => navigate('/')}
        />
        <div className="hidden md:flex items-center gap-4 text-gray-500 text-sm font-medium">
          <button onClick={()=>navigate('/rules')} className="hover:text-black transition text-lg">Rules</button>
          <button onClick={()=>navigate(!authUser?"/":"/todolist")} className="hover:text-black transition text-lg">{authUser ? "Analytics":""}</button>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 mx-4 max-w-md hidden md:flex">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search on Clarify"
            className="flex-1 bg-transparent outline-none text-sm px-2"
          />
        </div>
      </div>

      {/* Right: Icons, Profile/Login */}
      <div className="flex items-center gap-6">
{authUser ? (
  <>
    {!isjoinedroom && (
      <>
        <button
          onClick={() => navigate("/join-room")}
          className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700 transition h-10"
        >
          Join Room
        </button>
        <button
          onClick={() => navigate("/create-room")}
          className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700 transition flex items-center gap-2 h-10"
        >
          <Plus /> Create Room
        </button>
      </>
    )}
    <Globe className="w-5 h-5 text-black cursor-pointer" />
    <img
      src={authUser.profilePic || "/image.png"}
      alt="profile"
      onClick={() => {
        navigate("/settings");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="w-8 h-8 rounded-full object-cover cursor-pointer"
    />
    </>
  ) : (
    <>
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/signup")}
        className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
    </>
  )}
</div>
</div>
);
}

export default Navbar;
