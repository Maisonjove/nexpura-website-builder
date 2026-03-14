'use client'

import { useState } from 'react'

interface PassportRecord {
  id: string
  productName: string
  sku: string
  tenant: string
  metal: string
  gemstones?: string
  status: 'active' | 'draft' | 'transferred'
  scanCount: number
  lastScanned?: string
  createdAt: string
}

const MOCK_PASSPORTS: PassportRecord[] = [
  {
    id: 'pp_001',
    productName: 'Solitaire Diamond Ring',
    sku: 'SDR-001',
    tenant: 'Maison Bijou',
    metal: '18ct White Gold',
    gemstones: 'Round Brilliant Diamond, 0.72ct, G/VS1',
    status: 'active',
    scanCount: 14,
    lastScanned: '2024-03-10',
    createdAt: '2024-01-16',
  },
  {
    id: 'pp_002',
    productName: 'Gold Pearl Bracelet',
    sku: 'GPB-001',
    tenant: 'Maison Bijou',
    metal: '14ct Yellow Gold',
    gemstones: 'South Sea Pearl, 8–10mm',
    status: 'active',
    scanCount: 6,
    lastScanned: '2024-03-08',
    createdAt: '2024-02-06',
  },
  {
    id: 'pp_003',
    productName: 'Emerald Ring Nouveau',
    sku: 'ERN-001',
    tenant: 'Maison Bijou',
    metal: '18ct Rose Gold',
    gemstones: 'Colombian Emerald, 1.2ct',
    status: 'draft',
    scanCount: 0,
    createdAt: '2024-03-02',
  },
  {
    id: 'pp_004',
    productName: 'Princess Diamond Pendant',
    sku: 'PDP-001',
    tenant: 'Diamond & Co.',
    metal: '18ct White Gold',
    gemstones: 'Princess Diamond, 0.5ct',
    status: 'active',
    scanCount: 31,
    lastScanned: '2024-03-12',
    createdAt: '2023-12-01',
  },
  {
    id: 'pp_005',
    productName: 'Sapphire Halo Ring',
    sku: 'SHR-001',
    tenant: 'Diamond & Co.',
    metal: '18ct Yellow Gold',
    gemstones: 'Sri Lankan Sapphire, 1.8ct',
    status: 'active',
    scanCount: 22,
    lastScanned: '2024-03-11',
    createdAt: '2024-01-05',
  },
]

const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-500',
  transferred: 'bg-blue-100 text-blue-700',
}

export default function AdminPassportsPage() {
  const [search, setSearch] = useState('')
  const [tenantFilter, setTenantFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const tenants = Array.from(new Set(MOCK_PASSPORTS.map((p) => p.tenant)))

  const filtered = MOCK_PASSPORTS
    .filter((p) => tenantFilter === 'all' || p.tenant === tenantFilter)
    .filter((p) => statusFilter === 'all' || p.status === statusFilter)
    .filter(
      (p) =>
        !search ||
        p.productName.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.tenant.toLowerCase().includes(search.toLowerCase())
    )

  const totalScans = MOCK_PASSPORTS.reduce((s, p) => s + p.scanCount, 0)
  const activeCount = MOCK_PASSPORTS.filter((p) => p.status === 'active').length

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-playfair font-semibold text-gray-900">All Passports</h1>
        <p className="text-sm text-gray-500 mt-1">
          {MOCK_PASSPORTS.length} passports · {activeCount} active · {totalScans.toLocaleString()} total scans
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Total Passports</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{MOCK_PASSPORTS.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Total Scans</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{totalScans.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Avg Scans / Passport</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {(totalScans / MOCK_PASSPORTS.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search passports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-40 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
        />
        <select
          value={tenantFilter}
          onChange={(e) => setTenantFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
        >
          <option value="all">All tenants</option>
          {tenants.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="transferred">Transferred</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Product', 'SKU', 'Tenant', 'Metal', 'Status', 'Scans', 'Last Scan', ''].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((pp) => (
              <tr key={pp.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-gray-800">{pp.productName}</p>
                  {pp.gemstones && <p className="text-xs text-gray-400 truncate max-w-48">{pp.gemstones}</p>}
                </td>
                <td className="px-5 py-4">
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{pp.sku}</code>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{pp.tenant}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{pp.metal}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[pp.status]}`}>
                    {pp.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{pp.scanCount.toLocaleString()}</td>
                <td className="px-5 py-4 text-xs text-gray-400">
                  {pp.lastScanned
                    ? new Date(pp.lastScanned).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                    : '—'}
                </td>
                <td className="px-5 py-4">
                  <button className="text-xs text-gray-400 hover:text-gray-600">View →</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center text-sm text-gray-400">
                  No passports match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
