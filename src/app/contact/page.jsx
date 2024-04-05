"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import fetchData from "@/hooks/useFetchData/useFetchData";

const ContactPage = () => {
  const [userData, setUserData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
        },
        () => {
          setError(true);
        }
      );
  };

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
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-fit flex flex-col gap-5 lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* FORM SECTION */}
        <form
          onSubmit={sendEmail}
          ref={form}
          className="lg:w-1/2 text-xl flex flex-col gap-8 justify-center p-5"
        >
          <input
            name="user_email"
            type="text"
            placeholder="Your Email"
            className="bg-transparent border border-gray-500 h-12 px-5 rounded-lg focus:outline-none"
          />
          <textarea
            rows={6}
            placeholder="Your message"
            className="bg-transparent border border-gray-500 rounded-lg focus:outline-none resize-none py-3 px-5"
            name="user_message"
          />
          <button className="bg-purple-200 rounded font-semibold text-gray-600 p-4">
            Send
          </button>
          {success && (
            <span className="text-green-600 font-semibold">
              Your message has been sent successfully!
            </span>
          )}
          {error && (
            <span className="text-red-600 font-semibold">
              Something went wrong!
            </span>
          )}
        </form>

        {/* TEXT SECTION */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-5 justify-center p-5">
          <h1 className="font-semibold text-2xl md:text-4xl lg:text-5xl">
            Please contact:
          </h1>
          <div className="space-y-2">
            <h1 className="text-base md:text-2xl lg:text-4xl">
              {userData?.about?.phoneNumber}
            </h1>
            <h1 className="text-base md:text-2xl lg:text-4xl">
              {userData?.about?.contactEmail}
            </h1>
            <h1 className="text-base md:text-2xl lg:text-4xl">
              {userData?.about?.address}
            </h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
