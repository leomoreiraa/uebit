import { brandAsset } from '../lib/brand-assets'

const INLINE_ICONS = {
  break: (
    <>
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  strong: (
    <>
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </>
  ),
  em: (
    <>
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </>
  ),
  span: (
    <>
      <path d="M4 7V4h16v3" />
      <path d="M9 20h6" />
      <path d="M12 4v16" />
    </>
  ),
  'ordered-list': (
    <>
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </>
  ),
  textarea: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="7" y1="16" x2="13" y2="16" />
    </>
  ),
  select: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <polyline points="8 10 12 14 16 10" />
    </>
  ),
  checkbox: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <polyline points="9 12 11 14 15 9" />
    </>
  ),
  form: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="7" y1="16" x2="13" y2="16" />
    </>
  ),
  header: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="7" y1="6" x2="17" y2="6" />
    </>
  ),
  footer: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="7" y1="18" x2="17" y2="18" />
    </>
  ),
  nav: (
    <>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </>
  ),
  article: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="16" y2="11" />
      <line x1="8" y1="15" x2="12" y2="15" />
    </>
  ),
  aside: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </>
  ),
  table: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </>
  ),
  iframe: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </>
  ),
}

export default function BrandIcon({ name, size = 24, title, ...props }) {
  const inline = INLINE_ICONS[name]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {inline ? inline : <use href={`${brandAsset('icons.svg')}#${name}`} />}
    </svg>
  )
}

export function CodeXml(props) { return <BrandIcon name="code" {...props} /> }
export function Download(props) { return <BrandIcon name="export" {...props} /> }
export function LayoutTemplate(props) { return <BrandIcon name="design" {...props} /> }
export function Play(props) { return <BrandIcon name="play" {...props} /> }
export function Square(props) { return <BrandIcon name="stop" {...props} /> }
export function Save(props) { return <BrandIcon name="save" {...props} /> }
export function Upload(props) { return <BrandIcon name="import" {...props} /> }
export function Sparkles(props) { return <BrandIcon name="spark" {...props} /> }
export function Blocks(props) { return <BrandIcon name="blocks" {...props} /> }
export function Rocket(props) { return <BrandIcon name="rocket" {...props} /> }
export function Gamepad2(props) { return <BrandIcon name="game" {...props} /> }
export function Palette(props) { return <BrandIcon name="palette" {...props} /> }
export function ArrowRight(props) { return <BrandIcon name="arrow" {...props} /> }
export function CheckCircle2(props) { return <BrandIcon name="check" {...props} /> }
export function MousePointerClick(props) { return <BrandIcon name="pointer" {...props} /> }
export function Boxes(props) { return <BrandIcon name="bits" {...props} /> }
