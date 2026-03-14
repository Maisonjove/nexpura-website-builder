'use client'

import { useState } from 'react'

type DocType = 'certificate' | 'warranty' | 'bespoke_brief' | 'repair_receipt' | 'appraisal'

interface DocTemplate {
  key: DocType
  name: string
  icon: string
  description: string
  category: 'product' | 'service' | 'legal'
}

const TEMPLATES: DocTemplate[] = [
  {
    key: 'certificate',
    name: 'Certificate of Authenticity',
    icon: '🏅',
    description: 'Formal certificate for each product, signed and embossed. Includes all passport data.',
    category: 'product',
  },
  {
    key: 'warranty',
    name: 'Lifetime Warranty Card',
    icon: '✨',
    description: 'Warranty card for customers, detailing coverage terms, exclusions and care instructions.',
    category: 'product',
  },
  {
    key: 'appraisal',
    name: 'Insurance Appraisal',
    icon: '💰',
    description: 'Professional valuation document for insurance purposes. Includes retail replacement value.',
    category: 'product',
  },
  {
    key: 'bespoke_brief',
    name: 'Bespoke Commission Brief',
    icon: '✏️',
    description: 'Agreement template for custom commissions. Includes design spec, timeline and deposit terms.',
    category: 'service',
  },
  {
    key: 'repair_receipt',
    name: 'Repair Receipt',
    icon: '🔧',
    description: 'Intake receipt for jewellery repairs. Captures item condition, agreed work and pricing.',
    category: 'service',
  },
]

interface GeneratedDoc {
  id: string
  type: DocType
  name: string
  generatedAt: string
  productName?: string
  customerName?: string
  status: 'ready' | 'generating'
}

const MOCK_DOCS: GeneratedDoc[] = [
  {
    id: 'doc_001',
    type: 'certificate',
    name: 'CoA – Solitaire Diamond Ring',
    generatedAt: '2024-03-10',
    productName: 'Solitaire Diamond Ring',
    customerName: 'Mrs Sarah Chen',
    status: 'ready',
  },
  {
    id: 'doc_002',
    type: 'warranty',
    name: 'Warranty – Gold Pearl Bracelet',
    generatedAt: '2024-03-08',
    productName: 'Gold Pearl Bracelet',
    customerName: 'Mr James Wilson',
    status: 'ready',
  },
  {
    id: 'doc_003',
    type: 'bespoke_brief',
    name: 'Bespoke Brief – Engagement Ring',
    generatedAt: '2024-03-05',
    customerName: 'Mr David Park',
    status: 'ready',
  },
]

