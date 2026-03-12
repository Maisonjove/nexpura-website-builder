interface HeroProps {
  props: Record<string, unknown>
  content: Record<string, unknown>
}

export default function HeroSection({ props, content }: HeroProps) {
  const imageUrl = content.imageUrl as string | null
  const heading = (content.heading as string) || 'Crafted for a Lifetime'
  const subheading = (content.subheading as string) || ''
  const ctaText = (content.ctaText as string) || 'Shop Now'
  const ctaLink = (content.ctaLink as string) || '#'
  const overlay = props.overlay !== false
  const ctaStyle = (props.ctaStyle as string) || 'filled'

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={heading}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 40%, #52B788 100%)',
          }}
        />
      )}

      {/* Overlay */}
      {overlay && imageUrl && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-6 font-light">
          Fine Jewellery
        </p>
        <h1 className="font-playfair text-5xl md:text-7xl font-light leading-tight mb-6">
          {heading}
        </h1>
        {subheading && (
          <p className="text-lg md:text-xl text-white/80 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            {subheading}
          </p>
        )}
        <a
          href={ctaLink}
          className={`inline-block px-10 py-4 text-sm tracking-widest uppercase transition-all duration-300 ${
            ctaStyle === 'outline'
              ? 'border border-white text-white hover:bg-white hover:text-gray-900'
              : 'bg-white text-gray-900 hover:bg-white/90'
          }`}
        >
          {ctaText}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <div className="w-px h-8 bg-white/30 animate-pulse" />
      </div>
    </section>
  )
}
