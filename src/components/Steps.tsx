
import React from 'react';

interface Step {
  id: string;
  name: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
}

export const Steps: React.FC<StepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="py-4">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li 
            key={step.id}
            className={`flex items-center ${index !== steps.length - 1 ? "w-full" : ""}`}
          >
            <div className="flex items-center justify-center">
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  index <= currentStep ? "gradient-bg" : "bg-gray-200"
                } text-white`}
              >
                {index < currentStep ? (
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span 
                className={`ml-2 text-sm font-medium ${
                  index <= currentStep ? "text-databot-purple" : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${index < currentStep ? "gradient-bg" : "bg-gray-200"}`}></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};
