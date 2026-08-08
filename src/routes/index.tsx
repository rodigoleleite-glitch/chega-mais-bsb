import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Sparkles, Heart, Users, Calendar, ArrowRight, Star, Quote, MapPin, Coffee, Camera, Music, ChevronRight } from "lucide-react";

import logoAsset from "@/assets/logo_purple.jpg.asset.json";
import communityAsset from "@/assets/community_group.jpg.asset.json";
import workshopAsset from "@/assets/workshop_table.jpg.asset.json";
import smilingAsset from "@/assets/group_smiling.jpg.asset.json";
import portraitAsset from "@/assets/group_portrait.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F6] text-[#2D2926] font-sans selection:bg-[#4A3D66] selection:text-white">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-md border-b border-black/5 py-3" : "bg-transparent text-white"}`}>
        <div className="flex items-center gap-2">
            <img src={logoAsset.url} alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="font-serif text-xl font-bold tracking-tight">Chega Mais BSB</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Sobre", "Experiências", "Comunidade"].map((item) => (
            <a key={item} href="#" className="hover:opacity-60 transition-opacity">{item}</a>
          ))}
          <button className={`px-6 py-2 rounded-full font-bold transition-all ${isScrolled ? "bg-[#4A3D66] text-white" : "bg-white text-[#2D2926]"}`}>
            Ver experiências
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={communityAsset.url} alt="Comunidade" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-4xl text-white px-4"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles size={14} /> Comunidade feminina em Brasília
          </div>
          <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-[0.9] tracking-tight">Você não precisa viver Brasília sozinha.</h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-semibold opacity-90 max-w-2xl mx-auto">
            Existem mulheres como você procurando novas amizades, novas experiências e um lugar onde possam simplesmente chegar como são.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-[#4A3D66] text-white rounded-full font-bold text-lg hover:bg-[#3d3356] transition-all">Conheça as próximas experiências</button>
            <button className="px-8 py-3 border border-white/40 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">Nossa história</button>
          </div>
        </motion.div>
      </section>

      {/* Seção Talvez... */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-center mb-16">Talvez você esteja procurando exatamente isso.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Conhecer pessoas novas sem pressão.", icon: Users },
              { title: "Ter um motivo para sair da rotina.", icon: Calendar },
              { title: "Fazer algo diferente sem precisar ir sozinha.", icon: Heart },
              { title: "Um lugar para ser você.", icon: Sparkles }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -10, scale: 1.02 }} className="p-8 bg-white border border-black/5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#FAF8F6] rounded-full mb-6 flex items-center justify-center group-hover:bg-[#4A3D66] group-hover:text-white transition-colors duration-500">
                  <item.icon size={20} />
                </div>
                <p className="font-serif text-xl font-medium leading-snug text-[#2D2926]">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-24 px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl font-serif font-semibold mb-8">Por trás do Chega Mais existem mulheres.</h2>
          <p className="text-lg leading-relaxed text-[#666] mb-6">Somos quatro mulheres diferentes, com personalidades, sonhos e rotinas únicas. Mas acreditamos na mesma coisa: ninguém deveria precisar viver tudo sozinha.</p>
          <p className="text-lg leading-relaxed text-[#666] mb-8">O Chega Mais nasceu para ser um lugar onde mulheres possam chegar exatamente como são.</p>
        </div>
        <img src={portraitAsset.url} alt="Fundadoras" className="rounded-3xl shadow-xl" />
      </section>

      {/* Momentos (Galeria) */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-serif font-semibold mb-6">Momentos Chega Mais</h2>
          <p className="text-[#666]">Um pouco do que acontece em nossa comunidade.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
          <img src={workshopAsset.url} className="rounded-2xl w-full h-64 object-cover" />
          <img src={smilingAsset.url} className="rounded-2xl w-full h-64 object-cover" />
          <img src={portraitAsset.url} className="rounded-2xl w-full h-64 object-cover" />
        </div>
      </section>

      {/* Seção O Que Elas Dizem (Depoimentos) */}
      <section className="py-24 px-8 bg-[#FAF8F6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#4A3D66] font-semibold text-sm uppercase tracking-wider mb-4 block">Depoimentos</span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold">O que elas dizem</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Mariana", text: "O Chega Mais mudou minha percepção de Brasília. Encontrei mulheres incríveis que hoje são minhas melhores amigas." },
              { name: "Beatriz", text: "Eu tinha medo de ir sozinha, mas fui acolhida desde o primeiro minuto. É um ambiente realmente seguro e leve." },
              { name: "Letícia", text: "Cada experiência é única. Não é apenas uma oficina, é um momento de reconexão comigo mesma e com as outras." }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-black/5 relative"
              >
                <Quote className="absolute top-8 right-8 text-[#4A3D66]/10" size={40} />
                <div className="flex gap-1 mb-6 text-[#4A3D66]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg leading-relaxed text-[#4A3D66] mb-8 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#4A3D66]/10 rounded-full flex items-center justify-center font-serif text-[#4A3D66]">
                    {testimonial.name[0]}
                  </div>
                  <span className="font-medium text-[#2D2926]">{testimonial.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Como Funciona (Horizontal Apple Style) */}
      <section className="py-24 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-center mb-20">Como chegar mais.</h2>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-black/10 -translate-y-1/2 hidden lg:block" />
            <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
              {[
                { step: "01", title: "Escolha uma experiência", desc: "Navegue pelo nosso calendário e escolha a que mais combina com você.", icon: Coffee },
                { step: "02", title: "Garanta seu lugar", desc: "As vagas são limitadas para garantir que todas se sintam acolhidas.", icon: Star },
                { step: "03", title: "Chegue como você é", desc: "Não precisa conhecer ninguém. Venha aberta para o novo.", icon: Heart },
                { step: "04", title: "Viva a conexão", desc: "Desfrute do momento e das novas amizades que surgirão.", icon: Sparkles }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-white border-2 border-[#4A3D66] text-[#4A3D66] rounded-full flex items-center justify-center text-xl font-serif mb-8 group-hover:bg-[#4A3D66] group-hover:text-white transition-all duration-500">
                    <item.icon size={24} />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-[#4A3D66] mb-4 uppercase">{item.step}</span>
                  <h3 className="text-xl font-serif mb-4">{item.title}</h3>
                  <p className="text-[#666] leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção Próximas Experiências */}
      <section className="py-24 px-8 bg-[#FAF8F6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-[#4A3D66] font-semibold text-sm uppercase tracking-wider mb-4 block">Calendário</span>
              <h2 className="text-4xl md:text-5xl font-serif font-semibold">Nossas próximas experiências.</h2>
            </div>
            <a href="#" className="flex items-center gap-2 text-[#4A3D66] font-semibold border-b-2 border-[#4A3D66]/20 pb-1 hover:border-[#4A3D66] transition-all">
              Ver calendário completo <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Café & Pintura", 
                date: "24 de Agosto", 
                loc: "Asa Norte", 
                img: workshopAsset.url, 
                tag: "Artes",
                desc: "Uma manhã relaxante para soltar a criatividade." 
              },
              { 
                title: "Trilha & Piquenique", 
                date: "02 de Setembro", 
                loc: "Parque da Cidade", 
                img: smilingAsset.url, 
                tag: "Outdoor",
                desc: "Conexão com a natureza e com novas mulheres." 
              },
              { 
                title: "Workshop de Cerâmica", 
                date: "15 de Setembro", 
                loc: "Lago Sul", 
                img: workshopAsset.url, 
                tag: "Manual",
                desc: "Aprenda o toque do barro em um ambiente acolhedor." 
              }
            ].map((exp, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-black/5 group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={exp.img} alt={exp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 px-4 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-[#4A3D66]">
                    {exp.tag}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs text-[#666] mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {exp.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {exp.loc}</span>
                  </div>
                  <h3 className="text-2xl font-serif mb-4">{exp.title}</h3>
                  <p className="text-[#666] leading-relaxed mb-8">{exp.desc}</p>
                  <button className="w-full py-4 bg-[#4A3D66]/5 text-[#4A3D66] rounded-2xl font-semibold hover:bg-[#4A3D66] hover:text-white transition-all duration-300">
                    Garantir minha vaga
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Faixa de Impacto */}
      <section className="py-24 bg-[#4A3D66] text-white text-center px-8">
          <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-6 leading-tight">Não é sobre o evento.<br/>É sobre o que acontece depois dele.</h2>
          <p className="text-xl font-light opacity-80 italic max-w-xl mx-auto">As melhores amizades geralmente começam quando alguém decide aceitar um convite.</p>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-8 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 bg-[#FAF8F6] rounded-full flex items-center justify-center mx-auto mb-10">
            <Sparkles className="text-[#4A3D66]" size={32} />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-semibold mb-8 leading-tight">O próximo sorriso dessa comunidade pode ser o seu.</h2>
          <p className="text-xl text-[#666] mb-12 leading-relaxed">Não deixe para depois a conexão que você pode viver hoje. Estamos ansiosas para te conhecer.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-[#4A3D66] text-white rounded-full font-bold text-lg shadow-xl shadow-[#4A3D66]/20 hover:scale-105 transition-all">
              Participar agora
            </button>
            <button className="px-10 py-5 border-2 border-[#4A3D66]/10 text-[#4A3D66] rounded-full font-bold text-lg hover:bg-[#4A3D66]/5 transition-all">
              Falar conosco
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 bg-[#FAF8F6] text-center border-t border-black/5">
        <h3 className="font-serif text-2xl mb-6">Chega Mais BSB</h3>
        <p className="text-[#666] mb-4 text-sm font-light">Uma comunidade feminina em Brasília focada em conexões reais.</p>
        <div className="text-[#999] text-xs">© 2026 Chega Mais BSB. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}
