"use client"

import Image from "next/image";
import { motion } from "framer-motion";

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)"
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)"
  }
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <svg width="80px" height="80px" viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg"
    >
    <title>Group 3</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <motion.g 
     variants={icon}
     initial="hidden"
     animate="visible"
     transition={{
       default: { duration: 2, ease: "easeInOut" },
       fill: { duration: 2, ease: [1, 0, 0.8, 1] }
     }}
    id="Desktop" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
    variants={icon}
    initial="hidden"
    animate="visible"
    transition={{
      default: { duration: 2, ease: "easeInOut" },
      fill: { duration: 2, ease: [1, 0, 0.8, 1] }
    }}>
        <motion.g id="preference" transform="translate(-680.000000, -224.000000)">
            <g id="Group-3" transform="translate(680.000000, 224.000000)">
                <motion.path 
                // variants={icon}
                // initial="hidden"
                // animate="visible"
                // transition={{
                //   default: { duration: 2, ease: "easeInOut" },
                //   fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                // }}
                d="M40,80 C70.09139,80 80,70.09139 80,40 C80,9.90861001 70.09139,0 40,0 C9.90861001,0 1.84256622e-15,9.90861001 0,40 C0,70.09139 9.90861001,80 40,80 Z" id="Oval-Copy" fill="#F03E3E"></motion.path>
                <motion.path 
                variants={icon}
                initial="hidden"
                animate="visible"
                transition={{
                  default: { duration: 2, ease: "easeInOut" },
                  fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                }}
                d="M40,31.1789773 C38.6506944,27.6116477 34.870625,25 30.9375,25 C25.8161806,25 21.875,28.9792614 21.875,34.2684659 C21.875,44.9893838 38.8424349,57.8524441 40,57.8524441 C41.1241007,57.8524441 58.125,44.9893838 58.125,34.2684659 C58.125,28.9792614 54.1838194,25 49.0625,25 C45.1253472,25 41.3493056,27.6116477 40,31.1789773 Z" id="Shape" fill="#FFFFFF"></motion.path>
            </g>
        </motion.g>
    </motion.g>
</svg>
    </main>
  );
}
