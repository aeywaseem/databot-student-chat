
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-databot-purple to-databot-blue rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ready to transform</span>
                <span className="block">your customer support?</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-indigo-100">
                Start creating AI-powered chatbots today and elevate the experience for your customers.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row">
                <Button asChild className="bg-white text-databot-purple hover:bg-gray-100 shadow-md py-6 px-8">
                  <Link to="/login">Get Started for Free</Link>
                </Button>
                <Button asChild className="bg-transparent text-white border border-white hover:bg-white/10 mt-3 sm:mt-0 sm:ml-3 py-6 px-8">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
