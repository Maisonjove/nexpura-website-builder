'use client'

import { useState } from 'react'
import { Section, SectionType } from '@/lib/sections'
import SectionWrapper from '@/components/editor/SectionWrapper'
import SectionEditor from '@/components/editor/SectionEditor'
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
  sections: Section[]
  onUpdate: (id: string, updates: Partial<Section>) => void
  onDelete: (id: string) => void
  onReorder: (fromIndex: number, toIndex: number) => void
  onAddSection: () => void
}

function renderSection(section: Section) {
  const commonProps = { props: section.props, content: section.content }
  switch (section.type) {
    case 'hero': return <HeroSection {...commonProps} />
    case 'trust_bar': return <TrustBar {...commonProps} />
    case 'featured_collections': return <FeaturedCollections {...commonProps} />
    case 'product_grid': return <ProductGrid {...commonProps} />
    case 'text_image': return <TextImageSection {...commonProps} />
    case 'testimonials': return <TestimonialsSection {...commonProps} />
    case 'contact_form': return <ContactForm {...commonProps} />
    case 'bespoke_form': return <BespokeForm {...commonProps} />
    case 'repair_form': return <RepairForm {...commonProps} />
    case 'appointment_form': return <AppointmentForm {...commonProps} />
    case 'text_block': return <TextBlock {...commonProps} />
    case 'image_gallery': return <ImageGallery {...commonProps} />
    default: return (
      <div className="py-16 text-center text-gray-400">
        <p className="text-sm">Unknown section type: {(section as Section).type}</p>
      </div>
    )
  }
}

export default function EditorCanvas({ sections, onUpdate, onDelete, onReorder, onAddSection }: Props) {
  const [editingSection, setEditingSection] = useState<Section | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  function handleDragStart(index: number) {
    setDragIndex(index)
  }

  function handleDragOver(e: React.DragEvent, toIndex: number) {
    e.preventDefault()
    if (dragIndex !== null && dragIndex !== toIndex) {
      onReorder(dragIndex, toIndex)
      setDragIndex(toIndex)
    }
  }

  function handleDragEnd() {
    setDragIndex(null)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="max-w-5xl mx-auto py-6 px-4 space-y-3">
        {sections.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <p className="text-4xl mb-4">📄</p>
            <p className="text-lg font-medium text-gray-500">No sections yet</p>
            <p className="text-sm mt-1">Add your first section to get started</p>
            <button
              onClick={onAddSection}
              className="mt-4 px-5 py-2.5 bg-nexpura-forest text-white rounded-lg text-sm font-medium hover:bg-nexpura-forest/90"
            >
              + Add Section
            </button>
          </div>
        )}

        {sections.map((section, index) => (
          <div
            key={section.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`transition-opacity ${dragIndex === index ? 'opacity-50' : 'opacity-100'}`}
          >
            <SectionWrapper
              section={section}
              onEdit={() => setEditingSection(section)}
              onDelete={() => onDelete(section.id)}
            >
              {renderSection(section)}
            </SectionWrapper>
          </div>
        ))}

        {sections.length > 0 && (
          <button
            onClick={onAddSection}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:border-nexpura-mint hover:text-nexpura-mint transition-colors text-sm font-medium"
          >
            + Add Section
          </button>
        )}
      </div>

      {/* Section editor modal */}
      {editingSection && (
        <SectionEditor
          section={editingSection}
          onSave={(updates) => {
            onUpdate(editingSection.id, updates)
            setEditingSection(null)
          }}
          onClose={() => setEditingSection(null)}
        />
      )}
    </div>
  )
}
