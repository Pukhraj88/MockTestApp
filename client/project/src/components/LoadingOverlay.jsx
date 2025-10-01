import { motion, AnimatePresence } from "framer-motion";

export const LoadingOverlay = ({ isLoading }) => {
  return (
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
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-10 h-10 rounded-full border-3 border-blue-600 border-t-transparent"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-gray-700 text-sm font-medium"
            >
              Preparing your test...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};




