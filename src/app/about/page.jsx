"use client";
import fetchData from "@/hooks/useFetchData/useFetchData";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper/modules";

const AboutPage = () => {
  const [userData, setUserData] = useState(null);
  const containerRef = useRef();

  const skillRef = useRef();
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const educationRef = useRef();
  const isEducationRefInView = useInView(educationRef, { margin: "-100px" });

  const experienceRef = useRef();
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  const serviceRef = useRef();
  const isServiceRefInView = useInView(serviceRef, { margin: "-100px" });

  const testimonialRef = useRef();
  const isTestimonialRefInView = useInView(testimonialRef, {
    margin: "-100px",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData();
        setUserData(response.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full overflow-scroll" ref={containerRef}>
        <div className="p-4 sm:p-8 md:p-12 lg:p-20 xl:p-48 flex flex-col gap-24 md:gap-32 lg:gap-48 xl:gap-64">
          {/* ABOUT SECTION */}
          <div className="flex flex-col items-center gap-8 justify-center">
            <Image
              src={userData?.about?.alternateAvatars[0]?.url}
              alt=""
              width={112}
              height={112}
              className="w-28 h-28 rounded-full object-cover"
            />
            <div className="text-center space-y-2">
              <h1 className="font-bold text-2xl">{userData?.about?.name}</h1>
              <p className="text-sm font-light">
                {userData?.about?.description}
              </p>
              <h3 className="font-bold text-xl pt-8">
                {userData?.about?.subTitle}
              </h3>
            </div>
          </div>

          {/* SKILLS SECTION */}
          <div className="flex flex-col gap-12 justify-center" ref={skillRef}>
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl text-center"
            >
              SKILLS
            </motion.h1>
            <motion.div
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              className="flex gap-4 flex-wrap"
            >
              <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                {userData?.skills.map((skill) => (
                  <div key={skill._id}>
                    {skill.enabled === true && (
                      <div>
                        <Image
                          height={150}
                          width={150}
                          alt=""
                          src={skill?.image?.url}
                        ></Image>
                        <h5 className="text-center font-light">{skill.name}</h5>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* TIMELINE SECTION */}
          <div className="flex flex-col lg:flex-row items-center">
            {/* EDUCATION SECTION */}
            <div
              className="flex flex-col gap-12 justify-center pb-48"
              ref={educationRef}
            >
              <motion.h1
                initial={{ x: "-300px" }}
                animate={isEducationRefInView ? { x: "0" } : {}}
                transition={{ delay: 0.2 }}
                className="font-bold text-2xl text-center"
              >
                EDUCATIONS
              </motion.h1>

              <motion.div
                initial={{ x: "-300px" }}
                animate={isEducationRefInView ? { x: "0" } : {}}
                className=""
              >
                {userData?.timeline.map((experience) => (
                  <div key={experience._id}>
                    {experience?.forEducation == true && (
                      <div className="flex justify-between h-full">
                        <div className="mb-5 w-full">
                          {/* JOB TITLE */}
                          <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                            {experience?.jobTitle}
                          </div>
                          {/* JOB DESC */}
                          <div className="p-3 text-sm italic">
                            {experience?.summary}
                          </div>
                          {/* JOB DATE */}
                          <div className="p-3 text-red-400 text-sm font-semibold">
                            {formatDate(experience?.startDate)} to{" "}
                            {formatDate(experience?.endDate)}
                          </div>
                          {/* JOB COMPANY */}
                          <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                            {experience?.company_name}
                          </div>
                        </div>
                        {/* CENTER */}
                        <div className="w-1/6 hidden lg:flex justify-center">
                          <div className="w-1 h-full bg-gray-600 rounded relative">
                            <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* EXPERIENCE SECTION */}
            <div
              className="flex flex-col gap-12 justify-center pb-48"
              ref={experienceRef}
            >
              <motion.h1
                initial={{ x: "-300px" }}
                animate={isExperienceRefInView ? { x: "0" } : {}}
                transition={{ delay: 0.2 }}
                className="font-bold text-2xl text-center"
              >
                EXPERIENCE
              </motion.h1>
              <motion.div
                initial={{ x: "-300px" }}
                animate={isExperienceRefInView ? { x: "0" } : {}}
                className=""
              >
                {userData?.timeline.map((experience) => (
                  <div key={experience._id}>
                    {experience?.forEducation == !true && (
                      <div className="flex justify-between h-full">
                        <div className="mb-5 w-full">
                          <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                            {experience?.jobTitle}
                          </div>
                          <div className="p-3 text-sm italic">
                            {experience?.summary}
                          </div>
                          <div className="p-3 text-red-400 text-sm font-semibold">
                            {formatDate(experience?.startDate)} to{" "}
                            {formatDate(experience?.endDate)}
                          </div>
                          <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                            {experience?.company_name}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* SERVICE SECTION */}
          <div className="flex flex-col gap-12 justify-center" ref={serviceRef}>
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isServiceRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl text-center"
            >
              SERVICE
            </motion.h1>
            <motion.div
              initial={{ x: "-300px" }}
              animate={isServiceRefInView ? { x: 0 } : {}}
              className="flex gap-4 flex-wrap"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {userData?.services?.map((service) => (
                  <div
                    key={service?._id}
                    className="p-5 border border-gray-500 rounded-lg flex flex-col justify-between shadow-md hover:shadow-none transition-transform"
                  >
                    <div className="">
                      <Image
                        className="object-cover rounded-lg"
                        src={service?.image?.url}
                        width={300}
                        height={300}
                        alt=""
                      />
                    </div>
                    <div className="space-y-2 mt-2">
                      <h1 className="text-xl font-semibold">{service?.name}</h1>
                      <p className="text-sm font-light">{service?.desc}</p>
                      <h6 className="font-semibold text-red-500">
                        {service?.charge}
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* TESTIMONIALS */}
          <div
            className="flex flex-col gap-12 justify-center"
            ref={testimonialRef}
          >
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isTestimonialRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl text-center"
            >
              TESTIMONIALS
            </motion.h1>
            <motion.div
              initial={{ x: "-300px" }}
              animate={isTestimonialRefInView ? { x: 0 } : {}}
              className="flex gap-4 flex-wrap"
            >
              <Swiper
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
                autoplay={{ delay: 100 }}
                loop={true}
              >
                {userData?.testimonials.map((testimonial) => (
                  <SwiperSlide
                    key={testimonial?._id}
                    className="p-5 rounded-lg"
                  >
                    <div className="space-y-3">
                      <p className="text-sm font-light">
                        {testimonial?.review}
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12">
                          <Image
                            src={testimonial?.image?.url}
                            height={10}
                            width={10}
                            alt=""
                            className="rounded-full"
                          />
                        </div>
                        <div className="text-start">
                          <h1 className="text-base font-semibold">
                            {testimonial?.name}
                          </h1>
                          <p className="text-xs font-semibold">
                            {testimonial?.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
