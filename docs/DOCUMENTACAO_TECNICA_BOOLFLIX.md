# Documentação Técnica e Fluxos do Frontend - BOOLFLIX

Este documento descreve a arquitetura, especificações técnicas, fluxos de usuário e o Design System implementado para o frontend do **BOOLFLIX**, um catálogo de vídeos educacionais.

---

## 1. Visão Geral do Projeto

O BOOLFLIX é uma aplicação web responsiva (Desktop, Tablet e Mobile) focada na listagem, busca e gerenciamento de vídeos organizados por categorias. O sistema possui controle de acesso baseado em perfis (Administrador e Usuário Comum).

### Tecnologias Utilizadas
- **Angular** estruturado via Angular CLI.
- **TypeScript** para tipagem estática e segurança.
- **Tailwind CSS v4** para estilização utilitária e suporte a modo claro/escuro.
- **Angular Router** para roteamento e proteção de rotas com Guards (`CanActivate`).
- **Angular Reactive Forms** para gerenciamento robusto e validação de formulários.
- **Lucide Angular** para iconografia.
- **Ngx-Toastr / Hot Toast** para notificações (toasts).
- **Angular CDK** para acessibilidade, overlays e comportamentos base de UI.

---

## 2. Arquitetura e Gerenciamento de Estado

A aplicação utiliza **Services e RxJS (BehaviorSubjects)** para o gerenciamento de estado global e injeção de dependências, comunicando-se de forma reativa pela aplicação.

- `AuthService`: Gerencia o estado de autenticação (Token JWT simulado), persistência no `localStorage`, e expõe um Observable com as informações do usuário atual (Nome, E-mail e Role).
- `DataService` (ou `VideoService` / `CategoryService`): Funciona como um banco de dados em memória utilizando RxJS para manter e distribuir listas de `Vídeos` e `Categorias`, permitindo operações de CRUD na interface que refletem instantaneamente nos componentes assinantes.

---

## 3. Autenticação e Perfis de Acesso

O sistema suporta dois tipos de perfil de usuário (`Role`), determinados durante o login (para fins de simulação, qualquer e-mail contendo "adm" recebe privilégios de Administrador).

### USER (Usuário Comum)
- Pode fazer login e cadastro.
- Pode visualizar o catálogo de vídeos e buscar por título/categoria.
- Pode assistir aos vídeos (player embed).
- Pode visualizar seu próprio perfil.

### ADM (Administrador)
- Todas as permissões do usuário comum.
- Acesso à área administrativa (Gerenciar Vídeos e Gerenciar Categorias).
- Pode **Criar, Editar e Excluir** vídeos.
- Pode **Criar, Editar e Excluir** categorias.

> **Interceptação de Rotas:** O arquivo de rotas (`app.routes.ts`) utiliza um `AuthGuard` que bloqueia o acesso de usuários não autenticados e restringe as rotas `/admin/*` apenas para o perfil `ADM`.

---

## 4. Estrutura de Telas e Fluxos

Abaixo estão os fluxos de UX implementados, com a especificação de cada tela.

### 4.1. Fluxo de Autenticação (Login / Cadastro)
1. **Verificação Inicial:** O sistema checa se existe um token válido no `localStorage`. Se existir, redireciona para a Home (`/`).
2. **Tela de Login:** Formulário solicitando E-mail e Senha. Validação rigorosa via Reactive Forms (e-mail válido, senha min. 6 caracteres).
3. **Tela de Cadastro:** Solicita Nome, E-mail e Senha.
4. **Feedback:** Em caso de sucesso, o token e os dados do usuário são salvos e o usuário é redirecionado para a plataforma.

### 4.2. Home / Catálogo de Vídeos
- **Busca:** Campo de input com ícone de lupa para filtrar vídeos pelo título em tempo real (utilizando `valueChanges` e `debounceTime`).
- **Filtro de Categoria:** Chips horizontais contendo todas as categorias (ex: Front-End, Back-End). Ao clicar, a lista de vídeos é filtrada reativamente.
- **Grid de Vídeos:** Cards responsivos contendo: Thumbnail (gerada via ID do YouTube), Título, Badge com cor da categoria e Descrição curta. Hover no card exibe um overlay com botão "Play".

