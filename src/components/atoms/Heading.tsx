"use client";
import React from "react";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: "600",
  style: "normal",
  subsets: ["latin"],
  preload: true,
});

const textContainer = {
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};

const Heading = () => {
  return (
    <motion.h1
      className={`${montserrat.className} text-4xl md:text-5xl font-bold bg-clip-text bg-gradient-to-b from-primaryOrange to-orange-500 text-transparent shadow-2xl`}
      variants={textContainer}
      initial="hidden"
      whileInView="show"
    >
      DRIZZLE TODO
    </motion.h1>
  );
};

export default Heading;
