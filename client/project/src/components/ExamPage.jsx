import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export const ExamPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(1); 

  // language gettting
// const language=localStorage.getItem("language");
const language = localStorage.getItem("language") || "en";

  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state?.questions || [];
const testChapter=state?.testChapter  || "Unknown";
  // ====================
// console.log(data)
  const duration = state?.duration || 1;
  const totalQuestions = data.length;
  

const answersRef = useRef(answers);

useEffect(() => {
  answersRef.current = answers;
}, [answers]);
useEffect(() => {
  setTimeRemaining(duration * 60);
  const timer = setInterval(() => {
    setTimeRemaining(prev => {
      if (prev <= 1) {
        clearInterval(timer);
        navigate("/resultpage", {
          state: {
            questionanswer: answersRef.current,
            questionsdata: data,
            totalQuestions: totalQuestions,
          },
        });
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  return () => clearInterval(timer);
}, [duration]);


  const handleSubmitExam = () => {
    navigate("/resultpage", {
      state: {
        questionanswer: answers,
        questionsdata: data,
        totalQuestions: totalQuestions,
        testChapter:testChapter
      },
    });
  };



  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // Count how many questions are attempted
  const attemptedCount = Object.keys(answers).length;
  const progressPercent = totalQuestions
    ? Math.round((attemptedCount / totalQuestions) * 100)
    : 0;

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // clear checkbox button

const hanldeCheckBoxClear = () => {
  const currentQId = data[currentQuestion - 1]?.id;
  if (!currentQId) return;
  
  setAnswers((prev) => {
    const newAnswers = { ...prev };
    delete newAnswers[currentQId]; 
    return newAnswers;
  });
};



  return (
    <div className=" min-h-screen bg-gray-50 flex flex-col items-center sm:py-6 px-[5px]">
     <div  className="border-[1px] border-t-[2px] border-gray-300 sm:border-none bg-white w-full max-w-6xl  shadow-sm rounded-sm sm:rounded-md mb-2">
       <header className="w-full max-w-6xl flex items-center justify-between p-2 sm:p-3 ">
      <div className="flex items-center gap-2">
        
        <button 
        onClick={hanldeCheckBoxClear}
        className="px-3 py-1.5 rounded-md bg-gray-700 text-white text-sm flex items-center gap-1">
          Clear
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        {/* Timer */}
        <div className="text-right">
          <p className="text-xs  text-gray-500">Time</p>
           <p className={`text-md sm:text-xl font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-800'}`}>
              {formatTime(timeRemaining)}
            </p>
        </div>
       <button
          onClick={handleSubmitExam}
          className="bg-green-400 hover:bg-green-500 text-white px-4 py-[5px] sm:py-2 rounded-lg flex items-center gap-1 font-medium shadow-md hover:shadow-lg transition-colors"
        >
          Submit
        </button>
      </div>
    </header>


      {/* Progress bar */}

<div className="w-full max-w-6xl px-2 py-1 sm:py-2 sm:px-3">
        <div className="flex justify-between items-center ">
          <span className="text-[12px] sm:text-sm font-medium text-gray-700">Exam Progress</span>
          <span className="text-sm font-medium text-blue-600">{progressPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[12px] sm:text-sm text-gray-600 mt-2">
          Attempted {attemptedCount} of {totalQuestions} questions
        </p>
      </div>

      </div>


      <main className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
        {/* Question Card */}
        <div className="border-[1px] border-gray-300 sm:border-none flex-1 bg-white rounded-md shadow-sm py-2 px-4 sm:p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-2 sm:mb-6 pb-2 sm:pb-4 border-b border-gray-100">
            <h2 className="text-sm sm:text-xl font-semibold text-gray-800">
              Question #{currentQuestion}
            </h2>
            <span className="px-3 py-1 bg-blue-100  rounded-full text-sm font-medium">
              {data[currentQuestion - 1]?.points || 1} Mark{data[currentQuestion - 1]?.points !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="mb-2 sm:mb-8">
            <p className="text-lg font-bold sm:text-lg text-gray-700 leading-relaxed">
              {data[currentQuestion - 1]?.question[language]}
              {/* ============ */}
              {/* {data[currentQuestion - 1]?.question[language] || data[currentQuestion - 1]?.question}  */}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-8">
            {data[currentQuestion - 1]?.options[language].map((option, i) => (
            
            // {data[currentQuestion - 1]?.options.map((option, i) => (
              
              <label
                key={i}
                className={`flex items-center px-3 py-2 sm:p-4 border rounded-md cursor-pointer transition-all ${
                  answers[data[currentQuestion - 1].id] === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <input
                  type="radio"
                  value={option}
                  checked={answers[data[currentQuestion - 1].id] === option}
                  name={`q-${data[currentQuestion - 1].id}`}
                  className="hidden"
                  onChange={() =>
                    handleOptionChange(data[currentQuestion - 1].id, option)
                  }
                />
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border mr-4 flex items-center justify-center ${
                  answers[data[currentQuestion - 1].id] === option
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-400'
                }`}>
                  {answers[data[currentQuestion - 1].id] === option && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="font-medium text-gray-700">
                  {String.fromCharCode(65 + i)}. {option}
                </span>
              </label>
            ))}
          </div>




          {/* Navigation button*/}
          <div className="flex justify-between items-center pt-2 sm:pt-4 border-t border-gray-100">
            <button
              disabled={currentQuestion === 1}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
              className="flex items-center text-[12px] sm:text-md px-3 py-2 sm:px-5 sm:py-2.5 bg-gray-200 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <p className="text-[12px] sm:text-sm text-gray-600">
              Question {currentQuestion} of {totalQuestions}
            </p>
            <button
              disabled={currentQuestion === totalQuestions}
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
              className="flex items-center text-[12px] sm:text-md px-3 py-2 sm:px-5 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>




        {/* Question navigation panel */}
        <div className="border-[1px] border-gray-300 sm:border-none lg:w-64 bg-white mb-3 rounded-md shadow-sm p-3 sm:p-5 border border-gray-100 h-fit">
          <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-md">Question Review</h3>
          <div className="grid grid-cols-6 gap-2">
            {data.map((q, idx) => {
              const isAttempted = answers[q.id] !== undefined;
              const isCurrent = currentQuestion === idx + 1;
              
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx + 1)}
                  className={`min-w-[2rem] h-9 flex items-center justify-center rounded-sm text-sm font-bold transition-all ${
                    isCurrent
                      ? 'ring-2 ring-blue-500 ring-offset-1'
                      : isAttempted
                      ? 'bg-green-200 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          
          <div className="pt-3 mt-4 sm:mt-6 sm:pt-4 border-t border-gray-100">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-[2px] bg-green-200 border border-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">Attempted</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-[2px]  bg-gray-100 border border-gray-400 mr-2"></div>
              <span className="text-sm text-gray-600">Not Attempted</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};




















// import { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";


// export const ExamPage = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(1);
//   const [answers, setAnswers] = useState({});
//   const [timeRemaining, setTimeRemaining] = useState(1); 


//   // language gettting
// const language=localStorage.getItem("language");

//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const data = state?.questions || [];

//   const duration = state?.duration || 1;
//   const totalQuestions = data.length;
  

// const answersRef = useRef(answers);

// useEffect(() => {
//   answersRef.current = answers;
// }, [answers]);
// useEffect(() => {
//   setTimeRemaining(duration * 60);
//   const timer = setInterval(() => {
//     setTimeRemaining(prev => {
//       if (prev <= 1) {
//         clearInterval(timer);
//         navigate("/resultpage", {
//           state: {
//             questionanswer: answersRef.current,
//             questionsdata: data,
//             totalQuestions: totalQuestions,
//           },
//         });
//         return 0;
//       }
//       return prev - 1;
//     });
//   }, 1000);
//   return () => clearInterval(timer);
// }, [duration]);


//   const handleSubmitExam = () => {
//     navigate("/resultpage", {
//       state: {
//         questionanswer: answers,
//         questionsdata: data,
//         totalQuestions: totalQuestions,
//       },
//     });
//   };



//   const handleOptionChange = (questionId, option) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: option,
//     }));
//   };

//   // Count how many questions are attempted
//   const attemptedCount = Object.keys(answers).length;
//   const progressPercent = totalQuestions
//     ? Math.round((attemptedCount / totalQuestions) * 100)
//     : 0;

//   // Format time as MM:SS
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // clear checkbox button

// const hanldeCheckBoxClear = () => {
//   const currentQId = data[currentQuestion - 1]?.id;
//   if (!currentQId) return;
  
//   setAnswers((prev) => {
//     const newAnswers = { ...prev };
//     delete newAnswers[currentQId]; 
//     return newAnswers;
//   });
// };



//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center sm:py-6 px-4">
//      <div  className="w-full max-w-6xl bg-white shadow-sm rounded-sm sm:rounded-md mb-2">
//        <header className="w-full max-w-6xl flex items-center justify-between p-2 sm:p-3 ">
//       <div className="flex items-center gap-2">
        
//         <button 
//         onClick={hanldeCheckBoxClear}
//         className="px-3 py-1.5 rounded-md bg-gray-700 text-white text-sm flex items-center gap-1">
//           Clear
//         </button>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex items-center gap-3">
//         {/* Timer */}
//         <div className="text-right">
//           <p className="text-xs text-gray-500">Time Elapsed</p>
//            <p className={`text-xl font-bold ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-800'}`}>
//               {formatTime(timeRemaining)}
//             </p>
//         </div>
//        <button
//           onClick={handleSubmitExam}
//           className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 font-medium shadow-md hover:shadow-lg transition-colors"
//         >
//           Submit
//         </button>
//       </div>
//     </header>


//       {/* Progress bar */}

// <div className="w-full max-w-6xl px-2 py-1 sm:py-2 sm:px-3">
//         <div className="flex justify-between items-center ">
//           <span className="text-[12px] sm:text-sm font-medium text-gray-700">Exam Progress</span>
//           <span className="text-sm font-medium text-blue-600">{progressPercent}%</span>
//         </div>
//         <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
//           <div
//             className="bg-blue-600 h-3 rounded-full transition-all duration-300"
//             style={{ width: `${progressPercent}%` }}
//           />
//         </div>
//         <p className="text-[12px] sm:text-sm text-gray-600 mt-2">
//           Attempted {attemptedCount} of {totalQuestions} questions
//         </p>
//       </div>

//       </div>


//       <main className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
//         {/* Question Card */}
//         <div className="flex-1 bg-white rounded-md shadow-sm py-2 px-4 sm:p-6 border border-gray-100">
//           <div className="flex justify-between items-center mb-2 sm:mb-6 pb-2 sm:pb-4 border-b border-gray-100">
//             <h2 className="text-sm sm:text-xl font-semibold text-gray-800">
//               Question #{currentQuestion}
//             </h2>
//             <span className="px-3 py-1 bg-blue-100  rounded-full text-sm font-medium">
//               {data[currentQuestion - 1]?.points || 1} Mark{data[currentQuestion - 1]?.points !== 1 ? 's' : ''}
//             </span>
//           </div>
          
//           <div className="mb-2 sm:mb-8">
//             <p className="text-lg font-bold sm:text-lg text-gray-700 leading-relaxed">
//               {data[currentQuestion - 1]?.question[language]}
//             </p>
//           </div>

//           {/* Options */}
//           <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-8">
//             {data[currentQuestion - 1]?.options[language].map((option, i) => (
//               <label
//                 key={i}
//                 className={`flex items-center px-3 py-2 sm:p-4 border rounded-md cursor-pointer transition-all ${
//                   answers[data[currentQuestion - 1].id] === option
//                     ? 'border-blue-500 bg-blue-50'
//                     : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   value={option}
//                   checked={answers[data[currentQuestion - 1].id] === option}
//                   name={`q-${data[currentQuestion - 1].id}`}
//                   className="hidden"
//                   onChange={() =>
//                     handleOptionChange(data[currentQuestion - 1].id, option)
//                   }
//                 />
//                 <div className={`flex-shrink-0 w-5 h-5 rounded-full border mr-4 flex items-center justify-center ${
//                   answers[data[currentQuestion - 1].id] === option
//                     ? 'border-blue-500 bg-blue-500'
//                     : 'border-gray-400'
//                 }`}>
//                   {answers[data[currentQuestion - 1].id] === option && (
//                     <div className="w-2 h-2 rounded-full bg-white"></div>
//                   )}
//                 </div>
//                 <span className="font-medium text-gray-700">
//                   {String.fromCharCode(65 + i)}. {option}
//                 </span>
//               </label>
//             ))}
//           </div>




//           {/* Navigation button*/}
//           <div className="flex justify-between items-center pt-2 sm:pt-4 border-t border-gray-100">
//             <button
//               disabled={currentQuestion === 1}
//               onClick={() => setCurrentQuestion((prev) => prev - 1)}
//               className="flex items-center text-[12px] sm:text-md px-3 py-2 sm:px-5 sm:py-2.5 bg-gray-200 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 font-medium"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               Back
//             </button>
//             <p className="text-[12px] sm:text-sm text-gray-600">
//               Question {currentQuestion} of {totalQuestions}
//             </p>
//             <button
//               disabled={currentQuestion === totalQuestions}
//               onClick={() => setCurrentQuestion((prev) => prev + 1)}
//               className="flex items-center text-[12px] sm:text-md px-3 py-2 sm:px-5 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
//             >
//               Next
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>




//         {/* Question navigation panel */}
//         <div className="lg:w-64 bg-white mb-3 rounded-md shadow-sm p-3 sm:p-5 border border-gray-100 h-fit">
//           <h3 className="font-bold text-gray-700 mb-3 sm:mb-4 text-sm sm:text-md">Question Review</h3>
//           <div className="grid grid-cols-6 gap-2">
//             {data.map((q, idx) => {
//               const isAttempted = answers[q.id] !== undefined;
//               const isCurrent = currentQuestion === idx + 1;
              
//               return (
//                 <button
//                   key={idx}
//                   onClick={() => setCurrentQuestion(idx + 1)}
//                   className={`min-w-[2rem] h-9 flex items-center justify-center rounded-sm text-sm font-bold transition-all ${
//                     isCurrent
//                       ? 'ring-2 ring-blue-500 ring-offset-1'
//                       : isAttempted
//                       ? 'bg-green-200 text-green-700 hover:bg-green-200'
//                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   {idx + 1}
//                 </button>
//               );
//             })}
//           </div>
          
//           <div className="pt-3 mt-4 sm:mt-6 sm:pt-4 border-t border-gray-100">
//             <div className="flex items-center mb-2">
//               <div className="w-3 h-3 rounded-[2px] bg-green-200 border border-green-500 mr-2"></div>
//               <span className="text-sm text-gray-600">Attempted</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-3 h-3 rounded-[2px]  bg-gray-100 border border-gray-400 mr-2"></div>
//               <span className="text-sm text-gray-600">Not Attempted</span>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };







