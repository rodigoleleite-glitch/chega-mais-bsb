import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { checkIsAdmin, createExperience } from "@/lib/experiences.functions";
import { Navbar } from "@/components/layout/Navbar";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/experiencias/nova")({
  component: NovaExperiencia,
});

function NovaExperiencia() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const checkAdminFn = useServerFn(checkIsAdmin);
  const createExpFn = useServerFn(createExperience);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    date: "",
    display_date: "",
    time: "",
    location: "",
    google_maps_url: "",
    short_description: "",
    long_description: "",
    price: "",
    vacancies: "",
    status: "available" as "available" | "sold-out",
    image_url: "",
    includes: "",
    for_who: "",
  });

  useEffect(() => {
    checkAdminFn().then(res => {
      if (!res) navigate({ to: "/" });
      setIsAdmin(true);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      slug: name === 'title' ? value.toLowerCase().replace(/ /g, '-') : prev.slug,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createExpFn({
        ...formData,
        includes: formData.includes.split("\n").filter(i => i.trim()),
        for_who: formData.for_who.split("\n").filter(w => w.trim()),
      });
      toast.success("Experiência criada com sucesso!");
      navigate({ to: "/admin/experiencias" });
    } catch (err) {
      toast.error("Erro ao criar experiência.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F8] font-sans pb-20">
      <Navbar />
      <div className="max-w-3xl mx-auto pt-32 px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-serif font-bold mb-8">Nova Experiência</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 rounded-[2.5rem] shadow-sm border border-black/5">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input name="title" value={formData.title} onChange={handleChange} required placeholder="Ex: Café & Pintura" />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input name="slug" value={formData.slug} onChange={handleChange} required placeholder="cafe-e-pintura" />
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Input name="category" value={formData.category} onChange={handleChange} required placeholder="Ex: Arte" />
              </div>
              <div className="space-y-2">
                <Label>Data (ISO)</Label>
                <Input name="date" type="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label>Data Exibição</Label>
                <Input name="display_date" value={formData.display_date} onChange={handleChange} required placeholder="Ex: 24 Ago" />
              </div>
              <div className="space-y-2">
                <Label>Horário</Label>
                <Input name="time" value={formData.time} onChange={handleChange} required placeholder="Ex: 09:00 - 12:00" />
              </div>
              <div className="space-y-2">
                <Label>Local</Label>
                <Input name="location" value={formData.location} onChange={handleChange} required placeholder="Ex: Asa Norte, Brasília" />
              </div>
              <div className="space-y-2">
                <Label>URL Google Maps</Label>
                <Input name="google_maps_url" value={formData.google_maps_url} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Preço</Label>
                <Input name="price" value={formData.price} onChange={handleChange} required placeholder="Ex: R$ 120" />
              </div>
              <div className="space-y-2">
                <Label>Vagas</Label>
                <Input name="vacancies" value={formData.vacancies} onChange={handleChange} required placeholder="Ex: 2 vagas" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select onValueChange={(v) => setFormData(p => ({ ...p, status: v as any }))} defaultValue="available">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="sold-out">Esgotado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>URL da Imagem</Label>
                <Input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://..." />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descrição Curta</Label>
              <Textarea name="short_description" value={formData.short_description} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label>Descrição Completa</Label>
              <Textarea name="long_description" value={formData.long_description} onChange={handleChange} className="h-32" required />
            </div>

            <div className="space-y-2">
              <Label>O que está incluso (um por linha)</Label>
              <Textarea name="includes" value={formData.includes} onChange={handleChange} className="h-24" />
            </div>

            <div className="space-y-2">
              <Label>Para quem é (um por linha)</Label>
              <Textarea name="for_who" value={formData.for_who} onChange={handleChange} className="h-24" />
            </div>

            <Button type="submit" className="w-full py-6 bg-[#7A3FF2] hover:bg-[#5E2CCF] text-white rounded-full font-bold text-lg" disabled={loading}>
              {loading ? "Criando..." : "Criar Experiência"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
