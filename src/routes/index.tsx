import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#2D2926]">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-white/50 border-b border-black/5">
        <span className="text-xl font-medium tracking-tight">Chega Mais BSB</span>
        <div className="flex gap-8">
          {["Sobre", "Experiências", "Comunidade"].map((item) => (
            <a key={item} href="#" className="text-sm font-medium hover:text-[#7D5BA6] transition-colors">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center px-4 pt-20">
        <div className="absolute inset-0 bg-[#E0D7ED] opacity-30" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-[1.1]">Você não precisa viver Brasília sozinha.</h1>
          <p className="text-lg md:text-xl text-[#666] mb-10 leading-relaxed">
            Existem mulheres como você procurando novas amizades, novas experiências e um lugar onde possam simplesmente chegar como são.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-[#4A3D66] text-white rounded-full hover:bg-[#352D48] transition-all">
              Conheça as próximas experiências
            </button>
            <button className="px-8 py-4 border border-[#4A3D66] text-[#4A3D66] rounded-full hover:bg-[#4A3D66]/5 transition-all">
              Nossa história
            </button>
          </div>
        </motion.div>
      </section>

      {/* Quem Somos */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif mb-16 text-center">Por trás do Chega Mais existem mulheres. Acima de tudo, existem histórias.</h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] bg-[#D1C9DB] rounded-2xl overflow-hidden" />
          <div className="space-y-6 text-[#666] leading-relaxed">
            <p>Somos quatro mulheres diferentes, com personalidades, sonhos, rotinas e histórias completamente únicas.</p>
            <p className="text-[#4A3D66] font-semibold text-lg">Mas acreditamos na mesma coisa: ninguém deveria precisar viver tudo sozinha.</p>
            <p>O Chega Mais nasceu para ser um lugar onde mulheres possam chegar exatamente como são. Sem precisar conhecer ninguém. Sem precisar se encaixar. Sem medo de julgamentos.</p>
            <p className="italic">"Chega mais. Vem com a gente."</p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 bg-[#F5F3F0]">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-serif mb-16">Você também já sentiu isso?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Quero conhecer pessoas novas.",
              "Minha rotina ficou repetitiva.",
              "Tenho vontade de fazer algo diferente.",
              "Quero um lugar onde eu possa simplesmente chegar."
            ].map((text, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-white rounded-xl shadow-sm border border-black/5"
              >
                <p className="font-medium text-[#4A3D66]">{text}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-16 text-lg font-medium">Se alguma dessas frases fez sentido para você, talvez tenha encontrado o seu lugar.</p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-[#4A3D66] text-white text-center px-8">
        <h2 className="text-5xl font-serif mb-6">O próximo sorriso dessa comunidade pode ser o seu.</h2>
        <button className="mt-10 px-10 py-4 bg-white text-[#4A3D66] rounded-full hover:bg-white/90 transition-all font-medium">
          Conheça as próximas experiências
        </button>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-[#999] text-sm">
        <p>© 2026 Chega Mais BSB. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
