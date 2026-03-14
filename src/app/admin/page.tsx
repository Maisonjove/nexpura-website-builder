'use client'

import Link from 'next/link'

const STATS = [
  { label: 'Total Tenants', value: '47', change: '+3 this month', icon: '🏪', color: 'bg-blue-50 text-blue-600' },
  { label: 'Active Sites', value: '38', change: '81% active rate', icon: '🌐', color: 'bg-green-50 text-green-600' },
  { label: 'Passport Scans', value: '12,483', change: '+1,204 this week', icon: '🔒', color: 'bg-purple-50 text-purple-600' },
  { label: 'MRR', value: '£3,718', change: '+£412 vs last month', icon: '💰', color: 'bg-amber-50 text-amber-600' },
]

const RECENT_TENANTS = [
  {
    id: 't_001',
    name: 'Maison Bijou',
    owner: 'Sophie Laurent',
    plan: 'professional',
    status: 'active',
    since: '2024-01-10',
    sites: 2,
    passportScans: 1243,
  },
  {
    id: 't_002',
    name: 'The Gold Atelier',
    owner: 'Marcus Webb',
    plan: 'starter',
    status: 'active',
    since: '2024-02-14',
    sites: 1,
    passportScans: 87,
  },
  {
    id: 't_003',
    name: 'Diamond & Co.',
    owner: 'Priya Patel',
    plan: 'enterprise',
    status: 'active',
    since: '2023-11-05',
    sites: 5,
    passportScans: 8921,
  },
  {
    id: 't_004',
    name: 'Bloom Jewels',
    owner: 'Hannah Clarke',
    plan: 'starter',
    status: 'trial',
    since: '2024-03-08',
    sites: 1,
    passportScans: 0,
  },
  {
    id: 't_005',
    name: 'Kaye & Sons',
    owner: 'Robert Kaye',
    plan: 'professional',
    status: 'suspended',
    since: '2023-09-22',
    sites: 2,
    passportScans: 432,
  },
]

const PLAN_COLORS: Record<string, string> = {
  starter: 'bg-gray-100 text-gray-600',
  professional: 'bg-blue-100 text-blue-700',
  enterprise: 'bg-purple-100 text-purple-700',
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  trial: 'bg-amber-100 text-amber-700',
  suspended: 'bg-red-100 text-red-700',
  cancelled: 'bg-gray-100 text-gray-500',
}

const REVENUE_CHART = [
  { month: 'Oct', mrr: 2100 },
  { month: 'Nov', mrr: 2480 },
  { month: 'Dec', mrr: 2820 },
  { month: 'Jan', mrr: 3050 },
  { month: 'Feb', mrr: 3306 },
  { month: 'Mar', mrr: 3718 },
]

const maxMrr = Math.max(...REVENUE_CHART.map((r) => r.mrr))

export default function AdminDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-playfair font-semibold text-gray-900">Super Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Platform overview · {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/tenants"
            className="px-4 py-2 bg-nexpura-forest text-white text-sm rounded-lg hover:bg-nexpura-forest/90"
          >
            + New Tenant
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            <p className="text-xs text-nexpura-mint mt-1 font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* MRR Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-gray-700">Monthly Recurring Revenue</h2>
            <span className="text-xs text-gray-400">Last 6 months</span>
          </div>
          <div className="flex items-end gap-3 h-32">
            {REVENUE_CHART.map((d, i) => {
              const height = (d.mrr / maxMrr) * 100
              const isLatest = i === REVENUE_CHART.length - 1
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-400">£{(d.mrr / 1000).toFixed(1)}k</span>
                  <div
                    className={`w-full rounded-t-md transition-all ${isLatest ? 'bg-nexpura-mint' : 'bg-nexpura-forest/30'}`}
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-400">{d.month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Plan breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-5">Plan Distribution</h2>
          <div className="space-y-4">
            {[
              { plan: 'Starter', count: 24, pct: 51, color: 'bg-gray-400' },
              { plan: 'Professional', count: 18, pct: 38, color: 'bg-nexpura-forest' },
              { plan: 'Enterprise', count: 5, pct: 11, color: 'bg-nexpura-mint' },
            ].map((row) => (
              <div key={row.plan}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{row.plan}</span>
                  <span className="text-gray-400">{row.count} ({row.pct}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Avg. revenue per tenant</span>
              <span className="font-semibold text-gray-700">£79.11</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Churn rate</span>
              <span className="font-semibold text-green-600">2.1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent tenants table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Recent Tenants</h2>
          <Link href="/admin/tenants" className="text-xs text-nexpura-mint hover:underline">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {RECENT_TENANTS.map((tenant) => (
            <div key={tenant.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
              {/* Avatar */}
              <div className="w-9 h-9 bg-nexpura-forest/10 rounded-lg flex items-center justify-center text-nexpura-forest font-semibold text-sm flex-shrink-0">
                {tenant.name.charAt(0)}
              </div>
              {/* Name & owner */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{tenant.name}</p>
                <p className="text-xs text-gray-400">{tenant.owner}</p>
              </div>
              {/* Plan */}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${PLAN_COLORS[tenant.plan]}`}>
                {tenant.plan}
              </span>
              {/* Status */}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[tenant.status]}`}>
                {tenant.status}
              </span>
              {/* Stats */}
              <div className="hidden lg:flex items-center gap-6 text-xs text-gray-400">
                <span>{tenant.sites} site{tenant.sites !== 1 ? 's' : ''}</span>
                <span>{tenant.passportScans.toLocaleString()} scans</span>
                <span>Since {new Date(tenant.since).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
              </div>
              {/* Actions */}
              <Link
                href={`/admin/tenants/${tenant.id}`}
                className="text-xs text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                Manage →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
