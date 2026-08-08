import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import workshopAsset from "@/assets/workshop_table.jpg.asset.json";
import communityAsset from "@/assets/community_group.jpg.asset.json";
import smilingAsset from "@/assets/group_smiling.jpg.asset.json";
import portraitAsset from "@/assets/group_portrait.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#FAF8F6] text-[#2D2926] font-sans">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-300">
        <span className="text-2xl font-serif">Chega Mais BSB</span>
        <div className="flex gap-8">
          {["Sobre", "Experiências", "Comunidade"].map((item) => (
            <a key={item} href="#" className="text-sm font-medium hover:text-[#4A3D66] transition-colors">
              {item}
            </a>
          ))}
          <button className="text-sm font-medium bg-[#4A3D66] text-white px-5 py-2 rounded-full hover:bg-[#3d3356] transition-all">
            Ver experiências
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={communityAsset.url} alt="Comunidade" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl text-white"
        >
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[1]">Você não precisa viver Brasília sozinha.</h1>
          <p className="text-xl md:text-2xl mb-12 leading-relaxed font-light opacity-90 max-w-2xl mx-auto">
            Existem mulheres como você procurando novas amizades, novas experiências e um lugar onde possam simplesmente chegar como são.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-[#2D2926] rounded-full hover:bg-white/90 transition-all font-medium text-lg">
              Conheça as próximas experiências
            </button>
            <button className="px-10 py-4 border border-white text-white rounded-full hover:bg-white/10 transition-all font-medium text-lg">
              Nossa história
            </button>
          </div>
        </motion.div>
      </section>

      {/* Seção 1: Identificação */}
      <section className="py-32 bg-[#FAF8F6] px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-20">Talvez você esteja procurando exatamente isso.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Conhecer pessoas novas sem pressão.", 
              "Ter um motivo para sair da rotina.", 
              "Fazer algo diferente sem precisar ir sozinha.", 
              "Encontrar um lugar onde você possa simplesmente ser você."
            ].map((text, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 bg-white border border-black/5 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-[#F3F0EE] rounded-full mb-6 flex items-center justify-center text-[#4A3D66] font-serif text-xl">✓</div>
                <p className="font-medium text-[#2D2926] text-lg">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 2: Nossa História */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-6">
            <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-[1.1]">Por trás do Chega Mais existem mulheres. Acima de tudo, existem histórias.</h2>
            <div className="space-y-6 text-[#666] text-lg leading-relaxed font-light">
              <p>Somos quatro mulheres diferentes, com personalidades, sonhos, rotinas e histórias únicas. Mas acreditamos na mesma coisa: ninguém deveria precisar viver tudo sozinha.</p>
              <p>O Chega Mais nasceu para ser um lugar onde mulheres possam chegar exatamente como são. Sem precisar conhecer ninguém. Sem precisar se encaixar. Sem medo de julgamentos.</p>
              <p className="font-medium text-[#4A3D66] text-2xl pt-6">"Chega mais. Vem com a gente."</p>
            </div>
          </div>
          <div className="md:col-span-6 relative">
            <img src={portraitAsset.url} alt="Fundadoras" className="rounded-[2rem] shadow-2xl w-full h-[600px] object-cover" />
          </div>
        </div>
      </section>

      {/* Seção Impacto */}
      <section className="py-32 bg-[#4A3D66] text-white px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-serif mb-8 leading-[1] italic">"Não é sobre o evento. É sobre o que acontece depois dele."</h2>
          <p className="text-2xl font-light opacity-90">As melhores amizades geralmente começam quando alguém decide aceitar um convite.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 bg-[#FAF8F6] border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[#666] text-sm gap-8">
          <p className="font-serif text-xl text-[#2D2926]">Chega Mais BSB</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#4A3D66]">Instagram</a>
            <a href="#" className="hover:text-[#4A3D66]">WhatsApp</a>
            <a href="#" className="hover:text-[#4A3D66]">Email</a>
          </div>
          <p>© 2026 Chega Mais BSB.</p>
        </div>
      </footer>
    </div>
  );
}
