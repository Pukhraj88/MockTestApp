import { useEffect, useState } from "react";
import { MyAccountResult } from "./MyAccountResult";
import { User, Award, ChevronLeft } from "lucide-react";
import { MyAccountCart } from "./MyAccountCart";
import { MyAccountPerformance } from "./MyAccountPerformance";

export const MyAccount = () => {
  const [user, setUser] = useState({ username: "Guest", id: "" });
  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedResult, setSelectedResult] = useState(null);



useEffect(() => {
  const storedUser = localStorage.getItem("user");
  let storedResults = JSON.parse(localStorage.getItem("examResults")) || [];
  // ✅ Sort results by date (latest first)
  storedResults = storedResults.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  } else {
    const uniqueId =
      "fmt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
    const newUser = { username: "Guest", id: uniqueId };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }
  setResults(storedResults);
}, []);


  const categories = [
    "All",
    ...new Set(results.map((res) => res.testChapter || "Uncategorized")),
  ];

  const filteredResults =
    selectedCategory === "All"
      ? results
      : results.filter(
          (res) => (res.testChapter || "Uncategorized") === selectedCategory
        );

  const handleResultClick = (result) => {
    setSelectedResult(result);
  };

  const handleBackToList = () => {
    setSelectedResult(null);
  };

  if (selectedResult) {
    return (
      <div className="min-h-screen pt-2 sm:py-8">
        <div className="max-w-4xl mx-auto px-1">
          <button
            onClick={handleBackToList}
            className="inline-flex items-center ml-2 gap-2 px-3 py-1.5 rounded-md text-sm font-medium 
             text-blue-600 border border-blue-200 bg-blue-50 
             hover:bg-blue-100 hover:border-blue-300 hover:text-blue-700 
             transition-colors shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to History
          </button>

          <MyAccountResult selectedResult={selectedResult} />
        </div>
      </div>
    );
  }

  // --- Performance ---
  const totalTests = filteredResults.length;
  const avgScore =
    totalTests > 0
      ? Math.round(
          filteredResults.reduce((sum, r) => sum + (r.percentage || 0), 0) /
            totalTests
        )
      : 0;
  let subjectWise = {};
  if (selectedCategory === "All") {
    subjectWise = filteredResults.reduce((acc, res) => {
      const chapter = res.testChapter || "Uncategorized";
      if (!acc[chapter]) acc[chapter] = { total: 0, sum: 0 };
      acc[chapter].total += 1;
      acc[chapter].sum += res.percentage || 0; // ✅ use percentage here
      return acc;
    }, {});
  } else {
    subjectWise[selectedCategory] = {
      total: totalTests,
      sum: filteredResults.reduce((sum, r) => sum + (r.percentage || 0), 0),
    };
  }

  return (
    <div className="min-h-screen mt-2 sm:mt-0">
      <div className="bg-white max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className=" rounded-lg p-1 sm:px-6 pt-6 pb-3 mb-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-md sm:text-xl font-bold text-gray-800">
                  Welcome, {user.username}!
                </h1>
                <p className="text-gray-600 text-[8px] sm:text-sm">
                  ID: {user.id}
                </p>
              </div>
            </div>

            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-md">
              <Award className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-blue-700 text-[10px] sm:text-sm">
                {results.length} test{results.length !== 1 ? "s" : ""} completed
              </span>
            </div>
          </div>
          <hr className="border-t border-gray-200 mt-3" />
        </div>

        {/* Category Navigation */}
        <div className="rounded-lg p-1 sm:px-5 sm:mb-1">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <hr className="border-t border-gray-300 mt-3" />
        </div>

        {/* performance user  */}
        <MyAccountPerformance
          totalTests={totalTests}
          subjectWise={subjectWise}
          avgScore={avgScore}
        />

        {/* History Section */}
        <div className="rounded-lg sm:shadow py-4 px-2 sm:p-5">
          <h2 className="text-lg font-semibold text-gray-800  mb-3 pl-3 border-l-4 border-gradient-to-b from-blue-500 to-indigo-500">
            Test History :
          </h2>

          {filteredResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No test history found for {selectedCategory}.
            </div>
          ) : (
            // histroy cart
            <MyAccountCart
              handleResultClick={handleResultClick}
              filteredResults={filteredResults}
            />
          )}
        </div>
      </div>
    </div>
  );
};






// import { useEffect, useState } from "react";
// import { MyAccountResult } from "./MyAccountResult";
// import { User, Award, ChevronLeft } from "lucide-react";
// import { MyAccountCart } from "./MyAccountCart";
// import { MyAccountPerformance } from "./MyAccountPerformance";

// export const MyAccount = () => {
//   const [user, setUser] = useState({ username: "Guest", id: "" });
//   const [results, setResults] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedResult, setSelectedResult] = useState(null);

//   // if user id not generated id generate automatically
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedResults = JSON.parse(localStorage.getItem("examResults")) || [];
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       const uniqueId =
//         "fmt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
//       const newUser = { username: "Guest", id: uniqueId };
//       setUser(newUser);
//       localStorage.setItem("user", JSON.stringify(newUser));
//     }
//     setResults(storedResults);
//   }, []);

//   const categories = [
//     "All",
//     ...new Set(results.map((res) => res.testChapter || "Uncategorized")),
//   ];

//   const filteredResults =
//     selectedCategory === "All"
//       ? results
//       : results.filter(
//           (res) => (res.testChapter || "Uncategorized") === selectedCategory
//         );

//   const handleResultClick = (result) => {
//     setSelectedResult(result);
//   };

//   const handleBackToList = () => {
//     setSelectedResult(null);
//   };

//   if (selectedResult) {
//     return (
//       <div className="min-h-screen pt-2 sm:py-8">
//         <div className="max-w-4xl mx-auto px-1">
//           <button
//             onClick={handleBackToList}
//             className="inline-flex items-center ml-2 gap-2 px-3 py-1.5 rounded-md text-sm font-medium 
//              text-blue-600 border border-blue-200 bg-blue-50 
//              hover:bg-blue-100 hover:border-blue-300 hover:text-blue-700 
//              transition-colors shadow-sm"
//           >
//             <ChevronLeft className="w-4 h-4" />
//             Back to History
//           </button>

//           <MyAccountResult selectedResult={selectedResult} />
//         </div>
//       </div>
//     );
//   }

//   // --- Performance ---
//   const totalTests = filteredResults.length;
//   const avgScore =
//     totalTests > 0
//       ? Math.round(
//           filteredResults.reduce((sum, r) => sum + (r.percentage || 0), 0) /
//             totalTests
//         )
//       : 0;
//   let subjectWise = {};
//   if (selectedCategory === "All") {
//     subjectWise = filteredResults.reduce((acc, res) => {
//       const chapter = res.testChapter || "Uncategorized";
//       if (!acc[chapter]) acc[chapter] = { total: 0, sum: 0 };
//       acc[chapter].total += 1;
//       acc[chapter].sum += res.percentage || 0; // ✅ use percentage here
//       return acc;
//     }, {});
//   } else {
//     subjectWise[selectedCategory] = {
//       total: totalTests,
//       sum: filteredResults.reduce((sum, r) => sum + (r.percentage || 0), 0),
//     };
//   }

//   return (
//     <div className="min-h-screen mt-2 sm:mt-0">
//       <div className="bg-white max-w-4xl mx-auto px-4">
//         {/* Header */}
//         <div className=" rounded-lg p-1 sm:px-6 pt-6 pb-3 mb-0">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
//             <div className="flex items-center">
//               <div className="bg-blue-100 p-2 rounded-full mr-3">
//                 <User className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <h1 className="text-md sm:text-xl font-bold text-gray-800">
//                   Welcome, {user.username}!
//                 </h1>
//                 <p className="text-gray-600 text-[8px] sm:text-sm">
//                   ID: {user.id}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center bg-blue-50 px-3 py-1 rounded-md">
//               <Award className="w-4 h-4 text-blue-600 mr-2" />
//               <span className="text-blue-700 text-[10px] sm:text-sm">
//                 {results.length} test{results.length !== 1 ? "s" : ""} completed
//               </span>
//             </div>
//           </div>
//           <hr className="border-t border-gray-200 mt-3" />
//         </div>

//         {/* Category Navigation */}
//         <div className="rounded-lg p-1 sm:px-5 sm:mb-1">
//           <div className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
//                   selectedCategory === category
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//           <hr className="border-t border-gray-300 mt-3" />
//         </div>

//         {/* performance user  */}
//         <MyAccountPerformance
//           totalTests={totalTests}
//           subjectWise={subjectWise}
//           avgScore={avgScore}
//         />

//         {/* History Section */}
//         <div className="rounded-lg sm:shadow py-4 px-2 sm:p-5">
//           <h2 className="text-lg font-semibold text-gray-800  mb-3 pl-3 border-l-4 border-gradient-to-b from-blue-500 to-indigo-500">
//             Test History :
//           </h2>

//           {filteredResults.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               No test history found for {selectedCategory}.
//             </div>
//           ) : (
//             // histroy cart
//             <MyAccountCart
//               handleResultClick={handleResultClick}
//               filteredResults={filteredResults}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };






// import { useEffect, useState } from "react";
// import { MyAccountResult } from "./MyAccountResult";
// import { User, Award, Filter, Calendar, ChevronLeft, Eye } from "lucide-react";

// export const MyAccount = () => {
//   const [user, setUser] = useState({ username: "Guest", id: "" });
//   const [results, setResults] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedResult, setSelectedResult] = useState(null);

//   // if user id not generated id generate automatically
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedResults = JSON.parse(localStorage.getItem("examResults")) || [];
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       const uniqueId = "fmt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
//       const newUser = { username: "Guest", id: uniqueId };
//       setUser(newUser);
//       localStorage.setItem("user", JSON.stringify(newUser));
//     }
//     setResults(storedResults);
//   }, []);

