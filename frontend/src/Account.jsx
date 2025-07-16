    import React, { useState } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { axiosInstance } from './components/utils/axios';
    import { setAuthUser } from './components/store/authSlice';
    import toast from 'react-hot-toast';
    import { useNavigate } from "react-router-dom";
    import Navbar from "./components/shared/Navbar";

    const Account = () => {
    const { authUser } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [editField, setEditField] = useState(null);
    const [formData, setFormData] = useState({
        fullname: authUser?.fullname || "",
        description: authUser?.description || "",
        degree: authUser?.degree || "",
        institute: authUser?.institute || "",
        year: authUser?.year || "",
    });

    const handleEditClick = (field) => {
        setEditField(field);
    };

    const handleChange = (e) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    const saveEdit = async () => {
        try {
        const res = await axiosInstance.put("/auth/update-profile", formData);
        if (res.data.success) {
            dispatch(setAuthUser(res.data.user));
            toast.success("Profile updated");
            setEditField(null);
        }
        } catch (err) {
        toast.error(err?.response?.data?.message || "Update failed");
        }
    };

    const cancelEdit = () => {
        setFormData({
        fullname: authUser.fullname,
        description: authUser.description,
        degree: authUser.degree,
        year: authUser.year
        });
        setEditField(null);
    };

    const logouthandler = async (e) => {
        e.preventDefault();
        try {
        const res = await axiosInstance.get("/auth/logout");
        if (res.data.success) {
            toast.success("Logout successfully!");
            dispatch(setAuthUser(null));
            navigate("/signup");
        }
        } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    if (!authUser) {
        return <div className="text-center mt-20 text-gray-600">Please log in to view account details.</div>;
    }

    return (
        <>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-10 pt-24 my-7">
            <div className="flex flex-col items-center text-center">
            <img
                src={authUser.profilePic || "image.png"}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover"
            />
            <h1 className="text-2xl font-semibold mt-4">{authUser.fullname}</h1>
            <p className="text-gray-600">{authUser.email}</p>
            </div>

            <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">Personal details</h2>
            <div className="border rounded-lg divide-y">

                {/* Name */}
                <EditableField
                label="Name"
                field="fullname"
                value={formData.fullname}
                isEditing={editField === "fullname"}
                onEdit={() => handleEditClick("fullname")}
                onChange={handleChange}
                />

                {/* Email (non-editable) */}
                <div className="flex items-center justify-between px-4 py-3">
                <div>
                    <p className="text-sm text-gray-500">Email address</p>
                    <p className="text-base">{authUser.email}</p>
                </div>
                </div>

                {/* Description */}
                <EditableField
                label="Description"
                field="description"
                value={formData.description}
                isEditing={editField === "description"}
                onEdit={() => handleEditClick("description")}
                onChange={handleChange}
                isTextarea
                />

                {/* Degree */}
                <EditableField
                label="Degree"
                field="degree"
                value={formData.degree}
                isEditing={editField === "degree"}
                onEdit={() => handleEditClick("degree")}
                onChange={handleChange}
                />

                {/* Year */}
                <EditableField
                label="Year"
                field="year"
                value={formData.year}
                isEditing={editField === "year"}
                onEdit={() => handleEditClick("year")}
                onChange={handleChange}
                />
                <EditableField
                label="Institute"
                field="institute"
                value={formData.institute}
                isEditing={editField === "institute"}
                onEdit={() => handleEditClick("institute")}
                onChange={handleChange}
                />
            </div>
            </div>

            {editField && (
            <div className="flex gap-4 mt-4">
                <button onClick={saveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
                <button onClick={cancelEdit} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md">Cancel</button>
            </div>
            )}

            <button
            onClick={logouthandler}
            className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700 transition my-5"
            >
            Logout
            </button>
        </div>
        </>
    );
    };

    export default Account;

    // 🔧 EditableField Component
    const EditableField = ({ label, field, value, onEdit, onChange, isEditing, isTextarea = false }) => {
    return (
        <div className="flex items-center justify-between px-4 py-3">
        <div className="w-full">
            <p className="text-sm text-gray-500">{label}</p>
            {isEditing ? (
            isTextarea ? (
                <textarea
                className="w-full p-2 border rounded-md mt-1"
                name={field}
                value={value}
                onChange={onChange}
                rows={3}
                />
            ) : (
                <input
                className="w-full p-2 border rounded-md mt-1"
                type="text"
                name={field}
                value={value}
                onChange={onChange}
                />
            )
            ) : (
            <p className="text-base">{value || "—"}</p>
            )}
        </div>
        {!isEditing && (
            <button className="text-blue-600 text-sm hover:underline ml-4" onClick={onEdit}>
            Edit
            </button>
        )}
        </div>
    );
    };