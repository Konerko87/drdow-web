import { ContactForm } from './contact-form'
import { FadeIn } from '@/components/ui/fade-in'

type InlineLeadFormVariant = 'temple' | 'logistics'

interface InlineLeadFormProps {
  source: 'miaotong' | 'tms' | 'wms' | 'erp'
  variant?: InlineLeadFormVariant
  title?: string
  subtitle?: string
}

const DEFAULT_COPY: Record<string, { title: string; subtitle: string; variant: InlineLeadFormVariant }> = {
  miaotong: {
    title: '想看廟通實際操作？',
    subtitle: '留下聯絡方式，我們安排 30 分鐘線上展示，依貴宮廟的實際流程做說明。完全免費、無需預付。',
    variant: 'temple',
  },
  tms: {
    title: '想看 TMS 派車實機操作？',
    subtitle: '留下聯絡方式，我們安排 30 分鐘線上展示，用您的車隊規模實際走一次派車到結算流程。完全免費。',
    variant: 'logistics',
  },
  wms: {
    title: '想看 WMS 倉儲實機操作？',
    subtitle: '留下聯絡方式，我們安排 30 分鐘線上展示，依您的倉儲規模實際走一次入庫到出貨流程。完全免費。',
    variant: 'logistics',
  },
  erp: {
    title: '想看 ERP 財務系統實機操作？',
    subtitle: '留下聯絡方式，我們安排 30 分鐘線上展示，依您的對帳與請款流程做說明。完全免費。',
    variant: 'logistics',
  },
}

export function InlineLeadForm({ source, variant, title, subtitle }: InlineLeadFormProps) {
  const defaults = DEFAULT_COPY[source]
  const finalVariant = variant ?? defaults.variant
  const finalTitle = title ?? defaults.title
  const finalSubtitle = subtitle ?? defaults.subtitle

  const isTemple = finalVariant === 'temple'

  return (
    <section
      className="relative py-20 md:py-24 overflow-hidden"
      aria-label={`${source} 預約展示表單`}
      style={{
        background: isTemple
          ? 'linear-gradient(180deg, #fef7f2 0%, #fdf3e7 100%)'
          : '#F8FAFC',
      }}
    >
      {isTemple && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(185,28,28,0.10) 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
            opacity: 0.55,
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0, #000 18%, #000 82%, transparent 100%)',
            maskImage: 'linear-gradient(180deg, transparent 0, #000 18%, #000 82%, transparent 100%)',
          }}
        />
      )}

      <div className="relative max-w-3xl mx-auto px-6">
        <FadeIn className="text-center mb-10">
          {isTemple && (
            <span className="inline-flex items-center gap-2.5 text-xs font-mono font-medium uppercase tracking-[0.16em] text-[#B91C1C] mb-4">
              <span className="w-7 h-px bg-[#B91C1C]/60" />
              預約展示
              <span className="w-7 h-px bg-[#B91C1C]/60" />
            </span>
          )}
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-4xl font-bold mb-3 tracking-tight text-dark">
            {finalTitle}
          </h2>
          <p className="text-base md:text-lg text-[#6b5b4a] max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div
            className={
              isTemple
                ? 'bg-white rounded-2xl p-6 md:p-8 border border-[#B91C1C]/[0.08] shadow-[0_8px_24px_rgba(185,28,28,0.06)]'
                : 'bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]'
            }
          >
            <ContactForm source={source} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
