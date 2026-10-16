import { brandAsset } from '../lib/brand-assets'

export default function BrandIcon({ name, size = 24, title, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false" {...props}>
    <use href={`${brandAsset('icons.svg')}#${name}`} />
  </svg>
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
