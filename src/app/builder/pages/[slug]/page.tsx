'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Section, SectionType, SECTION_DEFAULTS } from '@/lib/sections'
import EditorCanvas from './EditorCanvas'
import SectionPicker from './SectionPicker'

// Mock sections for demo
const MOCK_SECTIONS: Section[] = [
  {
    id: '1',
    type: 'hero',
    sort_order: 0,
    props: { layout: 'full', overlay: true, ctaStyle: 'filled' },
    content: {
      heading: 'Crafted for a Lifetime',
      subheading: 'Discover our collection of handcrafted fine jewellery',
      ctaText: 'Shop Now',
      ctaLink: '/collections',
      imageUrl: null,
    },
  },
  {
    id: '2',
    type: 'trust_bar',
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
    type: 'featured_collections',
    sort_order: 2,
    props: { columns: 3, showPrice: true },
    content: { heading: 'Our Collections', collections: [] },
  },
]

export default function PageEditorPage() {
  const params = useParams()
  const slug = params.slug as string

  const [sections, setSections] = useState<Section[]>(MOCK_SECTIONS)
  const [showSectionPicker, setShowSectionPicker] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleAddSection(type: SectionType) {
    const defaults = SECTION_DEFAULTS[type]
    const newSection: Section = {
      id: Date.now().toString(),
      type,
      sort_order: sections.length,
      props: { ...defaults.props },
      content: { ...defaults.content },
    }
    setSections([...sections, newSection])
    setShowSectionPicker(false)
  }

  function handleUpdateSection(id: string, updates: Partial<Section>) {
    setSections(sections.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  function handleDeleteSection(id: string) {
    setSections(sections.filter((s) => s.id !== id))
  }

  function handleReorder(fromIndex: number, toIndex: number) {
    const updated = [...sections]
    const [moved] = updated.splice(fromIndex, 1)
    updated.splice(toIndex, 0, moved)
    setSections(updated.map((s, i) => ({ ...s, sort_order: i })))
  }

  function handleSave() {
    // TODO: POST to Supabase
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <a href="/builder/pages" className="text-sm text-gray-400 hover:text-gray-600">← Pages</a>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-medium text-gray-700 capitalize">{slug}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{sections.length} sections</span>
          <button
            onClick={handleSave}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              saved
                ? 'bg-green-100 text-green-700'
                : 'bg-nexpura-forest text-white hover:bg-nexpura-forest/90'
            }`}
          >
            {saved ? '✓ Saved' : 'Save'}
          </button>
          <button className="px-4 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50">
            Preview
          </button>
        </div>
      </div>

      {/* Editor area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sections list sidebar */}
        <div className="w-56 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className="px-3 py-3">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Sections</p>
            <div className="space-y-1">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white cursor-pointer group text-sm text-gray-700"
                >
                  <span className="text-gray-400 text-xs w-4 text-center">{index + 1}</span>
                  <span className="flex-1 truncate capitalize">{section.type.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowSectionPicker(true)}
              className="w-full mt-3 py-2 text-xs text-nexpura-mint border border-dashed border-nexpura-mint/40 rounded-lg hover:bg-nexpura-mint/5 transition-colors"
            >
              + Add Section
            </button>
          </div>
        </div>

        {/* Canvas */}
        <EditorCanvas
          sections={sections}
          onUpdate={handleUpdateSection}
          onDelete={handleDeleteSection}
          onReorder={handleReorder}
          onAddSection={() => setShowSectionPicker(true)}
        />
      </div>

      {/* Section picker modal */}
      {showSectionPicker && (
        <SectionPicker
          onSelect={handleAddSection}
          onClose={() => setShowSectionPicker(false)}
        />
      )}
    </div>
  )
}
