import React from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export const MyAccountResult = ({ selectedResult }) => {
  if (!selectedResult) return null;

  return (
    <div className="bg-white rounded-sm p-2 sm:p-3 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm sm:text-base font-semibold text-gray-700">
          {selectedResult.topic?.[0] || "Test"}{" "}
          <span className="text-[11px] sm:text-xs text-gray-500 font-normal">
            ({new Date(selectedResult.date).toLocaleDateString()})
          </span>
        </h3>
      </div>

      {/* Summary (compact grid) */}
      <div className="grid grid-cols-5 gap-1 mb-3 py-1 px-2 rounded border border-gray-200 bg-white text-center">
  <div>
    <p className="text-sm font-semibold text-gray-800">{selectedResult.totalQuestions}</p>
    <p className="text-[10px] text-gray-500">Total</p>
  </div>
  <div>
    <p className="text-sm font-semibold text-green-600">{selectedResult.correctQuestions}</p>
    <p className="text-[10px] text-gray-500">Correct</p>
  </div>
  <div>
    <p className="text-sm font-semibold text-red-600">{selectedResult.incorrectQuestions}</p>
    <p className="text-[10px] text-gray-500">Incorrect</p>
  </div>
  <div>
    <p className="text-sm font-semibold text-yellow-600">{selectedResult.unanswered}</p>
    <p className="text-[10px] text-gray-500">Unanswered</p>
  </div>
  <div>
    <p className="text-sm font-semibold text-blue-600">{selectedResult.percentage}%</p>
    <p className="text-[10px] text-gray-500">Score</p>
  </div>
</div>


      {/* Question Review */}
      <div >
        <div className="flex items-center mb-2">
          <h2 className="text-sm font-semibold text-gray-800">Question Review</h2>
          <div className="ml-auto text-xs text-gray-500">
            {selectedResult.questions?.length} Qs
          </div>
        </div>

        <div className="space-y-2 max-h-[80vh] overflow-y-auto pr-1">
          {selectedResult.questions?.map((q, idx) => {
            const userAnswer = q.userAnswer;
            const isCorrect = q.isCorrect;
            const wasAnswered = userAnswer !== undefined && userAnswer !== null;

            return (
              <div
                key={q.id}
                className={`py-1.5 sm:py-4 px-3 rounded border text-sm ${
                  isCorrect
                    ? "bg-emerald-50 border-emerald-200"
                    : wasAnswered
                    ? "bg-rose-50 border-rose-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start gap-2">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    ) : wasAnswered ? (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-500" />
                    )}
                  </div>

                  {/* Question + Answers */}
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-gray-800 mb-1 text-xs sm:text-sm">
                      <span className="text-gray-500">Q{idx + 1}.</span>{" "}
                      {q.question}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
                      <div>
                        <p className="text-gray-500 text-[11px] sm:mt-1">Your Answer:</p>
                        <p
                          className={`sm:mt-1 px-2  py-0.5 sm:py-1.5 rounded ${
                            isCorrect
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : wasAnswered
                              ? "bg-rose-100 text-rose-800 border border-rose-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {userAnswer || "Not Answered"}
                        </p>
                      </div>

                      {!isCorrect && (
                        <div>
                          <p className="sm:mt-1 text-gray-500 text-[11px]">Correct Answer:</p>
                          <p className="sm:mt-1 px-2 py-0.5 sm:py-1.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                            {q.correctAnswer}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};











// import React from "react";
// import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

// export const MyAccountResult = ({ selectedResult }) => {
//   if (!selectedResult) return null;

//   return (
//     <div className="bg-white rounded-sm sm:p-4 ">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-2 sm:mb-6">
//         <h3 className="text-md sm:text-xl font-bold sm:font-medium text-gray-700">
//           {selectedResult.topic?.[0] || "Test"}{" "}
//           <span className="text-[12px] sm:text-sm text-gray-500 font-normal">
//             ({new Date(selectedResult.date).toLocaleString()})
//           </span>
//         </h3>
//       </div>

//       {/* Summary */}
//     <div className="grid grid-cols-5 gap-4 mb-2 sm:mb-8 py-2 px-1 sm:p-4  rounded-sm sm:rounded-lg">
//         <div className="text-center">
//           <p className="text-md sm:text-2xl font-bold text-gray-800">{selectedResult.totalQuestions}</p>
//           <p className="text-[12px] sm:text-xs text-gray-500">Total</p>
//         </div>
//         <div className="text-center">
//           <p className="text-md sm:text-2xl font-bold text-green-600">{selectedResult.correctQuestions}</p>
//           <p className="text-[12px] sm:text-xs text-gray-500">Correct</p>
//         </div>
//         <div className="text-center">
//           <p className="text-md sm:text-2xl font-bold text-red-600">{selectedResult.incorrectQuestions}</p>
//           <p className="text-[12px] sm:text-xs text-gray-500">Incorrect</p>
//         </div>
//         <div className="text-center">
//           <p className="text-md sm:text-2xl font-bold text-yellow-600">{selectedResult.unanswered}</p>
//           <p className="text-[12px] sm:text-xs text-gray-500">Unanswered</p>
//         </div>
//         <div className="text-center">
//           <p className="text-md sm:text-2xl font-bold text-blue-600">{selectedResult.percentage}%</p>
//           <p className="text-[12px] sm:text-xs text-gray-500">Score</p>
//         </div>
//       </div>

//       {/* Question Review */}
//       <div className="p-1 sm:p-4">
//         <div className="flex items-center mb-2 sm:mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">Question Review</h2>
//           <div className="ml-auto text-sm text-gray-500">
//             {selectedResult.questions?.length} question
//             {selectedResult.questions?.length !== 1 ? "s" : ""}
//           </div>
//         </div>

//         <div className="space-y-3 sm:space-y-4 max-h-[55vh] overflow-y-auto pr-2">
//           {selectedResult.questions?.map((q, idx) => {
//             const userAnswer = q.userAnswer;
//             const isCorrect = q.isCorrect;
//             const wasAnswered = userAnswer !== undefined && userAnswer !== null;

//             return (
//               <div
//                 key={q.id}
//                 className={`py-2 px-4 sm:p-4 rounded-md sm:rounded-lg border-2 transition-all duration-200 ${
//                   isCorrect
//                     ? "bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
//                     : wasAnswered
//                     ? "bg-rose-50 border-rose-200 hover:bg-rose-100"
//                     : "bg-gray-50 border-gray-200 hover:bg-gray-100"
//                 }`}
//               >
//                 <div className="flex items-start gap-3">
//                   {/* Icon */}
//                   <div className="flex-shrink-0 mt-1">
//                     {isCorrect ? (
//                       <CheckCircle className="w-5 h-5 text-emerald-600" />
//                     ) : wasAnswered ? (
//                       <XCircle className="w-5 h-5 text-rose-600" />
//                     ) : (
//                       <AlertCircle className="w-5 h-5 text-gray-500" />
//                     )}
//                   </div>

//                   {/* Question + Answers */}
//                   <div className="flex-grow min-w-0">
//                     <p className="font-medium text-gray-800 mb-2 text-[13px] sm:text-base">
//                       <span className="text-gray-500">Q{idx + 1}.</span>{" "}
//                       {q.question}
//                     </p>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 text-sm">
//                       <div className="space-y-1">
//                         <p className="text-gray-500 text-xs font-medium">Your Answer:</p>
//                         <p
//                           className={`py-1 px-2 sm:p-2 rounded text-sm ${
//                             isCorrect
//                               ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
//                               : wasAnswered
//                               ? "bg-rose-100 text-rose-800 border border-rose-200"
//                               : "bg-gray-100 text-gray-600 border border-gray-200"
//                           }`}
//                         >
//                           {userAnswer || "Not Answered"}
//                         </p>
//                       </div>

//                       {!isCorrect && (
//                         <div className="space-y-1">
//                           <p className="text-gray-500 text-xs font-medium">Correct Answer:</p>
//                           <p className="py-1 px-2 sm:p-2 bg-emerald-100 text-emerald-800 rounded border border-emerald-200 text-sm">
//                             {q.correctAnswer}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };









