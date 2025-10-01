import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfirmationPopup } from "../components/ConfirmationPopup";
import { MockSetGridNew } from "../components/MockSetGridNew";
import { numericAbility } from "../assignmentCategories/numericAbility";

export const NumericalAbility = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const testCategories = numericAbility;

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
        {/* Grid Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-white"></div>
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

        <ConfirmationPopup
          isOpen={showConfirmation}
          onConfirm={confirmStartTest}
          onCancel={cancelStartTest}
          test={selectedTest}
        />

        {/* Header Section */}
        <motion.div
          className="text-center mb-8 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="text-xs font-semibold tracking-wider text-blue-600 uppercase mb-2 bg-blue-100 px-3 py-1 rounded-full inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            AI-Powered Assessment
          </motion.div>
          <motion.h1
            className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Numerical Ability{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Mastery
            </span>
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-[12px] sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Enhance your quantitative skills with AI-generated tests tailored to
            exam patterns
          </motion.p>
        </motion.div>

        {/* Professional Guidelines Box */}
        <motion.div
          className="max-w-3xl mx-auto mb-4 p-4 sm:p-4 rounded-md sm:border-l-4 border-yellow-400 bg-yellow-50 shadow-sm text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-yellow-800 font-semibold mb-2">
            💡 Guidelines for AI-Generated Tests:
          </p>
          <ul className="list-disc list-inside space-y-1 text-yellow-800 text-[11px] sm:text-sm">
            <li>
              Connectivity issues can sometimes prevent questions from loading.
            </li>
            <li>
              Questions are dynamically generated by AI and may occasionally
              contain minor errors.
            </li>
            <li>
              कभी-कभी इंटरनेट कनेक्टिविटी की वजह से प्रश्न लोड नहीं हो पाते। ऐसे
              में कृपया बैक जाकर दोबारा टेस्ट शुरू करें। यह समस्या हो सकती है
              क्योंकि प्रश्न AI द्वारा जनरेट किए गए हैं।
            </li>
            <li>
              Tests are meant to enhance your general awareness and exam
              readiness.
            </li>
            <li>
              Review questions carefully and learn from mistakes for better
              preparation.
            </li>
          </ul>
        </motion.div>

        <MockSetGridNew
          testCategories={testCategories}
          handleMockStart={handleMockStartClick}
        />
      </div>
    </>
  );
};







// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ConfirmationPopup } from "../components/ConfirmationPopup";
// import { MockSetGridNew } from "../components/MockSetGridNew";

// export const NumericalAbility = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedTest, setSelectedTest] = useState(null);

//   const backendurl = import.meta.env.VITE_BACKEND_URL;

//   const navigate = useNavigate();

//   const testCategories = [
//     {
//       title: "Percentages",
//       difficulty: "Medium",
//       description: "Calculate percentages and solve related problems",
//       questions: 6,
//       time: "15 min",
//       duration: 15,
//       icon: "📊",
//       ai: true,
//     },
//     {
//       title: "Number System",
//       difficulty: "Medium",
//       description: "Problems related to number properties and operations",
//       questions: 4,
//       time: "18 min",
//       duration: 18,
//       icon: "🔢",
//       ai: true,
//     },
//     {
//       title: "Profit and Loss",
//       difficulty: "Medium",
//       description: "Calculate profit, loss, discount and related concepts",
//       questions: 4,
//       time: "12 min",
//       duration: 12,
//       icon: "💰",
//       ai: true,
//     },
//     {
//       title: "Simple & Compound Interest",
//       difficulty: "Medium",
//       description: "Calculate simple and compound interest",
//       questions: 5,
//       time: "15 min",
//       duration: 15,
//       icon: "📈",
//       ai: true,
//     },

