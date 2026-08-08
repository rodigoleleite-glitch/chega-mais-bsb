import { createFileRoute, useParams } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { events } from "@/data/events";
import { Calendar, MapPin, Check, Camera, ArrowRight, Sparkles, HelpCircle, ChevronDown } from "lucide-react";

import { motion } from "framer-motion";

export const Route = createFileRoute("/experiencias/$slug")({
  head: ({ params }) => {
    const event = experiences.find((e) => e.slug === params.slug);
    return {
      meta: [
        { title: `${event?.title || 'Experiência'} | Chega Mais BSB` },
        { name: "description", content: event?.shortDescription || "Conheça os detalhes desta experiência única da comunidade Chega Mais BSB." },
        { property: "og:title", content: `${event?.title || 'Experiência'} | Chega Mais BSB` },
        { property: "og:description", content: event?.shortDescription || "Conheça os detalhes desta experiência única da comunidade Chega Mais BSB." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(event?.imageUrl ? [{ property: "og:image", content: event.imageUrl }, { name: "twitter:image", content: event.imageUrl }] : []),
      ],
    };
  },
  component: ExperienciaIndividual,
});


function ExperienciaIndividual() {
  const { slug } = useParams({ from: "/experiencias/$slug" });
  const event = experiences.find((e) => e.slug === slug);

  if (!event) return <div>Evento não encontrado.</div>;

  const isRegistrationOpen = () => {
    if (event.status !== 'available') return false;
    
    const eventDate = new Date(event.date);
    const today = new Date();
    // Zerar as horas para comparar apenas os dias
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    const diffInDays = (eventDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
    
    return diffInDays >= 1;
  };

  const registrationEnabled = isRegistrationOpen();

  const handleRegister = () => {
    if (!registrationEnabled) return;
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
                <span className="flex items-center gap-2"><Calendar size={18} className="text-[#7A3FF2]" /> {event.displayDate}, {event.time}</span>
                {event.googleMapsUrl ? (
                  <a 
                    href={event.googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 hover:text-[#7A3FF2] transition-colors"
                  >
                    <MapPin size={18} className="text-[#7A3FF2]" /> {event.location}
                  </a>
                ) : (
                  <span className="flex items-center gap-2"><MapPin size={18} className="text-[#7A3FF2]" /> {event.location}</span>
                )}
              </div>
            </div>
            <button 
              onClick={handleRegister}
              disabled={!registrationEnabled}
              className={`mt-8 md:mt-0 px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl ${
                registrationEnabled 
                  ? "bg-[#7A3FF2] text-white hover:bg-[#5E2CCF]" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
              }`}
            >
              {registrationEnabled ? `Quero Participar - ${event.price}` : "Inscrições Encerradas"}
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


      {/* Galeria */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center tracking-tight">Galeria de Experiências</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {experiences.slice(0, 4).map((e, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden group">
                <img src={e.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-8 bg-[#FAF9F8]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center tracking-tight">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              { q: "Posso ir sozinha?", a: "Com certeza! A maioria das mulheres vai sozinha. O Chega Mais foi criado exatamente para facilitar essas novas conexões." },
              { q: "Preciso conhecer alguém?", a: "Não! Nosso papel é justamente quebrar o gelo e garantir que você se sinto acolhida desde o primeiro minuto." },
              { q: "Posso cancelar?", a: "Sim, cancelamentos com até 48h de antecedência recebem reembolso integral." },
              { q: "Como funciona o pagamento?", a: "O pagamento é feito via PIX ou cartão de crédito no momento da inscrição através do nosso contato." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-black/5 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-[#1A1A1A]">
                  <span className="flex items-center gap-3"><HelpCircle size={20} className="text-[#7A3FF2]" /> {faq.q}</span>
                  <ChevronDown size={20} className="text-[#5E5E5E] group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-[#5E5E5E] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
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
            disabled={!registrationEnabled}
            className={`px-12 py-5 rounded-full font-bold text-xl transition-all shadow-2xl ${
              registrationEnabled 
                ? "bg-[#7A3FF2] text-white hover:bg-[#5E2CCF]" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
            }`}
          >
            {registrationEnabled ? "Quero Participar" : "Inscrições Encerradas"}
          </button>
        </div>
      </section>
    </div>
  );
}