//   const categories = [
//     "All",
//     ...new Set(results.map((res) => res.testChapter || "Uncategorized")),
//   ];

//   const filteredResults = selectedCategory === "All"
//     ? results
//     : results.filter((res) => (res.testChapter || "Uncategorized") === selectedCategory);

//   const handleResultClick = (result) => {
//     setSelectedResult(result);
//   };

//   const handleBackToList = () => {
//     setSelectedResult(null);
//   };

//   if (selectedResult) {
//     return (
//       <div className="min-h-screen py-8">
//         <div className="max-w-4xl mx-auto px-4">
//           <button
//             onClick={handleBackToList}
//             className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
//           >
//             <ChevronLeft className="w-5 h-5 mr-1" />
//             Back to History
//           </button>
//           <MyAccountResult selectedResult={selectedResult} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen mt-2 sm:mt-0">
//       <div className="bg-white max-w-4xl mx-auto px-4">
//         {/* Header */}
//         <div className=" rounded-lg p-1 sm:px-6 pt-6 pb-3 mb-0">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
//             <div className="flex items-center">
//               <div className="bg-blue-100 p-2 rounded-full mr-3">
//                 <User className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <h1 className="text-md sm:text-xl font-bold text-gray-800">
//                   Welcome, {user.username}!
//                 </h1>
//                 <p className="text-gray-600 text-[8px] sm:text-sm">ID: {user.id}</p>
//               </div>
//             </div>

//             <div className="flex items-center bg-blue-50 px-3 py-1 rounded-md">
//               <Award className="w-4 h-4 text-blue-600 mr-2" />
//               <span className="text-blue-700 text-[10px] sm:text-sm">
//                 {results.length} test{results.length !== 1 ? 's' : ''} completed
//               </span>
//             </div>

//           </div>
//             <hr className="border-t border-gray-200 mt-3" />
//         </div>

//         {/* Category Navigation */}
//         <div className="rounded-lg p-1 sm:px-5 sm:mb-1">
//           <div className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
//                   selectedCategory === category
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}

//           </div>
//             <hr className="border-t border-gray-200 mt-3" />
//         </div>

//         {/* History Section */}
//         <div className="rounded-lg sm:shadow p-1 sm:p-4">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Test History</h2>

//           {filteredResults.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               No test history found for {selectedCategory}.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
//               {filteredResults.map((res, i) => (
//                 <div
//                   key={i}
//                   onClick={() => handleResultClick(res)}
//                   className="border-2 border-gray-200 rounded-lg p-3 sm:p-4 cursor-pointer hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex justify-between items-start mb-1 sm:mb-3">
//                     <h3 className="font-semibold text-gray-800">
//                       {res.topic?.[0] || "Test"}
//                     </h3>
//                     <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                       {res.testChapter || "General"}
//                     </span>
//                   </div>

//                   <div className="flex items-center text-gray-500 text-xs mb-1 sm:mb-3">
//                     <Calendar className="w-3 h-3 mr-1" />
//                     {new Date(res.date).toLocaleString()}
//                   </div>

//                   {/* Score Progress Bar */}
//                   <div className="mb-3">
//                     <div className="flex justify-between items-center mb-1">
//                       <span className="text-sm text-gray-600">Score</span>
//                       <span
//                         className={`font-semibold ${
//                           res.percentage >= 70
//                             ? "text-green-600"
//                             : res.percentage >= 50
//                             ? "text-yellow-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {res.percentage}%
//                       </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-1.5">
//                       <div
//                         className={`h-1.5 rounded-full ${
//                           res.percentage >= 70
//                             ? "bg-green-500"
//                             : res.percentage >= 50
//                             ? "bg-yellow-500"
//                             : "bg-red-500"
//                         }`}
//                         style={{ width: `${res.percentage}%` }}
//                       ></div>
//                     </div>
//                   </div>

//                   {/* Stats Grid */}
//                   <div className="grid grid-cols-4 gap-2 text-xs mb-3">
//                     <div className="text-center">
//                       <div className="font-semibold text-green-600">{res.correctQuestions}</div>
//                       <div className="text-gray-500">Correct</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="font-semibold text-red-600">{res.incorrectQuestions}</div>
//                       <div className="text-gray-500">Incorrect</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="font-semibold text-yellow-600">{res.unanswered}</div>
//                       <div className="text-gray-500">Skipped</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="font-semibold text-gray-600">{res.totalQuestions}</div>
//                       <div className="text-gray-500">Total</div>
//                     </div>
//                   </div>

//                   {/* View Details Button */}
//                   <div className="flex items-center justify-center text-blue-600 text-sm pt-2 border-t border-gray-100">
//                     <Eye className="w-3 h-3 mr-1" />
//                     View Details
//                   </div>

//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
