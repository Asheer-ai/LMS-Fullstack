import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";


function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state?.auth?.data?._id);

    const [data, setData] = useState({
        previewImage: "",
        fullName: "",
        avatar: undefined,
        userId: userId,
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];

        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.onload = function () {
                setData({
                    ...data,
                    previewImage: fileReader.result,
                    avatar: uploadedImage,
                });
            };
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!data.fullName || !data.avatar) {
            toast.error("All fields are mandatory");
            return;
        }
        if (data.fullName.length < 5) {
            toast.error("Name must be at least 5 characters");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);

        await dispatch(updateProfile([data.userId, formData]));
        await dispatch(getUserData());

        toast.success("Profile updated successfully!");
        navigate("/user/profile");
    }

    return (
        <HomeLayout>
            <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
            

                <form
                    onSubmit={onFormSubmit}
                    className="relative flex flex-col justify-center gap-5 rounded-2xl p-6 text-white w-96 min-h-[30rem] 
                    shadow-lg bg-white/10 backdrop-blur-md border border-white/20"
                >
                    <h1 className="text-center text-3xl font-bold text-primary">
                        Edit Profile
                    </h1>

                    {/* Profile Image Upload */}
                    <label className="cursor-pointer relative mx-auto" htmlFor="image_uploads">
                        {data.previewImage ? (
                            <img
                                className="w-28 h-28 rounded-full border-2 border-primary shadow-lg transform transition-transform hover:scale-105"
                                src={data.previewImage}
                                alt="Profile Preview"
                            />
                        ) : (
                            <BsPersonCircle className="w-28 h-28 text-gray-400 transition-transform hover:scale-105" />
                        )}
                    </label>
                    <input
                        onChange={handleImageUpload}
                        className="hidden"
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .png, .svg, .jpeg"
                    />

                    {/* Name Input Field */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fullName" className="text-lg font-semibold text-primary">
                            Full Name
                        </label>
                        <input
                            required
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name"
                            className="bg-white/20 px-3 py-2 rounded-md text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-primary outline-none"
                            value={data.fullName}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full btn btn-outline btn-primary transition-all ease-in-out duration-300 rounded-md py-3 text-lg font-bold shadow-md"
                    >
                        Update Profile
                    </button>

                    {/* Back to Profile Link */}
                    <Link to="/user/profile">
                        <p className="flex items-center justify-center gap-2 text-gray-300 hover:text-accent transition-all">
                            <AiOutlineArrowLeft /> Go back to profile
                        </p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
    );
}

export default EditProfile;
