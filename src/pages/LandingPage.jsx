import { Link } from 'react-router-dom'
import {
  Blocks,
  Rocket,
  Gamepad2,
  Palette,
  ArrowRight,
  Play,
  CheckCircle2,
  MousePointerClick,
  Sparkles,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-amber-300 selection:text-amber-950 flex flex-col">
      {/* Playful Navbar */}
      <header className="sticky top-0 z-40 border-b-4 border-purple-400 bg-white/95 px-5 py-3.5 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-3 transition-transform hover:scale-102">
            <span className="grid size-11 place-items-center rounded-2xl border-2 border-purple-300 bg-purple-600 text-white shadow-md transition-transform group-hover:rotate-6">
              <Blocks className="size-6" />
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900">Uebit</span>
              <span className="rounded-full bg-purple-100 border border-purple-300 px-2.5 py-0.5 text-[11px] font-black text-purple-900">
                Web Builder Visual & em Blocos
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 rounded-full border-b-3 border-amber-600 bg-amber-400 px-5 py-2 text-xs font-black text-amber-950 shadow-md transition-all hover:scale-105 hover:bg-amber-300 active:scale-95 active:translate-y-0.5"
            >
              <Play className="size-3.5 fill-amber-950" />
              <span>Abrir Editor</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Playful Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-black text-purple-900 shadow-xs">
            <Sparkles className="size-3.5 text-amber-500" />
            <span>Aprenda programação criando na web</span>
          </div>

          {/* Main Title */}
          <h1 className="mt-8 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl sm:leading-tight">
            Construa Sites Reais com a Facilidade de Blocos!
          </h1>

          {/* Punchy Subtitle (6 words) */}
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-slate-500 sm:text-xl">
            Crie páginas incríveis arrastando e programando.
          </p>

          {/* Giant Animated CTA Button */}
          <div className="mt-10 flex flex-col items-center justify-center">
            <Link
              to="/editor"
              className="group relative inline-flex items-center justify-center gap-3.5 rounded-3xl border-b-6 border-amber-600 bg-amber-400 px-8 py-5 text-xl font-black text-amber-950 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-2xl active:translate-y-1 active:border-b-2 sm:px-12 sm:text-2xl"
            >
              <Rocket className="size-7 transition-transform group-hover:-rotate-12 group-hover:scale-110" />
              <span>Começar a Criar</span>
              <ArrowRight className="size-6 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 text-xs font-bold text-slate-400">
              100% Gratuito · Sem cadastro · Direto no navegador
            </p>
          </div>

          {/* Quick Templates Selector Strip */}
          <div className="mt-14 mx-auto max-w-3xl rounded-3xl border-2 border-purple-200 bg-purple-50/70 p-4 shadow-sm sm:p-5">
            <p className="text-xs font-black uppercase tracking-wider text-purple-900 mb-3">
              ⚡ Escolha um Modelo Pronto para Começar Já:
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <Link
                to="/editor?template=quiz-game"
                className="flex items-center justify-center gap-1.5 rounded-2xl border-b-3 border-emerald-700 bg-emerald-600 px-3 py-2.5 text-xs font-black text-white shadow-xs transition-transform hover:scale-105 active:scale-95 hover:bg-emerald-500"
              >
                <Gamepad2 size={16} />
                <span>Quiz & Jogo</span>
              </Link>
              <Link
                to="/editor?template=portfolio"
                className="flex items-center justify-center gap-1.5 rounded-2xl border-b-3 border-blue-700 bg-blue-600 px-3 py-2.5 text-xs font-black text-white shadow-xs transition-transform hover:scale-105 active:scale-95 hover:bg-blue-500"
              >
                <Palette size={16} />
                <span>Portfólio</span>
              </Link>
              <Link
                to="/editor?template=space-story"
                className="flex items-center justify-center gap-1.5 rounded-2xl border-b-3 border-purple-700 bg-purple-600 px-3 py-2.5 text-xs font-black text-white shadow-xs transition-transform hover:scale-105 active:scale-95 hover:bg-purple-500"
              >
                <Rocket size={16} />
                <span>História Espacial</span>
              </Link>
              <Link
                to="/editor?template=blank"
                className="flex items-center justify-center gap-1.5 rounded-2xl border-b-3 border-slate-700 bg-slate-600 px-3 py-2.5 text-xs font-black text-white shadow-xs transition-transform hover:scale-105 active:scale-95 hover:bg-slate-500"
              >
                <Sparkles size={16} />
                <span>Em Branco</span>
              </Link>
            </div>
          </div>

          {/* Minimalist Visual Canvas Preview */}
          <div className="mt-14 mx-auto max-w-4xl rounded-3xl border-3 border-purple-200 bg-white p-3 shadow-lg sm:p-5">
            <div className="flex items-center justify-between border-b-2 border-purple-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-400" />
                <span className="size-3 rounded-full bg-amber-400" />
                <span className="size-3 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-xs font-bold text-slate-400">uebit.editor/meu-site</span>
              </div>
              <span className="rounded-full bg-emerald-100 border border-emerald-300 px-3 py-0.5 text-xs font-black text-emerald-800">
                ● Flexbox Nativo
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-12 text-left">
              {/* Palette */}
              <div className="md:col-span-3 rounded-2xl border-2 border-purple-100 bg-purple-50/50 p-3 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-purple-900">Paleta Colorida</p>
                <div className="rounded-xl border-b-3 border-emerald-800 bg-emerald-600 p-2 text-white shadow-xs">
                  <span className="text-xs font-black">□ Container (Layout)</span>
                </div>
                <div className="rounded-xl border-b-3 border-blue-700 bg-blue-500 p-2 text-white shadow-xs">
                  <span className="text-xs font-black">¶ Título & Texto</span>
                </div>
                <div className="rounded-xl border-b-3 border-orange-700 bg-orange-500 p-2 text-white shadow-xs">
                  <span className="text-xs font-black">↗ Botão de Ação</span>
                </div>
              </div>

              {/* Canvas Center */}
              <div className="md:col-span-6 rounded-2xl border-2 border-purple-200 uebit-dot-backdrop p-5 flex flex-col justify-center">
                <div className="rounded-2xl border-2 border-purple-200 bg-white p-4 shadow-sm space-y-2">
                  <h3 className="text-base font-black text-slate-800">Olá, mundo! 🌟</h3>
                  <p className="text-xs text-slate-500 font-medium">Meu primeiro site feito com blocos visuais.</p>
                  <div className="flex gap-2 pt-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-white shadow-xs">
                      <MousePointerClick className="size-3" />
                      Interagir
                    </span>
                  </div>
                </div>
              </div>

              {/* Code */}
              <div className="md:col-span-3 rounded-2xl border-2 border-purple-100 bg-purple-50/50 p-3">
                <p className="text-[10px] font-black uppercase tracking-wider text-purple-900">Código Limpo</p>
                <pre className="mt-2 font-mono text-[10px] text-slate-600 overflow-hidden leading-snug">
                  {`<main class="site">\n  <h1>Olá, mundo!</h1>\n  <button>Clique</button>\n</main>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="border-t-4 border-purple-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="rounded-full bg-purple-100 border border-purple-300 px-4 py-1 text-xs font-black uppercase tracking-wider text-purple-900">
              Galeria de Projetos
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Inspire-se: Veja o que Você Pode Criar!
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base font-medium text-slate-500">
              Ideias divertidas para começar hoje mesmo.
            </p>
          </div>

          {/* 3 Colorful Showcase Cards */}
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {/* Card 1: Quiz & Game */}
            <div className="group flex flex-col justify-between rounded-3xl border-3 border-emerald-400 bg-emerald-50/50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-emerald-500 text-white shadow-md group-hover:scale-110 transition-transform">
                    <Gamepad2 className="size-6" />
                  </span>
                  <span className="rounded-full bg-emerald-200 border border-emerald-300 px-3 py-0.5 text-xs font-black text-emerald-950">
                    Interação & Lógica
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black text-emerald-950">
                  Quiz & Mini-Game Interativo
                </h3>
                <p className="mt-2 text-sm font-semibold text-emerald-900">
                  Crie botões e pontuação dinâmica.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-900">
                    ✓ Botões com Ações
                  </span>
                  <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-900">
                    ✓ Placar de Pontos
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t-2 border-emerald-200 pt-4">
                <Link
                  to="/editor?template=quiz-game"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-b-3 border-emerald-800 bg-emerald-600 px-4 py-3 text-xs font-black text-white shadow-md transition-transform hover:scale-105 active:scale-95 hover:bg-emerald-500"
                >
                  <Play className="size-3.5 fill-white" />
                  <span>Montar um Jogo</span>
                </Link>
              </div>
            </div>

            {/* Card 2: Creative Portfolio */}
            <div className="group flex flex-col justify-between rounded-3xl border-3 border-blue-400 bg-blue-50/50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-blue-500 text-white shadow-md group-hover:scale-110 transition-transform">
                    <Palette className="size-6" />
                  </span>
                  <span className="rounded-full bg-blue-200 border border-blue-300 px-3 py-0.5 text-xs font-black text-blue-950">
                    Design & Estilos
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black text-blue-950">
                  Portfólio de Desenhos & Fotos
                </h3>
                <p className="mt-2 text-sm font-semibold text-blue-900">
                  Mostre suas artes e fotos.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-950">
                    ✓ Layout Flexbox
                  </span>
                  <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-950">
                    ✓ Galeria Visual
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t-2 border-blue-200 pt-4">
                <Link
                  to="/editor?template=portfolio"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-b-3 border-blue-800 bg-blue-600 px-4 py-3 text-xs font-black text-white shadow-md transition-transform hover:scale-105 active:scale-95 hover:bg-blue-500"
                >
                  <Play className="size-3.5 fill-white" />
                  <span>Criar Portfólio</span>
                </Link>
              </div>
            </div>

            {/* Card 3: Interactive Story */}
            <div className="group flex flex-col justify-between rounded-3xl border-3 border-purple-400 bg-purple-50/50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-purple-600 text-white shadow-md group-hover:scale-110 transition-transform">
                    <Rocket className="size-6" />
                  </span>
                  <span className="rounded-full bg-purple-200 border border-purple-300 px-3 py-0.5 text-xs font-black text-purple-950">
                    Aventura & Espaço
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black text-purple-950">
                  História Interativa Espacial
                </h3>
                <p className="mt-2 text-sm font-semibold text-purple-900">
                  Escolha seu próprio destino espacial.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-purple-100 px-2.5 py-1 text-[11px] font-bold text-purple-950">
                    ✓ Finais Múltiplos
                  </span>
                  <span className="rounded-lg bg-purple-100 px-2.5 py-1 text-[11px] font-bold text-purple-950">
                    ✓ Efeitos Dinâmicos
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t-2 border-purple-200 pt-4">
                <Link
                  to="/editor?template=space-story"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-b-3 border-purple-800 bg-purple-600 px-4 py-3 text-xs font-black text-white shadow-md transition-transform hover:scale-105 active:scale-95 hover:bg-purple-500"
                >
                  <Play className="size-3.5 fill-white" />
                  <span>Criar História</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Minimalist Footer */}
      <footer className="mt-auto border-t-4 border-purple-200 bg-white py-12 text-slate-500">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-purple-600 text-white shadow-md">
                <Blocks className="size-6" />
              </span>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900">Uebit</span>
                <p className="text-xs text-purple-700 font-bold">Web Builder Educacional em Blocos</p>
              </div>
            </div>

            {/* Declaration required by tests */}
            <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/70 px-5 py-3 text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-black text-purple-900">
                <CheckCircle2 className="size-4 text-emerald-600" />
                Projeto 100% Open Source e Educacional
              </p>
              <p className="mt-1 text-xs text-slate-600 font-medium">
                Aprenda a criar para a web sem rastreadores e sem cobranças.
              </p>
            </div>

            <div>
              <Link
                to="/editor"
                className="inline-flex items-center gap-2 rounded-full border-b-3 border-purple-700 bg-purple-600 px-5 py-2.5 text-xs font-black text-white shadow-md hover:bg-purple-500 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="size-3.5 fill-white" />
                <span>Ir para o Editor</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
