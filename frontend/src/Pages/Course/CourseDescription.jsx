import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeLayout from '../../Layouts/HomeLayout'
import { useSelector } from 'react-redux';

function CourseDescription() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { role, data } = useSelector((state) => state.auth);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white bg-gradient-to-b from-gray-900 to-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 relative">
                    <div className="space-y-5">
                        <img
                            className="w-full h-64 rounded-lg shadow-lg"
                            alt="thumbnail"
                            src={state?.thumbnail?.secure_url}
                        />

                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-between text-xl">
                                <p className="font-semibold">
                                    <span className="text-yellow-400 font-bold">Total lectures: </span>
                                    {state?.numberOfLectures}
                                </p>
                                <p className="font-semibold">
                                    <span className="text-yellow-400 font-bold">Instructor: </span>
                                    {state?.createdBy}
                                </p>
                            </div>
                            {role === "ADMIN" || data?.subscription?.status === "active" ? (
                                <button onClick={() => navigate("/course/displaylectures", { state: { ...state } })} 
                                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                    Watch Lectures
                                </button>
                            ) : (
                                <button onClick={() => navigate("/checkout")} 
                                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                    Subscribe
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2 text-xl">
                        <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-5 ">
                            {state?.title}
                        </h1>
                        <p className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-semibold">Course Description:</p>
                        <p className="text-gray-300">{state?.description}</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseDescription;
