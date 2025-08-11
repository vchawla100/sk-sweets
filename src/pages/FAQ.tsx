import { motion } from 'framer-motion';
import { ChevronDown, Clock, Gift, HelpCircle, Phone, Search, Shield, Truck } from 'lucide-react';
import { useState } from 'react';

const faqCategories = [
  {
    title: "Ordering & Delivery",
    icon: Truck,
    color: "bg-blue-500",
    questions: [
      {
        question: "How do I place an order?",
        answer: "You can place an order by emailing us, sending a message on WhatsApp, or calling us directly. Our team will be happy to assist you."
      },
      {
        question: "Do you deliver?",
        answer: "Yes, we deliver to major cities of Ontario and can arrange for deliveries outside of Ontario as well."
      },
      {
        question: "Do you charge for delivery?",
        answer: "Our delivery is free. *Conditions apply."
      },
      {
        question: "If I place order today, when I can get the delivery?",
        answer: "Delivery times depend on your location. You may receive your order the very next day, or it may take up to one week."
      },
      {
        question: "When should I place my orders?",
        answer: "We recommend placing your orders at least 3 days in advance. During festival seasons, please place your order 1-2 weeks in advance to ensure timely delivery."
      }
    ]
  },
  {
    title: "General Information",
    icon: Gift,
    color: "bg-orange-500",
    questions: [
      {
        question: "Do you retail?",
        answer: "No, we are a B2B wholesale business only."
      }
    ]
  }
];

const contactInfo = [
  {
    icon: Phone,
    title: "For all other queries, please connect with our team specialist.",
    detail: "873-688-1013",
    description: "Available 9 AM - 8 PM"
  },
  {
    icon: Clock,
    title: "Visit Us",
    detail: "22 EVERGREEN COURT, BELLEVILLE,ON K8N 0A1, CANADA🍁",
    description: "Open Daily 10 AM - 8 PM"
  }
];

export default function FAQSection() {
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleCategory = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="pt-16 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Hero Section with Background Image */}
      <section className="relative py-2 px-4 mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-secondary-900/80"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/assets/Hero_Sweets_2.png')" }}
        ></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              How Can We Help You?
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Find answers to common FAQs about our sweets, ordering process, delivery, and more.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid gap-8">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(categoryIndex)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${category.color} text-white`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                    <p className="text-gray-600">{category.questions.length} questions</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                    openCategory === categoryIndex ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Category Questions */}
              {openCategory === categoryIndex && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100"
                >
                  {category.questions.map((faq, questionIndex) => (
                    <div key={questionIndex} className="border-b border-gray-100 last:border-b-0">
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                            openQuestions[`${categoryIndex}-${questionIndex}`] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openQuestions[`${categoryIndex}-${questionIndex}`] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6 text-gray-600 leading-relaxed"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-orange-100 text-lg">
              Our team is here to help you with any questions or concerns.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-full">
                  <info.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{info.title}</h3>
                  <p className="text-orange-100 font-medium">{info.detail}</p>
                  <p className="text-orange-200 text-sm">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
