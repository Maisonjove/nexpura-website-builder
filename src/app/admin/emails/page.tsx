'use client'

import { useState } from 'react'

interface EmailLog {
  id: string
  tenant: string
  to: string
  subject: string
  template: string
  sentAt: string
  status: 'delivered' | 'bounced' | 'failed' | 'pending'
  opens: number
  clicks: number
}

const MOCK_LOGS: EmailLog[] = [
  {
    id: 'em_001',
    tenant: 'Maison Bijou',
    to: 'sarah.chen@example.com',
    subject: 'Your appointment at Maison Bijou is confirmed',
    template: 'appointment_confirmation',
    sentAt: '2024-03-12T14:23:00',
    status: 'delivered',
    opens: 2,
    clicks: 0,
  },
  {
    id: 'em_002',
    tenant: 'Maison Bijou',
    to: 'james.wilson@example.com',
    subject: "We've received your jewellery for repair – REP-2403-042",
    template: 'repair_received',
    sentAt: '2024-03-10T10:15:00',
    status: 'delivered',
    opens: 3,
    clicks: 1,
  },
  {
    id: 'em_003',
    tenant: 'Diamond & Co.',
    to: 'emily.taylor@example.com',
    subject: 'Your Solitaire Diamond Ring Digital Passport',
    template: 'passport_issued',
    sentAt: '2024-03-09T16:44:00',
    status: 'delivered',
    opens: 5,
    clicks: 3,
  },
  {
    id: 'em_004',
    tenant: 'The Gold Atelier',
    to: 'bounce@example.com',
    subject: 'Thank you for contacting The Gold Atelier',
    template: 'contact_received',
    sentAt: '2024-03-08T09:00:00',
    status: 'bounced',
    opens: 0,
    clicks: 0,
  },
  {
    id: 'em_005',
    tenant: 'Maison Bijou',
    to: 'priya.patel@example.com',
    subject: "We've received your bespoke enquiry",
    template: 'bespoke_received',
    sentAt: '2024-03-07T11:30:00',
    status: 'delivered',
    opens: 1,
    clicks: 0,
  },
]

const STATUS_COLORS = {
  delivered: 'bg-green-100 text-green-700',
  bounced: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
  pending: 'bg-gray-100 text-gray-500',
}

export default function AdminEmailsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [tenantFilter, setTenantFilter] = useState('all')

  const tenants = Array.from(new Set(MOCK_LOGS.map((e) => e.tenant)))

  const filtered = MOCK_LOGS
    .filter((e) => statusFilter === 'all' || e.status === statusFilter)
    .filter((e) => tenantFilter === 'all' || e.tenant === tenantFilter)
    .filter(
      (e) =>
        !search ||
        e.to.toLowerCase().includes(search.toLowerCase()) ||
        e.subject.toLowerCase().includes(search.toLowerCase()) ||
        e.tenant.toLowerCase().includes(search.toLowerCase())
    )

  const deliveryRate = Math.round(
    (MOCK_LOGS.filter((e) => e.status === 'delivered').length / MOCK_LOGS.length) * 100
  )

  const totalOpens = MOCK_LOGS.reduce((s, e) => s + e.opens, 0)
  const openRate = Math.round(
    (MOCK_LOGS.filter((e) => e.opens > 0).length / MOCK_LOGS.filter((e) => e.status === 'delivered').length) * 100
  )

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-playfair font-semibold text-gray-900">Email Logs</h1>
        <p className="text-sm text-gray-500 mt-1">Platform-wide email delivery history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Sent this month', value: MOCK_LOGS.length.toLocaleString(), icon: '📤' },
          { label: 'Delivery rate', value: `${deliveryRate}%`, icon: '✅' },
          { label: 'Open rate', value: `${openRate}%`, icon: '👁' },
          { label: 'Total opens', value: totalOpens.toLocaleString(), icon: '📬' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search emails..."
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
          {tenants.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
        >
          <option value="all">All statuses</option>
          <option value="delivered">Delivered</option>
          <option value="bounced">Bounced</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {['Recipient', 'Tenant', 'Subject', 'Template', 'Sent', 'Opens', 'Status'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((email) => (
              <tr key={email.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 text-sm text-gray-700">{email.to}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{email.tenant}</td>
                <td className="px-5 py-4 text-sm text-gray-800 max-w-xs truncate">{email.subject}</td>
                <td className="px-5 py-4">
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    {email.template}
                  </code>
                </td>
                <td className="px-5 py-4 text-xs text-gray-400">
                  {new Date(email.sentAt).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{email.opens}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[email.status]}`}>
                    {email.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-400">
                  No emails match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
