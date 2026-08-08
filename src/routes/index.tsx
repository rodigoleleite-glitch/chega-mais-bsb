import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { getExperiences } from "@/lib/experiences.functions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { 
  ArrowRight, 
  Users, 
  Calendar, 
  MapPin, 
  Heart, 
  Coffee, 
  Star, 
  Sparkles,
  Quote,
  Camera,
  Music,
  Check
} from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData({
    queryKey: ['experiences'],
    queryFn: () => getExperiences()
  }),
  component: LandingPage,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { data: experiences } = useSuspenseQuery({
    queryKey: ['experiences'],
    queryFn: () => getExperiences()
  });

  const founders = [
    {
      name: "Ana Lu",
      role: "IDEALIZADORA",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
      quote: "O Chega Mais nasceu porque ninguém deveria viver Brasília sozinha."
    },
    {
      name: "Brenda",
      role: "IDEALIZADORA",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
      quote: "Acreditamos que a cidade se torna lar quando criamos laços verdadeiros."
    },
    {
      name: "Clara",
      role: "IDEALIZADORA",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80",
      quote: "Nossa missão é transformar encontros casuais em amizades profundas."
    },
    {
      name: "Hannah",
      role: "IDEALIZADORA",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80",
      quote: "Brasília tem espaços incríveis que ficam ainda melhores com boa companhia."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F8] text-[#1A1A1A] font-sans selection:bg-[#7A3FF2]/20">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#7A3FF2] origin-left z-50" style={{ scaleX }} />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80" 
            alt="Comunidade Chega Mais BSB" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
        </motion.div>
        
        <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold tracking-[0.2em] mb-8 uppercase">
              Bem-vinda ao Chega Mais BSB
            </span>
            <h1 className="text-7xl md:text-9xl font-serif font-bold text-white mb-10 tracking-tighter leading-[0.9]">
              Conexões <br />
              <span className="italic font-light">que transformam.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Onde Brasília deixa de ser apenas uma cidade e passa a ser a sua casa. Encontre sua turma e viva novas experiências.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-[#7A3FF2] text-white rounded-full font-bold text-lg shadow-2xl shadow-[#7A3FF2]/20 hover:bg-[#5E2CCF] transition-all"
              >
                Conhecer Experiências
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                Nossa Comunidade
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Você já sentiu isso? */}
      <section className="py-32 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-[1.1]">
              Você já <br />sentiu isso?
            </motion.h2>
            <div className="space-y-8">
              {[
                "Chegar em Brasília e sentir que falta um lugar pra chamar de seu.",
                "Ter vontade de sair, mas não ter com quem ir.",
                "Sentir que a rotina está engolindo sua vida social.",
                "Querer conhecer pessoas que compartilham seus interesses."
              ].map((text, i) => (
                <motion.div key={i} variants={itemVariants} className="flex gap-4 items-start">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[#7A3FF2]/10 flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-[#7A3FF2]" />
                  </div>
                  <p className="text-xl text-[#5E5E5E]">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl transform rotate-3">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" 
                alt="Conexão Chega Mais" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 aspect-[4/5] w-64 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white transform -rotate-6 hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80" 
                alt="Momento Chega Mais" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Números da Comunidade */}
      <section className="py-32 px-8 bg-[#7A3FF2] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { number: "+300", label: "Mulheres conectadas" },
            { number: "+50", label: "Experiências vividas" },
            { number: "+15", label: "Bairros alcançados" },
            { number: "100%", label: "Conexões reais" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl md:text-6xl font-serif font-bold mb-2">{stat.number}</div>
              <div className="text-white/70 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Próximas Experiências */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">Vem pra <br />próxima?</h2>
              <p className="text-xl text-[#5E5E5E] max-w-lg">Escolha uma experiência e comece a escrever sua nova história em Brasília.</p>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 font-bold text-[#7A3FF2] group"
            >
              Ver todas <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {(experiences || []).slice(0, 3).map((e: any, i: number) => (
              <motion.div 
                key={e.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all border border-black/5"
              >
                <div className="h-72 overflow-hidden relative">
                  <img src={e.image_url || "/placeholder.jpg"} alt={e.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase text-[#7A3FF2] tracking-widest">{e.category}</div>
                </div>
                <div className="p-10">
                  <div className="flex gap-4 text-xs font-bold text-[#5E5E5E] mb-6 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {e.display_date}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {e.location}</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold mb-4">{e.title}</h3>
                  <p className="text-[#5E5E5E] mb-10 h-12">{e.short_description}</p>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    className="w-full py-4 bg-[#FAF9F8] text-[#1A1A1A] rounded-full font-bold text-sm hover:bg-[#7A3FF2] hover:text-white transition-all border border-black/5"
                  >
                    Participar da Experiência
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fundadoras */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">Idealizadoras</h2>
            <p className="text-xl text-[#5E5E5E] max-w-2xl mx-auto">As mentes e os corações por trás do Chega Mais BSB.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {founders.map((founder, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 shadow-lg border border-black/5 relative">
                  <img src={founder.image} alt={founder.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                    <Quote className="text-white/50 mb-4" size={24} />
                    <p className="text-white text-sm italic font-medium">"{founder.quote}"</p>
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-1">{founder.name}</h3>
                <p className="text-[#7A3FF2] font-bold text-xs uppercase tracking-widest">{founder.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="py-32 px-8 bg-[#FAF9F8] text-center border-t border-black/5">
        <div className="max-w-4xl mx-auto">
          <Sparkles className="text-[#7A3FF2] mx-auto mb-10" size={48} />
          <h2 className="text-5xl md:text-8xl font-serif font-bold mb-12 tracking-tight leading-[0.9]">
            Chega mais. <br />
            <span className="italic font-light">Estamos te esperando.</span>
          </h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-6 bg-[#7A3FF2] text-white rounded-full font-bold text-xl shadow-2xl shadow-[#7A3FF2]/20 hover:bg-[#5E2CCF] transition-all"
          >
            Fazer parte da comunidade
          </motion.button>
          
          <div className="mt-24 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-serif font-bold text-[#7A3FF2]">Chega Mais BSB</div>
            <div className="flex gap-8 text-sm font-bold text-[#5E5E5E] uppercase tracking-widest">
              <a href="#" className="hover:text-[#7A3FF2] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#7A3FF2] transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-[#7A3FF2] transition-colors">LinkedIn</a>
            </div>
            <div className="text-xs font-bold text-[#5E5E5E] uppercase tracking-widest">© 2024 Chega Mais BSB</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
