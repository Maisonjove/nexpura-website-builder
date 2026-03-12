export type SectionType =
  | 'hero'
  | 'featured_collections'
  | 'product_grid'
  | 'text_image'
  | 'testimonials'
  | 'trust_bar'
  | 'contact_form'
  | 'bespoke_form'
  | 'repair_form'
  | 'appointment_form'
  | 'text_block'
  | 'image_gallery'

export interface Section {
  id: string
  type: SectionType
  sort_order: number
  props: Record<string, unknown>
  content: Record<string, unknown>
}

export const SECTION_DEFAULTS: Record<
  SectionType,
  { props: Record<string, unknown>; content: Record<string, unknown> }
> = {
  hero: {
    props: { layout: 'full', overlay: true, ctaStyle: 'filled' },
    content: {
      heading: 'Crafted for a Lifetime',
      subheading: 'Discover our collection of handcrafted fine jewellery',
      ctaText: 'Shop Now',
      ctaLink: '/collections',
      imageUrl: null,
    },
  },
  featured_collections: {
    props: { columns: 3, showPrice: true },
    content: { heading: 'Our Collections', collections: [] },
  },
  product_grid: {
    props: { columns: 4, filter: null },
    content: { heading: 'Featured Pieces' },
  },
  text_image: {
    props: { imageSide: 'right', imageSize: 'medium' },
    content: {
      heading: 'Our Story',
      body: 'Tell your story here...',
      imageUrl: null,
    },
  },
  testimonials: {
    props: { style: 'cards' },
    content: { heading: 'What Our Clients Say', testimonials: [] },
  },
  trust_bar: {
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
  contact_form: {
    props: { showMap: false },
    content: { heading: 'Get in Touch', subheading: "We'd love to hear from you" },
  },
  bespoke_form: {
    props: {},
    content: { heading: 'Create Your Dream Piece', subheading: 'Tell us about your vision' },
  },
  repair_form: {
    props: {},
    content: { heading: 'Book a Repair', subheading: 'Expert jewellery repairs' },
  },
  appointment_form: {
    props: { services: ['Consultation', 'Repair Drop-off', 'Custom Order'] },
    content: { heading: 'Book an Appointment' },
  },
  text_block: {
    props: { alignment: 'center', maxWidth: '800px' },
    content: { heading: '', body: '' },
  },
  image_gallery: {
    props: { columns: 3, aspect: 'square' },
    content: { images: [] },
  },
}
