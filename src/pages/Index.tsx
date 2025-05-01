
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CTASection from '@/components/CTASection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* How It Works Section */}
        <section className="py-12 bg-white sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                How Databotics Works
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Turn your PDFs into intelligent chatbots in just three simple steps
              </p>
            </div>
            
            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="relative p-6 bg-white border border-gray-100 rounded-xl card-shadow text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-databot-blue text-white mb-4 text-lg font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Upload Your PDFs</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Upload your course materials, textbooks, or any educational PDFs to our secure platform.
                  </p>
                </div>
                
                <div className="relative p-6 bg-white border border-gray-100 rounded-xl card-shadow text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-databot-orange text-white mb-4 text-lg font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Customize Your Bot</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Configure your chatbot's appearance, knowledge base, and response style to match your teaching approach.
                  </p>
                </div>
                
                <div className="relative p-6 bg-white border border-gray-100 rounded-xl card-shadow text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-databot-teal text-white mb-4 text-lg font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Share with Students</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Distribute your AI chatbot via a direct link, embed it on your website, or integrate with your LMS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Features />
        
        {/* Testimonials Section */}
        <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Loved by Educators and Students
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                See what our users have to say about their experience with Databotics
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-databot-blue text-white flex items-center justify-center font-bold">
                      JP
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Dr. James Peterson</h3>
                    <p className="text-sm text-gray-500">Computer Science Professor</p>
                  </div>
                </div>
                <p className="mt-4 text-base text-gray-500">
                  "Databotics has revolutionized how my students interact with course materials. They ask questions at any time and get accurate answers based on our textbooks."
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-databot-purple text-white flex items-center justify-center font-bold">
                      SM
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Sarah Miller</h3>
                    <p className="text-sm text-gray-500">Biology Student</p>
                  </div>
                </div>
                <p className="mt-4 text-base text-gray-500">
                  "Having a chatbot that understands my textbook has helped me study more efficiently. I can ask specific questions and get instant answers."
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-databot-teal text-white flex items-center justify-center font-bold">
                      RJ
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Robert Johnson</h3>
                    <p className="text-sm text-gray-500">Department Head, Engineering</p>
                  </div>
                </div>
                <p className="mt-4 text-base text-gray-500">
                  "We've implemented Databotics across our entire department, and it's significantly reduced the repetitive questions we receive, letting faculty focus on more complex student needs."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
