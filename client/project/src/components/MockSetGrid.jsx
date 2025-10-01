import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SiGoogletranslate } from "react-icons/si";

export const MockSetGrid = ({ testCategories, handleMockStart }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };
  const cardHoverVariants = {
    hover: {
      y: -6,
      scale: 1.02,
      boxShadow:
        "0 12px 20px -10px rgba(0, 0, 0, 0.15), 0 6px 8px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Grid of Test Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mb-12"
      >
        {testCategories.map((test, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="relative"
          >
            <motion.div
              variants={cardHoverVariants}
              className={`bg-white rounded-lg shadow-sm px-3.5 py-2  sm:p-4 border border-gray-200/80 h-full flex flex-col relative overflow-hidden`}
            >
              {/* Gradient accent */}
              <div
                className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${test.color}`}
              ></div>

              <div className="flex items-start justify-between pl-2">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{test.icon}</span>
                  <h2 className="text-[15px] sm:text-base font-semibold text-gray-800">
                    {test.title}
                  </h2>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    test.difficulty === "Easy"
                      ? "bg-green-100 text-green-700"
                      : test.difficulty === "Medium"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {test.difficulty}
                </span>
              </div>

              <p className="text-gray-500 text-xs mt-1 mb-1 pl-2 flex-grow">
                {test.description}
              </p>

              {test.ai && (
                <div className="flex justify-start pl-2 mb-1">
                  <span
                    className="px-2.5 py-1 text-[10px] font-medium rounded-md 
      bg-gradient-to-r from-indigo-500 to-purple-600 
      text-white shadow-sm flex items-center gap-1"
                  >
                    AI-Generated (Finite Questions)
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-gray-400 text-xs pl-2 mb-1">
                <span className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {test.time}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-3.5 h-3.5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {test.questions} Qs
                </span>

                {/* language button */}
                <div>
                  <button
                    className="px-3 py-1 rounded-md bg-gray-700 text-white text-sm flex items-center gap-1"
                    onClick={(prev) =>
                      setLanguage((prev) => (prev === "en" ? "hi" : "en"))
                    }
                  >
                    <SiGoogletranslate />
                    {language === "en" ? "English" : "Hindi"}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMockStart(test)}
                className={`text-xs font-medium py-2 px-4 rounded-md w-full bg-gradient-to-r ${test.color} text-white shadow-sm`}
              >
                Start Test
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};





// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import { SiGoogletranslate } from "react-icons/si";

// export const MockSetGrid = ({ testCategories, handleMockStart }) => {
//   const [language, setLanguage] = useState(
//     () => localStorage.getItem("language") || "en"
//   );

//   useEffect(() => {
//     localStorage.setItem("language", language);
//   }, [language]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.08,
//       },
//     },
//   };
//   const itemVariants = {
//     hidden: { y: 15, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 120,
//         damping: 12,
//       },
//     },
//   };
//   const cardHoverVariants = {
//     hover: {
//       y: -6,
//       scale: 1.02,
//       boxShadow:
//         "0 12px 20px -10px rgba(0, 0, 0, 0.15), 0 6px 8px -5px rgba(0, 0, 0, 0.1)",
//       transition: {
//         duration: 0.25,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <>
//       {/* Grid of Test Categories */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mb-12"
//       >
//         {testCategories.map((test, index) => (
//           <motion.div
//             key={index}
//             variants={itemVariants}
//             whileHover="hover"
//             className="relative"
//           >
//             <motion.div
//               variants={cardHoverVariants}
//               className={`bg-white rounded-lg shadow-sm px-3.5 py-2  sm:p-4 border border-gray-200/80 h-full flex flex-col relative overflow-hidden`}
//             >
//               {/* Gradient accent */}
//               <div
//                 className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${test.color}`}
//               ></div>

//               <div className="flex items-start justify-between pl-2">
//                 <div className="flex items-center">
//                   <span className="text-xl mr-2">{test.icon}</span>
//                   <h2 className="text-[15px] sm:text-base font-semibold text-gray-800">
//                     {test.title}
//                   </h2>
//                 </div>
//                 <span
//                   className={`text-xs font-medium px-2 py-1 rounded ${
//                     test.difficulty === "Easy"
//                       ? "bg-green-100 text-green-700"
//                       : test.difficulty === "Medium"
//                       ? "bg-amber-100 text-amber-700"
//                       : "bg-rose-100 text-rose-700"
//                   }`}
//                 >
//                   {test.difficulty}
//                 </span>
//               </div>

//               <p className="text-gray-500 text-xs mt-1 mb-1 pl-2 flex-grow">
//                 {test.description}
//               </p>

//               {test.ai && (
//                 <div className="flex justify-start pl-2 mb-1">
//                   <span
//                     className="px-2.5 py-1 text-[10px] font-medium rounded-md 
//       bg-gradient-to-r from-indigo-500 to-purple-600 
//       text-white shadow-sm flex items-center gap-1"
//                   >
//                     AI-Generated (Finite Questions)
//                   </span>
//                 </div>
//               )}

//               <div className="flex items-center justify-between text-gray-400 text-xs pl-2 mb-1">
//                 <span className="flex items-center">
//                   <svg
//                     className="w-3.5 h-3.5 mr-1"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   {test.time}
//                 </span>
//                 <span className="flex items-center">
//                   <svg
//                     className="w-3.5 h-3.5 mr-1"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   {test.questions} Qs
//                 </span>

//                 {/* language button */}
//                 <div>
//                   <button
//                     className="px-3 py-1 rounded-md bg-gray-700 text-white text-sm flex items-center gap-1"
//                     onClick={(prev) =>
//                       setLanguage((prev) => (prev === "en" ? "hi" : "en"))
//                     }
//                   >
//                     <SiGoogletranslate />
//                     {language === "en" ? "English" : "Hindi"}
//                   </button>
//                 </div>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => handleMockStart(test)}
//                 className={`text-xs font-medium py-2 px-4 rounded-md w-full bg-gradient-to-r ${test.color} text-white shadow-sm`}
//               >
//                 Start Test
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </>
//   );
// };

