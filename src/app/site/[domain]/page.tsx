import { notFound } from 'next/navigation'
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
import { Section } from '@/lib/sections'

interface Props {
  params: { domain: string }
}

async function getTenantSite(domain: string) {
  // TODO: fetch from Supabase using domain/subdomain lookup
  // const supabase = createServerClient(...)
  // const { data: settings } = await supabase
  //   .from('tenant_website_settings')
  //   .select('*')
  //   .or(`subdomain.eq.${domain},custom_domain.eq.${domain}`)
  //   .single()

  // For demo: return mock data
  return {
    businessName: 'Maison Bijou',
    primaryColor: '#1a2e1a',
    accentColor: '#52B788',
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    sections: [
      {
        id: '1',
        type: 'hero' as const,
        sort_order: 0,
        props: { layout: 'full', overlay: true, ctaStyle: 'filled' },
        content: {
          heading: 'Crafted for a Lifetime',
          subheading: 'Discover our collection of handcrafted fine jewellery',
          ctaText: 'Explore Collections',
          ctaLink: '#collections',
          imageUrl: null,
        },
      },
      {
        id: '2',
        type: 'trust_bar' as const,
        sort_order: 1,
        props: { showPassport: true, showWarranty: true },
        content: {
          items: [
            { icon: '💎', label: 'Certified Diamonds' },
            { icon: '🔒', label: 'Digital Passport' },
            { icon: '✨', label: 'Lifetime Warranty' },
            { icon: '🚚', label: 'Free Shipping' },
          ],
        },
      },
      {
        id: '3',
        type: 'text_image' as const,
        sort_order: 2,
        props: { imageSide: 'right', imageSize: 'medium' },
        content: {
          heading: 'Our Story',
          body: 'Founded in 2008, Maison Bijou has been crafting fine jewellery that tells your story. Each piece is handcrafted in our London atelier using ethically sourced materials.',
          imageUrl: null,
        },
      },
      {
        id: '4',
        type: 'bespoke_form' as const,
        sort_order: 3,
        props: {},
        content: { heading: 'Create Your Dream Piece', subheading: 'Tell us about your vision' },
      },
      {
        id: '5',
        type: 'contact_form' as const,
        sort_order: 4,
        props: {},
        content: { heading: 'Get in Touch', subheading: "We'd love to hear from you" },
      },
    ] as Section[],
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

export default async function StorefrontPage({ params }: Props) {
  const site = await getTenantSite(params.domain)
  if (!site) return notFound()

  const sortedSections = [...site.sections].sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div
      className="min-h-screen"
      style={{
        '--primary': site.primaryColor,
        '--accent': site.accentColor,
        fontFamily: `'${site.bodyFont}', sans-serif`,
      } as React.CSSProperties}
    >
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className="text-xl font-semibold"
            style={{ fontFamily: `'${site.headingFont}', serif`, color: site.primaryColor }}
          >
            {site.businessName}
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">Collections</a>
            <a href="#" className="hover:text-gray-900">Bespoke</a>
            <a href="#" className="hover:text-gray-900">About</a>
            <a href="#" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <main>
        {sortedSections.map(renderSection)}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100" style={{ backgroundColor: site.primaryColor }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div
            className="text-lg font-semibold text-white/90 mb-2"
            style={{ fontFamily: `'${site.headingFont}', serif` }}
          >
            {site.businessName}
          </div>
          <p className="text-sm text-white/40">
            Powered by{' '}
            <a href="https://nexpura.app" className="text-white/60 hover:text-white/80">
              Nexpura
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
