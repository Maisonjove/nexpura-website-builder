interface Props {
  props: Record<string, unknown>
  content: Record<string, unknown>
}

export default function TextBlock({ props, content }: Props) {
  const heading = content.heading as string | undefined
  const body = (content.body as string) || ''
  const alignment = (props.alignment as 'left' | 'center' | 'right') || 'center'
  const maxWidth = (props.maxWidth as string) || '800px'

  const alignClass = alignment === 'left' ? 'text-left' : alignment === 'right' ? 'text-right' : 'text-center'

  return (
    <section className="py-16 px-6">
      <div className={`mx-auto ${alignClass}`} style={{ maxWidth }}>
        {heading && (
          <h2 className="font-playfair text-3xl md:text-4xl text-gray-900 mb-6">{heading}</h2>
        )}
        {body && (
          <div
            className="text-gray-600 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br/>') }}
          />
        )}
      </div>
    </section>
  )
}
