'use client'

import { useState } from 'react'

interface PassportEntry {
  id: string
  productId: string
  productName: string
  sku: string
  metal: string
  caratage?: string
  gemstones?: string
  weight?: string
  craftedBy?: string
  craftedDate?: string
  certificateNumber?: string
  status: 'active' | 'draft' | 'transferred'
  scanCount: number
  lastScanned?: string
  createdAt: string
}

const MOCK_PASSPORTS: PassportEntry[] = [
  {
    id: 'pp_001',
    productId: 'prod_sdr_001',
    productName: 'Solitaire Diamond Ring',
    sku: 'SDR-001',
    metal: '18ct White Gold',
    caratage: '18ct',
    gemstones: 'Round Brilliant Diamond, 0.72ct, G/VS1',
    weight: '3.8g',
    craftedBy: 'Maison Bijou Atelier, London',
    craftedDate: '2024-01-15',
    certificateNumber: 'GIA-2406768282',
    status: 'active',
    scanCount: 14,
    lastScanned: '2024-03-10',
    createdAt: '2024-01-16',
  },
  {
    id: 'pp_002',
    productId: 'prod_gpb_001',
    productName: 'Gold Pearl Bracelet',
    sku: 'GPB-001',
    metal: '14ct Yellow Gold',
    caratage: '14ct',
    gemstones: 'South Sea Pearl, 8–10mm',
    weight: '12.4g',
    craftedBy: 'Maison Bijou Atelier, London',
    craftedDate: '2024-02-05',
    status: 'active',
    scanCount: 6,
    lastScanned: '2024-03-08',
    createdAt: '2024-02-06',
  },
  {
    id: 'pp_003',
    productId: 'prod_ern_001',
    productName: 'Emerald Ring Nouveau',
    sku: 'ERN-001',
    metal: '18ct Rose Gold',
    caratage: '18ct',
    gemstones: 'Colombian Emerald, 1.2ct + Diamond halo',
    weight: '5.1g',
    craftedBy: 'Maison Bijou Atelier, London',
    craftedDate: '2024-03-01',
    status: 'draft',
    scanCount: 0,
    createdAt: '2024-03-02',
  },
]

