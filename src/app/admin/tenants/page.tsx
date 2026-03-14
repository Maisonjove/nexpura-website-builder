'use client'

import { useState } from 'react'
import Link from 'next/link'

type TenantStatus = 'active' | 'trial' | 'suspended' | 'cancelled'
type Plan = 'starter' | 'professional' | 'enterprise'

interface Tenant {
  id: string
  name: string
  owner: string
  email: string
  plan: Plan
  status: TenantStatus
  since: string
  trialEnds?: string
  sites: number
  passportScans: number
  mrr: number
  lastActive: string
  customDomain?: string
  subdomain: string
}

const MOCK_TENANTS: Tenant[] = [
  {
    id: 't_001',
    name: 'Maison Bijou',
    owner: 'Sophie Laurent',
    email: 'sophie@maisonbijou.co.uk',
    plan: 'professional',
    status: 'active',
    since: '2024-01-10',
    sites: 2,
    passportScans: 1243,
    mrr: 79,
    lastActive: '2024-03-12',
    subdomain: 'maison-bijou',
    customDomain: 'maisonbijou.co.uk',
  },
  {
    id: 't_002',
    name: 'The Gold Atelier',
    owner: 'Marcus Webb',
    email: 'marcus@goldatelier.com',
    plan: 'starter',
    status: 'active',
    since: '2024-02-14',
    sites: 1,
    passportScans: 87,
    mrr: 29,
    lastActive: '2024-03-10',
    subdomain: 'gold-atelier',
  },
  {
    id: 't_003',
    name: 'Diamond & Co.',
    owner: 'Priya Patel',
    email: 'priya@diamondco.london',
    plan: 'enterprise',
    status: 'active',
    since: '2023-11-05',
    sites: 5,
    passportScans: 8921,
    mrr: 299,
    lastActive: '2024-03-13',
    subdomain: 'diamond-co',
    customDomain: 'diamondco.london',
  },
  {
    id: 't_004',
    name: 'Bloom Jewels',
    owner: 'Hannah Clarke',
    email: 'hannah@bloomjewels.com',
    plan: 'starter',
    status: 'trial',
    since: '2024-03-08',
    trialEnds: '2024-03-22',
    sites: 1,
    passportScans: 0,
    mrr: 0,
    lastActive: '2024-03-11',
    subdomain: 'bloom-jewels',
  },
  {
    id: 't_005',
    name: 'Kaye & Sons',
    owner: 'Robert Kaye',
    email: 'robert@kayeandsons.co.uk',
    plan: 'professional',
    status: 'suspended',
    since: '2023-09-22',
    sites: 2,
    passportScans: 432,
    mrr: 0,
    lastActive: '2024-02-28',
    subdomain: 'kaye-sons',
    customDomain: 'kayeandsons.co.uk',
  },
  {
    id: 't_006',
    name: 'Lumière Fine Jewellery',
    owner: 'Isabelle Renard',
    email: 'isabelle@lumierefinejewellery.com',
    plan: 'professional',
    status: 'active',
    since: '2024-01-28',
    sites: 3,
    passportScans: 567,
    mrr: 79,
    lastActive: '2024-03-13',
    subdomain: 'lumiere',
    customDomain: 'lumierefinejewellery.com',
  },
]

const PLAN_COLORS: Record<Plan, string> = {
  starter: 'bg-gray-100 text-gray-600',
  professional: 'bg-blue-100 text-blue-700',
  enterprise: 'bg-purple-100 text-purple-700',
}

