import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { checkIsAdmin, getExperiences, deleteExperience } from "@/lib/experiences.functions";
import { Navbar } from "@/components/layout/Navbar";
import { useServerFn } from "@tanstack/react-start";
import { Calendar, MapPin, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/experiencias")({
  component: AdminExperiencias,
});

function AdminExperiencias() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const checkAdminFn = useServerFn(checkIsAdmin);
  const getExperiencesFn = useServerFn(getExperiences);
  const deleteExpFn = useServerFn(deleteExperience);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await checkAdminFn();
        if (!res) {
          navigate({ to: "/" });
          return;
        }
        setIsAdmin(true);
        const data = await getExperiencesFn();
        setExperiences(data || []);
      } catch (err) {
        console.error(err);
        navigate({ to: "/" });
      } finally {
        setLoading(false);
      }
    };
    check();
  }, [checkAdminFn, getExperiencesFn, navigate]);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta experiência?")) return;
    try {
      await deleteExpFn({ data: id });
      setExperiences(prev => prev.filter(e => e.id !== id));
      toast.success("Experiência excluída com sucesso!");
    } catch (err) {
      toast.error("Erro ao excluir experiência.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif text-2xl">Carregando...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F8] font-sans pb-20">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-32 px-8">
        <div className="flex justify-between items-center mb-12">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-4xl font-serif font-bold">Gerenciar Experiências</motion.h1>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Button onClick={() => navigate({ to: "/admin/experiencias/nova" })} className="bg-[#7A3FF2] hover:bg-[#5E2CCF] text-white rounded-full px-6 py-6 flex items-center gap-2 font-bold shadow-lg h-auto">
              <Plus size={20} /> Nova Experiência
            </Button>
          </motion.div>
        </div>

        <div className="grid gap-6">
          {experiences.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-300">
              <p className="text-gray-500 font-serif text-xl">Nenhuma experiência cadastrada ainda.</p>
            </div>
          ) : (
            experiences.map((e, i) => (
              <motion.div 
                key={e.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-8 rounded-[2rem] border border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden hidden md:block border border-black/5">
                    <img src={e.image_url || "/placeholder.jpg"} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold mb-2">{e.title}</h2>
                    <div className="flex gap-4 text-xs font-bold text-[#5E5E5E] uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Calendar size={14} className="text-[#7A3FF2]" /> {e.display_date}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} className="text-[#7A3FF2]" /> {e.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <Button variant="outline" className="flex-1 md:flex-none rounded-full border-black/10 hover:bg-gray-50 font-bold" onClick={() => toast.info("Edição em breve")}>
                    <Edit size={18} className="mr-2" /> Editar
                  </Button>
                  <Button variant="destructive" className="flex-1 md:flex-none rounded-full bg-red-50 text-red-600 hover:bg-red-100 border-none font-bold shadow-none" onClick={() => handleDelete(e.id)}>
                    <Trash2 size={18} className="mr-2" /> Excluir
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