//     {
//       title: "Time & Distance",
//       difficulty: "Medium",
//       description: "Solve problems related to speed, time and distance",
//       questions: 6,
//       time: "15 min",
//       duration: 15,
//       icon: "⏱️",
//       ai: true,
//     },
//     {
//       title: "Work & Time",
//       difficulty: "Medium",
//       description: "Calculate work efficiency and time management problems",
//       questions: 5,
//       time: "15 min",
//       duration: 15,
//       icon: "⏰",
//       ai: true,
//     },
//     {
//       title: "Sequence & Series",
//       difficulty: "Hard",
//       description: "Identify patterns in sequences and series",
//       questions: 4,
//       time: "15 min",
//       duration: 15,
//       icon: "🔢",
//       ai: true,
//     },
//     {
//       title: "Permutations & Combinations",
//       difficulty: "Hard",
//       description: "Solve counting and arrangement problems",
//       questions: 4,
//       time: "15 min",
//       duration: 15,
//       icon: "🔀",
//       ai: true,
//     },
//     {
//       title: "Probability",
//       difficulty: "Hard",
//       description: "Calculate probabilities of events",
//       questions: 3,
//       time: "15 min",
//       duration: 15,
//       icon: "🎲",
//       ai: true,
//     },
//     {
//       title: "Data Interpretation",
//       difficulty: "Medium",
//       description: "Analyze and interpret data from charts and graphs",
//       questions: 4,
//       time: "20 min",
//       duration: 20,
//       icon: "📉",
//       ai: true,
//     },
//     {
//       title: "Mensuration",
//       difficulty: "Medium",
//       description: "Calculate area, volume of geometric shapes",
//       questions: 5,
//       time: "15 min",
//       duration: 15,
//       icon: "📐",
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
//         category: "Simplification & Approximation",
//         question: {
//           en: "Simplify: 15 + 20 × 3 - 10 ÷ 2",
//           hi: "Simplify: 15 + 20 × 3 - 10 ÷ 2",
//         },
//         options: {
//           en: ["70", "65", "80", "75"],
//           hi: ["70", "65", "80", "75"],
//         },
//         answer: {
//           en: "70",
//           hi: "70",
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
//         {/* Grid Background */}
//         <div className="absolute inset-0 -z-10 overflow-hidden">
//           <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
//           <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-white"></div>
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
//           className="text-center mb-8 mt-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           <motion.div
//             className="text-xs font-semibold tracking-wider text-blue-600 uppercase mb-2 bg-blue-100 px-3 py-1 rounded-full inline-block"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             AI-Powered Assessment
//           </motion.div>
//           <motion.h1
//             className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 mt-2"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//           >
//             Numerical Ability{" "}
//             <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               Mastery
//             </span>
//           </motion.h1>
//           <motion.p
//             className="text-gray-600 max-w-2xl mx-auto text-[12px] sm:text-base"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             Enhance your quantitative skills with AI-generated tests tailored to
//             exam patterns
//           </motion.p>
//         </motion.div>

//         {/* Professional Guidelines Box */}
//         <motion.div
//           className="max-w-3xl mx-auto mb-4 p-4 sm:p-4 rounded-md sm:border-l-4 border-yellow-400 bg-yellow-50 shadow-sm text-left"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           <p className="text-yellow-800 font-semibold mb-2">
//             💡 Guidelines for AI-Generated Tests:
//           </p>
//           <ul className="list-disc list-inside space-y-1 text-yellow-800 text-[11px] sm:text-sm">
//             <li>
//               Connectivity issues can sometimes prevent questions from loading.
//             </li>
//             <li>
//               Questions are dynamically generated by AI and may occasionally
//               contain minor errors.
//             </li>
//             <li>
//               कभी-कभी इंटरनेट कनेक्टिविटी की वजह से प्रश्न लोड नहीं हो पाते। ऐसे
//               में कृपया बैक जाकर दोबारा टेस्ट शुरू करें। यह समस्या हो सकती है
//               क्योंकि प्रश्न AI द्वारा जनरेट किए गए हैं।
//             </li>
//             <li>
//               Tests are meant to enhance your general awareness and exam
//               readiness.
//             </li>
//             <li>
//               Review questions carefully and learn from mistakes for better
//               preparation.
//             </li>
//           </ul>
//         </motion.div>

//         <MockSetGridNew
//           testCategories={testCategories}
//           handleMockStart={handleMockStartClick}
//         />
//       </div>
//     </>
//   );
// };
