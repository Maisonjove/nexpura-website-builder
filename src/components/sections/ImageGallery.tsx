interface GalleryImage {
  url: string
  alt?: string
}

interface Props {
  props: Record<string, unknown>
  content: Record<string, unknown>
}

export default function ImageGallery({ props, content }: Props) {
  const images = (content.images as GalleryImage[]) || []
  const columns = (props.columns as number) || 3
  const aspect = (props.aspect as 'square' | 'portrait' | 'landscape') || 'square'

  const gridCols = columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'
  const aspectClass = aspect === 'portrait' ? 'aspect-[3/4]' : aspect === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'

  if (images.length === 0) {
    return (
      <section className="py-16 px-6">
        <div className={`max-w-6xl mx-auto grid ${gridCols} gap-3`}>
          {Array.from({ length: columns * 2 }).map((_, i) => (
            <div key={i} className={`${aspectClass} bg-stone-100 rounded-lg flex items-center justify-center text-stone-300 text-3xl`}>
              🖼️
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-6">
      <div className={`max-w-6xl mx-auto grid ${gridCols} gap-3`}>
        {images.map((img, i) => (
          <div key={i} className={`${aspectClass} overflow-hidden rounded-lg bg-stone-100`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.alt || ''}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