### 4.3. Detalhes do Vídeo
- **Player:** Embed dinâmico do YouTube (com `DomSanitizer` para URLs seguras).
- **Metadados:** Título em destaque, Badge da categoria (clicável para ver todos os vídeos da categoria) e Descrição completa.
- **Ações Contextuais (Apenas ADM):** Botões de "Editar" e "Excluir" visíveis no cabeçalho da página. A exclusão aciona um Modal de Confirmação.

### 4.4. Gerenciamento de Vídeos (Painel ADM)
- Tabela listando todos os vídeos com colunas de Título, Categoria e Ações.
- Campo de busca para filtrar a tabela.
- **Modal de Criação/Edição:** Formulário validado para Título, Descrição, Select de Categoria e URL do YouTube.

### 4.5. Gerenciamento de Categorias (Painel ADM)
- Tabela listando as categorias existentes.
- **Modal de Criação/Edição:** Formulário contendo Título e um seletor de cor (Color Picker Hexadecimal). Exibe um preview ao vivo de como o badge da categoria ficará.

---

## 5. Especificações de Design (Design System)

A interface foi projetada com foco em escaneabilidade, acessibilidade (AA) e responsividade, suportando nativamente **Modo Claro** e **Modo Escuro**.

### 5.1 Paleta de Cores (Color Tokens)
Utilizamos as escalas de cores do Tailwind CSS para manter consistência semântica:

| Categoria | Função | Token / Classe Light | Token / Classe Dark | Hex Referência (Tailwind) |
| :--- | :--- | :--- | :--- | :--- |
| **Ação Principal** | Botões primários, Links ativos, Destaques | `bg-blue-600` / `text-blue-600` | `bg-blue-600` / `text-blue-500` | `#2563EB` |
| **Ação Destrutiva** | Exclusões, Erros de validação | `bg-red-500` / `text-red-500` | `bg-red-900` / `text-red-500` | `#EF4444` |
| **Superfície Base** | Fundo geral da aplicação (App Background) | `bg-zinc-50` | `bg-zinc-950` | `#FAFAFA` / `#09090B` |
| **Superfície Elevada** | Cards, Modais, Dropdowns e Header | `bg-white` | `bg-zinc-900` | `#FFFFFF` / `#18181B` |
| **Texto Primário** | Títulos e parágrafos de destaque | `text-zinc-900` | `text-zinc-50` | `#18181B` / `#FAFAFA` |
| **Texto Secundário** | Textos de apoio, placeholders e ícones | `text-zinc-500` | `text-zinc-400` | `#71717A` / `#A1A1AA` |
| **Bordas** | Divisões estruturais e inputs | `border-zinc-200` | `border-zinc-800` | `#E4E4E7` / `#27272A` |
| **Cores Dinâmicas** | Badges de Categorias | `var(--category-color) + 20% opacity` (Fundo) | `var(--category-color)` (Texto e Borda) | *Variável ex: `#00FF00`* |

### 5.2 Tipografia (Typography)
A fonte utilizada é a padrão do sistema (`sans-serif` - Inter / San Francisco / Roboto).

- **Títulos Maiores (H1 - Hero / Destaque):** `text-3xl` (30px) ou `text-4xl` (36px) | Peso: `font-bold` | Tracking: `tracking-tight` (-0.025em).
- **Títulos de Página (H2 - Seções):** `text-2xl` (24px) | Peso: `font-bold`.
- **Títulos de Cards/Modais (H3):** `text-lg` (18px) a `text-xl` (20px) | Peso: `font-semibold`.
- **Corpo do Texto (Body / Inputs):** `text-sm` (14px) | Peso: `font-normal` a `font-medium` (para labels).
- **Textos Menores (Small / Badges / Dicas):** `text-xs` (12px) | Peso: `font-medium`.

