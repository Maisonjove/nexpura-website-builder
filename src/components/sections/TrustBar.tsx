interface TrustItem {
  icon: string
  label: string
}

interface TrustBarProps {
  props: Record<string, unknown>
  content: Record<string, unknown>
}

const DEFAULT_ITEMS: TrustItem[] = [
  { icon: '💎', label: 'Certified Diamonds' },
  { icon: '🔒', label: 'Digital Passport' },
  { icon: '✨', label: 'Lifetime Warranty' },
  { icon: '🚚', label: 'Free Shipping' },
]

export default function TrustBar({ content }: TrustBarProps) {
  const items = (content.items as TrustItem[] | undefined) || DEFAULT_ITEMS

  return (
    <section className="bg-stone-50 border-y border-stone-200 py-5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-gray-600">
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs font-medium tracking-wide uppercase">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
