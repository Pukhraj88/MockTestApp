import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SiGoogletranslate } from "react-icons/si";
import { IoIosInformationCircleOutline, IoMdClose } from "react-icons/io";

export const ConfirmationPopup = ({ isOpen, onConfirm, onCancel, test }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en"
  );
  const [showLanguageHint, setShowLanguageHint] = useState(() => {
    // Check if user has previously dismissed the hint
    const dismissed = localStorage.getItem("languageHintDismissed");
    return dismissed !== "true";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const handleDismissHint = () => {
    setShowLanguageHint(false);
    localStorage.setItem("languageHintDismissed", "true");
  };

  if (!test) return null;

  // Language-specific content
  const content = {
    en: {
      title: `Start ${test.title}?`,
      description: `This test has ${test.questions} questions and will take approximately ${test.time} to complete.`,
      difficulty: `Difficulty: ${test.difficulty}`,
      cancel: "Cancel",
      confirm: "Start Test",
      details: "Test Details",
      instructions:
        "You'll need to complete all questions in one session. Your progress will be saved automatically.",
      languageHint: "You can change language anytime using the button above",
    },
    hi: {
      title: `${test.title} शुरू करें?`,
      description: `इस टेस्ट में ${test.questions} प्रश्न हैं और इसे पूरा करने में लगभग ${test.time} लगेंगे।`,
      difficulty: `कठिनाई: ${
        test.difficulty === "Easy"
          ? "आसान"
          : test.difficulty === "Medium"
          ? "मध्यम"
          : "कठिन"
      }`,
      cancel: "रद्द करें",
      confirm: "टेस्ट शुरू करें",
      details: "टेस्ट विवरण",
      instructions:
        "आपको सभी प्रश्नों को एक सत्र में पूरा करना होगा। आपकी प्रगति स्वचालित रूप से सहेजी जाएगी।",
      languageHint: "आप ऊपर दिए बटन का उपयोग करके कभी भी भाषा बदल सकते हैं",
    },
  };

  const currentContent = content[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed  mt-8 inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-md sm:rounded-xl p-4 sm:p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Language Toggle Button with Persistent Hint */}
            <div className="flex justify-between items-start mb-4 ">
              <AnimatePresence>
                {showLanguageHint && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-50 border border-red-100 text-red-700 text-xs px-3 py-2 rounded-lg flex items-start max-w-[70%] relative"
                  >
                    <IoIosInformationCircleOutline className="mt-0.5 mr-1.5 flex-shrink-0 text-red-600" />
                    <span>{currentContent.languageHint}</span>
                    <button
                      className="ml-2 text-red-800 hover:text-red-900 absolute -top-1 -right-1 bg-red-100 rounded-full p-1"
                      onClick={handleDismissHint}
                      aria-label="Dismiss notification"
                    >
                      <IoMdClose size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm flex items-center gap-1 hover:bg-gray-200 transition-colors flex-shrink-0"
                onClick={() => {
                  setLanguage((prev) => (prev === "en" ? "hi" : "en"));
                }}
                aria-label="Change language"
              >
                <SiGoogletranslate />
                {language === "en" ? "English" : "हिंदी"}
              </button>
            </div>

            {/* Popup Content */}
            <div className="text-center mb-2">
              <span className="text-4xl">{test.icon}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 text-center">
              {currentContent.title}
            </h3>

            {/* ✅ AI Generated Badge */}
            {test.ai && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center mb-4"
              >
                <span
                  className="px-4 py-1.5 text-sm font-semibold rounded-full 
      bg-gradient-to-r from-indigo-500 to-purple-600 
      text-white shadow-md flex items-center gap-2 animate-pulse"
                >
                  <span className="text-sm sm:text-lg">🤖</span>
                  AI Generated Questions
                </span>
              </motion.div>
            )}

            <div className="bg-gray-50 px-3 py-2 sm:p-4 rounded-lg mb-4">
              <h4 className="font-medium text-gray-800 mb-1 sm:mb-2  text-sm sm:text-sm">
                {currentContent.details}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm mb-3">
                {currentContent.description}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                    test.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : test.difficulty === "Medium"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {currentContent.difficulty}
                </span>
                <span className="text-gray-500 flex items-center text-[10px] sm:text-xs">
                  <svg
                    className="w-4 h-4 mr-1"
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
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg mb-5">
              <p className="text-blue-800 text-xs">
                💡 {currentContent.instructions}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={onCancel}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors order-2 sm:order-1"
              >
                {currentContent.cancel}
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-md transition-colors shadow-sm order-1 sm:order-2"
              >
                {currentContent.confirm}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};






// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import { SiGoogletranslate } from "react-icons/si";
// import { IoIosInformationCircleOutline, IoMdClose } from "react-icons/io";

// export const ConfirmationPopup = ({ isOpen, onConfirm, onCancel, test }) => {
//   const [language, setLanguage] = useState(
//     () => localStorage.getItem("language") || "en"
//   );
//   const [showLanguageHint, setShowLanguageHint] = useState(() => {
//     // Check if user has previously dismissed the hint
//     const dismissed = localStorage.getItem("languageHintDismissed");
//     return dismissed !== "true";
//   });

//   useEffect(() => {
//     localStorage.setItem("language", language);
//   }, [language]);

//   const handleDismissHint = () => {
//     setShowLanguageHint(false);
//     localStorage.setItem("languageHintDismissed", "true");
//   };

//   if (!test) return null;

//   // Language-specific content
//   const content = {
//     en: {
//       title: `Start ${test.title}?`,
//       description: `This test has ${test.questions} questions and will take approximately ${test.time} to complete.`,
//       difficulty: `Difficulty: ${test.difficulty}`,
//       cancel: "Cancel",
//       confirm: "Start Test",
//       details: "Test Details",
//       instructions:
//         "You'll need to complete all questions in one session. Your progress will be saved automatically.",
//       languageHint: "You can change language anytime using the button above",
//     },
//     hi: {
//       title: `${test.title} शुरू करें?`,
//       description: `इस टेस्ट में ${test.questions} प्रश्न हैं और इसे पूरा करने में लगभग ${test.time} लगेंगे।`,
//       difficulty: `कठिनाई: ${
//         test.difficulty === "Easy"
//           ? "आसान"
//           : test.difficulty === "Medium"
//           ? "मध्यम"
//           : "कठिन"
//       }`,
//       cancel: "रद्द करें",
//       confirm: "टेस्ट शुरू करें",
//       details: "टेस्ट विवरण",
//       instructions:
//         "आपको सभी प्रश्नों को एक सत्र में पूरा करना होगा। आपकी प्रगति स्वचालित रूप से सहेजी जाएगी।",
//       languageHint: "आप ऊपर दिए बटन का उपयोग करके कभी भी भाषा बदल सकते हैं",
//     },
//   };

//   const currentContent = content[language];

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed  mt-8 inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
//           onClick={onCancel}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             className="bg-white rounded-md sm:rounded-xl p-4 sm:p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Language Toggle Button with Persistent Hint */}
//             <div className="flex justify-between items-start mb-4 ">
//               <AnimatePresence>
//                 {showLanguageHint && (
//                   <motion.div
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="bg-red-50 border border-red-100 text-red-700 text-xs px-3 py-2 rounded-lg flex items-start max-w-[70%] relative"
//                   >
//                     <IoIosInformationCircleOutline className="mt-0.5 mr-1.5 flex-shrink-0 text-red-600" />
//                     <span>{currentContent.languageHint}</span>
//                     <button
//                       className="ml-2 text-red-800 hover:text-red-900 absolute -top-1 -right-1 bg-red-100 rounded-full p-1"
//                       onClick={handleDismissHint}
//                       aria-label="Dismiss notification"
//                     >
//                       <IoMdClose size={14} />
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <button
//                 className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm flex items-center gap-1 hover:bg-gray-200 transition-colors flex-shrink-0"
//                 onClick={() => {
//                   setLanguage((prev) => (prev === "en" ? "hi" : "en"));
//                 }}
//                 aria-label="Change language"
//               >
//                 <SiGoogletranslate />
//                 {language === "en" ? "English" : "हिंदी"}
//               </button>
//             </div>

//             {/* Popup Content */}
//             <div className="text-center mb-2">
//               <span className="text-4xl">{test.icon}</span>
//             </div>

//             <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 text-center">
//               {currentContent.title}
//             </h3>

//             {/* ✅ AI Generated Badge */}
//             {test.ai && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="flex justify-center mb-4"
//               >
//                 <span
//                   className="px-4 py-1.5 text-sm font-semibold rounded-full 
//       bg-gradient-to-r from-indigo-500 to-purple-600 
//       text-white shadow-md flex items-center gap-2 animate-pulse"
//                 >
//                   <span className="text-lg">🤖</span>
//                   AI Generated Questions
//                 </span>
//               </motion.div>
//             )}

//             <div className="bg-gray-50 p-4 rounded-lg mb-4">
//               <h4 className="font-medium text-gray-800 mb-2">
//                 {currentContent.details}
//               </h4>
//               <p className="text-gray-600 text-sm mb-3">
//                 {currentContent.description}
//               </p>
//               <div className="flex justify-between items-center text-sm">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     test.difficulty === "Easy"
//                       ? "bg-green-100 text-green-800"
//                       : test.difficulty === "Medium"
//                       ? "bg-amber-100 text-amber-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {currentContent.difficulty}
//                 </span>
//                 <span className="text-gray-500 flex items-center">
//                   <svg
//                     className="w-4 h-4 mr-1"
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
//               </div>
//             </div>

//             <div className="bg-blue-50 p-3 rounded-lg mb-5">
//               <p className="text-blue-800 text-xs">
//                 💡 {currentContent.instructions}
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 justify-end">
//               <button
//                 onClick={onCancel}
//                 className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors order-2 sm:order-1"
//               >
//                 {currentContent.cancel}
//               </button>
//               <button
//                 onClick={onConfirm}
//                 className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-md transition-colors shadow-sm order-1 sm:order-2"
//               >
//                 {currentContent.confirm}
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };
