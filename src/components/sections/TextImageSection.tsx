interface Props {
  props: Record<string, unknown>
  content: Record<string, unknown>
}

export default function TextImageSection({ props, content }: Props) {
  const heading = (content.heading as string) || 'Our Story'
  const body = (content.body as string) || 'Tell your story here...'
  const imageUrl = content.imageUrl as string | null
  const imageSide = (props.imageSide as 'left' | 'right') || 'right'
  const ctaText = content.ctaText as string | undefined
  const ctaLink = (content.ctaLink as string) || '#'

  const imageBlock = (
    <div className="flex-1">
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={heading} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300 text-6xl">
            🏺
          </div>
        )}
      </div>
    </div>
  )

  const textBlock = (
    <div className="flex-1 flex flex-col justify-center">
      <p className="text-xs uppercase tracking-[0.3em] text-nexpura-mint mb-4">About Us</p>
      <h2 className="font-playfair text-4xl md:text-5xl text-gray-900 mb-6 leading-tight">{heading}</h2>
      <p className="text-gray-500 leading-relaxed text-lg">{body}</p>
      {ctaText && (
        <div className="mt-8">
          <a
            href={ctaLink}
            className="inline-block px-8 py-3 border border-nexpura-forest text-nexpura-forest text-sm tracking-widest uppercase hover:bg-nexpura-forest hover:text-white transition-colors"
          >
            {ctaText}
          </a>
        </div>
      )}
    </div>
  )

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col md:flex-row gap-16 items-center ${imageSide === 'left' ? 'md:flex-row-reverse' : ''}`}>
          {textBlock}
          {imageBlock}
        </div>
      </div>
    </section>
  )
}
