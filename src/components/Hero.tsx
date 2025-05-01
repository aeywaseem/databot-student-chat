
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Custom AI Chatbots for</span>
                <span className="block gradient-text">Business Owners</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0 md:mt-5 md:text-xl">
                Transform your PDFs into intelligent chatbots that help customers find information faster and more effectively. Databotics makes customer support interactive and personalized.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button asChild className="gradient-bg w-full text-lg py-6 px-8">
                    <Link to="/login">Get Started</Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button asChild className="gradient-secondary w-full text-lg text-white py-6 px-8">
                    <Link to="/create-chatbot">Try Demo</Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button variant="outline" asChild className="w-full text-lg py-6 px-8">
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-br from-databot-blue to-databot-darkblue opacity-10 absolute"></div>
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
          <div className="relative w-[80%] h-[80%] animate-float">
            <div className="absolute top-0 right-0 w-64 h-64 bg-databot-blue rounded-2xl opacity-20 transform rotate-12"></div>
            <div className="absolute top-12 right-12 w-64 h-64 bg-databot-darkblue rounded-2xl opacity-20 transform -rotate-6"></div>
            <div className="absolute top-24 right-24 w-64 h-64 bg-databot-orange rounded-2xl opacity-30 transform rotate-45"></div>
            <div className="absolute top-20 left-20 w-32 h-32 bg-databot-teal rounded-full opacity-10"></div>
            <div className="absolute bottom-12 left-10 w-48 h-48 bg-databot-purple rounded-full opacity-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
