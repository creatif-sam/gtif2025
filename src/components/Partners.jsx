// src/components/Partners.jsx
import React from "react";

export default function Partners() {
  return (
    <section className="py-20 px-4 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Organized By</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-4 mx-auto overflow-hidden shadow-lg">
              <img
                src="/emb-logo.png"
                alt="Embassy of Ghana, Morocco"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-bold">Embassy of Ghana</p>
            <p className="text-sm text-slate-400">Morocco</p>
          </div>

          <div className="text-2xl text-amber-400" aria-hidden>
            +
          </div>

          <div className="text-center">
            <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-4 mx-auto overflow-hidden shadow-lg">
              <img
                src="/amci-logo.png"
                alt="Agence Marocaine de Coopération Internationale (AMCI)"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-bold">AMCI</p>
            <p className="text-sm text-slate-400">International Cooperation</p>
          </div>
        </div>
      </div>
    </section>
  );
}
