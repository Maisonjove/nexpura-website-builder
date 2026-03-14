'use client'

import { useState } from 'react'

interface Invoice {
  id: string
  tenant: string
  plan: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  date: string
  period: string
}

const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-2024-047', tenant: 'Diamond & Co.', plan: 'enterprise', amount: 299, status: 'paid', date: '2024-03-01', period: 'Mar 2024' },
  { id: 'INV-2024-046', tenant: 'Maison Bijou', plan: 'professional', amount: 79, status: 'paid', date: '2024-03-01', period: 'Mar 2024' },
  { id: 'INV-2024-045', tenant: 'Lumière Fine Jewellery', plan: 'professional', amount: 79, status: 'paid', date: '2024-03-01', period: 'Mar 2024' },
  { id: 'INV-2024-044', tenant: 'The Gold Atelier', plan: 'starter', amount: 29, status: 'paid', date: '2024-03-01', period: 'Mar 2024' },
  { id: 'INV-2024-043', tenant: 'Kaye & Sons', plan: 'professional', amount: 79, status: 'failed', date: '2024-03-01', period: 'Mar 2024' },
  { id: 'INV-2024-042', tenant: 'Bloom Jewels', plan: 'starter', amount: 0, status: 'pending', date: '2024-03-22', period: 'Trial' },
]

const STATUS_COLORS = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
}

const PLAN_COLORS: Record<string, string> = {
  starter: 'bg-gray-100 text-gray-600',
  professional: 'bg-blue-100 text-blue-700',
  enterprise: 'bg-purple-100 text-purple-700',
}

const MRR_BREAKDOWN = [
  { plan: 'Starter (24 tenants × £29)', amount: 696 },
  { plan: 'Professional (18 tenants × £79)', amount: 1422 },
  { plan: 'Enterprise (5 tenants × £299)', amount: 1495 },
]

export default function AdminBillingPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filtered = MOCK_INVOICES
    .filter((i) => statusFilter === 'all' || i.status === statusFilter)
    .filter((i) => !search || i.tenant.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()))

  const totalMrr = MRR_BREAKDOWN.reduce((s, r) => s + r.amount, 0)
  const failedCount = MOCK_INVOICES.filter((i) => i.status === 'failed').length

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-playfair font-semibold text-gray-900">Billing Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Platform-wide revenue and invoice management</p>
      </div>

      {/* MRR breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-nexpura-forest text-white rounded-xl p-6">
          <p className="text-xs text-white/60 uppercase tracking-wide">Monthly Recurring Revenue</p>
          <p className="text-4xl font-bold mt-2">£{totalMrr.toLocaleString()}</p>
          <p className="text-white/60 text-sm mt-1">+12.4% vs last month</p>
          <div className="mt-5 space-y-2">
            {MRR_BREAKDOWN.map((row) => (
              <div key={row.plan} className="flex justify-between text-sm">
                <span className="text-white/60">{row.plan}</span>
                <span className="font-medium">£{row.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide">ARR</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">£{(totalMrr * 12).toLocaleString()}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Failed Payments</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{failedCount}</p>
            <p className="text-xs text-red-500 mt-1">Require immediate attention</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wide">Avg Revenue per Tenant</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">£79</p>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <input
            type="text"
            placeholder="Search invoices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="all">All statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Invoice', 'Tenant', 'Plan', 'Period', 'Amount', 'Status', ''].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-mono text-gray-600">{inv.id}</td>
                <td className="px-5 py-4 text-sm font-medium text-gray-800">{inv.tenant}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${PLAN_COLORS[inv.plan]}`}>
                    {inv.plan}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">{inv.period}</td>
                <td className="px-5 py-4 text-sm font-semibold text-gray-700">
                  {inv.amount > 0 ? `£${inv.amount}` : '—'}
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[inv.status]}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="text-xs text-gray-400 hover:text-gray-600">
                    {inv.status === 'failed' ? 'Retry' : '↓ PDF'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
