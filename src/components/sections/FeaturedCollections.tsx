interface Collection {
  id: string
  name: string
  imageUrl: string
  href: string
  price?: string
}

interface Props {
  props: Record<string, unknown>
  content: Record<string, unknown>
}

const DEMO_COLLECTIONS: Collection[] = [
  { id: '1', name: 'Engagement Rings', imageUrl: '', href: '#', price: 'From £1,200' },
  { id: '2', name: 'Fine Necklaces', imageUrl: '', href: '#', price: 'From £350' },
  { id: '3', name: 'Diamond Earrings', imageUrl: '', href: '#', price: 'From £480' },
]

export default function FeaturedCollections({ props, content }: Props) {
  const heading = (content.heading as string) || 'Our Collections'
  const collections = ((content.collections as Collection[]) || []).length
    ? (content.collections as Collection[])
    : DEMO_COLLECTIONS
  const columns = (props.columns as number) || 3
  const showPrice = props.showPrice !== false

  const gridCols = columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl text-gray-900 mb-3">{heading}</h2>
          <div className="w-16 h-0.5 bg-nexpura-gold mx-auto" />
        </div>

        <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
          {collections.map((col) => (
            <a
              key={col.id}
              href={col.href}
              className="group block overflow-hidden rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden bg-stone-100">
                {col.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={col.imageUrl}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300 text-5xl">
                    💍
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-playfair text-lg text-gray-900">{col.name}</h3>
                {showPrice && col.price && (
                  <p className="text-sm text-gray-500 mt-1">{col.price}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
