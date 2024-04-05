"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import fetchData from "@/hooks/useFetchData/useFetchData";

const Homepage = () => {
  const [userData, setUserData] = useState(null);

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

  return (
    <motion.div
      className="h-fit"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full overflow-scroll">
        <div className="min-h-screen max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-5 space-y-5 p-5">
          <div>
            <Image
              src={userData?.about?.avatar?.url}
              alt=""
              height={100}
              width={100}
              className="w-96 h-56 lg:h-96 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl md:text-6xl font-bold">
              {userData?.about?.quote}
            </h1>
            <p className="md:text-xl text-end">- {userData?.about?.name}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Homepage;
