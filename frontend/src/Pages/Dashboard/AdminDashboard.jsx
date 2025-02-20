import React, { useEffect } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { Chart as ChartJS,ArcElement,BarElement,CategoryScale,Legend,LinearScale,Title,Tooltip} from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCourse, getAllCourses } from '../../Redux/Slices/CourseSlice'
import { getStatsData } from '../../Redux/Slices/StatSlice'
import { getPaymentRecord } from '../../Redux/Slices/RazorpaySlice'
import { Bar, Pie } from 'react-chartjs-2'
import {FaUsers} from "react-icons/fa"
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { BsCollectionPlayFill, BsTrash } from 'react-icons/bs'


ChartJS.register(ArcElement,BarElement,CategoryScale,Legend,LinearScale,Title,Tooltip)


function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);

    const { allPayments, monthlySalesRecord } = useSelector((state) => state.razorpay);


    const userData = {
        labels: ["Registered User", "Enrolled User"],
        fontColor: "white",
        datasets: [
            {
                label: "User Details",
                data: [allUsersCount, subscribedCount],
                backgroundColor: ["yellow", "green"],
                borderWidth: 1,
                borderColor: ["yellow","green"]
            },
        ]
    };

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        fontColor: "white",
        datasets: [
            {
                label: "Sales / Month",
                data: monthlySalesRecord,
                backgroundColor: ["red"],
                borderColor: ["white"],
                borderWidth: 2
            }

        ]
    }

    const myCourses = useSelector((state) => state?.course?.courseData);

    async function onCourseDelete(id) {
        if(window.confirm("Are you sure you want to delete the course ? ")) {
            const res = await dispatch(deleteCourse(id));
            console.log(res);
            if(res?.payload?.success) {
                await dispatch(getAllCourses());
            }
        }
    }


    useEffect(() => {
        (
            async () => {
                await dispatch(getAllCourses());
                await dispatch(getStatsData());
                await dispatch(getPaymentRecord())
            }
        )()
    }, [])


  return (
    <HomeLayout>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-5 text-white flex flex-col gap-10">
                <h1 className="text-center text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>

                {/* Statistics Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-[90%]">
                    {/* Users Statistics */}
                    <div className="flex flex-col items-center gap-6 p-6 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-lg border border-gray-700">
                        <div className="w-80 h-80">
                            <Pie data={userData} />
                        </div>
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <StatCard label="Registered Users" count={allUsersCount ?? 0} icon={<FaUsers className="text-yellow-500 text-5xl" />} />
                            <StatCard label="Subscribed Users" count={subscribedCount ?? 0} icon={<FaUsers className="text-green-500 text-5xl" />} />
                        </div>
                    </div>
                    {/* Sales Statistics */}
                    <div className="flex flex-col items-center gap-6 p-6 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-lg border border-gray-700">
                        <div className="h-80 w-full relative">
                            <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
                        </div>
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <StatCard label="Subscription Count" count={allPayments?.count ?? 0} icon={<FcSalesPerformance className="text-yellow-500 text-5xl" />} />
                            <StatCard label="Total Revenue" count={`$${allPayments?.count * 499}`} icon={<GiMoneyStack className="text-green-500 text-5xl" />} />
                        </div>
                    </div>
                </div>

                {/* Courses Overview */}
                <div className="mx-auto w-[90%] flex flex-col items-center justify-center gap-10">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-3xl font-bold text-white">Courses Overview</h1>
                        <button
                            onClick={() => navigate("/course/create")}
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:bg-yellow-600 transition-all duration-300 rounded py-2 px-4 font-semibold text-lg"
                        >
                            Create New Course
                        </button>
                    </div>
                    <table className="table-auto w-full border-collapse border border-white shadow-lg text-left text-white mb-5">
                        <thead className="bg-gray-800 text-yellow-400">
                            <tr>
                                <th className="p-3">S No</th>
                                <th className="p-3">Course Title</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Instructor</th>
                                <th className="p-3">Lectures</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myCourses?.map((course, idx) => (
                                <tr key={course._id} className="hover:bg-gray-900">
                                    <td className="p-3">{idx + 1}</td>
                                    <td className="p-3">{course?.title}</td>
                                    <td className="p-3">{course?.category}</td>
                                    <td className="p-3">{course?.createdBy}</td>
                                    <td className="p-3">{course?.numberOfLectures}</td>
                                    <td className="p-3 truncate w-40">{course?.description}</td>
                                    <td className="p-3 flex gap-4">
                                        <button
                                            className="bg-green-500 hover:bg-green-600 p-2 rounded-md text-white"
                                            onClick={() => navigate("/course/displaylectures", { state: { ...course } })}
                                        >
                                            <BsCollectionPlayFill />
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white"
                                            onClick={() => onCourseDelete(course?._id)}
                                        >
                                            <BsTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </HomeLayout>
  )
}
const StatCard = ({ label, count, icon }) => {
    return (
        <div className="flex items-center justify-between p-4 gap-5 bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg shadow-md w-full">
            <div className="flex flex-col items-center">
                <p className="font-semibold text-white">{label}</p>
                <h3 className="text-4xl font-bold text-yellow-300">{count}</h3>
            </div>
            {icon}
        </div>
    );
};

export default AdminDashboard