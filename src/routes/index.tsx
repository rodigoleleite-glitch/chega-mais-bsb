import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, type Variants } from "framer-motion";
import { Sparkles, Heart, Users, Calendar, ArrowRight, Star, Quote, MapPin, Coffee, Camera, ChevronRight } from "lucide-react";

import logoAsset from "@/assets/logo_purple.jpg.asset.json";
import communityAsset from "@/assets/community_group.jpg.asset.json";
import workshopAsset from "@/assets/workshop_table.jpg.asset.json";
import smilingAsset from "@/assets/group_smiling.jpg.asset.json";
import portraitAsset from "@/assets/group_portrait.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F8] text-[#1A1A1A] font-sans selection:bg-[#7A3FF2] selection:text-white overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#7A3FF2] origin-left z-[60]" style={{ scaleX }} />
      
      {/* Hero */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center px-4 overflow-hidden">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2 }} className="absolute inset-0 z-0">
          <img src={communityAsset.url} alt="Comunidade" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[4px]" />
        </motion.div>
        
        <div className="relative z-10 text-center max-w-5xl text-white px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8">
            <Sparkles size={14} /> Comunidade feminina em Brasília
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-6xl md:text-9xl font-serif font-bold mb-10 leading-[0.85] tracking-tighter">
            Você não precisa viver Brasília sozinha.
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-10 py-4 bg-[#7A3FF2] text-white rounded-full font-bold text-lg hover:bg-[#5E2CCF] transition-all">Quero participar</button>
            <button className="px-10 py-4 border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">Conhecer experiências</button>
          </motion.div>
        </div>
      </section>

      {/* Seção Você Já Sentiu Isso? */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif font-semibold mb-20 text-center tracking-tight">Você já sentiu isso?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Querer sair mas não ter companhia.",
              "Querer conhecer pessoas novas e não saber por onde começar.",
              "Sentir que a rotina ficou pequena demais.",
              "Querer viver algo novo mas acabar adiando.",
              "Procurar um lugar onde possa simplesmente ser você."
            ].map((text, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 p-6 bg-[#FAF9F8] rounded-2xl">
                <div className="text-[#7A3FF2] font-bold text-lg">✓</div>
                <p className="text-lg font-medium">{text}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-2xl font-serif text-center mt-16 font-semibold italic">Se sim, talvez você esteja no lugar certo.</p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-32 px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-serif font-semibold mb-8">Por trás do Chega Mais existem mulheres.</h2>
          <p className="text-lg leading-relaxed text-[#5E5E5E] mb-6 italic border-l-4 border-[#7A3FF2]/20 pl-6">Somos quatro mulheres diferentes, com personalidades, sonhos e rotinas únicas. Mas acreditamos na mesma coisa: ninguém deveria precisar viver tudo sozinha.</p>
          <p className="text-lg leading-relaxed text-[#5E5E5E] mb-8">O Chega Mais nasceu para ser um lugar onde mulheres possam chegar exatamente como são.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
          <img src={portraitAsset.url} alt="Fundadoras" className="rounded-3xl shadow-2xl transition-all duration-700 hover:scale-[1.02]" />
        </motion.div>
      </section>

      {/* Outras seções permanecem... */}
      <footer className="py-20 text-center text-[#5E5E5E]">© 2026 Chega Mais BSB</footer>
    </div>
  );
}
