import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfirmationPopup } from "../components/ConfirmationPopup";
import { MockSetGridNew } from "../components/MockSetGridNew";
import { generalAwarness } from "../assignmentCategories/generalAwarness";

export const GeneralAwarness = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  // pop up if  question not generated
  const [errorMessage, setErrorMessage] = useState("");

  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // test category
  const testCategories = generalAwarness;

  const handleMockStartClick = async (test) => {
    setSelectedTest(test);
    setIsLoading(true);
    try {
      const response = await fetch(`${backendurl}/api/generate-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: test.title, count: test.questions }),
      });
      const result = await response.json();

      // pop up if  question not generated
      // const [errorMessage, setErrorMessage] = useState("");

      if (!result.questions || result.questions.length === 0) {
        setErrorMessage("Questions could not be generated. Please try again.");
        setIsLoading(false);
        return;
      }

      setData(result.questions);
      setShowConfirmation(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "❌ Failed to generate questions due to a server error. Please try again."
      );
    }
    setIsLoading(false);
  };

  const confirmStartTest = () => {
    setShowConfirmation(false);
    navigate("/exampage", {
      state: {
        questions: data,
        duration: selectedTest.duration,
        testTitle: selectedTest.title,
        testChapter: selectedTest.chapter,

      },
    });
  };

  const cancelStartTest = () => {
    setShowConfirmation(false);
    setSelectedTest(null);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center py-4 sm:py-6 px-2 sm:px-4 relative overflow-hidden">
        {/* Grid Background Only */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        </div>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-full border-3 border-blue-600 border-t-transparent"
                />
                <motion.p className="mt-3 text-gray-700 text-sm font-medium">
                  Generating AI questions... It may take a few seconds...
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ConfirmationPopup
          isOpen={showConfirmation}
          onConfirm={confirmStartTest}
          onCancel={cancelStartTest}
          test={selectedTest}
        />

        {/* pop error if question not generated */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-14 sm:top-32 text-[10px] sm:text-sm right-4 z-50 px-3 py-2 bg-red-400 text-white rounded-md shadow-lg"
          >
            {errorMessage}
            <br />
            कभी-कभी इंटरनेट कनेक्टिविटी की वजह से प्रश्न लोड नहीं हो पाते।
            <button
              onClick={() => setErrorMessage("")}
              className="ml-2 font-bold text-white"
            >
              ✕
            </button>
          </motion.div>
        )}

        {/* Header Section */}
        <motion.div
          className="text-center mb-4 sm:mb-8  mt-2 sm:mt-6 w-full max-w-4xl sm:px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="text-xs font-semibold tracking-wider text-amber-500 uppercase mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Free Mock Test
            </motion.div>
            <motion.h1
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              General{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Awareness
              </span>
            </motion.h1>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto text-[11px] sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Stay updated with current affairs and sharpen your knowledge with
              AI-generated tests covering all major topics.
            </motion.p>
          </motion.div>

          {/* Professional Guidelines Box */}
          <motion.div
            className="max-w-3xl mx-auto sm:mb-1 p-4 sm:p-4 rounded-md sm:border-l-4 border-yellow-400 bg-yellow-50 shadow-sm text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-yellow-800 font-semibold mb-2">
              💡 Guidelines for AI-Generated Tests:
            </p>
            <ul className="list-disc list-inside space-y-1 text-yellow-800 text-[11px] sm:text-sm">
              <li>
                Connectivity issues can sometimes prevent questions from
                loading.
              </li>
              <li>
                Questions are dynamically generated by AI and may occasionally
                contain minor errors.
              </li>
              <li>
                कभी-कभी इंटरनेट कनेक्टिविटी की वजह से प्रश्न लोड नहीं हो पाते।
                ऐसे में कृपया बैक जाकर दोबारा टेस्ट शुरू करें। यह समस्या हो सकती
                है क्योंकि प्रश्न AI द्वारा जनरेट किए गए हैं।
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <MockSetGridNew
          testCategories={testCategories}
          handleMockStart={handleMockStartClick}
        />

        {/* Footer Note */}
        <motion.div
          className="mt-8 text-center text-xs text-gray-500 max-w-2xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>
            All tests are generated using AI to ensure relevant and up-to-date
            content based on current affairs and important events.
          </p>
        </motion.div>
      </div>
    </>
  );
};







// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ConfirmationPopup } from "../components/ConfirmationPopup";
// import { MockSetGridNew } from "../components/MockSetGridNew";

// export const GeneralAwarness = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedTest, setSelectedTest] = useState(null);

//   const backendurl = import.meta.env.VITE_BACKEND_URL;

//   const navigate = useNavigate();

//   const testCategories = [
//     {
//       title: "Current Affairs – Last Month",
//       difficulty: "Medium",
//       description: "Important news and events from the last month",
//       questions: 6,
//       time: "15 min",
//       duration: 15,
//       icon: "📰",
//       ai: true,
//     },
//     {
//       title: "National & International Events",
//       difficulty: "Medium",
//       description: "Key events and happenings from around the world",
//       questions: 7,
//       time: "15 min",
//       duration: 15,
//       icon: "🌐",
//       ai: true,
//     },
//     {
//       title: "Government Policies & Schemes",
//       difficulty: "Medium",
//       description: "Important government schemes and initiatives",
//       questions: 6,
//       time: "12 min",
//       duration: 12,
//       icon: "🏛️",
//       ai: true,
//     },
//     {
//       title: "Awards & Recognitions",
//       difficulty: "Easy",
//       description: "Major awards, honors, and recognitions recently",
//       questions: 5,
//       time: "10 min",
//       duration: 10,
//       icon: "🏆",
//       ai: true,
//     },
//     {
//       title: "Sports – Last Month & Last Year",
//       difficulty: "Medium",
//       description: "Major sports events, winners, and achievements",
//       questions: 6,
//       time: "15 min",
//       duration: 15,
//       icon: "⚽",
//       ai: true,
//     },
//     {
//       title: "Science & Technology",
//       difficulty: "Medium",
//       description: "Recent developments and discoveries in science & tech",
//       questions: 7,
//       time: "15 min",
//       duration: 15,
//       icon: "🔬",
//       ai: true,
//     },
//     {
//       title: "Economy & Business Updates",
//       difficulty: "Medium",
//       description: "Latest economic trends, markets, and business news",
//       questions: 8,
//       time: "15 min",
//       duration: 15,
//       icon: "💹",
//       ai: true,
//     },
//     {
//       title: "International Affairs",
//       difficulty: "Hard",
//       description: "Key global events and geopolitical updates",
//       questions: 6,
//       time: "18 min",
//       duration: 18,
//       icon: "🌎",
//       ai: true,
//     },
//     {
//       title: "Important Days & Observances",
//       difficulty: "Easy",
//       description: "National and international important days and observances",
//       questions: 5,
//       time: "10 min",
//       duration: 10,
//       icon: "📅",
//       ai: true,
//     },
//     {
//       title: "Books & Authors",
//       difficulty: "Medium",
//       description: "Famous books, publications, and authors from last year",
//       questions: 6,
//       time: "12 min",
//       duration: 12,
//       icon: "📚",
//       ai: true,
//     },
//     {
//       title: "Miscellaneous General Awareness",
//       difficulty: "Medium",
//       description: "Other important events, discoveries, and general knowledge",
//       questions: 7,
//       time: "15 min",
//       duration: 15,
//       icon: "🧠",
//       ai: true,
//     },
//   ];

//   const handleMockStartClick = async (test) => {
//     setSelectedTest(test);
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${backendurl}/generate-questions`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ topic: test.title, count: test.questions }),
//       });

//       const result = await response.json();
//       setData(result.questions || generateFallbackQuestions(test.title));
//       setShowConfirmation(true);
//     } catch (err) {
//       console.error(err);
//       setData(generateFallbackQuestions(test.title));
//       setShowConfirmation(true);
//     }

//     setIsLoading(false);
//   };

//   const generateFallbackQuestions = () => {
//     return [
//       {
//         id: 1,
//         category: "General Awareness",
//         question: {
//           en: "Which country hosted the 2022 Winter Olympics?",
//           hi: "2022 शीतकालीन ओलंपिक की मेजबानी किस देश ने की?",
//         },
//         options: {
//           en: ["China", "Japan", "South Korea", "Russia"],
//           hi: ["चीन", "जापान", "दक्षिण कोरिया", "रूस"],
//         },
//         answer: {
//           en: "China",
//           hi: "चीन",
//         },
//       },
//     ];
//   };

//   const confirmStartTest = () => {
//     setShowConfirmation(false);
//     navigate("/exampage", {
//       state: {
//         questions: data,
//         duration: selectedTest.duration,
//         testTitle: selectedTest.title,
//       },
//     });
//   };

//   const cancelStartTest = () => {
//     setShowConfirmation(false);
//     setSelectedTest(null);
//   };

//   return (
//     <>
//       <div className="min-h-screen flex flex-col items-center py-4 sm:py-6 px-2 sm:px-4 relative overflow-hidden">
//         {/* Grid Background Only */}
//         <div className="absolute inset-0 -z-10 overflow-hidden">
//           <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
//         </div>

//         <AnimatePresence>
//           {isLoading && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50"
//             >
//               <div className="flex flex-col items-center">
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="w-10 h-10 rounded-full border-3 border-blue-600 border-t-transparent"
//                 />
//                 <motion.p className="mt-3 text-gray-700 text-sm font-medium">
//                   Generating AI questions... It may take a few seconds...
//                 </motion.p>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <ConfirmationPopup
//           isOpen={showConfirmation}
//           onConfirm={confirmStartTest}
//           onCancel={cancelStartTest}
//           test={selectedTest}
//         />

//         {/* Header Section */}
//         <motion.div
//           className="text-center mb-4 sm:mb-8  mt-2 sm:mt-6 w-full max-w-4xl sm:px-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           <motion.div
//             className="text-center mb-8 sm:mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <motion.div
//               className="text-xs font-semibold tracking-wider text-amber-500 uppercase mb-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.1 }}
//             >
//               Free Mock Test
//             </motion.div>
//             <motion.h1
//               className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               General{" "}
//               <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
//                 Awareness
//               </span>
//             </motion.h1>
//             <motion.p
//               className="text-gray-600 max-w-2xl mx-auto text-[11px] sm:text-sm"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               Stay updated with current affairs and sharpen your knowledge with
//               AI-generated tests covering all major topics.
//             </motion.p>
//           </motion.div>

//           {/* Professional Guidelines Box */}
//           <motion.div
//             className="max-w-3xl mx-auto sm:mb-1 p-4 sm:p-4 rounded-md sm:border-l-4 border-yellow-400 bg-yellow-50 shadow-sm text-left"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <p className="text-yellow-800 font-semibold mb-2">
//               💡 Guidelines for AI-Generated Tests:
//             </p>
//             <ul className="list-disc list-inside space-y-1 text-yellow-800 text-[11px] sm:text-sm">
//               <li>
//                 Connectivity issues can sometimes prevent questions from
//                 loading.
//               </li>
//               <li>
//                 Questions are dynamically generated by AI and may occasionally
//                 contain minor errors.
//               </li>
//               <li>
//                 कभी-कभी इंटरनेट कनेक्टिविटी की वजह से प्रश्न लोड नहीं हो पाते।
//                 ऐसे में कृपया बैक जाकर दोबारा टेस्ट शुरू करें। यह समस्या हो सकती
//                 है क्योंकि प्रश्न AI द्वारा जनरेट किए गए हैं।
//               </li>
//               <li>
//                 Tests are meant to enhance your general awareness and exam
//                 readiness.
//               </li>
//               <li>
//                 Review questions carefully and learn from mistakes for better
//                 preparation.
//               </li>
//             </ul>
//           </motion.div>
//         </motion.div>

//         <MockSetGridNew
//           testCategories={testCategories}
//           handleMockStart={handleMockStartClick}
//         />

//         {/* Footer Note */}
//         <motion.div
//           className="mt-8 text-center text-xs text-gray-500 max-w-2xl px-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//         >
//           <p>
//             All tests are generated using AI to ensure relevant and up-to-date
//             content based on current affairs and important events.
//           </p>
//         </motion.div>
//       </div>
//     </>
//   );
// };
