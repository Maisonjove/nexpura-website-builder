interface Product {
  id: string
  name: string
  price: string
  imageUrl: string
  href: string
}

interface Props {
  props: Record<string, unknown>
  content: Record<string, unknown>
}

const DEMO_PRODUCTS: Product[] = [
  { id: '1', name: 'Solitaire Diamond Ring', price: '£2,400', imageUrl: '', href: '#' },
  { id: '2', name: 'Pearl Drop Earrings', price: '£480', imageUrl: '', href: '#' },
  { id: '3', name: 'Gold Tennis Bracelet', price: '£1,850', imageUrl: '', href: '#' },
  { id: '4', name: 'Sapphire Pendant', price: '£920', imageUrl: '', href: '#' },
]

export default function ProductGrid({ props, content }: Props) {
  const heading = (content.heading as string) || 'Featured Pieces'
  const products = DEMO_PRODUCTS
  const columns = (props.columns as number) || 4
  const gridCols = columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'

  return (
    <section className="py-20 px-6 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl text-gray-900 mb-3">{heading}</h2>
          <div className="w-16 h-0.5 bg-nexpura-gold mx-auto" />
        </div>

        <div className={`grid grid-cols-2 ${gridCols} gap-4`}>
          {products.map((product) => (
            <a
              key={product.id}
              href={product.href}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden bg-stone-100">
                {product.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-200 text-4xl">
                    ✨
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                <p className="text-sm text-nexpura-forest font-semibold mt-0.5">{product.price}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
