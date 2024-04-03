"use client";

import { useState, useEffect } from "react";
import fetchData from "../hooks/useFetchData/useFetchData";
// import Banner from "../components/Home/Banner/Banner";
// import About from "./about/page";
// import Services from "./services/page";
// import Skills from "./skills/page";
// import Projects from "./projects/page";
// import Timeline from "./timeline/page";
// import Testimonial from "./testimonial/page";
// import Contact from "./contact/page";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetchData();
        setUserData(response.user);
        setSuccess(response.success);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : success ? (
        <>
        <h1>home</h1>
          {/* <Banner user={userData} />
          <About about={userData?.about} />
          <Services services={userData?.services} />
          <Skills skills={userData?.skills} />
          <Projects projects={userData?.projects} />
          <Timeline timeline={userData?.timeline} />
          <Testimonial testimonials={userData?.testimonials} />
          <Contact user={userData} /> */}
        </>
      ) : (
        <p>Error: Data retrieval unsuccessful</p>
      )}
    </div>
  );
};

export default Home;
