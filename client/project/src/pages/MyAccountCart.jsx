import { Calendar, Eye } from "lucide-react";

export const MyAccountCart = ({ handleResultClick, filteredResults }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
      {filteredResults.map((res, i) => (
        <div
          key={i}
          onClick={() => handleResultClick(res)}
          className="border border-gray-200 rounded-md p-2 cursor-pointer hover:shadow-sm transition"
        >
          {/* Header: Topic + Chapter */}
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-medium text-gray-800 text-sm truncate">
              {res.topic?.[0] || "Test"}
            </h3>
            <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {res.testChapter || "General"}
            </span>
          </div>

          {/* Date + Score (same row) */}
          <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(res.date).toLocaleString()}
            </div>
            <span
              className={`font-semibold ${
                res.percentage >= 70
                  ? "text-green-600"
                  : res.percentage >= 50
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {res.percentage}%
            </span>
          </div>

          {/* Stats: Total + Correct (very compact) */}
          <div className="flex justify-between text-[11px] text-gray-600 mb-1">
            <span>Total: {res.totalQuestions}</span>
            <span className="text-green-600">Correct: {res.correctQuestions}</span>
          </div>

          {/* View Details */}
          <div className="flex items-center justify-center text-blue-600 text-[11px] border-t border-gray-100 pt-1">
            <Eye className="w-3 h-3 mr-1" />
            View Details
          </div>
        </div>
      ))}
    </div>
  );
};














// import { Calendar, Eye } from "lucide-react";

// export const MyAccountCart = ({ handleResultClick, filteredResults }) => {
//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
//         {filteredResults.map((res, i) => (
//           <div
//             key={i}
//             onClick={() => handleResultClick(res)}
//             className="border-2 border-gray-200 rounded-lg p-3 sm:p-4 cursor-pointer hover:shadow-md transition-shadow"
//           >
//             <div className="flex justify-between items-start mb-1 sm:mb-3">
//               <h3 className="font-semibold text-gray-800">
//                 {res.topic?.[0] || "Test"}
//               </h3>
//               <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                 {res.testChapter || "General"}
//               </span>
//             </div>
//             <div className="flex items-center text-gray-500 text-xs mb-1 sm:mb-3">
//               <Calendar className="w-3 h-3 mr-1" />
//               {new Date(res.date).toLocaleString()}
//             </div>
//             {/* Score Progress Bar */}
//             <div className="mb-3">
//               <div className="flex justify-between items-center mb-1">
//                 <span className="text-sm text-gray-600">Score</span>
//                 <span
//                   className={`font-semibold ${
//                     res.percentage >= 70
//                       ? "text-green-600"
//                       : res.percentage >= 50
//                       ? "text-yellow-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {res.percentage}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-1.5">
//                 <div
//                   className={`h-1.5 rounded-full ${
//                     res.percentage >= 70
//                       ? "bg-green-500"
//                       : res.percentage >= 50
//                       ? "bg-yellow-500"
//                       : "bg-red-500"
//                   }`}
//                   style={{ width: `${res.percentage}%` }}
//                 ></div>
//               </div>
//             </div>
//             {/* Stats Grid */}
//             <div className="grid grid-cols-4 gap-2 text-xs mb-3">
//               <div className="text-center">
//                 <div className="font-semibold text-green-600">
//                   {res.correctQuestions}
//                 </div>
//                 <div className="text-gray-500">Correct</div>
//               </div>
//               <div className="text-center">
//                 <div className="font-semibold text-red-600">
//                   {res.incorrectQuestions}
//                 </div>
//                 <div className="text-gray-500">Incorrect</div>
//               </div>
//               <div className="text-center">
//                 <div className="font-semibold text-yellow-600">
//                   {res.unanswered}
//                 </div>
//                 <div className="text-gray-500">Skipped</div>
//               </div>
//               <div className="text-center">
//                 <div className="font-semibold text-gray-600">
//                   {res.totalQuestions}
//                 </div>
//                 <div className="text-gray-500">Total</div>
//               </div>
//             </div>
//             {/* View Details Button */}
//             <div className="flex items-center justify-center text-blue-600 text-sm pt-2 border-t border-gray-100">
//               <Eye className="w-3 h-3 mr-1" />
//               View Details
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };
