import communityAsset from "@/assets/community_group.jpg.asset.json";
import workshopAsset from "@/assets/workshop_table.jpg.asset.json";
import smilingAsset from "@/assets/group_smiling.jpg.asset.json";
import portraitAsset from "@/assets/group_portrait.jpg.asset.json";

export interface Experience {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  vacancies: string;
  status: 'available' | 'sold-out';
  imageUrl: string;
  includes: string[];
  forWho: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    slug: "cafe-e-pintura",
    title: "Café & Pintura",
    category: "Arte",
    date: "24 Ago",
    time: "09:00 - 12:00",
    location: "Asa Norte, Brasília",
    price: "R$ 120",
    vacancies: "2 vagas",
    status: 'available',
    imageUrl: workshopAsset.url,
    shortDescription: "Uma manhã criativa para conversar, pintar e conhecer novas pessoas.",
    longDescription: "O Café & Pintura não é sobre saber pintar. É sobre desacelerar, conversar, conhecer mulheres incríveis e permitir que novas histórias aconteçam naturalmente. Em um ambiente acolhedor, vamos explorar cores e formas enquanto desfrutamos de um café especial.",
    includes: [
      "Materiais de pintura",
      "Orientação da atividade",
      "Espaço reservado",
      "Networking",
      "Experiência Chega Mais"
    ],
    forWho: [
      "Quem quer conhecer pessoas novas",
      "Quem quer sair da rotina",
      "Quem vai participar sozinha",
      "Quem procura novas amizades",
      "Quem gosta de experiências criativas"
    ]
  },
  {
    id: "2",
    slug: "trilha-e-piquenique",
    title: "Trilha & Piquenique",
    category: "Outdoor",
    date: "02 Set",
    time: "08:00 - 11:00",
    location: "Parque da Cidade, Brasília",
    price: "R$ 80",
    vacancies: "Esgotado",
    status: 'sold-out',
    imageUrl: communityAsset.url,
    shortDescription: "Uma experiência leve para mulheres que querem sair da rotina e criar novas amizades.",
    longDescription: "Conecte-se com a natureza e com outras mulheres em uma trilha leve seguida de um piquenique compartilhado. Uma oportunidade perfeita para respirar ar puro e trocar experiências em um cenário inspirador.",
    includes: [
      "Guia da trilha",
      "Frutas e hidratação",
      "Kit piquenique",
      "Networking",
      "Experiência Chega Mais"
    ],
    forWho: [
      "Quem quer conhecer pessoas novas",
      "Quem quer sair da rotina",
      "Quem vai participar sozinha",
      "Quem procura novas amizades",
      "Quem gosta de atividades ao ar livre"
    ]
  },
  {
    id: "3",
    slug: "workshop-de-ceramica",
    title: "Workshop de Cerâmica",
    category: "Criatividade",
    date: "15 Set",
    time: "14:00 - 17:00",
    location: "Lago Sul, Brasília",
    price: "R$ 180",
    vacancies: "4 vagas",
    status: 'available',
    imageUrl: smilingAsset.url,
    shortDescription: "Aprenda algo novo enquanto compartilha momentos especiais com outras mulheres.",
    longDescription: "Mãos na massa! Neste workshop, vamos aprender as técnicas básicas da cerâmica manual. Mais do que criar peças, vamos moldar novas conexões em uma tarde dedicada à criatividade e ao autocuidado.",
    includes: [
      "Argila e ferramentas",
      "Queima das peças",
      "Lanche especial",
      "Networking",
      "Experiência Chega Mais"
    ],
    forWho: [
      "Quem quer conhecer pessoas novas",
      "Quem quer sair da rotina",
      "Quem vai participar sozinha",
      "Quem procura novas amizades",
      "Quem gosta de trabalhos manuais"
    ]
  },
  {
    id: "4",
    slug: "clube-do-livro",
    title: "Clube do Livro",
    category: "Cultura",
    date: "10 Out",
    time: "19:00 - 21:00",
    location: "Café Conceito, Asa Sul",
    price: "R$ 40",
    vacancies: "10 vagas",
    status: 'available',
    imageUrl: portraitAsset.url,
    shortDescription: "Conversas profundas, café e novas conexões.",
    longDescription: "Um encontro para discutir literatura, compartilhar perspectivas e aprofundar laços. Escolhemos obras que provocam reflexão e diálogo entre mulheres de diferentes trajetórias.",
    includes: [
      "Mediação da conversa",
      "Guia de leitura",
      "Reserva no café",
      "Networking",
      "Experiência Chega Mais"
    ],
    forWho: [
      "Quem quer conhecer pessoas novas",
      "Quem ama ler",
      "Quem vai participar sozinha",
      "Quem procura conversas profundas",
      "Quem gosta de ambiente de café"
    ]
  },
  {
    id: "5",
    slug: "noite-de-jogos",
    title: "Noite de Jogos",
    category: "Social",
    date: "25 Out",
    time: "19:30 - 22:30",
    location: "Espaço Coworking, Sudoeste",
    price: "R$ 60",
    vacancies: "8 vagas",
    status: 'available',
    imageUrl: workshopAsset.url,
    shortDescription: "Uma noite divertida para rir, conhecer pessoas e criar memórias.",
    longDescription: "Descontração é a palavra de ordem. Uma seleção de jogos de tabuleiro e dinâmicas de grupo para quebrar o gelo e garantir muitas risadas e novas amizades.",
    includes: [
      "Variedade de jogos",
      "Petiscos e bebidas",
      "Facilitação das dinâmicas",
      "Networking",
      "Experiência Chega Mais"
    ],
    forWho: [
      "Quem quer conhecer pessoas novas",
      "Quem quer se divertir",
      "Quem vai participar sozinha",
      "Quem procura um ambiente leve",
      "Quem gosta de jogos"
    ]
  }
];
