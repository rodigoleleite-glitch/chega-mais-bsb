# Chega Mais BSB 💜

Plataforma oficial do Chega Mais BSB, uma comunidade criada para conectar mulheres através de experiências presenciais, novas amizades e momentos significativos em Brasília.

## Sobre o projeto

O Chega Mais nasceu da ideia simples de que ninguém deveria precisar viver tudo sozinha.

O site permite que participantes descubram novas experiências, conheçam a comunidade e realizem inscrições para eventos de forma simples e intuitiva.

## Funcionalidades

- Página inicial institucional
- Listagem de experiências e eventos
- Página individual para cada experiência
- Integração com Google Forms para inscrições
- Integração com Google Sheets para gerenciamento de eventos
- Links diretos para localização via Google Maps
- Layout responsivo para desktop e mobile

## Gerenciamento de experiências

Todos os eventos e experiências são gerenciados através de uma planilha Google Sheets.

Ao adicionar uma nova linha na planilha:

- A experiência aparece automaticamente na página inicial
- A experiência aparece na página de eventos
- Uma página individual é criada automaticamente
- Os links de inscrição e localização são atualizados

Nenhuma alteração de código é necessária.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Google Sheets (CMS)
- Google Forms

## Estrutura do projeto

```bash
src/
├── components/
├── pages/
├── services/
├── hooks/
├── integrations/
└── utils/
```

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Objetivo

Criar um espaço digital acolhedor onde mulheres possam descobrir novas experiências, construir conexões reais e encontrar uma comunidade que as receba exatamente como são.

## Missão

Promover encontros que gerem conexões genuínas, novas amizades e experiências significativas para mulheres em Brasília.

## Visão

Ser a principal comunidade feminina de experiências presenciais e conexão humana do Distrito Federal.

## Valores

- Acolhimento
- Respeito
- Pertencimento
- Coragem para experimentar
- Conexões reais

---

© 2026 Chega Mais BSB.
Todos os direitos reservados.