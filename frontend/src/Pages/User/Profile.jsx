import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.auth?.data);

    async function handleCancellation() {
        toast("Initiating cancellation...");
        await dispatch(cancelCourseBundle());
        await dispatch(getUserData());
        toast.success("Cancellation completed!");
        navigate("/");
    }

    return (
        <HomeLayout>
            {/* Background Section */}
            <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">

            <Particles
                                id="tsparticles"
                                init={async (main) => await loadSlim(main)}
                                options={{
                                    fullScreen: { enable: false }, // Particles only inside the section
                                    particles: {
                                        number: { value: 50 },
                                        color: { value: "#ffffff" },
                                        shape: { type: "edge" },
                                        opacity: { value: 0.6, random: true },
                                        size: { value: { min: 3, max: 5 } },
                                        move: { enable: true, speed: 2, direction: "none", random: true },
                                    },
                                }}
                                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                            />

                {/* Profile Card */}
                <div className="relative flex flex-col items-center gap-6 bg-white/10 backdrop-blur-md shadow-lg rounded-2xl text-white w-full max-w-md border border-white/20 p-8">

                    {/* Profile Image */}
                    <div className="relative">
                        <img
                            src={userData?.avatar?.secure_url}
                            alt="Profile"
                            className="w-40 h-40 rounded-full border-4 border-gray-700 transition-transform transform hover:scale-105"
                        />
                    </div>

                    {/* User Info */}
                    <h3 className="text-3xl font-bold capitalize text-primary">
                        {userData?.fullName}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-lg">
                        <p className="font-semibold text-gray-300">Email:</p>
                        <p>{userData?.email}</p>

                        <p className="font-semibold text-gray-300">Role:</p>
                        <p>{userData?.role}</p>

                        <p className="font-semibold text-gray-300">Subscription:</p>
                        <p className={userData?.subscription?.status === "active" ? "text-green-400" : "text-red-400"}>
                            {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
                        </p>
                    </div>

                    {/* Buttons Section */}
                    <div className="flex items-center justify-between w-full gap-3">
                        <Link
                            to="/changepassword"
                            className="w-1/2 btn btn-outline btn-primary text-black font-semibold py-2 rounded-lg transition-all transform hover:scale-105 text-center"
                        >
                            Change Password
                        </Link>

                        <Link
                            to="/user/editprofile"
                            className="w-1/2 btn btn-outline btn-success text-black font-semibold py-2 rounded-lg transition-all transform hover:scale-105 text-center"
                        >
                            Edit Profile
                        </Link>
                    </div>

                    {/* Cancel Subscription Button */}
                    {userData?.subscription?.status === "active" && (
                        <button
                            onClick={handleCancellation}
                            className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105"
                        >
                            Cancel Subscription
                        </button>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default Profile;
