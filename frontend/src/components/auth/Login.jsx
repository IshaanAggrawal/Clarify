    import { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useDispatch, useSelector } from 'react-redux';
    import { toast } from 'react-hot-toast';
    import { axiosInstance } from '../utils/axios';
    import { setIsLoggingIn, setAuthUser } from '../store/authSlice';

    function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggingIn } = useSelector((store) => store.auth);

    const changeEventHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
        dispatch(setIsLoggingIn(true));
        const res = await axiosInstance.post('/auth/login', formData);
        if (res.data.success) {
            dispatch(setAuthUser(res.data));
            toast.success('Logged in successfully!');
            navigate('/');
        }
        } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
        dispatch(setIsLoggingIn(false));
        }
    };

    return (
        <div className="flex-grow flex justify-center my-20">
        <div className="w-full max-w-md px-6">
            <h1 className="text-2xl font-semibold text-center mb-2">Welcome back to Clarify</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
            Contact management designed for teams and individuals
            </p>

            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm font-medium hover:bg-gray-100 mb-4">
            <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
            />
            Continue with Google
            </button>

            <form className="space-y-4" onSubmit={submitHandler}>
            <div>
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

            <div>
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

            <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800"
            >
                {isLoggingIn ? 'Logging in...' : 'Login'}
            </button>
            </form>

            <div className="text-center my-3">
            <p className="text-base-content/60">
                Don't have an account?{' '}
                <Link to="/signup" className="link link-primary text-blue-600 hover:underline">
                Sign Up
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
    }

    export default Login;
