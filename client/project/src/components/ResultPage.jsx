
import { useLocation, useNavigate } from "react-router-dom";
import { Trophy, CheckCircle, XCircle, RotateCcw, Home, AlertCircle } from "lucide-react";
import { ResultPageQs } from "./ResultPageQs";
import { useEffect,React } from "react";

export const ResultPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state?.questionsdata || [];
  const testChapter = state?.testChapter || "Unknown";


  const answers = state?.questionanswer || {};
  const totalQuestions = state?.totalQuestions || data.length;
  const language = localStorage.getItem("language");
const userdetails = JSON.parse(localStorage.getItem("user")) || { username: "guest", id: null };
const userid = userdetails.id;
  // ✅ Score Calculation
  const score = Object.keys(answers).reduce((acc, qId) => {
    const question = data.find((q) => q.id === parseInt(qId));
    if (question && answers[qId] === question.answer[language]) acc += 1;
    return acc;
  }, 0);

  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const incorrectAnswers = totalQuestions - score;
  const unanswered = totalQuestions - Object.keys(answers).length;

  const performance = () => {
    if (percentage >= 90) return { msg: "Outstanding!", color: "emerald", icon: Trophy };
    if (percentage >= 70) return { msg: "Great job!", color: "blue", icon: Trophy };
    if (percentage >= 50) return { msg: "Good effort!", color: "amber", icon: CheckCircle };
    return { msg: "Tere Se Na Hoga!", color: "rose", icon: RotateCcw };
  };

  const { msg, color, icon: Icon } = performance();








  // ✅ Save Result Utility at localstorage because i dint afford database  
  const topicName = data.map(q => q.category);
  const saveResultToLocal = () => {
    const results = JSON.parse(localStorage.getItem("examResults")) || [];
    console.log(results)
    const detailedQuestions = data.map((q) => ({
      id: q.id,
      question: q.question[language],
      correctAnswer: q.answer[language],
      userAnswer: answers[q.id] || null,
      isCorrect: answers[q.id] === q.answer[language],
    }));

    const newResult = {
      userid,
      topic: topicName || "Unknown Topic",
      category: topicName || "General",
      testChapter,
      score,
      totalQuestions,
      correctQuestions: score,
      incorrectQuestions: incorrectAnswers,
      unanswered,
      percentage,
      date: new Date().toISOString(),
      questions: detailedQuestions,
    };
    results.push(newResult);
    localStorage.setItem("examResults", JSON.stringify(results));
  };
