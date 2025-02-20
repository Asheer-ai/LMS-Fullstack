import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from '../../Layouts/HomeLayout';
import CourseCard from '../../Components/CourseCard';

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state.course);

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <HomeLayout>
            <div className="relative min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white 
                bg-gradient-to-b from-gray-900 via-gray-800 to-black">
                
                {/* Overlay for depth effect */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                {/* Main content */}
                <div className="relative z-10">
                    <h1 className="text-center text-3xl font-semibold mb-5">
                        Explore the courses made by{" "}
                        <span className="text-center text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Industry experts
                        </span>
                    </h1>

                    <div className="mb-10 flex flex-wrap gap-14 ">
                        {courseData?.map((element) => (
                            <div className="bg-gray-800 bg-opacity-50 p-5 rounded-xl backdrop-blur-lg shadow-lg">
                                <CourseCard key={element._id} data={element} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;
