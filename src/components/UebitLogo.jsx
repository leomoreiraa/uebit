import React from 'react'

/**
 * UebitLogo
 * Identidade visual da marca Uebit:
 * Fusão conceitual de "Ribbit" (sapo), "Web" (nós de rede/conexões) e "Bit" (pixels/blocos).
 * 
 * Cores:
 * - Roxo Vibrante (#7C3AED / #6D28D9): Criatividade, imaginação e tecnologia.
 * - Verde Sapo (#22C55E / #4ADE80 / #10B981): Energia, ludicidade e ação (call-to-action).
 */
export default function UebitLogo({
  variant = 'full', // 'icon' | 'full' | 'mark'
  size = 40,
  className = '',
  animated = false,
}) {
  const iconSize = typeof size === 'number' ? size : 40

  // Ícone minimalista e lúdico: Rosto de sapinho feito com blocos/pixels (bits) e nós de conexão (web)
  const FrogIcon = ({ size: s = iconSize }) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${animated ? 'transition-transform duration-300 hover:scale-110 hover:rotate-3' : ''}`}
      aria-hidden="true"
    >
      <defs>
        {/* Gradiente Roxo Vibrante da Marca */}
        <linearGradient id="uebit-purple-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>

        {/* Gradiente Verde Sapo Neon */}
        <linearGradient id="uebit-frog-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>

        {/* Sombra interna para o relevo skeuomórfico sutil */}
        <filter id="uebit-shadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="#4C1D95" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Base externa: Bloco arredondado em Roxo Vibrante com chanfro/sombra chunky */}
      <rect x="3" y="3" width="42" height="42" rx="14" fill="#4C1D95" />
      <rect x="3" y="3" width="42" height="39" rx="14" fill="url(#uebit-purple-grad)" />

      {/* Linhas de conexão (Web Network / Bus de dados) */}
      <path
        d="M14 17 L24 12 L34 17 M24 12 L24 23 M14 17 L14 26 M34 17 L34 26"
        stroke="#A78BFA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 3"
        opacity="0.75"
      />

      {/* Olhos do Sapinho: Blocos/Pixels proeminentes tipo Lego/Bit */}
      {/* Olho Esquerdo */}
      <rect x="9" y="9" width="12" height="12" rx="4" fill="#22C55E" />
      <rect x="10.5" y="10.5" width="9" height="9" rx="3" fill="#FFFFFF" />
      <rect x="13" y="13" width="5" height="5" rx="1.5" fill="#1E1B4B" />
      {/* Ponto de luz pixel/bit no olho */}
      <rect x="15" y="12" width="2" height="2" fill="#4ADE80" />

      {/* Olho Direito */}
      <rect x="27" y="9" width="12" height="12" rx="4" fill="#22C55E" />
      <rect x="28.5" y="10.5" width="9" height="9" rx="3" fill="#FFFFFF" />
      <rect x="30" y="13" width="5" height="5" rx="1.5" fill="#1E1B4B" />
      {/* Ponto de luz pixel/bit no olho */}
      <rect x="32" y="12" width="2" height="2" fill="#4ADE80" />

      {/* Nó Central na testa: Bit & Web Hub */}
      <rect x="22" y="10" width="4" height="4" rx="1" fill="#4ADE80" />

      {/* Bochechas Digitais / Nós laterais (Verde Sapo) */}
      <circle cx="11" cy="29" r="2.5" fill="#4ADE80" opacity="0.9" />
      <circle cx="37" cy="29" r="2.5" fill="#4ADE80" opacity="0.9" />

      {/* Boca do Sapinho: Sorriso estilizado em arco com nós nas pontas */}
      <path
        d="M17 28 C19 34, 29 34, 31 28"
        stroke="#F8FAFC"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Língua / Destaque sutil Verde Sapo no sorriso */}
      <circle cx="24" cy="30.5" r="2" fill="#22C55E" />

      {/* Mini pixels/bits de conexão no queixo */}
      <rect x="19" y="37" width="2.5" height="2.5" rx="0.5" fill="#A78BFA" opacity="0.8" />
      <rect x="23" y="37" width="2.5" height="2.5" rx="0.5" fill="#4ADE80" />
      <rect x="27" y="37" width="2.5" height="2.5" rx="0.5" fill="#A78BFA" opacity="0.8" />
    </svg>
  )

  if (variant === 'icon') {
    return <FrogIcon size={iconSize} />
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <FrogIcon size={iconSize} />
      {variant !== 'mark' && (
        <div className="flex flex-col select-none leading-none">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center">
              <span>Ue</span>
              <span className="text-purple-600">b</span>
              <span className="relative">
                i
                {/* O ponto do "i" é um bit verde brilhante */}
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 size-1.5 rounded-xs bg-lime-500 shadow-xs" />
              </span>
              <span>t</span>
            </span>
            <span className="rounded-full bg-lime-100 border border-lime-300 px-2 py-0.5 text-[10px] font-black text-lime-900 tracking-wide uppercase">
              beta
            </span>
          </div>
          <span className="text-[10px] font-black tracking-wider text-purple-700 uppercase mt-0.5">
            Web &middot; Bit &middot; Ribbit
          </span>
        </div>
      )}
    </div>
  )
}
