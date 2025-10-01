import { useState, useEffect } from "react";
import { ArrowRight, Languages, Star, Zap, Rocket, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { CtaButton } from "./CtaButton";
import { CategorySlider } from "./CategorySlider";







// Content data separated from component for better organization
const content = {
  en: {
    title: "Master Your Exams with Precision Preparation",
    subtitle:
      "Intelligent testing platform designed to help you excel in competitive exams",
    categoriesTitle: "Specialized Test Modules",
    languageButton: "English",
    ctaButton: "Get Started",
  },
  hi: {
    title: "सटीक तैयारी के साथ अपनी परीक्षाओं में महारत हासिल करें",
    subtitle:
      "इंटेलिजेंट टेस्टिंग प्लेटफॉर्म आपको प्रतियोगी परीक्षाओं में उत्कृष्टता प्राप्त करने में मदद करने के लिए डिज़ाइन किया गया",
    ctaTitle: "अपने ज्ञान का परीक्षण करने के लिए तैयार हैं?",
    languageButton: "हिंदी",

    ctaButton: "शुरू करें",
  },
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Floating particles component
const FloatingParticles = () => {
  return (
    <>
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-blue-400/20"
          initial={{
            x: Math.random() * 100 - 50 + "vw",
            y: Math.random() * 100 - 50 + "vh",
          }}
          animate={{
            x: [null, Math.random() * 100 - 50 + "vw"],
            y: [null, Math.random() * 100 - 50 + "vh"],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </>
  );
};

export const Home = () => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    localStorage.setItem("language", language);
    setMounted(true);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const currentContent = content[language];

  // if user id not generated id generate automatically
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      const uniqueId = "fmt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
      const newUser = { username: "Guest", id: uniqueId };
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  }, []);






  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div> */}

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Floating particles */}
      <FloatingParticles />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8 sm:mb-12"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className=" text-2xl sm:text-4xl font-bold text-gray-800 tracking-tight flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Exam
            </span>
            <span className="text-gray-800">Online</span>
          </motion.h1>

          <motion.button
            className="px-4 py-2 rounded-lg bg-white text-gray-800 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg border border-gray-200"
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Toggle language"
          >
            <Languages size={16} />
            {currentContent.languageButton}
          </motion.button>
        </motion.div>

        {/* Hero Section */}
        <section className="mb-20 relative">
          <div className="grid grid-cols-1 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="text-center mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Star className="w-4 h-4 mr-2 fill-current" />
                Trusted by 50,000+ students
              </motion.div>

              <motion.h2
                className="text-[20px] sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-6 leading-tight max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                {currentContent.title}
              </motion.h2>

              <motion.p
                className="text-[12px] sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                {currentContent.subtitle}
              </motion.p>

              {/* Animated Features above CTA button */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium">AI-Powered</span>
                </motion.div>
                <motion.div
                  className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                    delay: 0.1,
                  }}
                >
                  <Rocket className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">Fast Learning</span>
                </motion.div>
                <motion.div
                  className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                    delay: 0.2,
                  }}
                >
                  <Crown className="w-4 h-4 text-amber-500 mr-2" />
                  <span className="text-sm font-medium">Premium Content</span>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 sm:py-4 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const section = document.getElementById("target-section");
                    section?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {currentContent.ctaButton}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {/* target  */}
              <motion.div
                id="target-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <CategorySlider />
              </motion.div>
            </motion.div>
            <CtaButton></CtaButton>
          </div>
        </section>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// import { useState, useEffect } from "react";
// import { ArrowRight, Languages, Star, Zap, Rocket, Crown } from "lucide-react";
// import { motion } from "framer-motion";
// import { CtaButton } from "./CtaButton";

// // Content data separated from component for better organization
// const content = {
//   en: {
//     title: "Master Your Exams with Precision Preparation",
//     subtitle:
//       "Intelligent testing platform designed to help you excel in competitive exams",
//     categoriesTitle: "Specialized Test Modules",
//     languageButton: "English",
//     ctaButton: "Get Started",
//   },
//   hi: {
//     title: "सटीक तैयारी के साथ अपनी परीक्षाओं में महारत हासिल करें",
//     subtitle:
//       "इंटेलिजेंट टेस्टिंग प्लेटफॉर्म आपको प्रतियोगी परीक्षाओं में उत्कृष्टता प्राप्त करने में मदद करने के लिए डिज़ाइन किया गया",
//     ctaTitle: "अपने ज्ञान का परीक्षण करने के लिए तैयार हैं?",
//     languageButton: "हिंदी",

//     ctaButton: "शुरू करें",
//   },
// };