// / ✅ Run once when result loads
  useEffect(() => {
    saveResultToLocal();
  }, []);







  const handleRetakeExam = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 sm:py-4 px-1 sm:px-2 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-sm sm:rounded-l shadow-xl overflow-hidden">
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${color} h-[75px] sm:h-auto text-white p-3 sm:p-8 relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-1 sm:mb-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
              </div>
              <div>
                <h1 className="text-xl md:text-4xl font-bold sm:mb-1">
                  Exam Results
                </h1>
                <div className="w-20 sm:w-24 h-[2px] sm:h-1 bg-white bg-opacity-30 rounded-full mx-auto"></div>
              </div>
            </div>
            <p className="text-[12px] sm:text-xl font-semibold mb-2">
              {msg}
            </p>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0  w-35 h-32 sm:w-40 sm:h-40 bg-white bg-opacity-5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-28 sm:w-36 bg-white bg-opacity-5 rounded-full -ml-16 -mb-16"></div>
        </div>

        {/* Score Summary */}
        <div className="p-1 sm:p-6 bg-gradient-to-r from-gray-50 to-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 items-center">
            {/* Score Circle and Main Stats */}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="relative w-18 h-15 sm:w-28 sm:h-28">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 34 36"
                >
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray={`${percentage}, 100`}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className={`text-2xl sm:text-3xl font-bold ${color}`}
                  >
                    {percentage}%
                  </span>
                  <span className="text-[10px] sm:text-sm text-gray-500">
                    Score
                  </span>
                </div>
              </div>

              <div className="ml-6">
                <div className="text-xl sm:text-3xl font-bold text-gray-800">
                  {score}{" "}
                  <span className="text-sm sm:text-lg font-normal text-gray-500">
                    / {totalQuestions}
                  </span>
                </div>
                <p className="text-gray-600 text-sm sm:text-lg">
                  Correct answers
                </p>

                {/* Additional Stats */}
                <div className="max-[400px]:hidden mt-4 space-y-1 text-[10px] sm:text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Correct: {score}</span>
                  </div>
                  {incorrectAnswers > 0 && (
                    <div className="flex items-center">
                      <XCircle className="w-4 h-4 text-rose-500 mr-2" />
                      <span>Incorrect: {incorrectAnswers}</span>
                    </div>
                  )}
                  {unanswered > 0 && (
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-gray-500 mr-2" />
                      <span>Unanswered: {unanswered}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Stats mobile  */}
            <div className="flex flex-wrap items-center justify-center gap-4 mx-auto min-[401px]:hidden mt-0 text-[12px] sm:text-sm">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                <span>Correct: {score}</span>
              </div>

              {incorrectAnswers > 0 && (
                <div className="flex items-center">
                  <XCircle className="w-4 h-4 text-rose-500 mr-2" />
                  <span>Incorrect: {incorrectAnswers}</span>
                </div>
              )}

              {unanswered > 0 && (
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-gray-500 mr-2" />
                  <span>Unanswered: {unanswered}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
              <button
                className="flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                onClick={handleRetakeExam}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Exam
              </button>
              <button
                className="flex items-center justify-center px-5 py-2.5 bg-white text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                onClick={() => navigate(-2)}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
        {/* question review show from here */}
        <ResultPageQs data={data} answers={answers} />
      </div>
    </div>
  );
};






// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Trophy,
//   CheckCircle,
//   XCircle,
//   RotateCcw,
//   Home,
//   TrendingUp,
//   AlertCircle,
// } from "lucide-react";
// import { ResultPageQs } from "./ResultPageQs";

// export const ResultPage = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const data = state?.questionsdata || [];
//   const answers = state?.questionanswer || {};
//   const totalQuestions = state?.totalQuestions || data.length;
//   const language = localStorage.getItem("language");

//   const score = Object.keys(answers).reduce((acc, qId) => {
//     const question = data.find((q) => q.id === parseInt(qId));
//     if (question && answers[qId] === question.answer[language]) acc += 1;
//     return acc;
//   }, 0);

//   const percentage =
//     totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
//   const incorrectAnswers = totalQuestions - score;
//   const unanswered = totalQuestions - Object.keys(answers).length;

//   const getPerformanceData = () => {
//     if (percentage >= 90)
//       return {
//         message: "Outstanding!",
//         color: "emerald",
//         bgColor: "bg-emerald-500",
//         icon: Trophy,
//       };
//     if (percentage >= 70)
//       return {
//         message: "Great job!",
//         color: "blue",
//         bgColor: "bg-blue-500",
//         icon: TrendingUp,
//       };
//     if (percentage >= 50)
//       return {
//         message: "Good effort!",
//         color: "amber",
//         bgColor: "bg-amber-500",
//         icon: CheckCircle,
//       };
//     return {
//       message: "Tere Se Na HOga!",
//       color: "rose",
//       bgColor: "bg-rose-500",
//       icon: RotateCcw,
//     };
//   };

//   const performanceData = getPerformanceData();
//   const PerformanceIcon = performanceData.icon;

//   const handleRetakeExam = () => {
//     navigate(-1);
//   };

//   const getGradeColor = () => {
//     if (percentage >= 90) return "text-emerald-600";
//     if (percentage >= 70) return "text-blue-600";
//     if (percentage >= 50) return "text-amber-600";
//     return "text-rose-600";
//   };

//   const getCircleColor = () => {
//     if (percentage >= 90) return "#10b981";
//     if (percentage >= 70) return "#3b82f6";
//     if (percentage >= 50) return "#f59e0b";
//     return "#f43f5e";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 sm:py-4 px-1 sm:px-2 flex items-center justify-center">
//       <div className="w-full max-w-5xl bg-white rounded-sm sm:rounded-l shadow-xl overflow-hidden">
//         {/* Header */}
//         <div
//           className={`bg-gradient-to-r ${performanceData.bgGradient} h-[75px] sm:h-auto text-white p-3 sm:p-8 relative overflow-hidden`}
//         >
//           <div className="absolute inset-0 bg-black bg-opacity-10"></div>
//           <div className="relative z-10 text-center">
//             <div className="flex items-center justify-center mb-1 sm:mb-4">
//               <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
//                 <PerformanceIcon className=" w-0 h-4 sm:w-10 sm:h-10 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl md:text-4xl font-bold sm:mb-1">
//                   Exam Results
//                 </h1>
//                 <div className="w-20 sm:w-24 h-[2px] sm:h-1 bg-white bg-opacity-30 rounded-full mx-auto"></div>
//               </div>
//             </div>
//             <p className="text-[12px] sm:text-xl font-semibold mb-2">
//               {performanceData.message}
//             </p>
//             <p className="text-base opacity-90">{performanceData.subMessage}</p>
//           </div>
//           {/* Decorative Circles */}
//           <div className="absolute top-0 right-0  w-35 h-32 sm:w-40 sm:h-40 bg-white bg-opacity-5 rounded-full -mr-20 -mt-20"></div>
//           <div className="absolute bottom-0 left-0 w-32 h-28 sm:w-36 bg-white bg-opacity-5 rounded-full -ml-16 -mb-16"></div>
//         </div>

//         {/* Score Summary */}
//         <div className="p-1 sm:p-6 bg-gradient-to-r from-gray-50 to-white">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 items-center">
//             {/* Score Circle and Main Stats */}
//             <div className="flex items-center justify-center lg:justify-start">
//               <div className="relative w-18 h-15 sm:w-28 sm:h-28">
//                 <svg
//                   className="w-full h-full transform -rotate-90"
//                   viewBox="0 0 34 36"
//                 >
//                   <path
//                     d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                     fill="none"
//                     stroke="#e5e7eb"
//                     strokeWidth="2"
//                   />
//                   <path
//                     d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                     fill="none"
//                     stroke={getCircleColor()}
//                     strokeWidth="3"
//                     strokeDasharray={`${percentage}, 100`}
//                     className="transition-all duration-1000 ease-out"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center">
//                   <span
//                     className={`text-2xl sm:text-3xl font-bold ${getGradeColor()}`}
//                   >
//                     {percentage}%
//                   </span>
//                   <span className="text-[10px] sm:text-sm text-gray-500">
//                     Score
//                   </span>
//                 </div>
//               </div>

//               <div className="ml-6">
//                 <div className="text-xl sm:text-3xl font-bold text-gray-800">
//                   {score}{" "}
//                   <span className="text-sm sm:text-lg font-normal text-gray-500">
//                     / {totalQuestions}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 text-sm sm:text-lg">
//                   Correct answers
//                 </p>

//                 {/* Additional Stats */}
//                 <div className="max-[400px]:hidden mt-4 space-y-1 text-[10px] sm:text-sm">
//                   <div className="flex items-center">
//                     <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
//                     <span>Correct: {score}</span>
//                   </div>
//                   {incorrectAnswers > 0 && (
//                     <div className="flex items-center">
//                       <XCircle className="w-4 h-4 text-rose-500 mr-2" />
//                       <span>Incorrect: {incorrectAnswers}</span>
//                     </div>
//                   )}
//                   {unanswered > 0 && (
//                     <div className="flex items-center">
//                       <AlertCircle className="w-4 h-4 text-gray-500 mr-2" />
//                       <span>Unanswered: {unanswered}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Additional Stats mobile  */}
//             <div className="flex flex-wrap items-center justify-center gap-4 mx-auto min-[401px]:hidden mt-0 text-[12px] sm:text-sm">
//               <div className="flex items-center">
//                 <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
//                 <span>Correct: {score}</span>
//               </div>

//               {incorrectAnswers > 0 && (
//                 <div className="flex items-center">
//                   <XCircle className="w-4 h-4 text-rose-500 mr-2" />
//                   <span>Incorrect: {incorrectAnswers}</span>
//                 </div>
//               )}

//               {unanswered > 0 && (
//                 <div className="flex items-center">
//                   <AlertCircle className="w-4 h-4 text-gray-500 mr-2" />
//                   <span>Unanswered: {unanswered}</span>
//                 </div>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
//               <button
//                 className="flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
//                 onClick={handleRetakeExam}
//               >
//                 <RotateCcw className="w-4 h-4 mr-2" />
//                 Retake Exam
//               </button>
//               <button
//                 className="flex items-center justify-center px-5 py-2.5 bg-white text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
//                 onClick={() => navigate(-2)}
//               >
//                 <Home className="w-4 h-4 mr-2" />
//                 Back to Home
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* question review show from here */}
//         <ResultPageQs data={data} answers={answers} />
//       </div>
//     </div>
//   );
// };














