'use client'

import {
  Truck, DeviceMobile, Wallet, Broadcast, Wrench, ChartBar, Package, ShippingContainer,
  LinkSimple, Camera, Bank, Briefcase, Shield, Storefront, GasPump, FileText, CurrencyDollar,
  MapTrifold, ClipboardText, Siren, HandHeart, Lamp, Coins, Lock, Clock, Phone, Users,
  CreditCard, Gear, Path, TrendUp, Handshake, User, FolderOpen, Receipt,
  UserGear, Calculator, Sparkle, BookOpen, MagnifyingGlass, ArrowFatLineDown, ArrowFatLineUp,
  UserCircle, HardHat, Stack, Barcode, ChartBarHorizontal, Buildings, Database, Calendar,
  EnvelopeSimple, MapPin, Check, CheckCircle,
  type IconProps as PhosphorIconProps,
} from '@phosphor-icons/react'
import type { IconName } from './icon'

const DUOTONE_MAP: Record<IconName, React.ComponentType<PhosphorIconProps>> = {
  truck: Truck,
  smartphone: DeviceMobile,
  wallet: Wallet,
  satellite: Broadcast,
  wrench: Wrench,
  'bar-chart': ChartBar,
  package: Package,
  container: ShippingContainer,
  link: LinkSimple,
  camera: Camera,
  landmark: Bank,
  briefcase: Briefcase,
  shield: Shield,
  store: Storefront,
  fuel: GasPump,
  'file-text': FileText,
  banknote: CurrencyDollar,
  map: MapTrifold,
  'clipboard-list': ClipboardText,
  siren: Siren,
  'hand-heart': HandHeart,
  lamp: Lamp,
  coins: Coins,
  lock: Lock,
  clock: Clock,
  phone: Phone,
  users: Users,
  'credit-card': CreditCard,
  settings: Gear,
  route: Path,
  'trending-up': TrendUp,
  handshake: Handshake,
  user: User,
  folder: FolderOpen,
  receipt: Receipt,
  'user-cog': UserGear,
  calculator: Calculator,
  sparkles: Sparkle,
  book: BookOpen,
  search: MagnifyingGlass,
  'arrow-down': ArrowFatLineDown,
  'arrow-up': ArrowFatLineUp,
  'user-circle': UserCircle,
  'hard-hat': HardHat,
  boxes: Stack,
  'scan-barcode': Barcode,
  'file-bar-chart': ChartBarHorizontal,
  'building-2': Buildings,
  database: Database,
  calendar: Calendar,
  mail: EnvelopeSimple,
  'map-pin': MapPin,
  check: Check,
  'check-circle': CheckCircle,
}

/**
 * Phosphor duotone icon — 同一組 IconName，視覺更精緻有層次。
 * 用於 hero/painpoints/feature 等需要重點視覺的場合，搭配 lucide 並存。
 */
export function DuotoneIcon({
  name,
  className,
  size = 24,
  ...props
}: { name: IconName } & Omit<PhosphorIconProps, 'weight'>) {
  const Component = DUOTONE_MAP[name]
  return <Component weight="duotone" size={size} className={className} {...props} />
}
