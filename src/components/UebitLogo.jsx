import { brandAsset } from '../lib/brand-assets'

export default function UebitLogo({ variant = 'full', size = 40, className = '', animated = false }) {
  const compact = variant === 'icon' || variant === 'mark'
  return <span className={`inline-flex shrink-0 items-center ${animated ? 'uebit-logo-motion' : ''} ${className}`}>
    <img src={brandAsset(compact ? 'uebit-symbol.svg' : 'uebit-logo.svg')} alt="Uebit" width={compact ? size : size * 330 / 96} height={size} className="block max-w-full" draggable="false" />
  </span>
}
