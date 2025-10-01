import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { 
  ChevronLeft, 
  ChevronRight, 
  Brain, 
  Calculator, 
  Globe, 
  Award, 
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Target,
  BarChart3
} from "lucide-react";
export const CategorySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  
  const navigate = useNavigate();

  

  const categories = [
    {
      id: 1,
      title: "Reasoning Ability",
      description: "Develop critical thinking and logical problem-solving skills with adaptive AI tests",
      icon: <Brain className="w-5 h-5" />,
      logo: <Target className="w-5 h-5" />,
      color: "#8B5CF6", // Purple
      accentColor: "#7C3AED",
      stats: "1.2K+ practice questions",
      time: "15-20 min tests",
      route: "/reasoning",
    },
    {
      id: 2,
      title: "Numerical Ability",
      description: "Master quantitative concepts with personalized practice sets and performance analytics",
      icon: <Calculator className="w-5 h-5" />,
      logo: <BarChart3 className="w-5 h-5" />,
      color: "#3B82F6", // Blue
      accentColor: "#2563EB",
      stats: "980+ curated problems",
      time: "Instant scoring",
      route: "/maths",
    },
    {
      id: 3,
      title: "General Awareness",
      description: "Stay informed with daily updated current affairs and comprehensive GK modules",
      icon: <Globe className="w-5 h-5" />,
      logo: <Sparkles className="w-5 h-5" />,
      color: "#10B981", // Emerald
      accentColor: "#059669",
      stats: "Daily updated content",
      time: "Quick 10-min drills",
      route: "/ga",
    },
    {
      id: 4,
      title: "English Language",
      description: "Enhance vocabulary, grammar, and comprehension with structured learning paths",
      icon: <BookOpen className="w-5 h-5" />,
      logo: <BookOpen className="w-5 h-5" />,
      color: "#F59E0B", // Amber
      accentColor: "#D97706",
      stats: "850+ exercises",
      time: "Adaptive difficulty",
      route: "/english",
    },
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (isHovered || isMobile) return; // Pause when user is interacting or on mobile
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === categories.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    
    return () => clearInterval(interval);
  }, [categories.length, isHovered, isMobile]);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === categories.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? categories.length - 1 : prev - 1
    );
  };


  const goToCategory = (route) => {
  navigate(route); 
};

  // Handle scroll snap for mobile
  const handleScroll = (e) => {
    if (!isMobile) return;
    
    const container = e.target;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const newIndex = Math.round(scrollLeft / containerWidth);
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div 
      className="w-full max-w-6xl mx-auto py-4 sm:py-12 sm:px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-6 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Explore <span className="bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent">
              Learning Paths
            </span>
          </h2>
          <p className="mt-2 text-gray-600 text-sm md:text-lg">
            Start mastering skills today
          </p>
        </div>
      </motion.div>

      <div className="relative">
        {/* Navigation Arrows - Hidden on mobile */}
        {!isMobile && (
          <>
            <motion.button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 -translate-x-4"
              whileHover={{ scale: 1.05, backgroundColor: "#f8f9fa" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous category"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
            
            <motion.button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 translate-x-4"
              whileHover={{ scale: 1.05, backgroundColor: "#f8f9fa" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next category"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </motion.button>
          </>
        )}

        {/* Main slider container */}
        <div 
          className={`overflow-x-auto ${isMobile ? 'snap-x snap-mandatory scroll-smooth' : 'overflow-hidden rounded-xl'}`}
          onScroll={isMobile ? handleScroll : undefined}
          style={isMobile ? { 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          } : {}}
        >
          {/* Hide scrollbar for mobile but keep functionality */}
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}
          </style>
          
          <motion.div
            className={`flex ${isMobile ? 'w-full hide-scrollbar' : ''}`}
            animate={!isMobile ? { 
              x: -currentIndex * 344 // 320px width + 24px margin
            } : {}}
            transition={{ type: "spring", damping: 30, stiffness: 100 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className={`flex-shrink-0 ${
                  isMobile 
                    ? 'w-full px-1 snap-start' // Full width with snap on mobile
                    : 'w-80 mx-3'   // Fixed width with margin on desktop
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className={`bg-white flex flex-col cursor-pointer overflow-hidden border-2 border-gray-100 ${
                    isMobile 
                      ? "rounded-lg h-80" 
                      : "rounded-xl h-96 shadow-sm hover:shadow-md transition-all duration-300 border-gray-100"
                  }`}
                  whileHover={{ y: isMobile ? 0 : -4 }}
                  onClick={() => goToCategory(category.route)}
                  layoutId={`card-${category.id}`}
                >
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    {/* Header with icon */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.div 
                        className="flex items-center justify-center text-white w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl"
                        style={{ backgroundColor: category.color }}
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {category.logo || category.icon}
                      </motion.div>
                      
                      {!isMobile && (
                        <motion.div 
                          className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                          whileHover={{ scale: 1.05 }}
                        >
                          {index + 1}/{categories.length}
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                      {category.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <TrendingUp className="w-3 h-3 mr-2" style={{ color: category.color }} />
                        {category.stats}
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Clock className="w-3 h-3 mr-2" style={{ color: category.color }} />
                        {category.time}
                      </div>
                    </div>
                    
                    {/* CTA Button */}
  <motion.button 
                        className={`self-start flex items-center font-medium group mt-auto ${
                          isMobile ? "text-sm py-2" : ""
                        }`}
                        whileHover={{ x: 4 }}
                        style={{ color: category.accentColor }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Start practicing
                        <ArrowRight className={`ml-1 group-hover:translate-x-1 transition-transform ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                      </motion.button>

                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dots Indicator */}
        <motion.div 
          className="flex justify-center mt-6 space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                if (isMobile) {
                  // Scroll to the selected card on mobile
                  const container = document.querySelector('.overflow-x-auto');
                  if (container) {
                    container.scrollTo({
                      left: index * container.offsetWidth,
                      behavior: 'smooth'
                    });
                  }
                }
              }}
              className="relative p-1"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to category ${index + 1}`}
            >
              <div 
                className={`rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-3 h-3' 
                    : 'bg-gray-300 w-2 h-2'
                }`}
              />
              {index === currentIndex && !isMobile && (
                <motion.div 
                  className="absolute inset-0 border-2 border-blue-600 rounded-full -m-1"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Progress Bar - Hidden on mobile */}
      {!isMobile && (
        <motion.div 
          className="w-full bg-gray-200 rounded-full h-1 mt-6 max-w-md mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            className="h-full bg-blue-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentIndex + 1) / categories.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      )}
    </div>
  );
};







// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   ChevronLeft, 
//   ChevronRight, 
//   Brain, 
//   Calculator, 
//   Globe, 
//   Award, 
//   BookOpen,
//   ArrowRight,
//   TrendingUp,
//   Clock,
//   Sparkles,
//   Target,
//   BarChart3
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export const CategorySlider = () => {
//   const navigate = useNavigate();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   const categories = [
//     {
//       id: 1,
//       title: "Reasoning Ability",
//       description: "Develop critical thinking and logical problem-solving skills with adaptive AI tests",
//       icon: <Brain className="w-5 h-5" />,
//       logo: <Target className="w-5 h-5" />,
//       color: "#8B5CF6", // Purple
//       accentColor: "#7C3AED",
//       stats: "1.2K+ practice questions",
//       time: "15-20 min tests",
//       route: "/reasoning",
//     },
//     {
//       id: 2,
//       title: "Numerical Ability",
//       description: "Master quantitative concepts with personalized practice sets and performance analytics",
//       icon: <Calculator className="w-5 h-5" />,
//       logo: <BarChart3 className="w-5 h-5" />,
//       color: "#3B82F6", // Blue
//       accentColor: "#2563EB",
//       stats: "980+ curated problems",
//       time: "Instant scoring",
//       route: "/maths",
//     },
//     {
//       id: 3,
//       title: "General Awareness",
//       description: "Stay informed with daily updated current affairs and comprehensive GK modules",
//       icon: <Globe className="w-5 h-5" />,
//       logo: <Sparkles className="w-5 h-5" />,
//       color: "#10B981", // Emerald
//       accentColor: "#059669",
//       stats: "Daily updated content",
//       time: "Quick 10-min drills",
//       route: "/ga",
//     },
//     {
//       id: 4,
//       title: "English Language",
//       description: "Enhance vocabulary, grammar, and comprehension with structured learning paths",
//       icon: <BookOpen className="w-5 h-5" />,
//       logo: <BookOpen className="w-5 h-5" />,
//       color: "#F59E0B", // Amber
//       accentColor: "#D97706",
//       stats: "850+ exercises",
//       time: "Adaptive difficulty",
//       route: "/english",
//     },
  
//   ];

//   // Check if mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Auto-advance slides
//   useEffect(() => {
//     if (isHovered) return; // Pause when user is interacting
    
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => 
//         prev === categories.length - 1 ? 0 : prev + 1
//       );
//     }, 4000);
    
//     return () => clearInterval(interval);
//   }, [categories.length, isHovered]);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => 
//       prev === categories.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => 
//       prev === 0 ? categories.length - 1 : prev - 1
//     );
//   };

//   const goToCategory = (route) => {
//     navigate(route);
//   };

//   // Calculate card width based on viewport
//   const getCardWidth = () => {
//     if (typeof window === 'undefined') return 320;
//     return window.innerWidth < 768 ? window.innerWidth : 320;
//   };

//   const [cardWidth, setCardWidth] = useState(getCardWidth());

//   useEffect(() => {
//     const handleResize = () => setCardWidth(getCardWidth());
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);


//   return (
//     <div 
//       className="w-full max-w-6xl mx-auto py-4 sm:py-12"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Header */}
//       <motion.div 
//         className="text-center mb-6 sm:mb-12 px-4"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//       <div className="mb-6 text-center">
//   <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
//     Explore <span className="bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent">
//       Learning Paths
//     </span>
//   </h2>
//   <p className="mt-2 text-gray-600 text-sm md:text-lg">
//     Start mastering skills today
//   </p>
// </div>

//       </motion.div>

//       <div className="relative">
//         {/* Navigation Arrows - Hidden on mobile */}
//         {!isMobile && (
//           <>
//             <motion.button
//               onClick={prevSlide}
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 -translate-x-4"
//               whileHover={{ scale: 1.05, backgroundColor: "#f8f9fa" }}
//               whileTap={{ scale: 0.95 }}
//               aria-label="Previous category"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <ChevronLeft className="w-5 h-5 text-gray-600" />
//             </motion.button>
            
//             <motion.button
//               onClick={nextSlide}
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 translate-x-4"
//               whileHover={{ scale: 1.05, backgroundColor: "#f8f9fa" }}
//               whileTap={{ scale: 0.95 }}
//               aria-label="Next category"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <ChevronRight className="w-5 h-5 text-gray-600" />
//             </motion.button>
//           </>
//         )}

//             <div className="overflow-hidden">
//   <motion.div
//     className="flex "
//     animate={{ x: -currentIndex * cardWidth }}
//     transition={{ type: "spring", damping: 30, stiffness: 100 }}
//   >
//             <AnimatePresence mode="wait">
//               {categories.map((category, index) => (
//                 <motion.div
//                   key={category.id}
//                   className="flex-shrink-0 max-w-[22rem]"
//                   style={{ width: cardWidth }}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.4 }}
//                 >
               
//                     <motion.div
//   className={`bg-white flex flex-col cursor-pointer overflow-hidden ${
//     isMobile 
//       ? "rounded-lg border border-gray-200 h-65 sm:h-80 mx-2" // added mx-2 for spacing
//       : "rounded-xl p-6 h-96 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 mx-3"
//   }`}
//   whileHover={{ y: isMobile ? 0 : -4 }}
//   onClick={() => goToCategory(category.route)}
//   layoutId={`card-${category.id}`}
// >

//                     <div className={isMobile ? "p-4" : "flex-1 flex flex-col"}>
//                       {/* Header with icon */}
//                       <div className="flex items-start justify-between mb-4">
//                         <motion.div 
//                           className={`flex items-center justify-center text-white ${
//                             isMobile ? "w-10 h-10 rounded-lg" : "w-12 h-12 rounded-xl"
//                           }`}
//                           style={{ backgroundColor: category.color }}
//                           whileHover={{ rotate: 5, scale: 1.05 }}
//                           transition={{ type: "spring", stiffness: 300 }}
//                         >
//                           {category.logo || category.icon}
//                         </motion.div>
                        
//                         {!isMobile && (
//                           <motion.div 
//                             className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700"
//                             whileHover={{ scale: 1.05 }}
//                           >
//                             {index + 1}/{categories.length}
//                           </motion.div>
//                         )}
//                       </div>
                      
//                       {/* Content */}
//                       <h3 className={`font-semibold text-gray-900 mb-2 ${isMobile ? "text-lg" : "text-xl mb-3"}`}>
//                         {category.title}
//                       </h3>
                      
//                       <p className={`text-gray-600 mb-4 flex-grow ${isMobile ? "text-sm" : "leading-relaxed"}`}>
//                         {category.description}
//                       </p>
                      
//                       {/* Stats */}
//                       <div className="space-y-1 mb-4">
//                         <div className={`flex items-center ${isMobile ? "text-xs" : "text-sm"} text-gray-600`}>
//                           <TrendingUp className="w-3 h-3 mr-2" style={{ color: category.color }} />
//                           {category.stats}
//                         </div>
//                         <div className={`flex items-center ${isMobile ? "text-xs" : "text-sm"} text-gray-600`}>
//                           <Clock className="w-3 h-3 mr-2" style={{ color: category.color }} />
//                           {category.time}
//                         </div>
//                       </div>
                      
//                       {/* CTA Button */}
//                       <motion.button 
//                         className={`self-start flex items-center font-medium group mt-auto ${
//                           isMobile ? "text-sm py-2" : ""
//                         }`}
//                         whileHover={{ x: 4 }}
//                         style={{ color: category.accentColor }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         Start practicing
//                         <ArrowRight className={`ml-1 group-hover:translate-x-1 transition-transform ${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         </div>

//         {/* Dots Indicator */}
//         <motion.div 
//           className="flex justify-center mt-6 space-x-2 px-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           {categories.map((_, index) => (
//             <motion.button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className="relative p-1"
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//               aria-label={`Go to category ${index + 1}`}
//             >
//               <div 
//                 className={`rounded-full transition-colors ${
//                   index === currentIndex 
//                     ? 'bg-blue-600 w-3 h-3' 
//                     : 'bg-gray-300 w-2 h-2'
//                 }`}
//               />
//               {index === currentIndex && !isMobile && (
//                 <motion.div 
//                   className="absolute inset-0 border-2 border-blue-600 rounded-full -m-1"
//                   layoutId="activeIndicator"
//                   transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                 />
//               )}
//             </motion.button>
//           ))}
//         </motion.div>
//       </div>

//       {!isMobile && (
//         <motion.div 
//           className="w-full bg-gray-200 rounded-full h-1 mt-6 max-w-md mx-auto overflow-hidden"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           <motion.div 
//             className="h-full bg-blue-600 rounded-full"
//             initial={{ width: "0%" }}
//             animate={{ width: `${((currentIndex + 1) / categories.length) * 100}%` }}
//             transition={{ duration: 0.5 }}
//           />
//         </motion.div>
//       )}
//     </div>
//   );
// };


