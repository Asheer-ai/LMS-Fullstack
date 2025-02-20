import React, { useState, useCallback } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";
import { createAccount } from "../Redux/Slices/AuthSlice";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import HomeLayout from "../Layouts/HomeLayout";

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    }

    function getImage(event) {
        event.preventDefault();
        const uploadedImage = event.target.files[0];

        if (uploadedImage) {
            setSignupData({ ...signupData, avatar: uploadedImage });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.onload = () => setPreviewImage(fileReader.result);
        }
    }

    async function createNewAccount(event) {
        event.preventDefault();

        if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
            toast.error("⚠️ Please fill all the fields.");
            return;
        }

        if (signupData.fullName.length < 5) {
            toast.error("⚠️ Name should be at least 5 characters.");
            return;
        }

        if (!isEmail(signupData.email)) {
            toast.error("⚠️ Invalid email address.");
            return;
        }

        if (!isValidPassword(signupData.password)) {
            toast.error("⚠️ Password must be 6-16 characters long & include a number & special character.");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        const response = await dispatch(createAccount(formData));

        if (response?.payload?.success) {
            toast.success("🎉 Account created successfully!");
            navigate("/");
        }

        setSignupData({ fullName: "", email: "", password: "", avatar: "" });
        setPreviewImage("");
    }



    return (
        <HomeLayout>
            <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
                {/* Particles Background */}
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

                {/* Signup Form */}
                <form
                    noValidate
                    onSubmit={createNewAccount}
                    className="relative flex flex-col justify-center gap-5 rounded-2xl p-5 text-white w-96 min-h-[30rem] 
                    shadow-lg bg-white/10 backdrop-blur-md border border-white/20"
                >
                    <h1 className="text-center text-3xl font-bold text-primary">
                        Sign Up
                    </h1>

                    {/* Avatar Upload */}
                    <label htmlFor="image_uploads" className="cursor-pointer flex justify-center">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full border-4 border-primary shadow-md" src={previewImage} alt="Profile" />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 text-primary" />
                        )}
                    </label>
                    <input
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />

                    {/* Name Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fullName" className="text-lg font-semibold text-primary">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name..."
                            className="bg-white/20 px-3 py-2 rounded-md text-white placeholder-gray-300 border border-white/30 
                            focus:ring-2 focus:ring-primary outline-none"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-lg font-semibold text-primary">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email..."
                            className="bg-white/20 px-3 py-2 rounded-md text-white placeholder-gray-300 border border-white/30 
                            focus:ring-2 focus:ring-primary outline-none"
                            onChange={handleUserInput}
                            value={signupData.email}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-lg font-semibold text-primary">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password..."
                            className="bg-white/20 px-3 py-2 rounded-md text-white placeholder-gray-300 border border-white/30 
                            focus:ring-2 focus:ring-primary outline-none"
                            onChange={handleUserInput}
                            value={signupData.password}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-2 btn btn-outline btn-primary transition-all ease-in-out duration-300 
                        rounded-md py-3 font-bold shadow-md"
                    >
                        Create Account
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-gray-300">
                        Already have an account?{" "}
                        <Link to="/login" className="text-accent font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Signup;
