import { createFileRoute, useParams } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { experiences } from "@/data/experiences";
import { Calendar, MapPin, Check, Camera, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/experiencias/$slug")({
  component: ExperienciaIndividual,
});

function ExperienciaIndividual() {
  const { slug } = useParams({ from: "/experiencias/$slug" });
  const event = experiences.find((e) => e.slug === slug);

  if (!event) return <div>Evento não encontrado.</div>;

  const handleRegister = () => {
    const message = encodeURIComponent(`Olá! Quero participar do evento ${event.title}.`);
    window.open(`https://wa.me/5561999999999?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F8] text-[#1A1A1A] font-sans">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative h-[50vh] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-12">
            <div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 tracking-tight">{event.title}</h1>
              <div className="flex flex-wrap gap-6 text-[#5E5E5E] font-bold uppercase tracking-widest text-sm">
                <span className="flex items-center gap-2"><Calendar size={18} className="text-[#7A3FF2]" /> {event.date}, {event.time}</span>
                <span className="flex items-center gap-2"><MapPin size={18} className="text-[#7A3FF2]" /> {event.location}</span>
              </div>
            </div>
            <button 
              onClick={handleRegister}
              className="mt-8 md:mt-0 px-10 py-5 bg-[#7A3FF2] text-white rounded-full font-bold text-lg hover:bg-[#5E2CCF] transition-all shadow-xl"
            >
              Quero Participar - {event.price}
            </button>
          </div>

          <div className="prose prose-lg max-w-none text-[#5E5E5E]">
            <h2 className="text-3xl font-serif text-[#1A1A1A] mb-6">Sobre a experiência</h2>
            <p className="leading-relaxed text-xl text-[#1A1A1A] mb-12">{event.longDescription}</p>
            
            <div className="bg-white p-12 rounded-[2.5rem] border border-black/5 mb-20">
              <h3 className="text-2xl font-serif font-bold mb-8">O que está incluso</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {event.includes.map((inc, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="text-[#7A3FF2]" /> <span className="font-semibold text-[#1A1A1A]">{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold mb-10">Para quem é</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {event.forWho.map((who, i) => (
                <div key={i} className="bg-[#FAF9F8] p-8 rounded-2xl border border-black/5 font-semibold text-[#1A1A1A]">
                  <Check className="text-[#7A3FF2] mb-4" /> {who}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-8 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <Sparkles className="text-[#7A3FF2] mx-auto mb-10" size={48} />
          <h2 className="text-5xl font-serif font-bold mb-10 tracking-tight">Sua próxima amizade pode começar aqui.</h2>
          <button 
            onClick={handleRegister}
            className="px-12 py-5 bg-[#7A3FF2] text-white rounded-full font-bold text-xl hover:bg-[#5E2CCF] transition-all shadow-2xl"
          >
            Quero Participar
          </button>
        </div>
      </section>
    </div>
  );
}
