
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';

const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  const toggleBilling = () => {
    setAnnual(!annual);
  };

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for trying out Databotics',
      price: {
        monthly: 0,
        annual: 0
      },
      features: [
        'Upload 1 PDF (max 50 pages)',
        '100 student conversations per month',
        'Basic chatbot customization',
        'Email support',
        'Standard response time'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Educator',
      description: 'Ideal for teachers and tutors',
      price: {
        monthly: 29,
        annual: 19
      },
      features: [
        'Upload 5 PDFs (max 200 pages each)',
        '1,000 student conversations per month',
        'Advanced chatbot customization',
        'Basic analytics',
        'Priority email support',
        'Custom branding'
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Institution',
      description: 'For schools, colleges & universities',
      price: {
        monthly: 99,
        annual: 79
      },
      features: [
        'Unlimited PDFs',
        '10,000 student conversations per month',
        'Full customization features',
        'Comprehensive analytics',
        'LMS integration',
        'API access',
        '24/7 priority support',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Pricing Header */}
        <section className="py-12 bg-white sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                Simple, Transparent <span className="gradient-text">Pricing</span>
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
                Choose the plan that's right for you and start transforming your educational materials today.
              </p>
              
              <div className="mt-12">
                <div className="relative self-center rounded-lg bg-gray-100 p-0.5 flex sm:mt-8">
                  <button
                    type="button"
                    onClick={toggleBilling}
                    className={`${
                      annual ? 'bg-white shadow-sm' : 'bg-transparent'
                    } relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 sm:w-auto sm:px-8`}
                  >
                    Annual (Save 35%)
                  </button>
                  <button
                    type="button"
                    onClick={toggleBilling}
                    className={`${
                      !annual ? 'bg-white shadow-sm' : 'bg-transparent'
                    } ml-0.5 relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 sm:w-auto sm:px-8`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Plans */}
        <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative p-8 rounded-2xl ${
                    plan.highlighted 
                      ? 'bg-white border-2 border-databot-purple shadow-xl transform scale-105 z-10' 
                      : 'bg-white border border-gray-200 card-shadow'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 right-6 transform -translate-y-1/2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-databot-purple text-white">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                  
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${annual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="ml-1 text-lg font-medium text-gray-500">
                      /month
                    </span>
                  </div>
                  {annual && plan.price.annual > 0 && (
                    <p className="mt-1 text-sm text-databot-purple">
                      Billed annually (${plan.price.annual * 12}/year)
                    </p>
                  )}
                  
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Button
                      className={`w-full ${
                        plan.highlighted 
                          ? 'gradient-bg' 
                          : 'bg-white border border-databot-purple text-databot-purple hover:bg-gray-50'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 bg-white sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Answers to common questions about Databotics
              </p>
            </div>
            
            <div className="mt-12">
              <dl className="space-y-8">
                <div>
                  <dt className="text-lg font-semibold text-gray-900">How does Databotics work with my existing PDFs?</dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Databotics uses advanced AI to analyze and understand the content of your uploaded PDFs. Our system extracts the information, processes it, and makes it available for students to query through a natural language chatbot interface.
                  </dd>
                </div>
                
                <div>
                  <dt className="text-lg font-semibold text-gray-900">Can I customize how the chatbot responds to students?</dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Yes! You can adjust the tone, depth of responses, and even customize specific answers to common questions. Our platform gives you control over how your chatbot communicates with students.
                  </dd>
                </div>
                
                <div>
                  <dt className="text-lg font-semibold text-gray-900">Is my content secure when uploaded to Databotics?</dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Absolutely. We take data security very seriously. All uploaded content is encrypted, stored securely, and never shared with third parties. You retain full ownership of your materials at all times.
                  </dd>
                </div>
                
                <div>
                  <dt className="text-lg font-semibold text-gray-900">Can I upgrade or downgrade my plan later?</dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Yes, you can change your plan at any time. If you upgrade, the new features will be immediately available. If you downgrade, the changes will take effect at the start of your next billing cycle.
                  </dd>
                </div>
                
                <div>
                  <dt className="text-lg font-semibold text-gray-900">Do you offer discounts for educational institutions?</dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Yes, we offer special pricing for schools, colleges, and universities. Contact our sales team for more information about educational discounts and volume licensing options.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
        
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
