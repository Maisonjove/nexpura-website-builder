'use client'

import { SectionType } from '@/lib/sections'

interface Props {
  onSelect: (type: SectionType) => void
  onClose: () => void
}

const SECTION_OPTIONS: { type: SectionType; label: string; icon: string; description: string }[] = [
  { type: 'hero', label: 'Hero', icon: '🖼️', description: 'Full-width banner with heading & CTA' },
  { type: 'trust_bar', label: 'Trust Bar', icon: '✨', description: 'Icons with labels (warranty, delivery etc.)' },
  { type: 'featured_collections', label: 'Featured Collections', icon: '💍', description: 'Grid of collection cards' },
  { type: 'product_grid', label: 'Product Grid', icon: '🛍️', description: 'Product listing grid' },
  { type: 'text_image', label: 'Text + Image', icon: '📰', description: 'Side-by-side text and image' },
  { type: 'testimonials', label: 'Testimonials', icon: '💬', description: 'Customer reviews and quotes' },
  { type: 'bespoke_form', label: 'Bespoke Enquiry', icon: '💎', description: 'Commission a custom piece form' },
  { type: 'repair_form', label: 'Repair Booking', icon: '🔧', description: 'Book a jewellery repair' },
  { type: 'appointment_form', label: 'Appointment', icon: '📅', description: 'Book in-store appointment' },
  { type: 'contact_form', label: 'Contact Form', icon: '✉️', description: 'General contact enquiry' },
  { type: 'text_block', label: 'Text Block', icon: '📝', description: 'Heading and rich text content' },
  { type: 'image_gallery', label: 'Image Gallery', icon: '🖼️', description: 'Photo grid or masonry gallery' },
]

export default function SectionPicker({ onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-playfair font-semibold text-gray-900">Add Section</h2>
            <p className="text-xs text-gray-400 mt-0.5">Choose a section type to add to your page</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-3">
            {SECTION_OPTIONS.map((option) => (
              <button
                key={option.type}
                onClick={() => onSelect(option.type)}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 text-left hover:border-nexpura-mint hover:bg-nexpura-mint/5 transition-colors group"
              >
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <div className="text-sm font-medium text-gray-800 group-hover:text-nexpura-forest">
                    {option.label}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{option.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
