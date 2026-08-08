import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Heart, Users, Calendar } from "lucide-react";

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
          <button className={`px-6 py-2 rounded-full transition-all ${isScrolled ? "bg-[#4A3D66] text-white" : "bg-white text-[#2D2926]"}`}>
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
          <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-[0.9] tracking-tight">Você não precisa viver Brasília sozinha.</h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-light opacity-90 max-w-2xl mx-auto">
            Existem mulheres como você procurando novas amizades, novas experiências e um lugar onde possam simplesmente chegar como são.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-[#4A3D66] text-white rounded-full font-medium text-lg hover:bg-[#3d3356] transition-all">Conheça as próximas experiências</button>
            <button className="px-8 py-3 border border-white/40 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all">Nossa história</button>
          </div>
        </motion.div>
      </section>

      {/* Seção Talvez... */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">Talvez você esteja procurando exatamente isso.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Conhecer pessoas novas sem pressão.", icon: Users },
              { title: "Ter um motivo para sair da rotina.", icon: Calendar },
              { title: "Fazer algo diferente sem precisar ir sozinha.", icon: Heart },
              { title: "Um lugar para ser você.", icon: Sparkles }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="p-8 bg-white border border-black/5 rounded-2xl shadow-sm group transition-all"
              >
                <div className="w-12 h-12 bg-[#FAF8F6] rounded-full mb-6 flex items-center justify-center group-hover:bg-[#4A3D66] group-hover:text-white transition-colors duration-500">
                  <item.icon size={20} />
                </div>
                <p className="font-serif text-xl font-medium leading-snug text-[#2D2926]">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Faixa de Impacto */}
      <section className="py-24 bg-[#4A3D66] text-white text-center px-8">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">Não é sobre o evento.<br/>É sobre o que acontece depois dele.</h2>
          <p className="text-xl font-light opacity-80 italic max-w-xl mx-auto">As melhores amizades geralmente começam quando alguém decide aceitar um convite.</p>
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