// import { useLocation, useNavigate } from "react-router-dom";
// import { Trophy, CheckCircle, XCircle, RotateCcw, Home, TrendingUp, AlertCircle } from "lucide-react";

// export const ResultPage = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const data = state?.questionsdata || [];
//   const answers = state?.questionanswer || {};
//   const totalQuestions = state?.totalQuestions || data.length;
// const language=localStorage.getItem("language");

//   const score = Object.keys(answers).reduce((acc, qId) => {
//     const question = data.find((q) => q.id === parseInt(qId));
//     if (question && answers[qId] === question.answer[language]) acc += 1;
//     return acc;
//   }, 0);

//   const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
//   const incorrectAnswers = totalQuestions - score;
//   const unanswered = totalQuestions - Object.keys(answers).length;

//   const getPerformanceData = () => {
//     if (percentage >= 90) return {
//       message: "Outstanding!",
//       color: "emerald",
//       bgColor: "bg-emerald-500",
//       icon: Trophy
//     };
//     if (percentage >= 70) return {
//       message: "Great job!",
//       color: "blue",
//       bgColor: "bg-blue-500",
//       icon: TrendingUp
//     };
//     if (percentage >= 50) return {
//       message: "Good effort!",
//       color: "amber",
//       bgColor: "bg-amber-500",
//       icon: CheckCircle
//     };
//     return {
//       message: "Keep practicing!",
//       color: "rose",
//       bgColor: "bg-rose-500",
//       icon: RotateCcw
//     };
//   };

