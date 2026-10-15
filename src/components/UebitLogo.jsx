import React from 'react'

/**
 * UebitLogo
 * Identidade visual da marca Uebit:
 * Ícone do rostinho de sapinho sorrindo nas 4 cores clássicas da marca:
 * - Verde (#22C55E): Rosto e energia do sapinho (call-to-action).
 * - Roxo (#7C3AED): Criatividade, tecnologia e imaginação.
 * - Amarelo (#FACC15): Brilho, bits e curiosidade.
 * - Vermelho (#EF4444): Bochechas amigáveis e entusiasmo.
 */
function FrogIcon({ size = 40, animated = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${animated ? 'transition-transform duration-300 hover:scale-110 hover:rotate-3' : ''}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="uebit-purple-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>

      {/* Container Roxo com relevo inferior chunky */}
      <rect x="2" y="2" width="44" height="44" rx="14" fill="#4C1D95" />
      <rect x="2" y="2" width="44" height="41" rx="14" fill="url(#uebit-purple-bg)" />

      {/* Olhos do Sapinho no topo (Verde) */}
      <circle cx="15" cy="17" r="7.5" fill="#15803D" />
      <circle cx="15" cy="16" r="7.5" fill="#22C55E" />
      <circle cx="33" cy="17" r="7.5" fill="#15803D" />
      <circle cx="33" cy="16" r="7.5" fill="#22C55E" />

      {/* Olhos brancos */}
      <circle cx="15" cy="15.5" r="5" fill="#FFFFFF" />
      <circle cx="33" cy="15.5" r="5" fill="#FFFFFF" />
      
      {/* Pupilas pretas com brilho cativante */}
      <circle cx="16" cy="15.5" r="3" fill="#0F172A" />
      <circle cx="32" cy="15.5" r="3" fill="#0F172A" />
      <circle cx="17.2" cy="14.3" r="1.2" fill="#FFFFFF" />
      <circle cx="33.2" cy="14.3" r="1.2" fill="#FFFFFF" />
      <circle cx="14.8" cy="16.5" r="0.6" fill="#FFFFFF" />
      <circle cx="30.8" cy="16.5" r="0.6" fill="#FFFFFF" />

      {/* Rosto do Sapinho Sorridente (Verde) */}
      <path d="M7 26 C7 18, 13 17, 24 17 C35 17, 41 18, 41 26 C41 35, 34 38, 24 38 C14 38, 7 35, 7 26 Z" fill="#15803D" />
      <path d="M7 25 C7 17, 13 16, 24 16 C35 16, 41 17, 41 25 C41 34, 34 37, 24 37 C14 37, 7 34, 7 25 Z" fill="#22C55E" />

      {/* Detalhe Amarelo Tecnológico / Bit Sparkle entre os olhos */}
      <path d="M24 10 L25.2 13 L28 14.2 L25.2 15.4 L24 18.2 L22.8 15.4 L20 14.2 L22.8 13 Z" fill="#FACC15" />

      {/* Bochechas Vermelhas fofas */}
      <ellipse cx="11.5" cy="27" rx="3.5" ry="2" fill="#EF4444" opacity="0.85" />
      <ellipse cx="36.5" cy="27" rx="3.5" ry="2" fill="#EF4444" opacity="0.85" />

      {/* Sorrisão do Sapinho Aberto e Feliz */}
      <path d="M16 25 C16 33.5, 32 33.5, 32 25" fill="#991B1B" />
      <path d="M19.5 29 C21.5 32.5, 26.5 32.5, 28.5 29 Z" fill="#F87171" />
      <path d="M15 25 C15.5 34, 32.5 34, 33 25" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export default function UebitLogo({
  variant = 'full', // 'icon' | 'full' | 'mark'
  size = 40,
  className = '',
  animated = false,
}) {
  const iconSize = typeof size === 'number' ? size : 40

  if (variant === 'icon') {
    return <FrogIcon size={iconSize} animated={animated} />
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <FrogIcon size={iconSize} animated={animated} />
      {variant !== 'mark' && (
        <div className="flex flex-col select-none leading-none">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center">
              <span>Ue</span>
              <span className="text-purple-600">b</span>
              <span className="relative">
                i
                {/* O ponto do "i" é um bit amarelo/verde brilhante */}
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 size-1.5 rounded-xs bg-amber-400 shadow-xs" />
              </span>
              <span className="text-emerald-600">t</span>
            </span>
            {/* Tag harmonizada nas cores amarelo/verde/vermelho */}
            <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-black text-amber-900 tracking-wide uppercase">
              beta
            </span>
          </div>
          <span className="text-[10px] font-black tracking-wider text-purple-700 uppercase mt-0.5 flex items-center gap-1">
            <span>Web</span>
            <span className="text-rose-500">&middot;</span>
            <span>Bit</span>
            <span className="text-amber-500">&middot;</span>
            <span className="text-emerald-600">Ribbit</span>
          </span>
        </div>
      )}
    </div>
  )
}
