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
    <div className="min-h-screen bg-[#FCFBF8] text-[#2D2926]">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-white/50 border-b border-black/5 transition-all">
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
      <section className="relative h-screen w-full flex flex-col justify-center items-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={communityAsset.url} alt="Comunidade" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl text-white"
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1]">Você não precisa viver Brasília sozinha.</h1>
          <p className="text-lg md:text-2xl mb-12 leading-relaxed font-light opacity-90">
            Existem mulheres como você procurando novas amizades, novas experiências e um lugar onde possam simplesmente chegar como são.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-[#2D2926] rounded-full hover:bg-white/90 transition-all font-medium">
              Conheça as próximas experiências
            </button>
            <button className="px-8 py-4 border border-white text-white rounded-full hover:bg-white/10 transition-all font-medium">
              Nossa história
            </button>
          </div>
        </motion.div>
      </section>

      {/* Identificação */}
      <section className="py-32 bg-[#FBF9F7] px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-12">Talvez você esteja procurando exatamente isso.</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
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
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white border border-black/5 rounded-2xl shadow-sm"
              >
                <p className="font-medium text-[#4A3D66]">{text}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-16 text-xl font-light text-[#666]">"Se alguma dessas frases falou com você, talvez o Chega Mais seja o lugar certo."</p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-6">
            <h2 className="text-4xl md:text-5xl font-serif mb-10 leading-tight">Por trás do Chega Mais existem mulheres. Acima de tudo, existem histórias.</h2>
            <div className="space-y-6 text-[#666] text-lg leading-relaxed font-light">
              <p>Somos quatro mulheres diferentes, com personalidades, sonhos, rotinas e histórias únicas. Mas acreditamos na mesma coisa: ninguém deveria precisar viver tudo sozinha.</p>
              <p>O Chega Mais nasceu para ser um lugar onde mulheres possam chegar exatamente como são. Sem precisar conhecer ninguém. Sem precisar se encaixar. Sem medo de julgamentos.</p>
              <p className="font-medium text-[#4A3D66] text-xl">"Chega mais. Vem com a gente."</p>
            </div>
          </div>
          <div className="md:col-span-6">
            <img src={portraitAsset.url} alt="Fundadoras" className="rounded-3xl shadow-lg w-full h-[500px] object-cover" />
          </div>
        </div>
      </section>

      {/* Bloque Impacto */}
      <section className="py-32 bg-[#4A3D66] text-white px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight italic">"Não é sobre o evento. É sobre o que acontece depois dele."</h2>
          <p className="text-xl font-light opacity-90">As melhores amizades geralmente começam quando alguém decide aceitar um convite.</p>
        </div>
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
