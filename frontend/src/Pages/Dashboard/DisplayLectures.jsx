import React, { useEffect, useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourseLecture, getCourseLectures } from '../../Redux/Slices/LectureSlice';

function Displaylectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { lectures } = useSelector((state) => state.lecture);
    const { role } = useSelector((state) => state.auth);
    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId) {
        console.log(courseId, lectureId);
        await dispatch(deleteCourseLecture({ courseId: courseId, lectureId: lectureId }));
        await dispatch(getCourseLectures(courseId));
    }

    useEffect(() => {
        console.log(state);
        if (!state) navigate("/courses");
        dispatch(getCourseLectures(state._id));
    }, []);

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white  bg-gradient-to-b from-gray-900 to-black">
                <div className="text-center text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Course Name: {state?.title}
                </div>

                {(lectures && lectures.length > 0) ? (
                    <div className="flex flex-col md:flex-row justify-center gap-10 w-full">
                        {/* Left Section: Video Player */}
                        <div className="w-[28rem] p-4 rounded-lg shadow-lg bg-gray-800 bg-opacity-50 backdrop-blur-lg">
                            <video
                                src={lectures[currentVideo]?.lecture?.secure_url}
                                className="object-fill rounded-lg w-full"
                                controls
                                disablePictureInPicture
                                muted
                                controlsList="nodownload"
                            ></video>
                            <div className="mt-4">
                                <h1 className="text-lg font-semibold text-yellow-400">Title: {lectures[currentVideo]?.title}</h1>
                                <p className="text-sm text-gray-300">Description: {lectures[currentVideo]?.description}</p>
                            </div>
                        </div>

                        {/* Right Section: Lecture List */}
                        <ul className="w-[28rem] p-4 rounded-lg shadow-lg bg-gray-800 bg-opacity-50 backdrop-blur-lg space-y-4">
                            <li className="font-semibold  flex items-center justify-between">
                                <p>Lectures List</p>
                                {role === "ADMIN" && (
                                    <button onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="px-3 py-2  font-semibold  bg bg-primary transition-all rounded-md">
                                        + Add Lecture
                                    </button>
                                )}
                            </li>
                            {lectures.map((lecture, idx) => (
                                <li className="space-y-2 border-b border-gray-700 pb-2" key={lecture._id}>
                                    <p className="cursor-pointer hover:text-yellow-400 transition" onClick={() => setCurrentVideo(idx)}>
                                        Lecture {idx + 1}: {lecture?.title}
                                    </p>
                                    {role === "ADMIN" && (
                                        <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className="px-3 py-2 text-sm font-semibold bg-red-500 hover:bg-red-600 transition-all rounded-md">
                                            Delete
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    role === "ADMIN" && (
                        <button onClick={() => navigate("/course/addlecture", { state: { ...state } })} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 transition-all rounded-md font-semibold text-lg">
                            Add New Lecture
                        </button>
                    )
                )}
            </div>
        </HomeLayout>
    );
}

export default Displaylectures;