export default function PassportPage() {
  const [passports, setPassports] = useState<PassportEntry[]>(MOCK_PASSPORTS)
  const [selected, setSelected] = useState<PassportEntry | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'draft'>('all')
  const [showCreate, setShowCreate] = useState(false)

  const filtered = passports
    .filter((p) => filter === 'all' || p.status === filter)
    .filter(
      (p) =>
        !search ||
        p.productName.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
    )

  const totalScans = passports.reduce((s, p) => s + p.scanCount, 0)
  const activeCount = passports.filter((p) => p.status === 'active').length

  return (
    <div className="flex h-full overflow-hidden">
      {/* List panel */}
      <div className="flex flex-col w-80 border-r border-gray-200 bg-white overflow-hidden">
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-playfair font-semibold text-gray-900">Digital Passports</h1>
            <button
              onClick={() => setShowCreate(true)}
              className="text-xs px-2 py-1 bg-nexpura-forest text-white rounded-lg"
            >
              + New
            </button>
          </div>
          <input
            type="text"
            placeholder="Search passports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
          />
          <div className="flex gap-1 mt-2">
            {(['all', 'active', 'draft'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1 rounded text-xs capitalize ${
                  filter === f
                    ? 'bg-nexpura-mint/10 text-nexpura-forest font-medium'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {f} {f === 'all' ? `(${passports.length})` : `(${passports.filter((p) => p.status === f).length})`}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filtered.map((pp) => (
            <button
              key={pp.id}
              onClick={() => setSelected(pp)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                selected?.id === pp.id ? 'bg-nexpura-mint/5 border-l-2 border-nexpura-mint' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{pp.productName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{pp.sku} · {pp.metal}</p>
                </div>
                <span
                  className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full ${
                    pp.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {pp.status}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                <span>👁 {pp.scanCount} scans</span>
                {pp.lastScanned && (
                  <span>Last: {new Date(pp.lastScanned).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                )}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-400">No passports found</div>
          )}
        </div>

        {/* Stats footer */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{activeCount} active</span>
            <span>{totalScans} total scans</span>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div className="flex-1 overflow-y-auto">
        {selected ? (
          <PassportDetail
            passport={selected}
            onPublish={() =>
              setPassports((prev) =>
                prev.map((p) => (p.id === selected.id ? { ...p, status: 'active' } : p))
              )
            }
            onUpdate={(updated) => {
              setPassports((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
              setSelected(updated)
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="font-playfair text-xl text-gray-700 mb-2">Digital Passport Manager</h2>
            <p className="text-sm text-gray-400 max-w-xs">
              Select a passport to view and edit its details, or create a new one.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-gray-800">{passports.length}</p>
                <p className="text-xs text-gray-400 mt-1">Total passports</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{activeCount}</p>
                <p className="text-xs text-gray-400 mt-1">Active</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{totalScans}</p>
                <p className="text-xs text-gray-400 mt-1">Total scans</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create modal */}
      {showCreate && (
        <CreatePassportModal
          onClose={() => setShowCreate(false)}
          onCreate={(pp) => {
            setPassports([...passports, pp])
            setSelected(pp)
            setShowCreate(false)
          }}
        />
      )}
    </div>
  )
}

function PassportDetail({
  passport,
  onPublish,
  onUpdate,
}: {
  passport: PassportEntry
  onPublish: () => void
  onUpdate: (p: PassportEntry) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(passport)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    onUpdate(draft)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const qrUrl = `https://passport.nexpura.app/${passport.id}`

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-playfair font-semibold text-gray-900">{passport.productName}</h2>
          <p className="text-sm text-gray-400 mt-1">
            {passport.sku} ·{' '}
            <span
              className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                passport.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {passport.status === 'active' ? '● Active' : '○ Draft'}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          {passport.status === 'draft' && (
            <button
              onClick={onPublish}
              className="px-3 py-1.5 bg-nexpura-mint text-white text-xs rounded-lg hover:bg-nexpura-mint/90"
            >
              Publish Passport
            </button>
          )}
          {editing ? (
            <>
              <button
                onClick={() => { setEditing(false); setDraft(passport) }}
                className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 bg-nexpura-forest text-white text-xs rounded-lg"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-50"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {saved && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100">
          ✓ Passport updated
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product details */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Product Details</h3>
          <div className="space-y-3">
            {[
              { label: 'Metal', key: 'metal' as const },
              { label: 'Caratage', key: 'caratage' as const },
              { label: 'Gemstones', key: 'gemstones' as const },
              { label: 'Weight', key: 'weight' as const },
              { label: 'Crafted By', key: 'craftedBy' as const },
              { label: 'Certificate #', key: 'certificateNumber' as const },
            ].map(({ label, key }) => (
              <div key={key}>
                <p className="text-xs text-gray-400">{label}</p>
                {editing ? (
                  <input
                    type="text"
                    value={draft[key] || ''}
                    onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                    className="w-full mt-0.5 text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-nexpura-mint"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                ) : (
                  <p className="text-sm text-gray-700 mt-0.5">{draft[key] || <span className="text-gray-300">—</span>}</p>
                )}
              </div>
            ))}
            <div>
              <p className="text-xs text-gray-400">Crafted Date</p>
              {editing ? (
                <input
                  type="date"
                  value={draft.craftedDate || ''}
                  onChange={(e) => setDraft({ ...draft, craftedDate: e.target.value })}
                  className="w-full mt-0.5 text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-nexpura-mint"
                />
              ) : (
                <p className="text-sm text-gray-700 mt-0.5">
                  {draft.craftedDate
                    ? new Date(draft.craftedDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
                    : <span className="text-gray-300">—</span>}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* QR & stats */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">QR Code & Link</h3>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center mb-3" style={{ minHeight: 120 }}>
              {/* QR code placeholder - in production would use qrcode lib */}
              <div className="text-center">
                <div className="w-20 h-20 bg-white border border-gray-200 rounded flex items-center justify-center mx-auto mb-2">
                  <span className="text-3xl">🔲</span>
                </div>
                <p className="text-xs text-gray-400">QR Code</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-1">Passport URL</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 truncate">
                {qrUrl}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(qrUrl)}
                className="text-xs text-nexpura-mint hover:underline flex-shrink-0"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Scan Activity</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total scans</span>
                <span className="font-semibold text-gray-800">{passport.scanCount}</span>
              </div>
              {passport.lastScanned && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last scanned</span>
                  <span className="text-gray-700">
                    {new Date(passport.lastScanned).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Created</span>
                <span className="text-gray-700">
                  {new Date(passport.createdAt).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 py-2 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
              ↓ Download QR
            </button>
            <button className="flex-1 py-2 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
              📄 Certificate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreatePassportModal({
  onClose,
  onCreate,
}: {
  onClose: () => void
  onCreate: (pp: PassportEntry) => void
}) {
  const [form, setForm] = useState({
    productName: '',
    sku: '',
    metal: '',
    caratage: '',
    gemstones: '',
    weight: '',
    craftedBy: '',
    craftedDate: '',
  })

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleCreate() {
    const pp: PassportEntry = {
      id: `pp_${Date.now()}`,
      productId: `prod_${Date.now()}`,
      productName: form.productName,
      sku: form.sku,
      metal: form.metal,
      caratage: form.caratage || undefined,
      gemstones: form.gemstones || undefined,
      weight: form.weight || undefined,
      craftedBy: form.craftedBy || undefined,
      craftedDate: form.craftedDate || undefined,
      status: 'draft',
      scanCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }
    onCreate(pp)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-nexpura-forest text-white px-6 py-4">
          <h2 className="font-playfair font-semibold text-lg">New Digital Passport</h2>
          <p className="text-white/60 text-sm">Fill in the product details</p>
        </div>
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {[
            { label: 'Product Name *', key: 'productName', placeholder: 'e.g. Solitaire Diamond Ring' },
            { label: 'SKU *', key: 'sku', placeholder: 'e.g. SDR-001' },
            { label: 'Metal *', key: 'metal', placeholder: 'e.g. 18ct White Gold' },
            { label: 'Caratage', key: 'caratage', placeholder: 'e.g. 18ct' },
            { label: 'Gemstones', key: 'gemstones', placeholder: 'e.g. Round Brilliant Diamond, 0.72ct' },
            { label: 'Weight', key: 'weight', placeholder: 'e.g. 3.8g' },
            { label: 'Crafted By', key: 'craftedBy', placeholder: 'e.g. Maison Bijou Atelier' },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
              <input
                type="text"
                value={form[f.key as keyof typeof form]}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Crafted Date</label>
            <input
              type="date"
              value={form.craftedDate}
              onChange={(e) => update('craftedDate', e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!form.productName || !form.sku || !form.metal}
            className="flex-1 py-2.5 bg-nexpura-forest text-white rounded-lg text-sm font-medium disabled:opacity-40"
          >
            Create Passport
          </button>
        </div>
      </div>
    </div>
  )
}
