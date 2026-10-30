import { Link } from 'react-router-dom'
import {
  Rocket,
  Gamepad2,
  Palette,
  ArrowRight,
  Play,
  CheckCircle2,
  MousePointerClick,
  Sparkles,
  CodeXml,
  Boxes,
} from '../components/BrandIcon'
import { UtensilsCrossed, BookOpen } from 'lucide-react'
import UebitLogo from '../components/UebitLogo'
import BrandIcon from '../components/BrandIcon'
import { brandAsset } from '../lib/brand-assets'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useLanguage, languagePath } from '../i18n/language'
import { message } from '../i18n/messages'

export default function LandingPage() {
  const { language } = useLanguage()
  const t = (key) => message(language, key)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-amber-300 selection:text-amber-950 flex flex-col relative overflow-x-hidden">
      {/* Elementos geométricos coloridos flutuantes de fundo (Vermelho, Roxo, Amarelo, Verde) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-20 size-96 rounded-full bg-purple-400/15 blur-3xl" />
        <div className="absolute top-48 -right-24 size-96 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 size-[32rem] rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 size-80 rounded-full bg-rose-400/15 blur-3xl" />

        {/* Formas lúdicas flutuantes */}
        <div className="animate-bounce absolute top-24 left-[10%] hidden md:block size-7 rounded-xl border-2 border-purple-300 bg-purple-100 shadow-xs" style={{ animationDuration: '4s' }} />
        <div className="animate-bounce absolute top-40 right-[12%] hidden md:block size-6 rounded-lg bg-emerald-200 border border-emerald-400 shadow-xs" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
        <div className="animate-bounce absolute top-[68%] left-[6%] hidden md:block size-8 rounded-2xl bg-amber-200 border-2 border-amber-300" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <div className="animate-bounce absolute top-[80%] right-[8%] hidden md:block size-5 rounded-md bg-rose-300" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
      </div>

      {/* Playful & Clean Navbar com o Sapinho Sorridente */}
      <header className="sticky top-0 z-40 border-b-4 border-purple-200 bg-white/95 px-4 py-3 sm:px-5 sm:py-3.5 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link to={languagePath('/', language)} className="group min-h-11 min-w-0 flex items-center gap-3 transition-transform hover:scale-102">
            <UebitLogo size={40} variant="full" animated />
            <span className="hidden md:inline-flex rounded-full bg-purple-100 border border-purple-300 px-3 py-1 text-xs font-black text-purple-900 tracking-tight">{t('homeBuilder')}</span>
          </Link>

          <nav aria-label="Navegação principal" className="flex shrink-0 items-center gap-3">
            <LanguageSwitcher compact />
            <Link to={languagePath('/aulas', language)} className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-purple-300 bg-purple-50 px-3 py-2 text-xs font-black text-purple-900 hover:bg-purple-100 sm:px-4"><BookOpen size={16} /><span>{t('lessons')}</span></Link>
            <Link
              to={languagePath('/editor', language)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-b-4 border-emerald-700 bg-emerald-500 px-3 py-2.5 sm:px-5 text-xs font-black text-white shadow-md transition-all hover:scale-105 hover:bg-emerald-400 active:scale-95 active:translate-y-0.5"
            >
              <Play className="size-3.5 fill-white" />
              <span>{t('homeNav')}</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="uebit-brand-hero relative overflow-hidden py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col lg:grid min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:text-left">
          <div>
          {/* Playful Pill */}
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border-2 border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-black text-purple-900 shadow-xs">
            <Sparkles className="size-4 shrink-0 text-amber-500" />
            <span>{t('homeBadge')}</span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 text-3xl min-[375px]:text-4xl font-black tracking-tight text-slate-900 sm:text-5xl sm:leading-tight">{t('homeHero')}<br /><span className="text-purple-600">{t('homeHeroAccent')}</span>
          </h1>

          {/* Punchy Subtitle */}
          <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg font-medium text-slate-600 leading-relaxed">{t('homeDescription')}</p>

          <Link to={languagePath('/aulas', language)} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-purple-300 bg-white px-4 py-2 text-sm font-black text-purple-800 hover:bg-purple-50"><BookOpen size={18} />{t('learnWithLessons')}</Link>

          {/* Giant Animated CTA Button - Verde Sapo com energia das 4 cores */}
          <div className="mt-7 flex flex-col items-center justify-center lg:items-start">
            <Link
              to={languagePath('/editor', language)}
              className="group relative inline-flex w-full min-w-0 max-w-sm items-center justify-center gap-2 sm:w-auto sm:max-w-none sm:gap-3.5 rounded-3xl border-b-6 border-emerald-700 bg-emerald-500 px-4 py-4 text-lg sm:py-5 font-black text-white shadow-xl transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-400 hover:shadow-2xl active:translate-y-1 active:border-b-2 sm:px-12 sm:text-2xl"
            >
              <BrandIcon name="frog" className="size-7 shrink-0 transition-transform group-hover:-rotate-12 group-hover:scale-110" />
              <span>{t('create')}</span>
              <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 text-xs font-bold text-slate-500">{t('free')}</p>
          </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <img src={brandAsset('uebit-mascot.svg')} width="560" height="440" alt="Bit, o sapinho do Uebit, criando um site sobre uma vitória-régia" className="uebit-mascot-float w-full" fetchPriority="high" />
            <p className="text-xs font-bold tracking-widest text-purple-700 uppercase">web · bit · ué-bit!</p>
          </div>
          </div>

          {/* Quick Templates Selector Strip */}
          <div className="mt-14 mx-auto max-w-4xl rounded-3xl border-3 border-purple-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-xs font-black uppercase tracking-wider text-purple-900 mb-3 flex items-center justify-center gap-1.5">
              <span>{t('chooseTemplate')}</span>
            </p>
            <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-3 lg:grid-cols-5">
              <Link
                to={languagePath('/editor?template=quiz-game', language)}
                className="flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-2xl border-b-4 border-emerald-700 bg-emerald-500 px-3 py-2.5 text-xs font-black text-white shadow-xs transition-transform hover:scale-105 active:scale-95 hover:bg-emerald-400"
              >
                <Gamepad2 size={16} />
                <span>{t('tplGame')}</span>
              </Link>
              <Link
                to={languagePath('/editor?template=portfolio', language)}
                className="flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-2xl border-b-4 border-rose-700 bg-rose-500 px-3 py-2.5 text-xs font-black text-white shadow-xs transition-transform hover:scale-105 active:scale-95 hover:bg-rose-400"
              >
                <Palette size={16} />
                <span>{t('tplPortfolio')}</span>
              </Link>
              <Link
                to={languagePath('/editor?template=space-story', language)}
                className="flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-2xl border-b-4 border-purple-800 bg-purple-600 px-3 py-2.5 text-xs font-black text-white shadow-xs transition-transform hover:scale-105 active:scale-95 hover:bg-purple-500"
              >
                <Rocket size={16} />
                <span>{t('tplStory')}</span>
              </Link>
              <Link
                to={languagePath('/editor?template=cyber-store', language)}
                className="flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-2xl border-b-4 border-amber-600 bg-amber-400 px-3 py-2.5 text-xs font-black text-amber-950 shadow-xs transition-transform hover:scale-105 active:scale-95 hover:bg-amber-300"
              >
                <UtensilsCrossed size={16} />
                <span>{t('tplStore')}</span>
              </Link>
              <Link
                to={languagePath('/editor?template=blank', language)}
                className="col-span-2 sm:col-span-1 flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-2xl border-b-4 border-slate-600 bg-slate-700 px-3 py-2.5 text-xs font-black text-white shadow-xs transition-transform hover:scale-105 active:scale-95 hover:bg-slate-600"
              >
                <Sparkles size={16} />
                <span>{t('tplBlank')}</span>
              </Link>
            </div>
          </div>

          {/* Minimalist Visual Canvas Preview */}
          <div className="mt-14 mx-auto max-w-4xl rounded-3xl border-3 border-purple-200 bg-white p-3.5 shadow-xl sm:p-5 text-left">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-purple-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-500" />
                <span className="size-3 rounded-full bg-amber-400" />
                <span className="size-3 rounded-full bg-emerald-500" />
                <span className="ml-2 font-mono text-[10px] sm:text-xs font-bold text-slate-400">uebit.editor/meu-site</span>
              </div>
              <span className="rounded-full bg-emerald-100 border border-emerald-300 px-3 py-0.5 text-xs font-black text-emerald-900">
                ● Flexbox Nativo
              </span>
            </div>

            <div className="mt-4 flex flex-col min-w-0 gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-12">
              {/* Palette with the 4 Colors: Amarelo, Roxo, Vermelho, Verde */}
              <div className="min-w-0 lg:col-span-3 rounded-2xl border-2 border-purple-100 bg-purple-50/50 p-3 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-purple-900 flex items-center gap-1">
                  <Boxes size={12} />
                  <span>Bandeja 4 Cores</span>
                </p>
                <div className="rounded-xl border-b-3 border-amber-600 bg-amber-500 p-2 text-amber-950 shadow-xs">
                  <span className="text-xs font-black">{t('textMedia')}</span>
                </div>
                <div className="rounded-xl border-b-3 border-purple-800 bg-purple-600 p-2 text-white shadow-xs">
                  <span className="flex items-center gap-1 text-xs font-black"><BrandIcon name="image" size={14} />{t('imageMedia')}</span>
                </div>
                <div className="rounded-xl border-b-3 border-rose-700 bg-rose-500 p-2 text-white shadow-xs">
                  <span className="text-xs font-black">{t('actionButton')}</span>
                </div>
                <div className="rounded-xl border-b-3 border-emerald-800 bg-emerald-600 p-2 text-white shadow-xs">
                  <span className="text-xs font-black">□ Container (Layout)</span>
                </div>
              </div>

              {/* Canvas Center with Pristine Sheet */}
              <div className="min-w-0 sm:col-span-2 sm:row-start-1 lg:col-span-6 lg:col-start-4 rounded-2xl border-2 border-purple-200 uebit-dot-backdrop p-3 sm:p-5 flex flex-col justify-center">
                <div className="rounded-2xl border-2 border-purple-100 bg-white p-3 sm:p-5 shadow-sm space-y-2.5">
                  <span className="inline-block rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-black text-purple-900">{t('myProject')}</span>
                  <h3 className="flex items-center gap-2 text-lg font-black text-slate-900">{t('hello')}<BrandIcon name="frog" size={22} className="text-emerald-600" /></h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{t('sampleDescription')}</p>
                  <div className="flex gap-2 pt-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 border-b-2 border-emerald-700 px-3.5 py-1 text-xs font-black text-white shadow-xs">
                      <MousePointerClick className="size-3" />{t('sampleAction')}</span>
                  </div>
                </div>
              </div>

              {/* Clean Code Output */}
              <div className="min-w-0 lg:col-span-3 rounded-2xl border-2 border-purple-100 bg-purple-50/50 p-3">
                <p className="text-[10px] font-black uppercase tracking-wider text-purple-900 flex items-center gap-1">
                  <CodeXml size={12} />
                  <span>{t('cleanCode')}</span>
                </p>
                <pre className="mt-2 font-mono text-[10px] text-slate-600 whitespace-pre-wrap break-words leading-relaxed">
                  {`<main class="site">\n  <h1>{t('hello')}</h1>\n  <button>Clique</button>\n</main>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="border-t-4 border-purple-200 bg-white py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="rounded-full bg-purple-100 border border-purple-300 px-4 py-1 text-xs font-black uppercase tracking-wider text-purple-900">{t('galleryBadge')}</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{t('galleryTitle')}</h2>
            <p className="mx-auto mt-3 max-w-md text-base font-medium text-slate-600">{t('galleryDescription')}</p>
          </div>

          {/* 3 Colorful Showcase Cards */}
          <div className="mt-8 flex flex-col gap-5 sm:mt-14 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {/* Card 1: Quiz & Game (Amarelo / Verde) */}
            <div className="group min-w-0 flex flex-col justify-between rounded-3xl border-3 border-amber-400 bg-amber-50/60 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-amber-400 text-amber-950 shadow-md group-hover:scale-110 transition-transform">
                    <Gamepad2 className="size-6" />
                  </span>
                  <span className="rounded-full bg-amber-200 border border-amber-300 px-3 py-0.5 text-xs font-black text-amber-950">{t('gameCategory')}</span>
                </div>
                <h3 className="mt-5 text-xl font-black text-amber-950">{t('gameTitle')}</h3>
                <p className="mt-2 text-sm font-semibold text-amber-900">{t('gameText')}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-950">{t('gameFeature1')}</span>
                  <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-950">{t('gameFeature2')}</span>
                </div>
              </div>

              <div className="mt-6 border-t-2 border-amber-200 pt-4">
                <Link
                  to={languagePath('/editor?template=quiz-game', language)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-b-4 border-amber-700 bg-amber-500 px-4 py-3 text-xs font-black text-amber-950 shadow-md transition-transform hover:scale-105 active:scale-95 hover:bg-amber-400"
                >
                  <Play className="size-3.5 fill-amber-950" />
                  <span>{t('gameAction')}</span>
                </Link>
              </div>
            </div>

            {/* Card 2: Creative Portfolio (Vermelho / Rose) */}
            <div className="group min-w-0 flex flex-col justify-between rounded-3xl border-3 border-rose-400 bg-rose-50/60 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-rose-500 text-white shadow-md group-hover:scale-110 transition-transform">
                    <Palette className="size-6" />
                  </span>
                  <span className="rounded-full bg-rose-200 border border-rose-300 px-3 py-0.5 text-xs font-black text-rose-950">{t('portfolioCategory')}</span>
                </div>
                <h3 className="mt-5 text-xl font-black text-rose-950">{t('portfolioTitle')}</h3>
                <p className="mt-2 text-sm font-semibold text-rose-900">{t('portfolioText')}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-rose-100 px-2.5 py-1 text-[11px] font-bold text-rose-950">{t('portfolioFeature1')}</span>
                  <span className="rounded-lg bg-rose-100 px-2.5 py-1 text-[11px] font-bold text-rose-950">{t('portfolioFeature2')}</span>
                </div>
              </div>

              <div className="mt-6 border-t-2 border-rose-200 pt-4">
                <Link
                  to={languagePath('/editor?template=portfolio', language)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-b-4 border-rose-700 bg-rose-500 px-4 py-3 text-xs font-black text-white shadow-md transition-transform hover:scale-105 active:scale-95 hover:bg-rose-400"
                >
                  <Play className="size-3.5 fill-white" />
                  <span>{t('portfolioAction')}</span>
                </Link>
              </div>
            </div>

            {/* Card 3: Interactive Story (Roxo Vibrante) */}
            <div className="group min-w-0 flex flex-col justify-between rounded-3xl border-3 border-purple-400 bg-purple-50/60 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-purple-600 text-white shadow-md group-hover:scale-110 transition-transform">
                    <Rocket className="size-6" />
                  </span>
                  <span className="rounded-full bg-purple-200 border border-purple-300 px-3 py-0.5 text-xs font-black text-purple-950">{t('storyCategory')}</span>
                </div>
                <h3 className="mt-5 text-xl font-black text-purple-950">{t('storyTitle')}</h3>
                <p className="mt-2 text-sm font-semibold text-purple-900">{t('storyText')}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-purple-100 px-2.5 py-1 text-[11px] font-bold text-purple-950">{t('storyFeature1')}</span>
                  <span className="rounded-lg bg-purple-100 px-2.5 py-1 text-[11px] font-bold text-purple-950">{t('storyFeature2')}</span>
                </div>
              </div>

              <div className="mt-6 border-t-2 border-purple-200 pt-4">
                <Link
                  to={languagePath('/editor?template=space-story', language)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-b-4 border-purple-800 bg-purple-600 px-4 py-3 text-xs font-black text-white shadow-md transition-transform hover:scale-105 active:scale-95 hover:bg-purple-500"
                >
                  <Play className="size-3.5 fill-white" />
                  <span>{t('storyAction')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Minimalist Educational Footer com o Sapinho Sorridente */}
      <footer className="mt-auto border-t-4 border-purple-200 bg-white py-12 text-slate-500">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="flex shrink-0 items-center gap-3">
              <UebitLogo size={36} variant="full" animated />
            </div>

            {/* Declaration required by tests */}
            <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/70 px-5 py-3 min-w-0 max-w-full text-center lg:text-left">
              <p className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-black text-purple-900">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                <span>{t('footerSource')}</span>
              </p>
              <p className="mt-1 text-xs text-slate-600 font-medium">{t('footerText')}</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Link
                to={languagePath('/editor', language)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-b-4 border-emerald-700 bg-emerald-500 px-3 py-2.5 sm:px-5 text-xs font-black text-white shadow-md hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="size-3.5 fill-white" />
                <span>{t('goEditor')}</span>
              </Link>
              <Link to={languagePath('/marca', language)} className="inline-flex min-h-11 items-center text-center text-sm font-bold text-purple-700 underline decoration-purple-200 underline-offset-4 hover:decoration-purple-600">{t('footerBrand')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
