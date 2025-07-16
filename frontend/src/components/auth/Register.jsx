    import { useEffect, useRef, useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useDispatch, useSelector } from 'react-redux';
    import { toast } from 'react-hot-toast';
    import { axiosInstance } from '../utils/axios'; // Adjust the path accordingly
    import { setIsSigningUp, setAuthUser } from '../store/authSlice'; // Adjust the path accordingly
    import gsap from "gsap";

    export default function Register() {
        const formRefs = useRef([]);
        // useEffect(() => {
        // gsap.from(formRefs.current, {
        //     y: 60,
        //     opacity: 0.8,
        //     stagger: 0.2,
        //     duration: 0.8,
        // });
        // }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        degree: '',
        year: '',
        institute: '',
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSigningUp } = useSelector((store) => store.auth);

    const changeEventHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
        dispatch(setIsSigningUp(true));
        const res = await axiosInstance.post('/auth/register', formData);
        if (res.data.success) {
            dispatch(setAuthUser(res.data));
            toast.success('Registered successfully!');
            navigate('/');
        }
        } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
        dispatch(setIsSigningUp(false));
        }
    };

    return (
        <div className="flex-grow flex justify-center my-5">
        <div className="w-full max-w-md px-6">
            <h1 ref={el => formRefs.current[0] = el}className="text-2xl font-semibold text-center mb-2">Welcome to Clarify</h1>
            <p ref={el => formRefs.current[1] = el}className="text-sm text-gray-500 text-center mb-6">
            Contact management designed for teams and individuals
            </p>

            <button ref={el => formRefs.current[2] = el}className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm font-medium hover:bg-gray-100 mb-4">
            <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
            />
            Continue with Google
            </button>

            <form className="space-y-4" onSubmit={submitHandler}>
            <div ref={el => formRefs.current[3] = el}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={changeEventHandler}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
                />
            </div>

            <div ref={el => formRefs.current[4] = el}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={changeEventHandler}
                placeholder="e.g. B.Tech, BSc"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
                />
            </div>

            <div ref={el => formRefs.current[5] = el}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                type="text"
                name="year"
                value={formData.year}
                onChange={changeEventHandler}
                placeholder="e.g. First Year, 2025"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
                />
            </div>
            <div ref={el => formRefs.current[4] = el}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institute</label>
                <input
                type="text"
                name="institute"
                value={formData.institute}
                onChange={changeEventHandler}
                placeholder="e.g. Harvard University (Enter Full Name)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
                />
            </div>
            <div ref={el => formRefs.current[6] = el}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={changeEventHandler}
                placeholder="Type your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
                />
            </div>

            <div ref={el => formRefs.current[7] = el} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={changeEventHandler}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
                />
            </div>

            <button ref={el => formRefs.current[8] = el}
                type="submit"
                disabled={isSigningUp}
                className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800"
            >
                {isSigningUp ? 'Signing Up...' : 'Sign Up'}
            </button>
            </form>

            <div ref={el => formRefs.current[9] = el} className="text-center my-3">
            <p className="text-base-content/60">
                Already have an account?{' '}
                <Link to="/login" className="link link-primary text-blue-600 hover:underline">
                Login
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
    }
