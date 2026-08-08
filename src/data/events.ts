export interface Event {
  id: string;
  slug: string;

  title: string;
  category: string;

  shortDescription: string;
  fullDescription: string;

  date: string; // ISO-like or display string
  time: string;

  location: string;
  mapsUrl: string;

  registrationUrl: string; // Empty string if "Inscrições Encerradas"

  image: string;
  gallery: string[];

  included: string[];

  idealFor: string[];

  faq: {
    question: string;
    answer: string;
  }[];

  active: boolean;
}

export const events: Event[] = [
  {
    id: "1",
    slug: "cafe-e-pintura",
    title: "Café & Pintura",
    category: "Arte",
    shortDescription: "Uma manhã criativa para conversar, pintar e conhecer novas pessoas.",
    fullDescription: "O Café & Pintura não é sobre saber pintar. É sobre desacelerar, conversar, conhecer mulheres incríveis e permitir que novas histórias aconteçam naturalmente. Em um ambiente acolhedor, vamos explorar cores e formas enquanto desfrutamos de um café especial.",
    date: "2024-08-24",
    time: "09:00 - 12:00",
    location: "Asa Norte, Brasília",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Asa+Norte+Brasilia",
    registrationUrl: "https://forms.gle/abc123",
    image: "/images/workshop_table.jpg",
    gallery: [
      "/images/community_group.jpg",
      "/images/group_portrait.jpg",
      "/images/group_smiling.jpg"
    ],
    included: [
      "Materiais de pintura",
      "Orientação da atividade",
      "Espaço reservado",
      "Networking",
      "Experiência Chega Mais"
    ],
    idealFor: [
      "Quem quer conhecer pessoas novas",
      "Quem quer sair da rotina",
      "Quem vai participar sozinha",
      "Quem procura novas amizades",
      "Quem gosta de experiências criativas"
    ],
    faq: [
      {
        question: "Posso ir sozinha?",
        answer: "Sim. A maioria das participantes vai sozinha."
      }
    ],
    active: true
  },
  {
    id: "2",
    slug: "trilha-e-piquenique",
    title: "Trilha & Piquenique",
    category: "Outdoor",
    shortDescription: "Uma experiência leve para mulheres que querem sair da rotina e criar novas amizades.",
    fullDescription: "Conecte-se com a natureza e com outras mulheres em uma trilha leve seguida de um piquenique compartilhado. Uma oportunidade perfeita para respirar ar puro e trocar experiências em um cenário inspirador.",
    date: "2024-09-02",
    time: "08:00 - 11:00",
    location: "Parque da Cidade, Brasília",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Parque+da+Cidade+Brasilia",
    registrationUrl: "",
    image: "/images/community_group.jpg",
    gallery: [
      "/images/community_group.jpg",
      "/images/group_portrait.jpg"
    ],
    included: [
      "Guia da trilha",
      "Frutas e hidratação",
      "Kit piquenique",
      "Networking",
      "Experiência Chega Mais"
    ],
    idealFor: [
      "Quem quer conhecer pessoas novas",
      "Quem quer sair da rotina",
      "Quem vai participar sozinha",
      "Quem procura novas amizades",
      "Quem gosta de atividades ao ar livre"
    ],
    faq: [
      {
        question: "Preciso ter preparo físico?",
        answer: "A trilha é leve, qualquer pessoa pode participar."
      }
    ],
    active: true
  },
  {
    id: "3",
    slug: "workshop-de-ceramica",
    title: "Workshop de Cerâmica",
    category: "Criatividade",
    shortDescription: "Aprenda algo novo enquanto compartilha momentos especiais com outras mulheres.",
    fullDescription: "Mãos na massa! Neste workshop, vamos aprender as técnicas básicas da cerâmica manual. Mais do que criar peças, vamos moldar novas conexões em uma tarde dedicada à criatividade e ao autocuidado.",
    date: "2024-09-15",
    time: "14:00 - 17:00",
    location: "Lago Sul, Brasília",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lago+Sul+Brasilia",
    registrationUrl: "https://forms.gle/ceramica123",
    image: "/images/group_smiling.jpg",
    gallery: [
      "/images/group_smiling.jpg",
      "/images/workshop_table.jpg"
    ],
    included: [
      "Argila e ferramentas",
      "Queima das peças",
      "Lanche especial",
      "Networking",
      "Experiência Chega Mais"
    ],
    idealFor: [
      "Quem quer conhecer pessoas novas",
      "Quem quer sair da rotina",
      "Quem vai participar sozinha",
      "Quem procura novas amizades",
      "Quem gosta de trabalhos manuais"
    ],
    faq: [
      {
        question: "Posso ir sozinha?",
        answer: "Sim. A maioria das participantes vai sozinha."
      }
    ],
    active: true
  }
];
