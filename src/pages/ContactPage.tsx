import { gsap } from 'gsap';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const ContactPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!pageRef.current) return;

    gsap.fromTo('.contact-animate',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Animate form submission
        const form = document.querySelector('.contact-form');
        const success = document.querySelector('.success-message');

        if (form && success) {
          gsap.to(form, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            onComplete: () => {
              setSubmitted(true);
              gsap.fromTo(success,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 }
              );
            }
          });
        }
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div ref={pageRef} className="pt-16 pb-16">
      {/* Header with Background Image */}
      <div className="relative bg-gradient-to-r from-primary-900/80 to-secondary-900/80 mb-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/assets/Hero_Sweets.png')" }}
        ></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="contact-animate text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Get in Touch</h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              Have questions about our sweets or need assistance with your order? We're here to help!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="contact-animate">
            <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <MapPin className="text-primary-500 w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">Visit Us</h3>
                    <p className="text-gray-600">
                      22 EVERGREEN COURT, BELLEVILLE,<br />
                      ON K8N 0A1, CANADA🍁
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Phone className="text-secondary-500 w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-gray-600">
                      <a href="tel:+18736881013" className="hover:text-primary-500 transition-colors">
                        +1 (873) 688-1013
                      </a>
                      <br />
                      <a href="tel:+16472891013" className="hover:text-primary-500 transition-colors">
                        +1 (647) 289-1013
                      </a>



                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Mail className="text-accent-500 w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-gray-600">
                      <a href="mailto:sksweets1013@gmail.com" className="hover:text-primary-500 transition-colors">
                        sksweets1013@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <Clock className="text-gold-500 w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 8:00 PM<br />
                      Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Image */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Location Map"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-animate">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="contact-form bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <input
                      type="telephone"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
                    <Send size={20} />
                    Send Message
                  </button>
                </div>
              </form>
            ) : (
              <div className="success-message bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="text-green-600 w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                <p className="text-gray-600">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;