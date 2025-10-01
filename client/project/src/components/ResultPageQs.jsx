const language=localStorage.getItem("language");
import { CheckCircle, XCircle,  AlertCircle } from "lucide-react";



export const ResultPageQs=({data,answers})=>{


    return(

        <>
        {/* Questions Review */}
        <div className="p-1 sm:p-6">
          <div className="flex items-center mb-1 sm:mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Question Review</h2>
            <div className="ml-auto text-sm text-gray-500">
              {data.length} question{data.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            {data.map((q) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.answer[language];
              const wasAnswered = userAnswer !== undefined;
              
              return (
                <div 
                  key={q.id} 
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    isCorrect 
                      ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100' 
                      : wasAnswered
                      ? 'bg-rose-50 border-rose-200 hover:bg-rose-100'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                      ) : wasAnswered ? (
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                      )}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-gray-800 mb-1 sm:mb-3 text-[12px] sm:text-sm">
                        <span className="text-gray-500">Q{q.id}.</span> {q.question[language]}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <p className="text-gray-500 text-xs font-medium">Your Answer:</p>
                          <p className={`p-2 rounded text-sm ${
                            isCorrect 
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                              : wasAnswered
                              ? "bg-rose-100 text-rose-800 border border-rose-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}>
                            {userAnswer || "Not Answered"}
                          </p>
                        </div>
                        
                        {!isCorrect && (
                          <div className="space-y-1">
                            <p className="text-gray-500 text-xs font-medium">Correct Answer:</p>
                            <p className="p-2 bg-emerald-100 text-emerald-800 rounded border border-emerald-200 text-sm">
                              {q.answer[language]}
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



        
        </>

    )
}