export default function DocumentsPage() {
  const [docs, setDocs] = useState<GeneratedDoc[]>(MOCK_DOCS)
  const [selected, setSelected] = useState<DocType | null>(null)
  const [generating, setGenerating] = useState(false)
  const [showForm, setShowForm] = useState(false)

  async function handleGenerate(type: DocType, params: Record<string, string>) {
    setGenerating(true)
    setShowForm(false)
    // Simulate generation delay
    await new Promise((r) => setTimeout(r, 1500))
    const template = TEMPLATES.find((t) => t.key === type)!
    const newDoc: GeneratedDoc = {
      id: `doc_${Date.now()}`,
      type,
      name: `${template.name}${params.productName ? ` – ${params.productName}` : ''}`,
      generatedAt: new Date().toISOString().split('T')[0],
      productName: params.productName,
      customerName: params.customerName,
      status: 'ready',
    }
    setDocs((prev) => [newDoc, ...prev])
    setGenerating(false)
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-playfair font-semibold text-gray-900">Document Centre</h1>
        <p className="text-sm text-gray-500 mt-1">Generate certificates, warranties, and client documents</p>
      </div>

      {/* Templates */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Document Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATES.map((template) => (
            <button
              key={template.key}
              onClick={() => { setSelected(template.key); setShowForm(true) }}
              className="text-left bg-white rounded-xl border border-gray-200 p-5 hover:border-nexpura-mint hover:shadow-sm transition-all group"
            >
              <div className="text-2xl mb-2">{template.icon}</div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{template.name}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{template.description}</p>
              <div className="mt-3 text-xs text-nexpura-mint group-hover:text-nexpura-forest transition-colors font-medium">
                Generate →
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Recent documents */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Recent Documents</h2>
          <span className="text-xs text-gray-400">{docs.length} documents</span>
        </div>
        {generating && (
          <div className="bg-nexpura-mint/10 border border-nexpura-mint/20 rounded-xl p-4 mb-4 flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-nexpura-mint border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-nexpura-forest">Generating document...</p>
          </div>
        )}
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {docs.map((doc) => {
            const template = TEMPLATES.find((t) => t.key === doc.type)!
            return (
              <div key={doc.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                    {template.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {template.name}
                      {doc.customerName ? ` · ${doc.customerName}` : ''}
                      {' · '}
                      {new Date(doc.generatedAt).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                    Preview
                  </button>
                  <button className="text-xs px-3 py-1.5 bg-nexpura-forest text-white rounded-lg hover:bg-nexpura-forest/90">
                    ↓ PDF
                  </button>
                </div>
              </div>
            )
          })}
          {docs.length === 0 && (
            <div className="p-12 text-center text-sm text-gray-400">
              No documents generated yet. Use a template above to create your first one.
            </div>
          )}
        </div>
      </section>

      {/* Generate form modal */}
      {showForm && selected && (
        <GenerateForm
          template={TEMPLATES.find((t) => t.key === selected)!}
          onClose={() => setShowForm(false)}
          onGenerate={(params) => handleGenerate(selected, params)}
        />
      )}
    </div>
  )
}

function GenerateForm({
  template,
  onClose,
  onGenerate,
}: {
  template: DocTemplate
  onClose: () => void
  onGenerate: (params: Record<string, string>) => void
}) {
  const [form, setForm] = useState({
    productName: '',
    sku: '',
    customerName: '',
    customerEmail: '',
    metal: '',
    gemstones: '',
    purchaseDate: '',
    value: '',
    notes: '',
  })

  const fields: { key: keyof typeof form; label: string; placeholder: string; show: DocType[] }[] = [
    { key: 'productName', label: 'Product Name', placeholder: 'e.g. Solitaire Diamond Ring', show: ['certificate', 'warranty', 'appraisal', 'repair_receipt'] },
    { key: 'sku', label: 'SKU / Reference', placeholder: 'e.g. SDR-001', show: ['certificate', 'warranty', 'appraisal'] },
    { key: 'customerName', label: 'Customer Name', placeholder: 'e.g. Mrs Sarah Chen', show: ['certificate', 'warranty', 'appraisal', 'bespoke_brief', 'repair_receipt'] },
    { key: 'customerEmail', label: 'Customer Email', placeholder: 'customer@example.com', show: ['certificate', 'warranty', 'bespoke_brief', 'repair_receipt'] },
    { key: 'metal', label: 'Metal', placeholder: 'e.g. 18ct White Gold', show: ['certificate', 'warranty', 'appraisal'] },
    { key: 'gemstones', label: 'Gemstones', placeholder: 'e.g. 0.72ct Diamond G/VS1', show: ['certificate', 'appraisal'] },
    { key: 'purchaseDate', label: 'Purchase Date', placeholder: '', show: ['certificate', 'warranty', 'appraisal'] },
    { key: 'value', label: 'Retail Value (£)', placeholder: 'e.g. 3250', show: ['appraisal'] },
    { key: 'notes', label: 'Notes', placeholder: 'Any additional details...', show: ['bespoke_brief', 'repair_receipt'] },
  ]

  const visibleFields = fields.filter((f) => f.show.includes(template.key))

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-nexpura-forest text-white px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{template.icon}</span>
            <div>
              <h2 className="font-playfair font-semibold">{template.name}</h2>
              <p className="text-white/60 text-xs mt-0.5">Fill in details to generate the document</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-3 max-h-[55vh] overflow-y-auto">
          {visibleFields.map((f) => (
            <div key={f.key}>
              <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
              {f.key === 'notes' ? (
                <textarea
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  rows={3}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint resize-none"
                />
              ) : (
                <input
                  type={f.key === 'purchaseDate' ? 'date' : 'text'}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              )}
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => onGenerate(form)}
            className="flex-1 py-2.5 bg-nexpura-forest text-white rounded-lg text-sm font-medium hover:bg-nexpura-forest/90"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  )
}
