import { useState } from "react";
import staticData from "../Api/reasoning.json";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ConfirmationPopup } from "../components/ConfirmationPopup";
import { MockSetGridNew } from "../components/MockSetGridNew";
import {
  reasoningQuestions,
  reasoningQuestionsAi,
} from "../assignmentCategories/reasoning";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { GuidelinesBox } from "../components/GuidelinesBox";

export const Reasoning = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const testCategoriesQuestions = reasoningQuestions;
  const testCategoriesAi = reasoningQuestionsAi;

  const navigate = useNavigate();

  // questoin filter json
  const handleMockStart = (test) => {
    setSelectedTest(test);
    let filtered = staticData.filter((q) => q.category === test.title);
    if (filtered.length < test.questions) {
      const remaining = test.questions - filtered.length;
      const extra = staticData
        .filter((q) => q.category !== test.title)
        .sort(() => 0.5 - Math.random())
        .slice(0, remaining);
      filtered = [...filtered, ...extra];
    } else {
      filtered = filtered
        .sort(() => 0.5 - Math.random())
        .slice(0, test.questions);
    }
    setData(filtered);
    setShowConfirmation(true);
  };

  // Ai Method
  const handleMockStartClick = async (test) => {
    setSelectedTest(test);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/generatereasoning`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: test.title, count: test.questions }),
        }
      );
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
      <div className="min-h-screen flex flex-col items-center py-4 sm:py-6 px-2 sm:px-4 relative">
        {/* loading overlay for before exam */}
        <LoadingOverlay isLoading={isLoading} />
        {/* Confirmation Popup */}
        <ConfirmationPopup
          isOpen={showConfirmation}
          onConfirm={confirmStartTest}
          onCancel={cancelStartTest}
          test={selectedTest}
        />

        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
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
            Reasoning{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Assessment
            </span>
          </motion.h1>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-[11px] sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Enhance your analytical thinking with specialized test categories
          </motion.p>
        </motion.div>

        {/* grid boxes */}
        <MockSetGridNew
          testCategories={testCategoriesQuestions}
          handleMockStart={handleMockStart}
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

        {/* ai guidlines */}
        <GuidelinesBox />
        {/* grid boxes */}
        <MockSetGridNew
          testCategories={testCategoriesAi}
          handleMockStart={handleMockStartClick}
        />
      </div>
    </>
  );
};















// import { useState } from "react";
// import staticData from "../Api/reasoning.json";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { ConfirmationPopup } from "../components/ConfirmationPopup";
// import { MockSetGridNew } from "../components/MockSetGridNew";
// import {
//   reasoningQuestions,
//   reasoningQuestionsAi,
// } from "../assignmentCategories/reasoning";
// import { LoadingOverlay } from "../components/LoadingOverlay";
// import { GuidelinesBox } from "../components/GuidelinesBox";

// export const Reasoning = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedTest, setSelectedTest] = useState(null);
//   const [data, setData] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   const testCategoriesQuestions = reasoningQuestions;
//   const testCategoriesAi = reasoningQuestionsAi;

//   const navigate = useNavigate();

//   // questoin filter json
//   const handleMockStart = (test) => {
//     setSelectedTest(test);
//     let filtered = staticData.filter((q) => q.category === test.title);
//     if (filtered.length < test.questions) {
//       const remaining = test.questions - filtered.length;
//       const extra = staticData
//         .filter((q) => q.category !== test.title)
//         .sort(() => 0.5 - Math.random())
//         .slice(0, remaining);
//       filtered = [...filtered, ...extra];
//     } else {
//       filtered = filtered
//         .sort(() => 0.5 - Math.random())
//         .slice(0, test.questions);
//     }
//     setData(filtered);
//     setShowConfirmation(true);
//   };

//   // Ai Method
//   const handleMockStartClick = async (test) => {
//     setSelectedTest(test);
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/api/generatereasoning`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ topic: test.title, count: test.questions }),
//         }
//       );
//       const result = await response.json();
//       if (!result.questions || result.questions.length === 0) {
//         setErrorMessage("Questions could not be generated. Please try again.");
//         setIsLoading(false);
//         return;
//       }
//       setData(result.questions);
//       setShowConfirmation(true);
//     } catch (err) {
//       console.error(err);
//       setErrorMessage(
//         "❌ Failed to generate questions due to a server error. Please try again."
//       );
//     }
//     setIsLoading(false);
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
//       <div className="min-h-screen flex flex-col items-center py-4 sm:py-6 px-2 sm:px-4 relative">
//         {/* loading overlay for before exam */}
//         <LoadingOverlay isLoading={isLoading} />
//         {/* Confirmation Popup */}
//         <ConfirmationPopup
//           isOpen={showConfirmation}
//           onConfirm={confirmStartTest}
//           onCancel={cancelStartTest}
//           test={selectedTest}
//         />

//         {/* Page Header */}
//         <motion.div
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           <motion.div
//             className="text-xs font-semibold tracking-wider text-amber-500 uppercase mb-2"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.1 }}
//           >
//             Free Mock Test
//           </motion.div>
//           <motion.h1
//             className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             Reasoning{" "}
//             <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
//               Assessment
//             </span>
//           </motion.h1>
//           <motion.p
//             className="text-gray-600 max-w-2xl mx-auto text-[11px] sm:text-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             Enhance your analytical thinking with specialized test categories
//           </motion.p>
//         </motion.div>

//         {/* grid boxes */}
//         <MockSetGridNew
//           testCategories={testCategoriesQuestions}
//           handleMockStart={handleMockStart}
//         />

//         {/* pop error if question not generated */}
//         {errorMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             className="fixed top-14 sm:top-32 text-[10px] sm:text-sm right-4 z-50 px-3 py-2 bg-red-400 text-white rounded-md shadow-lg"
//           >
//             {errorMessage}
//             <br />
//             कभी-कभी इंटरनेट कनेक्टिविटी की वजह से प्रश्न लोड नहीं हो पाते।
//             <button
//               onClick={() => setErrorMessage("")}
//               className="ml-2 font-bold text-white"
//             >
//               ✕
//             </button>
//           </motion.div>
//         )}

//         {/* ai guidlines */}
//         <GuidelinesBox />
//         {/* grid boxes */}
//         <MockSetGridNew
//           testCategories={testCategoriesAi}
//           handleMockStart={handleMockStartClick}
//         />
//       </div>
//     </>
//   );
// };
