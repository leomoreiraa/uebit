import { useState } from 'react'
import { Link } from 'react-router-dom'
import UebitLogo from '../components/UebitLogo'
import BrandIcon from '../components/BrandIcon'
import { BRAND_ASSETS, BRAND_ICONS, brandAsset, downloadBrandIcon, downloadBrandKit } from '../lib/brand-assets'

const colors = [
  ['Roxo ideia', '#7145D6', '#ffffff'], ['Verde sapinho', '#78E59B', '#24203D'], ['Verde ação', '#21824F', '#ffffff'],
  ['Amarelo bit', '#FFD56A', '#24203D'], ['Coral pulso', '#D84062', '#ffffff'], ['Tinta', '#24203D', '#ffffff'], ['Papel', '#FAF9F3', '#24203D'],
]

export default function BrandPage() {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  async function download(action, label) {
    if (busy) return
    setBusy(true); setError(''); setMessage('')
    try { await action(); setMessage(`${label} pronto para baixar.`) }
    catch (failure) { setError(failure.message || 'Não foi possível baixar. Tente novamente.') }
    finally { setBusy(false) }
  }

  return <div className="uebit-brand-page min-h-dvh text-slate-900">
    <header className="border-b border-purple-100 bg-white/90 px-5 py-5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <Link to="/" aria-label="Uebit — início"><UebitLogo size={44} /></Link>
        <nav className="flex gap-4 text-sm font-bold"><Link to="/" className="hover:text-purple-700">Início</Link><Link to="/editor" className="text-purple-700">Abrir editor →</Link></nav>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-5 pb-20">
      <section className="grid items-center gap-6 py-12 md:grid-cols-[1.1fr_1fr] md:py-20" aria-labelledby="brand-heading">
        <div>
          <p className="uebit-eyebrow">Universo Uebit / guia da marca</p>
          <h1 id="brand-heading" className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-6xl">Sua ideia<br /><span className="text-purple-600">dá um salto.</span></h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">Web para explorar. Bits para construir. Um sapinho para lembrar que aprender também pode ser uma brincadeira.</p>
          <p className="mt-3 text-xs text-slate-500">ZIP com SVGs, 30 ícones individuais, tokens CSS e guia de uso.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={() => download(downloadBrandKit, 'Kit de identidade visual')}
              className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-sm font-black text-white shadow-md hover:bg-purple-500 disabled:opacity-50"
            >
              <BrandIcon name="export" size={18} />
              <span>Baixar kit de identidade visual</span>
            </button>
          </div>
          {message && <p role="status" className="mt-3 text-sm text-emerald-700">{message}</p>}
          {error && <p role="alert" className="mt-3 text-sm text-rose-700">{error}</p>}
        </div>
        <img src={brandAsset('uebit-mascot.svg')} alt="Bit, o sapinho do Uebit, criando um site sobre uma vitória-régia" width="560" height="440" className="w-full" />
      </section>

      <section aria-labelledby="concept-heading" className="rounded-3xl bg-white p-6 ring-1 ring-purple-100 sm:p-8">
        <h2 id="concept-heading" className="text-2xl font-extrabold">Um nome. Três pequenas descobertas.</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            ['web', 'Web', 'Uma janela aberta para criar e compartilhar. O desenho dos ícones lembra janelas de navegador.'],
            ['bits', 'Bit', 'Pequenas peças, grandes possibilidades. Pixels aparecem nos olhos do mascote e no ponto do “i”.'],
            ['frog', 'Ué-bit!', 'Nosso jeito brincalhão de ouvir um sapo. O balão de som dá voz às ideias; Bit é o companheiro dessa descoberta.'],
          ].map(([icon, title, text]) => <div key={icon}><span className="mb-3 grid size-12 place-items-center rounded-2xl bg-purple-50 text-purple-700"><BrandIcon name={icon} size={28} /></span><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>)}
        </div>
      </section>

      <section aria-labelledby="logos-heading" className="mt-14">
        <p className="uebit-eyebrow">01 / assinaturas</p><h2 id="logos-heading" className="mt-2 text-3xl font-extrabold">Uma marca que sorri.</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {BRAND_ASSETS.slice(0, 4).map(([file, label]) => <figure key={file} className="overflow-hidden rounded-3xl border border-purple-100 bg-white">
            <div className={`flex h-44 items-center justify-center p-9 ${file.includes('negative') ? 'bg-[#24203d]' : 'uebit-brand-checker'}`}><img src={brandAsset(file)} alt={label} className="max-h-24 max-w-full" width={file.includes('symbol') ? 96 : 330} height="96" loading="lazy" /></div>
            <figcaption className="flex items-center justify-between gap-3 p-4 text-sm"><span className="font-bold">{label}</span><a href={brandAsset(file)} download={file} aria-label={`Baixar ${label}`} className="rounded-lg px-2 py-2 font-bold text-purple-700 hover:bg-purple-50">SVG ↓</a></figcaption>
          </figure>)}
        </div>
        <p className="mt-3 text-sm text-slate-600">Letras vetorizadas: a marca não depende de fontes instaladas. Versão negativa para fundos escuros e monocromática para impressão.</p>
      </section>

      <section aria-labelledby="colors-heading" className="mt-14">
        <p className="uebit-eyebrow">02 / cores</p><h2 id="colors-heading" className="mt-2 text-3xl font-extrabold">Um lago de possibilidades.</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">{colors.map(([name, hex, text]) => <div key={hex} className="rounded-2xl border border-black/10 p-4" style={{ backgroundColor: hex, color: text }}><div className="h-12" /><h3 className="text-sm font-bold">{name}</h3><code className="mt-2 block text-xs">{hex}</code></div>)}</div>
        <p className="mt-4 text-sm text-slate-600">Texto escuro sobre verde claro e amarelo; texto branco sobre roxo, verde ação e coral.</p>
      </section>

      <section aria-labelledby="icons-heading" className="mt-14">
        <p className="uebit-eyebrow">03 / iconografia</p><h2 id="icons-heading" className="mt-2 text-3xl font-extrabold">Pequenos sinais. Grandes ideias.</h2>
        <p className="mt-3 text-slate-600">Grade de 24 px, traços arredondados e a mesma linguagem dos blocos. Clique em um ícone para baixar seu SVG.</p>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-6">{BRAND_ICONS.map(([id, label]) => <button key={id} type="button" disabled={busy} aria-label={`Baixar ícone ${label}`} onClick={() => download(() => downloadBrandIcon(id), `Ícone ${label}`)} className="group flex min-h-28 flex-col items-center justify-center gap-3 rounded-2xl border border-purple-100 bg-white p-3 text-purple-800 transition-colors hover:border-purple-400 hover:bg-purple-50 disabled:opacity-50"><BrandIcon name={id} size={30} /><span className="text-xs font-bold">{label}</span></button>)}</div>
      </section>

      <section aria-labelledby="art-heading" className="mt-14">
        <p className="uebit-eyebrow">04 / universo gráfico</p><h2 id="art-heading" className="mt-2 text-3xl font-extrabold">Conheça o Bit.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <figure className="rounded-3xl border border-purple-100 bg-white p-5"><img src={brandAsset('uebit-mascot.svg')} alt="Mascote Bit com seu computador" width="560" height="440" loading="lazy" className="mx-auto max-h-72 w-full" /><figcaption className="mt-3 flex items-center justify-between text-sm"><span>Curioso, acolhedor e sempre criando.</span><a className="font-bold text-purple-700" href={brandAsset('uebit-mascot.svg')} download>SVG ↓</a></figcaption></figure>
          <figure className="overflow-hidden rounded-3xl border border-purple-100 bg-white"><div className="h-72 bg-repeat" style={{ backgroundImage: `url(${brandAsset('uebit-pattern.svg')})` }} /><figcaption className="flex items-center justify-between p-5 text-sm"><span>Bits, ondas e sinais de código.</span><a className="font-bold text-purple-700" href={brandAsset('uebit-pattern.svg')} download>SVG ↓</a></figcaption></figure>
        </div>
        <figure className="mt-4 overflow-hidden rounded-3xl border border-purple-100 bg-white"><img src={brandAsset('uebit-cover.svg')} alt="Capa Uebit: Sua ideia dá um salto" width="1200" height="630" loading="lazy" className="w-full" /><figcaption className="flex justify-between gap-4 p-5 text-sm"><span>Capa para apresentações e materiais educativos.</span><a className="font-bold text-purple-700" href={brandAsset('uebit-cover.svg')} download>SVG ↓</a></figcaption></figure>
      </section>

      <section aria-labelledby="type-heading" className="mt-14 grid gap-6 rounded-3xl bg-[#24203d] p-7 text-white sm:grid-cols-2 sm:p-10">
        <div><p className="text-xs font-bold tracking-widest text-[#78e59b] uppercase">05 / tipografia e voz</p><h2 id="type-heading" className="mt-4 text-3xl font-extrabold">Uma peça de cada vez.</h2><p className="mt-4 leading-7 text-white/75">Letras amigáveis, instruções claras e incentivo para experimentar. A interface usa fontes do sistema; o código tem seu espaço monoespaçado.</p></div>
        <div className="flex flex-col justify-center gap-4"><p className="text-5xl font-black tracking-tight">Aa Bb 01</p><code className="rounded-xl bg-white/10 p-4 text-sm text-[#78e59b]">const ideia = &apos;vamos criar!&apos;;</code><div className="flex flex-wrap gap-4 text-sm font-bold"><a href={brandAsset('guia.md')} download className="text-[#ffd56a]">Baixar guia completo ↓</a><a href={brandAsset('tokens.css')} download className="text-[#ffd56a]">Baixar tokens CSS ↓</a></div></div>
      </section>
    </main>
    <footer className="border-t border-purple-100 px-5 py-7 text-center text-sm text-slate-600">Uebit · Feito para aprender, experimentar e dar o próximo salto.</footer>
  </div>
}