const STATUS_COLORS: Record<TenantStatus, string> = {
  active: 'bg-green-100 text-green-700',
  trial: 'bg-amber-100 text-amber-700',
  suspended: 'bg-red-100 text-red-700',
  cancelled: 'bg-gray-100 text-gray-500',
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>(MOCK_TENANTS)
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState<Plan | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<TenantStatus | 'all'>('all')
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [actionMenu, setActionMenu] = useState<string | null>(null)

  const filtered = tenants
    .filter((t) => planFilter === 'all' || t.plan === planFilter)
    .filter((t) => statusFilter === 'all' || t.status === statusFilter)
    .filter(
      (t) =>
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.owner.toLowerCase().includes(search.toLowerCase()) ||
        t.email.toLowerCase().includes(search.toLowerCase())
    )

  function handleStatusChange(id: string, status: TenantStatus) {
    setTenants((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
    setActionMenu(null)
    if (selectedTenant?.id === id) setSelectedTenant((prev) => prev ? { ...prev, status } : null)
  }

  function handlePlanChange(id: string, plan: Plan) {
    setTenants((prev) => prev.map((t) => (t.id === id ? { ...t, plan } : t)))
    setActionMenu(null)
    if (selectedTenant?.id === id) setSelectedTenant((prev) => prev ? { ...prev, plan } : null)
  }

  const totalMrr = tenants.filter((t) => t.status === 'active').reduce((s, t) => s + t.mrr, 0)
  const activeCount = tenants.filter((t) => t.status === 'active').length
  const trialCount = tenants.filter((t) => t.status === 'trial').length

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-playfair font-semibold text-gray-900">Tenants</h1>
          <p className="text-sm text-gray-500 mt-1">
            {tenants.length} total · {activeCount} active · {trialCount} on trial · £{totalMrr.toLocaleString()} MRR
          </p>
        </div>
        <button className="px-4 py-2 bg-nexpura-forest text-white text-sm rounded-lg hover:bg-nexpura-forest/90">
          + Add Tenant
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search tenants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
        />
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value as Plan | 'all')}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
        >
          <option value="all">All plans</option>
          <option value="starter">Starter</option>
          <option value="professional">Professional</option>
          <option value="enterprise">Enterprise</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TenantStatus | 'all')}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="trial">Trial</option>
          <option value="suspended">Suspended</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tenant</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Plan</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Sites</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Scans</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">MRR</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Active</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((tenant) => (
              <tr
                key={tenant.id}
                onClick={() => setSelectedTenant(tenant)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-nexpura-forest/10 rounded-lg flex items-center justify-center text-nexpura-forest font-semibold text-sm">
                      {tenant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{tenant.name}</p>
                      <p className="text-xs text-gray-400">{tenant.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${PLAN_COLORS[tenant.plan]}`}>
                    {tenant.plan}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[tenant.status]}`}>
                    {tenant.status}
                    {tenant.status === 'trial' && tenant.trialEnds && (
                      <span className="ml-1 opacity-70">
                        ends {new Date(tenant.trialEnds).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </span>
                    )}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{tenant.sites}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{tenant.passportScans.toLocaleString()}</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700">
                  {tenant.mrr > 0 ? `£${tenant.mrr}` : <span className="text-gray-300">—</span>}
                </td>
                <td className="px-4 py-4 text-xs text-gray-400">
                  {new Date(tenant.lastActive).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </td>
                <td className="px-4 py-4">
                  <div className="relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setActionMenu(actionMenu === tenant.id ? null : tenant.id) }}
                      className="text-gray-400 hover:text-gray-600 px-2 py-1"
                    >
                      ⋯
                    </button>
                    {actionMenu === tenant.id && (
                      <div
                        className="absolute right-0 top-full z-10 bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-44"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="px-3 py-1.5 text-xs text-gray-400 uppercase tracking-wide">Plan</p>
                        {(['starter', 'professional', 'enterprise'] as Plan[]).map((p) => (
                          <button
                            key={p}
                            onClick={() => handlePlanChange(tenant.id, p)}
                            className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 capitalize ${tenant.plan === p ? 'font-medium text-nexpura-forest' : 'text-gray-600'}`}
                          >
                            {tenant.plan === p && '✓ '}{p}
                          </button>
                        ))}
                        <div className="border-t border-gray-100 my-1" />
                        <p className="px-3 py-1.5 text-xs text-gray-400 uppercase tracking-wide">Status</p>
                        {tenant.status !== 'active' && (
                          <button
                            onClick={() => handleStatusChange(tenant.id, 'active')}
                            className="w-full text-left px-3 py-1.5 text-sm text-green-600 hover:bg-gray-50"
                          >
                            ✓ Activate
                          </button>
                        )}
                        {tenant.status !== 'suspended' && (
                          <button
                            onClick={() => handleStatusChange(tenant.id, 'suspended')}
                            className="w-full text-left px-3 py-1.5 text-sm text-red-600 hover:bg-gray-50"
                          >
                            Suspend
                          </button>
                        )}
                        {tenant.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusChange(tenant.id, 'cancelled')}
                            className="w-full text-left px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        )}
                        <div className="border-t border-gray-100 my-1" />
                        <button className="w-full text-left px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                          Impersonate
                        </button>
                        <button className="w-full text-left px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                          View Sites
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center text-sm text-gray-400">
                  No tenants match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tenant detail slide-over */}
      {selectedTenant && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/20" onClick={() => setSelectedTenant(null)} />
          <div className="w-96 bg-white shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="font-playfair font-semibold text-gray-900">{selectedTenant.name}</h2>
              <button onClick={() => setSelectedTenant(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6 space-y-6">
              {/* Basic info */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Account</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Owner</span>
                    <span className="text-gray-800 font-medium">{selectedTenant.owner}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Email</span>
                    <a href={`mailto:${selectedTenant.email}`} className="text-nexpura-mint hover:underline text-xs">
                      {selectedTenant.email}
                    </a>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Member since</span>
                    <span className="text-gray-700">
                      {new Date(selectedTenant.since).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Plan</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${PLAN_COLORS[selectedTenant.plan]}`}>
                      {selectedTenant.plan}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[selectedTenant.status]}`}>
                      {selectedTenant.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Domain */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Domains</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subdomain</span>
                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {selectedTenant.subdomain}.nexpura.app
                    </code>
                  </div>
                  {selectedTenant.customDomain && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Custom domain</span>
                      <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {selectedTenant.customDomain}
                      </code>
                    </div>
                  )}
                </div>
              </div>

              {/* Usage */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Usage</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sites</span>
                    <span className="text-gray-700">{selectedTenant.sites}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Passport scans</span>
                    <span className="text-gray-700">{selectedTenant.passportScans.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">MRR</span>
                    <span className="font-semibold text-gray-800">
                      {selectedTenant.mrr > 0 ? `£${selectedTenant.mrr}` : '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Actions</p>
                <div className="space-y-2">
                  <button className="w-full py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                    Impersonate tenant
                  </button>
                  {selectedTenant.status !== 'active' ? (
                    <button
                      onClick={() => handleStatusChange(selectedTenant.id, 'active')}
                      className="w-full py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Activate Account
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(selectedTenant.id, 'suspended')}
                      className="w-full py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      Suspend Account
                    </button>
                  )}
                  <button className="w-full py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                    Send password reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
