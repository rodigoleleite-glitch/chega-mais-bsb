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

      {/* Talvez você esteja procurando exatamente isso */}
      <section className="py-32 bg-[#FBF9F7] px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-12">Talvez você esteja procurando exatamente isso.</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {["Quero conhecer pessoas novas.", "Minha rotina ficou repetitiva.", "Tenho vontade de fazer algo diferente.", "Quero um lugar onde eu possa simplesmente chegar."].map((text, i) => (
              <div key={i} className="p-8 bg-white border border-black/5 rounded-2xl">
                <p className="font-medium text-[#4A3D66]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que torna o Chega Mais diferente? */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif mb-20 text-center">O que torna o Chega Mais diferente?</h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            { title: "Comunidade", desc: "Não somos sobre eventos, somos sobre as pessoas que você encontra neles." },
            { title: "Conexões Reais", desc: "Criamos um ambiente seguro para conversas profundas e amizades duradouras." },
            { title: "Brasília Viva", desc: "Redescubra a cidade através de experiências que fogem do óbvio." }
          ].map((item, i) => (
            <div key={i} className="space-y-4">
              <div className="w-16 h-16 bg-[#E0D7ED] rounded-full mx-auto" />
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="text-[#666] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Não é sobre o evento. */}
      <section className="py-32 bg-[#4A3D66] text-white px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight italic">"Não é sobre o evento. É sobre o que acontece depois dele."</h2>
          <p className="text-xl font-light opacity-90">A verdadeira mágica começa quando as luzes apagam, o evento termina e você percebe que, além da experiência, você ganhou uma nova amiga.</p>
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

      {/* Galeria */}
      <section className="py-32 bg-[#FBF9F7] px-8">
        <h2 className="text-4xl font-serif mb-20 text-center">Momentos Chega Mais</h2>
        <div className="columns-2 md:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="break-inside-avoid bg-[#E0D7ED] rounded-2xl aspect-[3/4] hover:scale-[1.02] transition-transform" />
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-32 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-serif mb-20">O que elas dizem</h2>
        <blockquote className="text-2xl font-serif italic mb-8">"O Chega Mais transformou minha rotina em Brasília. Finalmente encontrei um lugar onde me sinto acolhida."</blockquote>
        <cite className="not-italic font-medium text-[#4A3D66]">— Maria Silva</cite>
      </section>

      {/* Próximas Experiências */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif mb-16 text-center">Próximas Experiências</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/3] bg-[#E0D7ED] rounded-2xl mb-6 overflow-hidden" />
              <p className="text-sm text-[#4A3D66] mb-2 font-medium">Categoria</p>
              <h3 className="text-2xl font-serif mb-2">Título da Experiência {i}</h3>
              <p className="text-[#666] mb-4">Breve descrição atraente sobre o evento.</p>
              <button className="text-sm font-medium border-b border-[#2D2926]">Ver experiência</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-[#2D2926] text-white text-center px-8">
        <h2 className="text-5xl font-serif mb-8">O próximo sorriso dessa comunidade pode ser o seu.</h2>
        <button className="px-10 py-4 bg-white text-[#2D2926] rounded-full hover:bg-white/90 transition-all font-medium">
          Conheça as próximas experiências
        </button>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[#666] text-sm gap-8">
        <p>© 2026 Chega Mais BSB.</p>
        <div className="flex gap-8">
          <a href="#">Instagram</a>
          <a href="#">WhatsApp</a>
          <a href="#">Email</a>
        </div>
      </footer>
    </div>
  );
}
