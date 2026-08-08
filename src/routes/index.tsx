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
      <section className="relative h-[90vh] w-full flex flex-col justify-center items-center px-4">
        <div className="absolute inset-0 bg-[#F5F3F0] -z-10" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1] text-[#2D2926]">Você não precisa viver Brasília sozinha.</h1>
          <p className="text-lg md:text-2xl text-[#666] mb-12 leading-relaxed font-light">
            Existem mulheres como você procurando novas amizades, novas experiências e um lugar onde possam simplesmente chegar como são.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-[#2D2926] text-white rounded-full hover:bg-black transition-all">
              Conheça as próximas experiências
            </button>
            <button className="px-8 py-4 border border-[#2D2926] text-[#2D2926] rounded-full hover:bg-[#2D2926]/5 transition-all">
              Nossa história
            </button>
          </div>
        </motion.div>
      </section>

      {/* Quem Somos */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-6">
            <h2 className="text-4xl md:text-5xl font-serif mb-10 leading-tight">Por trás do Chega Mais existem mulheres. Acima de tudo, existem histórias.</h2>
            <div className="space-y-6 text-[#666] text-lg leading-relaxed font-light">
              <p>Somos quatro mulheres diferentes, com personalidades, sonhos, rotinas e histórias completamente únicas. Mas acreditamos na mesma coisa: ninguém deveria precisar viver tudo sozinha.</p>
              <p>O Chega Mais nasceu para ser um lugar onde mulheres possam chegar exatamente como são. Sem precisar conhecer ninguém. Sem precisar se encaixar. Sem medo de julgamentos.</p>
              <p className="font-medium text-[#4A3D66]">"Chega mais. Vem com a gente."</p>
            </div>
          </div>
          <div className="md:col-span-6 h-[500px] bg-[#E0D7ED] rounded-3xl" />
        </div>
      </section>

      {/* Fundadoras */}
      <section className="py-32 bg-[#FBF9F7]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-serif mb-20 text-center">Conheça as fundadoras</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-[#D1C9DB] rounded-2xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-lg">Fundadora {i}</h3>
                <p className="text-[#666] text-sm mb-2">Cargo</p>
                <p className="text-sm italic opacity-0 group-hover:opacity-100 transition-opacity">"Uma frase pessoal inspiradora sobre conexão."</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-32 px-8 max-w-5xl mx-auto">
        <h2 className="text-4xl font-serif mb-20 text-center">Como funciona</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Escolha uma experiência" },
            { step: "02", title: "Faça sua inscrição" },
            { step: "03", title: "Chegue exatamente como você é" },
            { step: "04", title: "Viva algo novo" }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <span className="block text-4xl font-serif text-[#D1C9DB] mb-4">{item.step}</span>
              <h3 className="font-medium">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>
