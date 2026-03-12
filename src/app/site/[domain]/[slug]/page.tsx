import { notFound } from 'next/navigation'
import { Section } from '@/lib/sections'
import HeroSection from '@/components/sections/HeroSection'
import TrustBar from '@/components/sections/TrustBar'
import FeaturedCollections from '@/components/sections/FeaturedCollections'
import ProductGrid from '@/components/sections/ProductGrid'
import TextImageSection from '@/components/sections/TextImageSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactForm from '@/components/sections/ContactForm'
import BespokeForm from '@/components/sections/BespokeForm'
import RepairForm from '@/components/sections/RepairForm'
import AppointmentForm from '@/components/sections/AppointmentForm'
import TextBlock from '@/components/sections/TextBlock'
import ImageGallery from '@/components/sections/ImageGallery'

interface Props {
  params: { domain: string; slug: string }
}

async function getPage(domain: string, slug: string) {
  // TODO: fetch from Supabase
  // Return null if page not found
  return {
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    sections: [] as Section[],
    site: {
      businessName: 'Maison Bijou',
      primaryColor: '#1a2e1a',
      accentColor: '#52B788',
      headingFont: 'Playfair Display',
      bodyFont: 'Inter',
    },
  }
}

function renderSection(section: Section) {
  const p = { props: section.props, content: section.content }
  switch (section.type) {
    case 'hero': return <HeroSection key={section.id} {...p} />
    case 'trust_bar': return <TrustBar key={section.id} {...p} />
    case 'featured_collections': return <FeaturedCollections key={section.id} {...p} />
    case 'product_grid': return <ProductGrid key={section.id} {...p} />
    case 'text_image': return <TextImageSection key={section.id} {...p} />
    case 'testimonials': return <TestimonialsSection key={section.id} {...p} />
    case 'contact_form': return <ContactForm key={section.id} {...p} />
    case 'bespoke_form': return <BespokeForm key={section.id} {...p} />
    case 'repair_form': return <RepairForm key={section.id} {...p} />
    case 'appointment_form': return <AppointmentForm key={section.id} {...p} />
    case 'text_block': return <TextBlock key={section.id} {...p} />
    case 'image_gallery': return <ImageGallery key={section.id} {...p} />
    default: return null
  }
}

export default async function InnerPage({ params }: Props) {
  const page = await getPage(params.domain, params.slug)
  if (!page) return notFound()

  const { site } = page
  const sorted = [...page.sections].sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div style={{ fontFamily: `'${site.bodyFont}', sans-serif` }}>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href={`/site/${params.domain}`}
            className="text-xl font-semibold"
            style={{ fontFamily: `'${site.headingFont}', serif`, color: site.primaryColor }}
          >
            {site.businessName}
          </a>
        </div>
      </nav>

      <main>
        {sorted.length === 0 ? (
          <div className="py-32 text-center text-gray-400">
            <p className="text-4xl mb-3">📄</p>
            <p className="text-lg font-medium">{page.title}</p>
            <p className="text-sm mt-1 text-gray-300">Page content coming soon</p>
          </div>
        ) : (
          sorted.map(renderSection)
        )}
      </main>
    </div>
  )
}