//   const performanceData = getPerformanceData();
//   const PerformanceIcon = performanceData.icon;

//   const handleRetakeExam = () => {
//     navigate(-1);
//   };

//   const getGradeColor = () => {
//     if (percentage >= 90) return "text-emerald-600";
//     if (percentage >= 70) return "text-blue-600";
//     if (percentage >= 50) return "text-amber-600";
//     return "text-rose-600";
//   };

//   const getCircleColor = () => {
//     if (percentage >= 90) return "#10b981";
//     if (percentage >= 70) return "#3b82f6";
//     if (percentage >= 50) return "#f59e0b";
//     return "#f43f5e";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 sm:py-4 px-1 sm:px-2 flex items-center justify-center">
//       <div className="w-full max-w-5xl bg-white rounded-sm sm:rounded-l shadow-xl overflow-hidden">

//          {/* Header */}
//         <div className={`bg-gradient-to-r ${performanceData.bgGradient} h-[75px] sm:h-auto text-white p-3 sm:p-8 relative overflow-hidden`}>
//           <div className="absolute inset-0 bg-black bg-opacity-10"></div>
//           <div className="relative z-10 text-center">
//             <div className="flex items-center justify-center mb-1 sm:mb-4">
//               <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
//                 <PerformanceIcon className=" w-0 h-4 sm:w-10 sm:h-10 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl md:text-4xl font-bold sm:mb-1">Exam Results</h1>
//                 <div className="w-20 sm:w-24 h-[2px] sm:h-1 bg-white bg-opacity-30 rounded-full mx-auto"></div>
//               </div>
//             </div>
//             <p className="text-[12px] sm:text-xl font-semibold mb-2">{performanceData.message}</p>
//             <p className="text-base opacity-90">{performanceData.subMessage}</p>
//           </div>
//           {/* Decorative Circles */}
//           <div className="absolute top-0 right-0  w-35 h-32 sm:w-40 sm:h-40 bg-white bg-opacity-5 rounded-full -mr-20 -mt-20"></div>
//           <div className="absolute bottom-0 left-0 w-32 h-28 sm:w-36 bg-white bg-opacity-5 rounded-full -ml-16 -mb-16"></div>
//         </div>

//         {/* Score Summary */}
//         <div className="p-1 sm:p-6 bg-gradient-to-r from-gray-50 to-white">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 items-center">

//             {/* Score Circle and Main Stats */}
//             <div className="flex items-center justify-center lg:justify-start">
//               <div className="relative w-18 h-15 sm:w-28 sm:h-28">
//                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 34 36">
//                   <path
//                     d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                     fill="none"
//                     stroke="#e5e7eb"
//                     strokeWidth="2"
//                   />
//                   <path
//                     d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                     fill="none"
//                     stroke={getCircleColor()}
//                     strokeWidth="3"
//                     strokeDasharray={`${percentage}, 100`}
//                     className="transition-all duration-1000 ease-out"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//                 <div className="absolute inset-0 flex flex-col items-center justify-center">
//                   <span className={`text-2xl sm:text-3xl font-bold ${getGradeColor()}`}>{percentage}%</span>
//                   <span className="text-[10px] sm:text-sm text-gray-500">Score</span>
//                 </div>
//               </div>

