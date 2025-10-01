import { useEffect, useState } from "react";
import { SiGoogletranslate } from "react-icons/si";

export const MockSetGridNew = ({ testCategories, handleMockStart }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* <div className="flex justify-end mb-4">
        <button
          className="px-3 py-2 rounded bg-gray-700 text-white text-sm flex items-center gap-2"
          onClick={() => setLanguage((prev) => (prev === "en" ? "hi" : "en"))}
        >
          <SiGoogletranslate />
          {language === "en" ? "English" : "Hindi"}
        </button>
      </div>
       */}
  <div className="w-full max-w-6xl mx-auto">
  <div className="flex justify-between items-center mb-2 sm:mb-4">
    <span className="px-2 py-1 rounded  text-gray-700 sm:text-lg font-bold flex items-center whitespace-nowrap">
      {testCategories[0].ai ? "AI-Generated (Finite Qs)" : "Random Questions(Fixed Qs)"}
    </span>
    <button
      className="px-3 py-1.5 rounded bg-gray-700 text-white text-sm flex items-center gap-2"
      onClick={() => setLanguage((prev) => (prev === "en" ? "hi" : "en"))}
    >
      <SiGoogletranslate />
      <span className="font-semibold">
        {language === "en" ? "English" : "Hindi"}
      </span>
    </button>
  </div>
</div>




      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {testCategories.map((test, index) => (
          <div
            key={index}
            className="bg-white border-1 border-gray-200 rounded-[5px] sm:rounded-md px-3 py-2 sm:p-3 sm:p-4 shadow-sm flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center sm:gap-2">
                <span className="text-2xl">{test.icon}</span>
                <h2 className="text-sm font-semibold text-gray-800">
                  {test.title}
                </h2>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  test.difficulty === "Easy"
                    ? "bg-green-100 text-green-700"
                    : test.difficulty === "Medium"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {test.difficulty}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-xs mt-1 sm:mt-2">
              {test.description}
            </p>

            {/* Footer */}
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2 sm:mt-3">
              <span className="flex items-center">
                <svg
                  className="w-3.5 h-3.5 mr-1"
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

              {/* ai if available */}
              {test.ai && (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 mr-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.1 0 2 .9 2 2v1.09a6.978 6.978 0 013.91 3.91H19a2 2 0 012 2c0 1.1-.9 2-2 2h-1.09a6.978 6.978 0 01-3.91 3.91V18a2 2 0 11-4 0v-1.09a6.978 6.978 0 01-3.91-3.91H5a2 2 0 110-4h1.09a6.978 6.978 0 013.91-3.91V6c0-1.1.9-2 2-2zm-1 6a1 1 0 100 2h2a1 1 0 100-2h-2z" />
                  </svg>
                  AI-Generated (Finite Qs)
                </span>
              )}

              <span className="flex items-center">
                <svg
                  className="w-3.5 h-3.5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {test.questions} Qs
              </span>
            </div>

            {/* Button */}
            <button
              className="flex items-center justify-center mt-1 sm:mt-3  py-2 bg-white text-indigo-600 border border-indigo-100 sm:border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-md hover:shadow-lg text-xs font-medium"
              onClick={() => handleMockStart(test)}
            >
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};






// import { useEffect, useState } from "react";
// import { SiGoogletranslate } from "react-icons/si";

// export const MockSetGridNew = ({ testCategories, handleMockStart }) => {
//   const [language, setLanguage] = useState(
//     () => localStorage.getItem("language") || "en"
//   );

//   useEffect(() => {
//     localStorage.setItem("language", language);
//   }, [language]);

//   return (
//     <div className="w-full max-w-6xl mx-auto">
//       <div className="flex justify-end mb-4">
//         <button
//           className="px-3 py-2 rounded bg-gray-700 text-white text-sm flex items-center gap-2"
//           onClick={() => setLanguage((prev) => (prev === "en" ? "hi" : "en"))}
//         >
//           <SiGoogletranslate />
//           {language === "en" ? "English" : "Hindi"}
//         </button>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//         {testCategories.map((test, index) => (
//           <div
//             key={index}
//             className="bg-white border-1 border-gray-200 rounded-[5px] sm:rounded-md px-3 py-2 sm:p-3 sm:p-4 shadow-sm flex flex-col justify-between"
//           >
//             {/* Header */}
//             <div className="flex items-start justify-between">
//               <div className="flex items-center sm:gap-2">
//                 <span className="text-2xl">{test.icon}</span>
//                 <h2 className="text-sm font-semibold text-gray-800">
//                   {test.title}
//                 </h2>
//               </div>
//               <span
//                 className={`text-xs px-2 py-0.5 rounded ${
//                   test.difficulty === "Easy"
//                     ? "bg-green-100 text-green-700"
//                     : test.difficulty === "Medium"
//                     ? "bg-amber-100 text-amber-700"
//                     : "bg-rose-100 text-rose-700"
//                 }`}
//               >
//                 {test.difficulty}
//               </span>
//             </div>

//             {/* Description */}
//             <p className="text-gray-500 text-xs mt-1 sm:mt-2">
//               {test.description}
//             </p>

//             {/* Footer */}
//             <div className="flex justify-between items-center text-xs text-gray-500 mt-2 sm:mt-3">
//               <span className="flex items-center">
//                 <svg
//                   className="w-3.5 h-3.5 mr-1"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 {test.time}
//               </span>

//               {/* ai if available */}
//               {test.ai && (
//                 <span className="flex items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-3.5 h-3.5 mr-1"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.1 0 2 .9 2 2v1.09a6.978 6.978 0 013.91 3.91H19a2 2 0 012 2c0 1.1-.9 2-2 2h-1.09a6.978 6.978 0 01-3.91 3.91V18a2 2 0 11-4 0v-1.09a6.978 6.978 0 01-3.91-3.91H5a2 2 0 110-4h1.09a6.978 6.978 0 013.91-3.91V6c0-1.1.9-2 2-2zm-1 6a1 1 0 100 2h2a1 1 0 100-2h-2z" />
//                   </svg>
//                   AI-Generated (Finite Qs)
//                 </span>
//               )}

//               <span className="flex items-center">
//                 <svg
//                   className="w-3.5 h-3.5 mr-1"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 {test.questions} Qs
//               </span>
//             </div>

//             {/* Button */}
//             <button
//               className="flex items-center justify-center mt-1 sm:mt-3  py-2 bg-white text-indigo-600 border border-indigo-100 sm:border-indigo-300 rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-md hover:shadow-lg text-xs font-medium"
//               onClick={() => handleMockStart(test)}
//             >
//               Start Test
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



