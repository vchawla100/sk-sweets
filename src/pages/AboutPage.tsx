import { gsap } from 'gsap';
import { Award, History, Leaf, Users } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const AboutPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo('.about-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    ).fromTo('.about-content',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
      '-=0.4'
    );
  }, []);

  return (
    <div ref={pageRef} className="pt-16 pb-16">
      {/* Header with Background Image */}
      <div className="relative bg-gradient-to-r from-primary-900/80 to-secondary-900/80 mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/assets/About_Employees.png')" }}
        ></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="about-header text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Sweet Journey</h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              Discover the story behind SK Sweets and our passion for bringing authentic Indian sweets to your doorstep.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">

        {/* Story Section */}
        <div className="about-content grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="relative">
            <img
              src="/assets/About_Employees.png"
              alt="Our Team"
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl">
              <p className="text-primary-600 font-bold text-3xl">5+</p>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2019, SK Sweets began as a small family-owned sweet shop in the heart of Delhi. Our commitment to authentic recipes and quality ingredients quickly earned us a reputation for excellence in traditional Indian sweets.
            </p>
            <p className="text-gray-600">
              Today, we've grown into a beloved brand that brings the taste of authentic Indian sweets to homes across the country. Our mission remains unchanged: to preserve the rich heritage of Indian sweets while embracing modern convenience through our online and offline platforms.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="about-content bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Award className="text-primary-500 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Quality First</h3>
              <p className="text-gray-600">Premium ingredients and authentic recipes in every sweet we make.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Users className="text-secondary-500 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Family Values</h3>
              <p className="text-gray-600">Treating customers like family, serving with love and care.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <History className="text-accent-500 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Heritage</h3>
              <p className="text-gray-600">Preserving traditional recipes while embracing innovation.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Leaf className="text-gold-500 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Sustainability</h3>
              <p className="text-gray-600">Committed to eco-friendly practices and packaging.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="about-content text-center mb-20">
          <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="team-member">
              <img
                src="/assets/Sanchit-profile.jpg"
                alt="Sanchit Goyal"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Sanchit Goyal</h3>
              <p className="text-gray-600">CEO</p>
            </div>
            <div className="team-member">
              <img
                src="/assets/Sahil-profile.jpeg"
                alt="Sahil Goyal"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Sahil Goyal</h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
            <div className="team-member">
              <img
                src="/assets/Kiran-profile.jpeg"
                alt="Kiran Kaur"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Kiran Kaur</h3>
              <p className="text-gray-600">Quality Control Expert</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;