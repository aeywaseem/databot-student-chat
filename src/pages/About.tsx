
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 bg-white sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                About <span className="gradient-text">Databotics</span>
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
                We're on a mission to transform education through AI-powered chatbots that make learning more interactive and accessible.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Our Story
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Databotics was founded by a team of educators and AI enthusiasts who recognized a critical gap in education: students often struggle to get immediate answers to their questions outside of class hours.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  We saw how AI could bridge this gap by creating chatbots that understand educational materials and provide accurate, helpful responses to student questions at any time of day.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  Since our founding in 2023, we've been dedicated to developing technology that makes education more accessible, personalized, and effective for students of all learning styles.
                </p>
              </div>
              <div className="mt-10 lg:mt-0 relative">
                <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-xl shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-databot-purple to-databot-blue opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center px-6">
                      <h3 className="text-2xl font-bold mb-2">Innovation in Education</h3>
                      <p className="text-lg">Transforming how students interact with course materials</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-12 bg-white sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Values</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                These core principles guide everything we do at Databotics
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="relative p-6 bg-white border border-gray-100 rounded-xl card-shadow text-center">
                <div className="h-12 w-12 mx-auto text-databot-purple mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Accessibility</h3>
                <p className="mt-2 text-base text-gray-500">
                  We believe education should be accessible to all students, regardless of when or where they need help.
                </p>
              </div>
              
              <div className="relative p-6 bg-white border border-gray-100 rounded-xl card-shadow text-center">
                <div className="h-12 w-12 mx-auto text-databot-purple mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Innovation</h3>
                <p className="mt-2 text-base text-gray-500">
                  We continuously push the boundaries of what's possible with AI to create better educational experiences.
                </p>
              </div>
              
              <div className="relative p-6 bg-white border border-gray-100 rounded-xl card-shadow text-center">
                <div className="h-12 w-12 mx-auto text-databot-purple mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Community</h3>
                <p className="mt-2 text-base text-gray-500">
                  We support educators and students as a community, working together to improve learning outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Meet Our Team</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                We're a dedicated group of educators, AI specialists, and technologists
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full overflow-hidden bg-databot-blue opacity-20"></div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Dr. Maya Chen</h3>
                <p className="text-sm text-gray-500">Founder & CEO</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full overflow-hidden bg-databot-purple opacity-20"></div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Alex Johnson</h3>
                <p className="text-sm text-gray-500">CTO & AI Lead</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full overflow-hidden bg-databot-indigo opacity-20"></div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Dr. Sarah Lopez</h3>
                <p className="text-sm text-gray-500">Educational Content Director</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full overflow-hidden bg-databot-blue opacity-20"></div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Marcus Williams</h3>
                <p className="text-sm text-gray-500">Head of Product</p>
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

export default About;
