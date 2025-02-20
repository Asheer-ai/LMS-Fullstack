import React from "react";
import Tilt from "react-parallax-tilt";
import HomeLayout from "../Layouts/HomeLayout";
import AboutUsPage from "../Assets/Images/AboutUsPage-Photoroom.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

function AboutUs() {
    return (
        <HomeLayout>
            {/* Full Page Gradient Background */}
            <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center px-6 md:px-16 py-20">
                
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-gray-800 p-10 mb-20 rounded-3xl shadow-lg max-w-7xl w-full">
                    {/* Left Content */}
                    <section className="md:w-1/2 space-y-6">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            <Typewriter
                                words={["Quality Education Within Reach"]}
                                loop={false}
                                typeSpeed={70}
                                cursor
                                cursorStyle="|"
                            />
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Our mission is to deliver affordable, high-quality education to learners worldwide. 
                            Our platform serves as a bridge for aspiring teachers and students, enabling them 
                            to share their skills, creativity, and knowledge. By fostering collaboration and 
                            learning, we aim to empower individuals and contribute to the growth and well-being of society.
                        </p>
                        <Link to="/courses">
                            <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                Learn More
                            </button>
                        </Link>
                    </section>

                    {/* Right Image */}
                    <div className="md:w-1/2 flex justify-center">
                        <Tilt tiltReverse={true} glareEnable={true}  glareColor="#ffffff">
                            <img src={AboutUsPage} alt="About Us" className="w-[70%] " />
                        </Tilt>
                    </div>
                </div>

                {/* Carousel Section */}
                <div className="w-full flex flex-col items-center ">
                    <div className="carousel w-full md:w-3/4 lg:w-1/2">
                        {celebrities.map((celebrity) => (
                            <CarouselSlide {...celebrity} key={celebrity.slideNumber} totalSlides={celebrities.length} />
                        ))}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default AboutUs;
