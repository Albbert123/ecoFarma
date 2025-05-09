"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQ } from '@/constants/FAQ';
import { useRouter } from "next/navigation";

export default function FaqForm() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const router = useRouter();
  
    const toggle = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    const handleContactClick = () => {
        router.push('/contact');
    };
  
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-gray-600">
            Encuentra respuestas a las preguntas más comunes
          </p>
        </div>
        
        <div className="space-y-6">
          {FAQ.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-gray-200 rounded-xl p-6 transition-all duration-300 
                ${openIndex === index ? 
                  'bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg border-blue-300' : 
                  'hover:border-blue-200 hover:shadow-md'}`}
            >
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full text-left"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold text-gray-800 sm:text-xl">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-blue-600" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-500" />
                )}
              </button>
              
              {openIndex === index && (
                <div 
                  id={`faq-answer-${index}`}
                  className="mt-4 pl-2 text-gray-600 transition-all duration-300
                    border-l-4 border-blue-400 prose prose-lg max-w-none"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            ¿No encontraste lo que buscabas?
          </p>
          <button 
            onClick={handleContactClick}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Contáctanos
          </button>
        </div>
      </div>
    );
}