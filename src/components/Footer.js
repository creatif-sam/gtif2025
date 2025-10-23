// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900/80 border-t border-teal-500/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4 text-amber-400">Contact</h4>
            <p className="text-slate-400 text-sm">Ghana Embassy, Morocco</p>
            <p className="text-slate-400 text-sm">
              Email:{" "}
              <a
                className="underline hover:text-amber-300"
                href="mailto:rabat@mfa.gov.gh"
              >
                rabat@mfa.gov.gh
              </a>
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-amber-400">Follow Us</h4>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-slate-400 hover:text-amber-400 transition" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition" aria-label="Twitter/X">
                Twitter
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition" aria-label="LinkedIn">
                LinkedIn
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-amber-400">Quick Links</h4>
            <a
              href="https://rabat.mfa.gov.gh/gtif2025"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 text-sm underline hover:text-amber-300"
            >
              rabat.mfa.gov.gh/gtif2025
            </a>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Ghana Trade & Investment Forum. All rights reserved.</p>
          <p className="mt-2">Strengthening Ghana–Morocco Partnership for Sustainable Growth</p>
        </div>
      </div>
    </footer>
  );
}
