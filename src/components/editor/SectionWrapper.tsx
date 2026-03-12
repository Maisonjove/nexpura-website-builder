'use client'

import { useState } from 'react'
import { Section } from '@/lib/sections'

interface Props {
  section: Section
  onEdit: () => void
  onDelete: () => void
  children: React.ReactNode
}

export default function SectionWrapper({ section, onEdit, onDelete, children }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative group rounded-xl overflow-hidden border-2 transition-all duration-200"
      style={{ borderColor: hovered ? '#52B788' : 'transparent' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Controls bar */}
      <div
        className={`absolute top-2 right-2 z-20 flex items-center gap-1 transition-opacity duration-150 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Section label */}
        <span className="bg-nexpura-forest text-white text-xs px-2 py-1 rounded-md font-medium capitalize mr-1">
          {section.type.replace(/_/g, ' ')}
        </span>

        {/* Drag handle */}
        <button
          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-400 hover:text-gray-600 cursor-grab shadow-sm"
          title="Drag to reorder"
        >
          ⠿
        </button>

        {/* Edit */}
        <button
          onClick={onEdit}
          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-400 hover:text-nexpura-forest shadow-sm text-xs"
          title="Edit section"
        >
          ✏️
        </button>

        {/* Delete */}
        <button
          onClick={() => {
            if (confirm('Remove this section?')) onDelete()
          }}
          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-400 hover:text-red-500 shadow-sm text-xs"
          title="Delete section"
        >
          🗑️
        </button>
      </div>

      {/* Section content */}
      <div className="pointer-events-none select-none">
        {children}
      </div>
    </div>
  )
}
