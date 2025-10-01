export const MyAccountPerformance = ({ totalTests, avgScore, subjectWise }) => {
  return (
    <div className="bg-white rounded-lg p-2 sm:p-5">
 

      {/* Performance Overview */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-5">
        <div className="bg-blue-50 rounded-md px-3 py-1.5 sm:p-3 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] sm:text-xs font-medium text-blue-700">Total Tests</p>
              <p className="text-[15px] sm:text-xl font-bold text-gray-800">{totalTests}</p>
            </div>
            <div className="bg-blue-100 p-1.5 sm:p-2 rounded-md">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-md px-3 py-1.5 sm:p-3 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] sm:text-xs font-medium text-green-700">
                Average Score
              </p>
              <p className="text-[15px] sm:text-xl font-bold text-gray-800">{avgScore}%</p>
            </div>
            <div className="bg-green-100 p-1.5 sm:p-2 rounded-md">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Subject-wise */}
{Object.keys(subjectWise).length === 0 ? (
  <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300">
    <p className="text-sm text-gray-500">No performance data available yet</p>
  </div>
) : (
  <div className="space-y-1 sm:space-y-2">
    {Object.entries(subjectWise).map(([subject, data]) => {
      const avg = Math.round(data.sum / data.total);
      return (
        <div
          key={subject}
          className="bg-white border border-gray-100 sm:border-gray-200 rounded-sm sm:rounded-md py-1 px-2 sm:p-3 hover:shadow-md transition-shadow duration-200"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <span className="text-[11px] sm:text-sm font-medium text-gray-800">{subject}</span>
            <span className="text-[11px] sm:text-sm font-semibold text-blue-600">
              {avg}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-sm sm:rounded-full h-1 sm:h-2 overflow-hidden">
            <div
              className={`h-1 sm:h-2 rounded-full transition-all duration-500 ${
                avg >= 75
                  ? "bg-green-500"
                  : avg >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${avg}%` }}
            ></div>
          </div>

          {/* Footer stats */}
          <div className="flex justify-between text-[11px] sm:text-xs text-gray-500 mt-1 sm:mt-1.5">
            <span>{data.total} tests</span>
            <span className="italic">Average</span>
          </div>
        </div>

      );
    })}
<hr className="border-t border-gray-400 mt-3" />
  </div>
)}


    </div>
  );
};























// export const MyAccountPerformance = ({ totalTests, avgScore, subjectWise }) => {
//   return (
//     <div className="bg-white rounded-lg p-2 sm:p-5">
 

//       {/* Performance Overview */}
//       <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-5">
//         <div className="bg-blue-50 rounded-md px-3 py-1.5 sm:p-3 border border-blue-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-[10px] sm:text-xs font-medium text-blue-700">Total Tests</p>
//               <p className="text-[15px] sm:text-xl font-bold text-gray-800">{totalTests}</p>
//             </div>
//             <div className="bg-blue-100 p-1.5 sm:p-2 rounded-md">
//               <svg
//                 className="w-4 h-4 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="bg-green-50 rounded-md px-3 py-1.5 sm:p-3 border border-green-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-[10px] sm:text-xs font-medium text-green-700">
//                 Average Score
//               </p>
//               <p className="text-[15px] sm:text-xl font-bold text-gray-800">{avgScore}%</p>
//             </div>
//             <div className="bg-green-100 p-1.5 sm:p-2 rounded-md">
//               <svg
//                 className="w-4 h-4 text-green-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Subject-wise */}
//       <div>
//         <h3 className="text-base font-semibold text-gray-800 mb-2">
//           Subject-wise Performance
//         </h3>

//         {Object.keys(subjectWise).length === 0 ? (
//           <p className="text-xs text-gray-500 text-center py-4">
//             No performance data available yet
//           </p>
//         ) : (
//           <div className="space-y-2">
//             {Object.entries(subjectWise).map(([subject, data]) => {
//               const avg = Math.round(data.sum / data.total);
//               return (
//                 <div
//                   key={subject}
//                   className="bg-gray-200 rounded-md p-2"
//                 >
//                   <div className="flex justify-between items-center mb-1">
//                     <span className="text-sm font-medium text-gray-700">
//                       {subject}
//                     </span>
//                     <span className="text-sm font-semibold text-blue-600">
//                       {avg}%
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-1.5">
//                     <div
//                       className="bg-blue-600 h-1.5 rounded-full"
//                       style={{ width: `${avg}%` }}
//                     ></div>
//                   </div>
//                   <div className="flex justify-between text-[10px] text-gray-500 mt-0.5">
//                     <span>{data.total} tests</span>
//                     <span>Avg</span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };















