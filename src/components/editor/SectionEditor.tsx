'use client'

import { useState } from 'react'
import { Section } from '@/lib/sections'

interface Props {
  section: Section
  onSave: (updates: Partial<Section>) => void
  onClose: () => void
}

function FieldEditor({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: unknown
  onChange: (val: unknown) => void
  multiline?: boolean
}) {
  if (typeof value === 'boolean') {
    return (
      <div className="flex items-center justify-between py-2">
        <label className="text-sm text-gray-700">{label}</label>
        <button
          onClick={() => onChange(!value)}
          className={`w-10 h-5 rounded-full transition-colors ${value ? 'bg-nexpura-mint' : 'bg-gray-200'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full mx-0.5 shadow-sm transition-transform ${value ? 'translate-x-5' : ''}`} />
        </button>
      </div>
    )
  }

  if (typeof value === 'number') {
    return (
      <div>
        <label className="block text-sm text-gray-700 mb-1">{label}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
        />
      </div>
    )
  }

  if (typeof value === 'string' || value === null) {
    return (
      <div>
        <label className="block text-sm text-gray-700 mb-1">{label}</label>
        {multiline ? (
          <textarea
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint resize-none"
          />
        ) : (
          <input
            type="text"
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
          />
        )}
      </div>
    )
  }

  return null
}

export default function SectionEditor({ section, onSave, onClose }: Props) {
  const [props, setProps] = useState<Record<string, unknown>>(section.props)
  const [content, setContent] = useState<Record<string, unknown>>(section.content)

  const multilineFields = ['body', 'subheading', 'description', 'text']

  function handleSave() {
    onSave({ props, content })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900 capitalize">
              Edit {section.type.replace(/_/g, ' ')}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Modify section content and settings</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Content fields */}
          {Object.keys(content).filter(k => !Array.isArray(content[k]) && typeof content[k] !== 'object').length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Content</h3>
              <div className="space-y-4">
                {Object.entries(content).map(([key, value]) => {
                  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) return null
                  return (
                    <FieldEditor
                      key={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      value={value}
                      onChange={(val) => setContent((prev) => ({ ...prev, [key]: val }))}
                      multiline={multilineFields.includes(key)}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* Props fields */}
          {Object.keys(props).length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Settings</h3>
              <div className="space-y-4">
                {Object.entries(props).map(([key, value]) => {
                  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) return null
                  return (
                    <FieldEditor
                      key={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      value={value}
                      onChange={(val) => setProps((prev) => ({ ...prev, [key]: val }))}
                    />
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 py-2.5 bg-nexpura-forest text-white rounded-lg text-sm font-medium hover:bg-nexpura-forest/90">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
