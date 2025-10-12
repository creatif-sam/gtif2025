import React, { useState } from 'react';
import { Menu, X, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function GhanaForumWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    industry: '',
    message: ''
  });

  React.useEffect(() => {
    const calculateCountdown = () => {
      const eventDate = new Date('2025-11-11T08:30:00').getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / 1000 / 60) % 60),
          seconds: Math.floor((distance / 1000) % 60)
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    alert('Thank you for registering! We will contact you soon.');
    setFormData({
      fullName: '',
      email: '',
      company: '',
      industry: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-slate-900/95 to-teal-900/95 backdrop-blur-sm border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900">G</div>
              <span className="text-xl font-bold hidden sm:block">Ghana Forum</span>
            </div>

            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Program', 'Register'].map((item) => (
                <button
                  key={item}
                  className="hover:text-amber-400 transition duration-300 font-medium"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {['Home', 'About', 'Program', 'Register'].map((item) => (
                <button
                  key={item}
                  className="block w-full text-left px-4 py-2 hover:bg-teal-600/50 rounded transition"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Ghana <span className="text-amber-400">Trade &</span> <span className="text-teal-300">Investment</span> Forum
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Strengthening Ghana-Morocco Trade, Investment and Tourism Partnership for Sustainable Growth
              </p>

              {/* Countdown */}
              <div className="bg-gradient-to-r from-amber-500/20 to-teal-500/20 border border-amber-400/50 rounded-xl p-6 mb-8">
                <p className="text-sm font-semibold text-amber-300 mb-3 uppercase">Event Starts In</p>
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-slate-900/80 rounded-lg p-3 text-center">
                    <div className="text-3xl font-bold text-amber-400">{String(countdown.days).padStart(2, '0')}</div>
                    <div className="text-xs text-slate-400 mt-1">DAYS</div>
                  </div>
                  <div className="bg-slate-900/80 rounded-lg p-3 text-center">
                    <div className="text-3xl font-bold text-teal-300">{String(countdown.hours).padStart(2, '0')}</div>
                    <div className="text-xs text-slate-400 mt-1">HOURS</div>
                  </div>
                  <div className="bg-slate-900/80 rounded-lg p-3 text-center">
                    <div className="text-3xl font-bold text-amber-400">{String(countdown.minutes).padStart(2, '0')}</div>
                    <div className="text-xs text-slate-400 mt-1">MINS</div>
                  </div>
                  <div className="bg-slate-900/80 rounded-lg p-3 text-center">
                    <div className="text-3xl font-bold text-teal-300">{String(countdown.seconds).padStart(2, '0')}</div>
                    <div className="text-xs text-slate-400 mt-1">SECS</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
               <button
  onClick={() => {
    const el = document.getElementById('register');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }}
  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 flex items-center justify-center"
>
  Register Now
  <ArrowRight className="ml-2" size={20} />
</button>

                <button className="border-2 border-teal-400 hover:bg-teal-400/10 text-white font-bold py-4 px-8 rounded-lg transition">
                  Learn More
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-amber-500 to-teal-500 rounded-2xl opacity-20 absolute"></div>
                <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-teal-500/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌍</div>
                    <p className="text-teal-300 font-bold">Global Partnership</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 px-4 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-teal-600/20 to-slate-900/50 p-8 rounded-xl border border-teal-500/20 hover:border-teal-400/50 transition">
              <Calendar className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Event Dates</h3>
              <p className="text-slate-300">November 11-13, 2025</p>
              <p className="text-sm text-slate-400 mt-2">3 Days of Impact</p>
            </div>

            <div className="bg-gradient-to-br from-amber-600/20 to-slate-900/50 p-8 rounded-xl border border-amber-500/20 hover:border-amber-400/50 transition">
              <Clock className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Schedule</h3>
              <p className="text-slate-300">8:30 AM - 2:30 PM Daily</p>
              <p className="text-sm text-slate-400 mt-2">Full Day Sessions</p>
            </div>

            <div className="bg-gradient-to-br from-teal-600/20 to-slate-900/50 p-8 rounded-xl border border-teal-500/20 hover:border-teal-400/50 transition">
              <MapPin className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-slate-300">Palais des Congrès</p>
              <p className="text-sm text-slate-400 mt-2">Bouregreg, Rabat, Morocco</p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Key Focus Areas</h2>
          <p className="text-center text-slate-300 mb-12 text-lg">Explore the sectors driving sustainable growth</p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '🏆', title: 'Mining & Resources', desc: 'Gold, minerals & extraction' },
              { icon: '🏢', title: 'Real Estate', desc: 'Development & infrastructure' },
              { icon: '🌱', title: 'Agriculture', desc: 'Sustainable farming & exports' },
              { icon: '🧪', title: 'Pharmaceuticals', desc: 'Pharmaceutical investments' },
              { icon: '⚙️', title: 'Manufacturing', desc: 'Industrial innovation' }
            ].map((area, idx) => (
              <div key={idx} className="bg-gradient-to-br from-teal-600/10 to-amber-600/10 p-6 rounded-xl border border-teal-500/20 hover:border-amber-400/50 transition transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-lg font-bold mb-2">{area.title}</h3>
                <p className="text-sm text-slate-300">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-800/50 to-teal-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '200+', label: 'Expected Attendees' },
              { stat: '15+', label: 'Speakers' },
              { stat: '3', label: 'Days' },
              { stat: '25+', label: 'Exhibitors' }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-4xl font-bold text-amber-400 mb-2">{item.stat}</div>
                <p className="text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Register Today</h2>
          <p className="text-center text-slate-300 mb-12">Join hundreds of business leaders, investors, and entrepreneurs</p>

          <div className="bg-gradient-to-br from-slate-800/80 to-teal-900/80 p-8 md:p-12 rounded-2xl border border-teal-500/30 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-amber-400 focus:outline-none transition text-white placeholder-slate-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-amber-400 focus:outline-none transition text-white placeholder-slate-400"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-amber-400 focus:outline-none transition text-white placeholder-slate-400"
                />
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-amber-400 focus:outline-none transition text-white"
                >
                  <option value="">Select Industry</option>
                  <option>Mining & Resources</option>
                  <option>Real Estate</option>
                  <option>Agriculture</option>
                  <option>Manufacturing</option>
                  <option>Tourism</option>
                  <option>Other</option>
                </select>
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message or Special Requirements"
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:border-amber-400 focus:outline-none transition text-white placeholder-slate-400"
              ></textarea>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold py-4 rounded-lg transition transform hover:scale-105"
              >
                Complete Registration
              </button>
            </div>
          </div>
        </div>
      </section>

{/* Partners Section */}
<section className="py-20 px-4 bg-slate-800/50">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-12 text-center">Organized By</h2>
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">

      {/* Ghana Embassy */}
      <div className="text-center">
        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-4 mx-auto overflow-hidden shadow-lg">
          <img
            src="/emb-logo.png"
            alt="Embassy of Ghana"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="font-bold">Embassy of Ghana</p>
        <p className="text-sm text-slate-400">Morocco</p>
      </div>

      <div className="text-2xl text-amber-400">+</div>

      {/* AMCI */}
      <div className="text-center">
        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-4 mx-auto overflow-hidden shadow-lg">
          <img
            src="/amci-logo.png"
            alt="AMCI"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="font-bold">AMCI</p>
        <p className="text-sm text-slate-400">International Cooperation</p>
      </div>

    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-teal-500/20 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-amber-400">Contact</h4>
              <p className="text-slate-400 text-sm">Ghana Embassy, Morocco</p>
              <p className="text-slate-400 text-sm">Email:rabat@mfa.gov.gh</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-amber-400">Follow Us</h4>
              <div className="flex space-x-4 text-sm">
                <a href="#" className="text-slate-400 hover:text-amber-400 transition">Facebook</a>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition">Twitter</a>
                <a href="#" className="text-slate-400 hover:text-amber-400 transition">LinkedIn</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-amber-400">Quick Links</h4>
              <p className="text-slate-400 text-sm">www.rabat.mfa.gov.gh/gtif2025</p>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 Ghana Trade & Investment Forum. All rights reserved.</p>
            <p className="mt-2">Strengthening Ghana-Morocco Partnership for Sustainable Growth</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