// const itemVariants = {
//   hidden: { y: 25, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.6,
//       ease: [0.25, 0.46, 0.45, 0.94],
//     },
//   },
// };

// // Floating particles component
// const FloatingParticles = () => {
//   return (
//     <>
//       {[...Array(15)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-2 h-2 rounded-full bg-blue-400/20"
//           initial={{
//             x: Math.random() * 100 - 50 + "vw",
//             y: Math.random() * 100 - 50 + "vh",
//           }}
//           animate={{
//             x: [null, Math.random() * 100 - 50 + "vw"],
//             y: [null, Math.random() * 100 - 50 + "vh"],
//           }}
//           transition={{
//             duration: Math.random() * 10 + 10,
//             repeat: Infinity,
//             repeatType: "reverse",
//             ease: "linear",
//           }}
//         />
//       ))}
//     </>
//   );
// };

// export const Home = () => {
//   const [language, setLanguage] = useState(() => {
//     const savedLanguage = localStorage.getItem("language");
//     return savedLanguage || "en";
//   });
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     localStorage.setItem("language", language);
//     setMounted(true);
//   }, [language]);

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === "en" ? "hi" : "en"));
//   };

//   const currentContent = content[language];

//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
//         <div className="animate-pulse text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       {/* <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div> */}

//       {/* Floating elements for visual interest */}
//       <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//       <div className="absolute top-40 right-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//       <div className="absolute bottom-20 left-20 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

//       {/* Floating particles */}
//       <FloatingParticles />

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header */}
//         <motion.div
//           className="flex justify-between items-center mb-8 sm:mb-12"
//           variants={itemVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.h1
//             className=" text-2xl sm:text-4xl font-bold text-gray-800 tracking-tight flex items-center"
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 400, damping: 10 }}
//           >
//             <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
//               Exam
//             </span>
//             <span className="text-gray-800">Online</span>
//           </motion.h1>

//           <motion.button
//             className="px-4 py-2 rounded-lg bg-white text-gray-800 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg border border-gray-200"
//             onClick={toggleLanguage}
//             whileHover={{ scale: 1.05, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//             aria-label="Toggle language"
//           >
//             <Languages size={16} />
//             {currentContent.languageButton}
//           </motion.button>
//         </motion.div>

//         {/* Hero Section */}
//         <section className="mb-20 relative">
//           <div className="grid grid-cols-1 gap-12 items-center">
//             {/* Left Content */}
//             <motion.div
//               className="text-center mx-auto"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//             >
//               <motion.div
//                 className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <Star className="w-4 h-4 mr-2 fill-current" />
//                 Trusted by 50,000+ students
//               </motion.div>

//               <motion.h2
//                 className="text-[20px] sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-6 leading-tight max-w-4xl mx-auto"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3, duration: 0.7 }}
//               >
//                 {currentContent.title}
//               </motion.h2>

//               <motion.p
//                 className="text-[12px] sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4, duration: 0.7 }}
//               >
//                 {currentContent.subtitle}
//               </motion.p>

//               {/* Animated Features above CTA button */}
//               <motion.div
//                 className="flex flex-wrap justify-center gap-4 mb-8"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <motion.div
//                   className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                 >
//                   <Zap className="w-4 h-4 text-yellow-500 mr-2" />
//                   <span className="text-sm font-medium">AI-Powered</span>
//                 </motion.div>
//                 <motion.div
//                   className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
//                   whileHover={{ scale: 1.05 }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 400,
//                     damping: 10,
//                     delay: 0.1,
//                   }}
//                 >
//                   <Rocket className="w-4 h-4 text-blue-500 mr-2" />
//                   <span className="text-sm font-medium">Fast Learning</span>
//                 </motion.div>
//                 <motion.div
//                   className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
//                   whileHover={{ scale: 1.05 }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 400,
//                     damping: 10,
//                     delay: 0.2,
//                   }}
//                 >
//                   <Crown className="w-4 h-4 text-amber-500 mr-2" />
//                   <span className="text-sm font-medium">Premium Content</span>
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 className="flex flex-col sm:flex-row gap-4 justify-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 <motion.button
//                   className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 sm:py-4 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
//                   whileHover={{
//                     scale: 1.05,
//                     transition: { type: "spring", stiffness: 400, damping: 10 },
//                   }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   {currentContent.ctaButton}
//                   <ArrowRight className="w-5 h-5 ml-2" />
//                 </motion.button>
//               </motion.div>
//             </motion.div>

// <CtaButton></CtaButton>

//           </div>
//         </section>
//       </div>

//       <style jsx>{`
//         .bg-grid-pattern {
//           background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };
