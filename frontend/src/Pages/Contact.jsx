import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../Helpers/axiosinstance";
import { isEmail } from "../Helpers/regexMatcher";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function Contact() {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!userInput.email || !userInput.name || !userInput.message) {
            toast.error("All fields are mandatory");
            return;
        }

        if (!isEmail(userInput.email)) {
            toast.error("Invalid email");
            return;
        }

        try {
            const response = axiosInstance.post("/contact", userInput);
            toast.promise(response, {
                loading: "Submitting your message...",
                success: "Form submitted successfully",
                error: "Failed to submit the form",
            });
            const contactResponse = await response;
            if (contactResponse?.data?.success) {
                setUserInput({
                    name: "",
                    email: "",
                    message: "",
                });
            }
        } catch (err) {
            toast.error("Operation failed...");
        }
    }

    return (
        <HomeLayout>
            {/* Background Wrapper */}
            <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">

                {/* Particle Effect */}
                <Particles
                    id="tsparticles"
                    init={async (main) => await loadSlim(main)}
                    options={{
                        fullScreen: { enable: false }, // Particles only inside the section
                        particles: {
                            number: { value: 50 },
                            color: { value: "#ffffff" },
                            shape: { type: "star" },
                            opacity: { value: 0.6, random: true },
                            size: { value: { min: 3, max: 5 } },
                            move: { enable: true, speed: 2, direction: "none", random: true },
                        },
                    }}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />

                {/* Contact Form */}
                <form
                    noValidate
                    onSubmit={onFormSubmit}
                    className="relative flex flex-col gap-6 p-8 bg-white/10 backdrop-blur-md shadow-lg rounded-2xl text-white w-full max-w-md border border-white/20"
                >
                    <h1 className="text-4xl font-bold text-center text-primary">
                        Contact Us
                    </h1>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-lg font-medium">
                            Name
                        </label>
                        <input
                            className="bg-white/10 border border-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-lg font-medium">
                            Email
                        </label>
                        <input
                            className="bg-white/10 border border-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-lg font-medium">
                            Message
                        </label>
                        <textarea
                            className="bg-white/10 border border-gray-500 px-4 py-2 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary transition"
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline btn-primary text-black font-bold py-3 rounded-lg transition-all transform hover:scale-105"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Contact;
