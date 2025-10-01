import { motion } from "framer-motion";

export const CtaButton = () => {
  return (
    <div className="block px-0 py-2 font-['Open_Sans','Proxima_Nova',sans-serif]">
      <h2 className="text-lg font-semibold mb-2 text-center">
        Why choose Us ?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2 text-center">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-md shadow p-2 flex flex-col items-center justify-center min-h-[100px] hover:shadow-md transition"
        >
          <motion.img
            src="https://img.icons8.com/ios-filled/50/sparkling.png"
            className="w-6 h-6 mb-1"
            alt="Quality"
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <p className="text-xs font-semibold">1000+ Questions</p>
          <p className="text-[10px] text-gray-500">Verified Answers</p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white  rounded-md shadow p-2 flex flex-col items-center justify-center min-h-[100px] hover:shadow-md transition"
        >
          <motion.img
            src="https://img.icons8.com/ios/50/lightning-bolt.png"
            className="w-6 h-6 mb-1"
            alt="10 Min Delivery"
            whileHover={{ rotate: -15 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <p className="text-xs font-semibold">Free Response*</p>
          <p className="text-[10px] text-gray-500">No Hidden Fee</p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white  rounded-md shadow p-2 flex flex-col items-center justify-center min-h-[100px] hover:shadow-md transition"
        >
          <motion.img
            src="https://img.icons8.com/ios/50/clock--v1.png"
            className="w-6 h-6 mb-1"
            alt="On Time"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <p className="text-xs font-semibold">Test With Time</p>
          <p className="text-[10px] text-gray-500">Guarantee</p>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white  rounded-md shadow p-2 flex flex-col items-center justify-center min-h-[100px] hover:shadow-md transition"
        >
          <motion.img
            src="https://img.icons8.com/ios/50/free-shipping.png"
            className="w-6 h-6 mb-1"
            alt="Free Delivery"
            whileHover={{ rotate: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <p className="text-xs font-semibold">AI Question*</p>
          <p className="text-[10px] text-gray-500">Verified & Secure</p>
        </motion.div>
      </div>
    </div>
  );
};










// export const CtaButton = () => {
//   return (
//     <>
//       <div className="block  px-2 py-2 font-['Open_Sans','Proxima_Nova',sans-serif]">
//         <h2 className="text-lg font-semibold mb-2 text-center">
//           Why choose Us ?
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 text-center">
//           {/* Card 1 */}
//           <div className="bg-gray-50 rounded-md shadow p-2 flex flex-col items-center justify-center min-h-[100px]">
//             <img
//               src="https://img.icons8.com/ios-filled/50/sparkling.png"
//               className="w-6 h-6 mb-1"
//               alt="Quality"
//             />
//             <p className="text-xs font-semibold">1000+ Questions</p>
//             <p className="text-[10px] text-gray-500">Verified Answers</p>
//           </div>
//           {/* Card 2 */}
//           <div className="bg-gray-50 rounded-md shadow p-2 flex flex-col items-center justify-center min-h-[100px]">
//             <img
//               src="https://img.icons8.com/ios/50/lightning-bolt.png"
//               className="w-6 h-6 mb-1"
//               alt="10 Min Delivery"
//             />
//             <p className="text-xs font-semibold">Free Response*</p>
//             <p className="text-[10px] text-gray-500">No Hidden Fee</p>
//           </div>
//           {/* Card 3 */}
//           <div className="bg-gray-50 rounded-md shadow p-2 flex flex-col items-center justify-center min-h-[100px]">
//             <img
//               src="https://img.icons8.com/ios/50/clock--v1.png"
//               className="w-6 h-6 mb-1"
//               alt="On Time"
//             />
//             <p className="text-xs font-semibold">Test With Time</p>
//             <p className="text-[10px] text-gray-500">Guarantee</p>
//           </div>
//           {/* Card 4 */}
//           <div className="bg-gray-50 rounded-md shadow p-2 flex flex-col items-center justify-center min-h-[100px]">
//             <img
//               src="https://img.icons8.com/ios/50/free-shipping.png"
//               className="w-6 h-6 mb-1"
//               alt="Free Delivery"
//             />
//             <p className="text-xs font-semibold">AI Question*</p>
//             <p className="text-[10px] text-gray-500">Verified & Secure</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };




