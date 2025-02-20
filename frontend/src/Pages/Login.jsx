import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from "react-hot-toast"

import { login } from '../Redux/Slices/AuthSlice';

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }



    async function onLogin(event) {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }


        // dispatch create account action
        const response = await dispatch(login(loginData));
        if (response?.payload?.success)
            navigate("/");

        setLoginData({
            email: "",
            password: ""
        });

    }

    return (
        <HomeLayout>
            <div className='relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black'>
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
                <form noValidate onSubmit={onLogin} className='relative flex flex-col justify-center gap-5 rounded-2xl p-6 text-white w-96 min-h-[26rem] 
                    shadow-lg bg-white/10 backdrop-blur-md border border-white/20'>
                    <h1 className="text-center text-3xl font-bold">Login Page</h1>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='text-lg font-semibold'> Email </label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-white/20 px-3 py-2 rounded-md text-white placeholder-gray-300 border border-white/30 
                            focus:ring-2 focus:ring-primary outline-none"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='text-lg font-semibold'> Password </label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-white/20 px-3 py-2 rounded-md text-white placeholder-gray-300 border border-white/30 
                            focus:ring-2 focus:ring-primary outline-none"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>

                    <button type="submit" className='mt-2 btn btn-outline btn-primary transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                        Login
                    </button>

                    <p className="text-center text-gray-300">
                        Donot have an account ? <Link to="/signup" className='link text-accent cursor-pointer'> Signup</Link>
                    </p>

                </form>
            </div>
        </HomeLayout>
    )
}

export default Login