//               <div className="ml-6">
//                 <div className="text-xl sm:text-3xl font-bold text-gray-800">
//                   {score} <span className="text-sm sm:text-lg font-normal text-gray-500">/ {totalQuestions}</span>
//                 </div>
//                 <p className="text-gray-600 text-sm sm:text-lg">Correct answers</p>

//                 {/* Additional Stats */}
//                 <div className="max-[400px]:hidden mt-4 space-y-1 text-[10px] sm:text-sm">
//                   <div className="flex items-center">
//                     <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
//                     <span>Correct: {score}</span>
//                   </div>
//                   {incorrectAnswers > 0 && (
//                     <div className="flex items-center">
//                       <XCircle className="w-4 h-4 text-rose-500 mr-2" />
//                       <span>Incorrect: {incorrectAnswers}</span>
//                     </div>
//                   )}
//                   {unanswered > 0 && (
//                     <div className="flex items-center">
//                       <AlertCircle className="w-4 h-4 text-gray-500 mr-2" />
//                       <span>Unanswered: {unanswered}</span>
//                     </div>
//                   )}
//                 </div>

//               </div>
//             </div>

//     {/* Additional Stats mobile  */}
//     <div className="flex flex-wrap items-center justify-center gap-4 mx-auto min-[401px]:hidden mt-0 text-[12px] sm:text-sm">
//   <div className="flex items-center">
//     <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
//     <span>Correct: {score}</span>
//   </div>

//   {incorrectAnswers > 0 && (
//     <div className="flex items-center">
//       <XCircle className="w-4 h-4 text-rose-500 mr-2" />
//       <span>Incorrect: {incorrectAnswers}</span>
//     </div>
//   )}

//   {unanswered > 0 && (
//     <div className="flex items-center">
//       <AlertCircle className="w-4 h-4 text-gray-500 mr-2" />
//       <span>Unanswered: {unanswered}</span>
//     </div>
//   )}
// </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
//               <button
//                 className="flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
//                 onClick={handleRetakeExam}
//               >
//                 <RotateCcw className="w-4 h-4 mr-2" />
//                 Retake Exam
//               </button>
//               <button
//                 className="flex items-center justify-center px-5 py-2.5 bg-white text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
//                 onClick={() => navigate(-2)}
//               >
//                 <Home className="w-4 h-4 mr-2" />
//                 Back to Home
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Questions Review */}
//         <div className="p-1 sm:p-6">
//           <div className="flex items-center mb-1 sm:mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">Question Review</h2>
//             <div className="ml-auto text-sm text-gray-500">
//               {data.length} question{data.length !== 1 ? 's' : ''}
//             </div>
//           </div>

//           <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
//             {data.map((q) => {
//               const userAnswer = answers[q.id];
//               const isCorrect = userAnswer === q.answer[language];
//               const wasAnswered = userAnswer !== undefined;

//               return (
//                 <div
//                   key={q.id}
//                   className={`p-4 rounded-lg border-2 transition-all duration-200 ${
//                     isCorrect
//                       ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
//                       : wasAnswered
//                       ? 'bg-rose-50 border-rose-200 hover:bg-rose-100'
//                       : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
//                   }`}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className="flex-shrink-0 mt-1">
//                       {isCorrect ? (
//                         <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
//                       ) : wasAnswered ? (
//                         <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
//                       ) : (
//                         <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
//                       )}
//                     </div>

//                     <div className="flex-grow min-w-0">
//                       <p className="font-medium text-gray-800 mb-1 sm:mb-3 text-[12px] sm:text-sm">
//                         <span className="text-gray-500">Q{q.id}.</span> {q.question[language]}
//                       </p>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//                         <div className="space-y-1">
//                           <p className="text-gray-500 text-xs font-medium">Your Answer:</p>
//                           <p className={`p-2 rounded text-sm ${
//                             isCorrect
//                               ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
//                               : wasAnswered
//                               ? "bg-rose-100 text-rose-800 border border-rose-200"
//                               : "bg-gray-100 text-gray-600 border border-gray-200"
//                           }`}>
//                             {userAnswer || "Not Answered"}
//                           </p>
//                         </div>

//                         {!isCorrect && (
//                           <div className="space-y-1">
//                             <p className="text-gray-500 text-xs font-medium">Correct Answer:</p>
//                             <p className="p-2 bg-emerald-100 text-emerald-800 rounded border border-emerald-200 text-sm">
//                               {q.answer[language]}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
