interface Testimonial {
  name: string
  text: string
  rating?: number
  location?: string
}

interface Props {
  props: Record<string, unknown>
  content: Record<string, unknown>
}

const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah M.',
    location: 'London',
    rating: 5,
    text: 'Absolutely stunning engagement ring. The craftsmanship is exceptional and the team guided us every step of the way.',
  },
  {
    name: 'James & Clara',
    location: 'Edinburgh',
    rating: 5,
    text: 'We commissioned our wedding bands here. The bespoke service was personal, professional and the result was beyond our expectations.',
  },
  {
    name: 'Emma T.',
    location: 'Bristol',
    rating: 5,
    text: 'My grandmother\'s ring was restored beautifully. You can\'t even tell it had been damaged. Incredible work.',
  },
]

export default function TestimonialsSection({ content }: Props) {
  const heading = (content.heading as string) || 'What Our Clients Say'
  const testimonials =
    ((content.testimonials as Testimonial[]) || []).length
      ? (content.testimonials as Testimonial[])
      : DEMO_TESTIMONIALS

  return (
    <section className="py-20 px-6 bg-nexpura-forest">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl text-white mb-3">{heading}</h2>
          <div className="w-16 h-0.5 bg-nexpura-gold mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              {t.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-nexpura-gold text-sm">★</span>
                  ))}
                </div>
              )}
              <p className="text-white/80 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="text-white font-medium text-sm">{t.name}</p>
                {t.location && <p className="text-white/40 text-xs mt-0.5">{t.location}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
