import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { checkIsAdmin, getExperiences, createExperience, deleteExperience } from "@/lib/experiences.functions";
import { Navbar } from "@/components/layout/Navbar";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/admin/experiencias")({
  component: AdminExperiencias,
});

function AdminExperiencias() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [experiences, setExperiences] = useState<any[]>([]);
  const navigate = useNavigate();
  const checkAdminFn = useServerFn(checkIsAdmin);
  const getExperiencesFn = useServerFn(getExperiences);
  const deleteExpFn = useServerFn(deleteExperience);

  useEffect(() => {
    checkAdminFn().then(res => {
      if (!res) navigate({ to: "/" });
      setIsAdmin(true);
    });
    getExperiencesFn().then(setExperiences);
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F8] p-8">
      <h1 className="text-3xl font-bold mb-8">Gerenciar Experiências</h1>
      <div className="space-y-4">
        {experiences.map(e => (
          <div key={e.id} className="bg-white p-6 rounded-xl shadow border border-black/5 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{e.title}</h2>
              <p className="text-sm text-gray-500">{e.date} • {e.location}</p>
            </div>
            <button 
              onClick={async () => {
                await deleteExpFn(e.id);
                setExperiences(prev => prev.filter(x => x.id !== e.id));
              }}
              className="text-red-500 font-bold hover:underline"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