### 5.3 Espaçamentos e Grid (Spacing System)
O layout é baseado em um **Grid de 8px** nativo do Tailwind (`p-1` = 4px, `p-2` = 8px).

- **Paddings de Container (Páginas):**
  - Desktop: `p-8` (32px) com largura máxima `max-w-6xl` (1152px) centralizada `mx-auto`.
  - Mobile: `p-4` (16px).
- **Espaçamento entre elementos (Gap):**
  - Distância mínima (Textos e Labels): `gap-2` (8px).
  - Distância de componentes (Botões e Inputs): `gap-4` (16px).
  - Distância estrutural (Entre seções de página): `space-y-6` (24px) ou `space-y-8` (32px).
- **Alturas Padronizadas (Heights):**
  - Inputs e Botões Default: `h-10` (40px).
  - Header Mobile e Sidebar Item: `h-16` (64px).

### 5.4 Formas e Elevação (Radii & Shadows)
- **Border Radius:**
  - Botões e Inputs: `rounded-md` (6px).
  - Cards de Vídeo e Containers: `rounded-lg` (8px) a `rounded-xl` (12px).
  - Avatares e Badges de Categoria: `rounded-full` (9999px).
- **Sombras (Shadows):**
  - Cards Interativos: Fundo `shadow-sm` mudando para `shadow-md` no hover.
  - Modais: `shadow-xl` para criar máxima profundidade.

### 5.5 Componentes UI (Biblioteca Reutilizável)
Foram criados componentes Angular reutilizáveis, utilizando `@Input` e `@Output` para controlar os estados.

- **`<app-button>`**:
  - *Inputs (`@Input()`):* `variant` (`default`, `outline`, `ghost`, `destructive`), `size` (`default`, `sm`, `lg`, `icon`), `isLoading`, `disabled`.
  - *Comportamentos:* Altera as classes Tailwind dinamicamente usando `ngClass`. Estado `loading` renderiza um _spinner_ internamente.
- **`<app-input>` e `<app-textarea>`**:
  - *Comportamentos:* Compatível com `ControlValueAccessor` para integração perfeita com Angular Reactive Forms.
  - *Tratamento de erro:* Recebe status de erro do `FormControl` para alterar as bordas para vermelho e exibir a mensagem de validação abaixo.
- **`<app-video-card>`**:
  - Estrutura otimizada (Thumb na parte superior aspecto `aspect-video` 16:9).
  - **Microinteração:** Ao focar/fazer hover, a thumb aplica um ligeiro scale (`scale-105 duration-300`), uma camada de opacidade preta surge, junto ao botão `<Play />` centralizado.

---

## 6. Layout Responsivo

- **Desktop (telas md+ / >= 768px):** Menu lateral esquerdo fixo (Sidebar) com links de navegação rápidos (`routerLink`) e dados do usuário na parte inferior. O conteúdo preenche a área restante à direita com limite central de leitura (`max-w-6xl`).
- **Mobile (telas < md / < 768px):**
  - **Header Superior:** Barra fina (`h-16`) contendo o Logotipo e acesso à inicial do Usuário.
  - **Bottom Navigation (Barra Inferior):** Menu fixado na borda inferior da tela, garantindo zona amigável para o polegar, distribuindo uniformemente (Início, Vídeos, Categorias, Perfil).

---

## 7. Critérios de Qualidade Aplicados
- **Feedback Constante (Toasts):** Uso de biblioteca de Toasts para feedback visual de sucesso (`Categoria Criada`, `Sessão Encerrada`) e loading visual.
- **Desempenho (Performance):** Uso de `ChangeDetectionStrategy.OnPush` nos componentes de apresentação (UI Components) e pipes assíncronos (`| async`) para subscrição reativa.
- **Prevenção de Erros:** Exclusões complexas exigem dupla confirmação (Modal) antes de processar os dados. Formulários desabilitam o botão de submissão enquanto o `FormGroup` for `invalid`.
