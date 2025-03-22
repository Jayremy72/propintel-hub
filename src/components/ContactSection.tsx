
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AnimatedCard from './AnimatedCard';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 relative bg-white">
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-gray-50 to-white"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <AnimatedCard>
            <div className="inline-block px-4 py-1.5 rounded-full bg-propradar-100 text-propradar-800 font-medium text-sm mb-4">
              Get In Touch
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact PropRadar
            </h2>
          </AnimatedCard>
          
          <AnimatedCard delay={200}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
              Interested in learning more about PropRadar or exploring investment opportunities? Get in touch with our team.
            </p>
          </AnimatedCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedCard className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="border-gray-200 focus:border-propradar-500 focus:ring-propradar-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="border-gray-200 focus:border-propradar-500 focus:ring-propradar-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="How can we help you?"
                  className="border-gray-200 focus:border-propradar-500 focus:ring-propradar-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message here..."
                  className="min-h-[150px] border-gray-200 focus:border-propradar-500 focus:ring-propradar-500"
                />
              </div>
              
              <Button className="w-full bg-propradar-600 hover:bg-propradar-700 text-white">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </AnimatedCard>
          
          <AnimatedCard delay={200}>
            <div className="space-y-8">
              <div className="bg-propradar-50 rounded-xl p-6 border border-propradar-100">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-propradar-100 flex items-center justify-center mr-4">
                      <Mail className="w-5 h-5 text-propradar-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">info@propradar.co.za</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-propradar-100 flex items-center justify-center mr-4">
                      <Phone className="w-5 h-5 text-propradar-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">+27 21 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-propradar-100 flex items-center justify-center mr-4">
                      <MapPin className="w-5 h-5 text-propradar-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">100 Long Street, Cape Town, 8001, South Africa</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-propradar-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Investor Relations</h3>
                <p className="mb-4 text-propradar-100">
                  Looking to invest in PropRadar? Our team is available to discuss investment opportunities and answer your questions.
                </p>
                <Button className="w-full bg-white text-propradar-800 hover:bg-propradar-50">
                  Schedule a Meeting
                </Button>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">When will PropRadar launch?</h4>
                    <p className="text-sm text-gray-600">
                      We're planning a phased launch starting with our MVP in Q1 2023, with new features rolling out quarterly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">What funding have you secured?</h4>
                    <p className="text-sm text-gray-600">
                      We're currently seeking our initial R8 million investment to complete our MVP and launch to market.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Are you hiring?</h4>
                    <p className="text-sm text-gray-600">
                      Yes! We're building our founding team. Send your CV to careers@propradar.co.za.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
