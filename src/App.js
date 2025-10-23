import React, { useEffect, useMemo, useState } from "react";
import { Menu, X, Calendar, MapPin, Clock, ArrowRight, CheckCircle, Download } from "lucide-react";
import RegistrationForm from "./components/RegistrationForm";
import Partners from "./components/Partners";
import Footer from "./components/Footer";

export default function GhanaForumWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [status, setStatus] = useState("upcoming"); // upcoming | live | ended

  // Fixed event date time in Africa Casablanca
  const eventStartISO = "2025-11-11T08:30:00+01:00";
  const eventEndISO = "2025-11-13T14:30:00+01:00";

  const eventStart = useMemo(() => new Date(eventStartISO), [eventStartISO]);
  const eventEnd = useMemo(() => new Date(eventEndISO), [eventEndISO]);

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "program", label: "Program" },
    { id: "register", label: "Register" },
  ];

  // Smooth scroll helper
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const fmt = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Countdown
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      if (now < eventStart) {
        const distance = +eventStart - +now;
        setStatus("upcoming");
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / 1000 / 60) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      } else if (now >= eventStart && now <= eventEnd) {
        setStatus("live");
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setStatus("ended");
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [eventStart, eventEnd]);

  // ICS download
  const downloadICS = () => {
    const dtStamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z");
    const dtStart = eventStart.toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z");
    const dtEnd = eventEnd.toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z");

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//GTIF 2025//Ghana Morocco Investment Forum//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:gtif-${dtStamp}@rabat.mfa.gov.gh`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      "SUMMARY:Ghana Trade & Investment Forum 2025",
      "LOCATION:Palais des Congres, Bouregreg, Rabat, Morocco",
      "DESCRIPTION:Strengthening Ghana Morocco Trade, Investment and Tourism Partnership.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "GTIF2025.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-slate-900/95 to-teal-900/95 backdrop-blur-sm border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              aria-label="Go to home"
              onClick={() => scrollTo("home")}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-900">G</div>
              <span className="text-xl font-bold hidden sm:block">Ghana Forum</span>
            </button>

            <div className="hidden md:flex space-x-8">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="hover:text-amber-400 transition duration-300 font-medium"
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={downloadICS}
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold border border-amber-400/60 px-3 py-2 rounded-lg hover:bg-amber-500/10"
              >
                <Download size={16} /> Add to Calendar
              </button>
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="md:hidden text-white"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="block w-full text-left px-4 py-2 hover:bg-teal-600/50 rounded transition"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <header id="home" className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Ghana <span className="text-amber-400">Trade &</span> <span className="text-teal-300">Investment</span> Forum
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                Strengthening Ghana Morocco Trade, Investment and Tourism Partnership for Sustainable Growth
              </p>

              <div className="bg-gradient-to-r from-amber-500/20 to-teal-500/20 border border-amber-400/50 rounded-xl p-6 mb-6">
                {status === "upcoming" && (
                  <>
                    <p className="text-sm font-semibold text-amber-300 mb-3 uppercase">Event Starts In</p>
                    <div className="grid grid-cols-4 gap-3">
                      {[{ v: countdown.days, t: "DAYS", c: "text-amber-400" }, { v: countdown.hours, t: "HOURS", c: "text-teal-300" }, { v: countdown.minutes, t: "MINS", c: "text-amber-400" }, { v: countdown.seconds, t: "SECS", c: "text-teal-300" }].map((b, i) => (
                        <div key={i} className="bg-slate-900/80 rounded-lg p-3 text-center">
                          <div className={`text-3xl font-bold ${b.c}`}>{String(b.v).padStart(2, "0")}</div>
                          <div className="text-xs text-slate-400 mt-1">{b.t}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {status === "live" && (
                  <div className="flex items-center gap-3 text-green-400 font-semibold">
                    <span className="inline-flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    Live now • {fmt.format(eventStart)} to {fmt.format(eventEnd)} (Africa Casablanca)
                  </div>
                )}
                {status === "ended" && (
                  <div className="text-slate-300 font-medium">This event has ended. Thank you for your interest.</div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollTo("register")}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 flex items-center justify-center"
                >
                  Register Now
                  <ArrowRight className="ml-2" size={20} />
                </button>

                <button
                  onClick={() => scrollTo("about")}
                  className="border-2 border-teal-400 hover:bg-teal-400/10 text-white font-bold py-4 px-8 rounded-lg transition"
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-amber-500 to-teal-500 rounded-2xl opacity-20 absolute" />
                <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-teal-500/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌍</div>
                    <p className="text-teal-300 font-bold">Ghana Morocco Partnership</p>
                    <p className="text-slate-400 text-sm mt-2">Palais des Congres • Bouregreg • Rabat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Event details */}
      <section aria-labelledby="details" className="py-16 px-4 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 id="details" className="sr-only">Event details</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-teal-600/20 to-slate-900/50 p-8 rounded-xl border border-teal-500/20 hover:border-teal-400/50 transition">
              <Calendar className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Event Dates</h3>
              <p className="text-slate-300">November 11 to 13, 2025</p>
              <p className="text-sm text-slate-400 mt-2">Three Days of Impact</p>
            </div>

            <div className="bg-gradient-to-br from-amber-600/20 to-slate-900/50 p-8 rounded-xl border border-amber-500/20 hover:border-amber-400/50 transition">
              <Clock className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Schedule</h3>
              <p className="text-slate-300">08:30 to 14:30 daily</p>
              <p className="text-sm text-slate-400 mt-2">Africa Casablanca</p>
            </div>

            <div className="bg-gradient-to-br from-teal-600/20 to-slate-900/50 p-8 rounded-xl border border-teal-500/20 hover:border-teal-400/50 transition">
              <MapPin className="text-amber-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-slate-300">Palais des Congres</p>
              <p className="text-sm text-slate-400 mt-2">Bouregreg, Rabat, Morocco</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <main id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Key Focus Areas</h2>
          <p className="text-center text-slate-300 mb-12 text-lg">Explore the sectors driving sustainable growth</p>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { icon: "🏆", title: "Mining & Resources", desc: "Gold, minerals & extraction" },
              { icon: "🏢", title: "Real Estate", desc: "Development & infrastructure" },
              { icon: "🌱", title: "Agriculture", desc: "Sustainable farming & exports" },
              { icon: "🧪", title: "Pharmaceuticals", desc: "Pharmaceutical investments" },
              { icon: "⚙️", title: "Manufacturing", desc: "Industrial innovation" },
            ].map((area, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-teal-600/10 to-amber-600/10 p-6 rounded-xl border border-teal-500/20 hover:border-amber-400/50 transition transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4" aria-hidden>{area.icon}</div>
                <h3 className="text-lg font-bold mb-2">{area.title}</h3>
                <p className="text-sm text-slate-300">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Program */}
      <section id="program" className="py-20 px-4 bg-gradient-to-r from-slate-800/50 to-teal-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center">Program Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                day: "Day 1 • Tue, Nov 11",
                items: [
                  "Opening Ceremony & Keynotes",
                  "Panel: Ghana Morocco Trade Outlook",
                  "Exhibition Tour",
                ],
              },
              {
                day: "Day 2 • Wed, Nov 12",
                items: [
                  "Sector Roundtables (Mining, Agri, Pharma)",
                  "B2B Matchmaking",
                  "Tourism Showcase",
                ],
              },
              {
                day: "Day 3 • Thu, Nov 13",
                items: [
                  "Startup Pitch Arena",
                  "Financing Instruments Workshop",
                  "Closing & Next Steps",
                ],
              },
            ].map((d, i) => (
              <div key={i} className="p-6 rounded-xl border border-teal-500/30 bg-slate-900/50">
                <h3 className="font-semibold text-amber-300 mb-4">{d.day}</h3>
                <ul className="space-y-2 text-slate-300">
                  {d.items.map((it, k) => (
                    <li key={k} className="flex items-start gap-2">
                      <CheckCircle size={16} className="mt-1 text-teal-300" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "200+", label: "Expected Attendees" },
              { stat: "15+", label: "Speakers" },
              { stat: "3", label: "Days" },
              { stat: "25+", label: "Exhibitors" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-4xl font-bold text-amber-400 mb-2">{item.stat}</div>
                <p className="text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Register Today</h2>
          <p className="text-center text-slate-300 mb-12">Join hundreds of business leaders, investors, and entrepreneurs</p>

          <RegistrationForm />
        </div>
      </section>

      {/* Partners */}
      <Partners />

      {/* Footer */}
      <Footer />
      
    </div>
  );
}
