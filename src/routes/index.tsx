import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import workshopAsset from "@/assets/workshop_table.jpg.asset.json";
import communityAsset from "@/assets/community_group.jpg.asset.json";
import smilingAsset from "@/assets/group_smiling.jpg.asset.json";
import portraitAsset from "@/assets/group_portrait.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);

  return (
    <div className="min-h-screen bg-[#FAF8F6] text-[#2D2926] font-sans selection:bg-[#4A3D66] selection:text-white">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-500 ${isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/5 py-4" : "bg-transparent text-white"}`}>
        <span className="text-3xl font-serif">Chega Mais BSB</span>
        <div className="hidden md:flex items-center gap-10">
          {["Sobre", "Experiências", "Comunidade"].map((item) => (
            <a key={item} href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">
              {item}
            </a>
          ))}
          <button className={`text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 ${isScrolled ? "bg-[#4A3D66] text-white hover:bg-[#3d3356]" : "bg-white text-[#2D2926] hover:bg-white/90"}`}>
            Ver experiências
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen w-full flex flex-col justify-center items-center px-4 overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          <img src={communityAsset.url} alt="Comunidade" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center max-w-5xl text-white px-4"
        >
          <h1 className="text-6xl md:text-9xl font-serif mb-8 leading-[0.9] tracking-tight">Você não precisa viver Brasília sozinha.</h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-light opacity-90 max-w-2xl mx-auto">
            Existem mulheres como você procurando novas amizades, novas experiências e um lugar onde possam simplesmente chegar como são.
          </p>
          <div className="flex flex-col md:flex-row gap-5 justify-center">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-white text-[#2D2926] rounded-full transition-all font-medium text-lg shadow-xl shadow-black/10"
            >
              Conheça as próximas experiências
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 border border-white/40 backdrop-blur-sm text-white rounded-full hover:bg-white/10 transition-all font-medium text-lg"
            >
              Nossa história
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Seção 1: Talvez você esteja procurando exatamente isso */}
      <section className="py-40 bg-[#FAF8F6] px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif text-center mb-24 max-w-3xl mx-auto leading-tight"
          >
            Talvez você esteja procurando exatamente isso.
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Conhecer pessoas novas sem pressão.", icon: "✨" },
              { title: "Ter um motivo para sair da rotina.", icon: "🌸" },
              { title: "Fazer algo diferente sem precisar ir sozinha.", icon: "🤝" },
              { title: "Encontrar um lugar onde você possa simplesmente ser você.", icon: "💜" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ y: -12 }}
                className="p-10 bg-white border border-black/5 rounded-[2.5rem] shadow-[0_10px_50px_rgba(0,0,0,0.03)] group transition-all duration-500"
              >
                <div className="w-16 h-16 bg-[#F3F0EE] rounded-2xl mb-8 flex items-center justify-center text-3xl group-hover:bg-[#4A3D66] group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <p className="font-medium text-[#2D2926] text-xl leading-snug">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 2: Nossa História */}
      <section className="py-40 px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-[1.1] tracking-tight text-[#2D2926]">Por trás do Chega Mais existem mulheres. Acima de tudo, existem histórias.</h2>
            <div className="space-y-8 text-[#666] text-xl leading-relaxed font-light">
              <p>Somos quatro mulheres diferentes, com personalidades, sonhos, rotinas e histórias únicas. Mas acreditamos na mesma coisa: ninguém deveria precisar viver tudo sozinha.</p>
              <p>O Chega Mais nasceu para ser um lugar onde mulheres possam chegar exatamente como são. Sem precisar conhecer ninguém. Sem precisar se encaixar. Sem medo de julgamentos.</p>
              <div className="pt-6 relative">
                <span className="text-5xl font-serif italic text-[#4A3D66]/10 absolute -top-4 -left-4">"</span>
                <p className="font-serif italic text-[#4A3D66] text-3xl">Chega mais. Vem com a gente.</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 order-1 lg:order-2 relative"
          >
            <div className="absolute -inset-4 border border-[#4A3D66]/10 rounded-[3rem] -z-10" />
            <img src={portraitAsset.url} alt="Fundadoras" className="rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] w-full aspect-[4/5] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Seção Fundadoras */}
      <section className="py-40 bg-white px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-24">Conheça as Fundadoras</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Clarissa", role: "Idealizadora", phrase: "Comunidade é sobre pertencimento.", img: smilingAsset.url },
              { name: "Beatriz", role: "Experiências", phrase: "Grandes amizades começam com um 'oi'.", img: portraitAsset.url },
              { name: "Mariana", role: "Comunidade", phrase: "Todo mundo merece se sentir acolhida.", img: workshopAsset.url },
              { name: "Juliana", role: "Curadoria", phrase: "Ninguém deveria enfrentar tudo sozinha.", img: communityAsset.url }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] mb-6">
                  <img src={f.img} alt={f.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <p className="text-white font-serif italic text-lg">{f.phrase}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-[#2D2926]">{f.name}</h3>
                <p className="text-[#666] text-sm font-medium uppercase tracking-widest mt-1">{f.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Impacto */}
      <section className="py-48 bg-[#4A3D66] text-white px-8 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 opacity-20"
        >
          <img src={workshopAsset.url} className="w-full h-full object-cover grayscale" />
        </motion.div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-serif mb-10 leading-[0.95] tracking-tight"
          >
            Não é sobre o evento. É sobre o que acontece depois dele.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-light opacity-90 max-w-2xl mx-auto italic"
          >
            As melhores amizades geralmente começam quando alguém decide aceitar um convite.
          </motion.p>
        </div>
      </section>

      {/* Seção Diferenciais */}
      <section className="py-40 bg-[#FAF8F6] px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            {[
              { title: "Comunidade", desc: "Você não participa de um evento. Você entra para uma comunidade.", icon: "✨" },
              { title: "Conexões Reais", desc: "Aqui as conversas continuam muito depois do evento terminar.", icon: "🤝" },
              { title: "Ambiente Seguro", desc: "Ninguém precisa chegar acompanhada. Você sempre terá companhia.", icon: "💜" },
              { title: "Novas Experiências", desc: "Cada encontro é uma oportunidade cuidadosamente curada de viver algo novo.", icon: "🌸" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 group"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl shadow-sm border border-black/5 group-hover:bg-[#4A3D66] group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-serif mb-3">{item.title}</h3>
                  <p className="text-xl text-[#666] font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-40 bg-white px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-32">Como Funciona</h2>
          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="absolute top-10 left-0 right-0 h-px bg-black/5 hidden md:block" />
            {[
              { step: "01", title: "Escolha uma experiência", desc: "Navegue pela nossa agenda e encontre o que mais combina com você." },
              { step: "02", title: "Faça sua inscrição", desc: "Garante sua vaga em poucos cliques. Sem burocracia, sem estresse." },
              { step: "03", title: "Chegue como você é", desc: "Não se preocupe em não conhecer ninguém. Você será acolhida." },
              { step: "04", title: "Viva algo novo", desc: "Aproveite a experiência e inicie novas conexões genuínas." }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative text-center pt-20"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#FAF8F6] border-2 border-[#4A3D66] rounded-full flex items-center justify-center text-2xl font-serif text-[#4A3D66] z-10 shadow-lg shadow-[#4A3D66]/10">
                  {s.step}
                </div>
                <h4 className="text-2xl font-serif mb-4">{s.title}</h4>
                <p className="text-[#666] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-40 px-8">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[3rem] bg-[#2D2926] text-white p-20 text-center">
          <div className="absolute inset-0 opacity-30 grayscale blur-sm">
            <img src={smilingAsset.url} className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">O próximo sorriso dessa comunidade pode ser o seu.</h2>
            <p className="text-2xl font-light opacity-80 mb-12">Você não precisa chegar acompanhada. Você só precisa chegar.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-[#4A3D66] text-white rounded-full font-medium text-xl shadow-2xl"
            >
              Conheça as próximas experiências
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-8 bg-[#FAF8F6] border-t border-black/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <span className="text-4xl font-serif block mb-8">Chega Mais BSB</span>
            <p className="text-[#666] text-lg font-light max-w-sm">Uma comunidade feminina em Brasília focada em conexões reais, experiências únicas e pertencimento.</p>
          </div>
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-8">Navegação</h5>
            <ul className="space-y-4 text-[#666]">
              <li><a href="#" className="hover:text-[#4A3D66] transition-colors">Sobre</a></li>
              <li><a href="#" className="hover:text-[#4A3D66] transition-colors">Experiências</a></li>
              <li><a href="#" className="hover:text-[#4A3D66] transition-colors">Comunidade</a></li>
              <li><a href="#" className="hover:text-[#4A3D66] transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-8">Redes Sociais</h5>
            <ul className="space-y-4 text-[#666]">
              <li><a href="#" className="hover:text-[#4A3D66] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#4A3D66] transition-colors">WhatsApp</a></li>
              <li><a href="#" className="hover:text-[#4A3D66] transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[#4A3D66] transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[#999] text-sm pt-8 border-t border-black/5">
          <p>© 2026 Chega Mais BSB. Todos os direitos reservados.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#">Privacidade</a>
            <a href="#">Termos de Uso</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
