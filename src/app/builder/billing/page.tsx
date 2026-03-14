'use client'

import { useState } from 'react'

type Plan = 'starter' | 'professional' | 'enterprise'

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  description: string
  downloadUrl: string
}

const PLANS = [
  {
    key: 'starter' as Plan,
    name: 'Starter',
    price: 29,
    period: 'month',
    description: 'Perfect for solo jewellers',
    features: [
      '1 website',
      'Nexpura subdomain',
      'Digital Passport widget',
      'AI Chat widget',
      'Appointment booking',
      '500 passport scans/month',
      'Email support',
    ],
    limits: { websites: 1, passportScans: 500, emailsPerMonth: 1000 },
  },
  {
    key: 'professional' as Plan,
    name: 'Professional',
    price: 79,
    period: 'month',
    description: 'For growing jewellery businesses',
    popular: true,
    features: [
      '3 websites',
      'Custom domain',
      'All Starter features',
      'Bespoke & Repair forms',
      '5,000 passport scans/month',
      'Priority email support',
      'Analytics dashboard',
      'PDF certificate generation',
    ],
    limits: { websites: 3, passportScans: 5000, emailsPerMonth: 10000 },
  },
  {
    key: 'enterprise' as Plan,
    name: 'Enterprise',
    price: 299,
    period: 'month',
    description: 'For multi-location jewellers',
    features: [
      'Unlimited websites',
      'Custom domain',
      'All Professional features',
      'Unlimited passport scans',
      'White-label option',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
    ],
    limits: { websites: Infinity, passportScans: Infinity, emailsPerMonth: Infinity },
  },
]

const MOCK_INVOICES: Invoice[] = [
  {
    id: 'INV-2024-003',
    date: '2024-03-01',
    amount: 79,
    status: 'paid',
    description: 'Professional Plan – March 2024',
    downloadUrl: '#',
  },
  {
    id: 'INV-2024-002',
    date: '2024-02-01',
    amount: 79,
    status: 'paid',
    description: 'Professional Plan – February 2024',
    downloadUrl: '#',
  },
  {
    id: 'INV-2024-001',
    date: '2024-01-01',
    amount: 29,
    status: 'paid',
    description: 'Starter Plan – January 2024',
    downloadUrl: '#',
  },
]

const USAGE = {
  passportScans: { used: 1243, limit: 5000 },
  emailsSent: { used: 387, limit: 10000 },
  websites: { used: 1, limit: 3 },
  storageGB: { used: 0.8, limit: 10 },
}

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState<Plan>('professional')
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [upgradeTarget, setUpgradeTarget] = useState<Plan | null>(null)

  function handleUpgrade(plan: Plan) {
    setUpgradeTarget(plan)
    setShowUpgrade(true)
  }

  function confirmUpgrade() {
    if (upgradeTarget) setCurrentPlan(upgradeTarget)
    setShowUpgrade(false)
    setUpgradeTarget(null)
  }

  const activePlan = PLANS.find((p) => p.key === currentPlan)!

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-playfair font-semibold text-gray-900">Billing</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your plan, usage, and invoices</p>
      </div>

      {/* Current plan banner */}
      <div className="bg-nexpura-forest text-white rounded-xl p-6 mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs text-white/60 uppercase tracking-wide">Current Plan</p>
          <h2 className="text-2xl font-playfair font-semibold mt-1">{activePlan.name}</h2>
          <p className="text-white/70 text-sm mt-1">{activePlan.description}</p>
          <p className="mt-3">
            <span className="text-3xl font-bold">£{activePlan.price}</span>
            <span className="text-white/60 text-sm ml-1">/ month</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/60 mb-2">Next billing date</p>
          <p className="text-sm font-medium">1 April 2024</p>
          <button className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
            Manage Payment
          </button>
        </div>
      </div>

      {/* Usage stats */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-5">This Month's Usage</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Passport Scans', used: USAGE.passportScans.used, limit: USAGE.passportScans.limit, icon: '🔒' },
            { label: 'Emails Sent', used: USAGE.emailsSent.used, limit: USAGE.emailsSent.limit, icon: '📧' },
            { label: 'Websites', used: USAGE.websites.used, limit: USAGE.websites.limit, icon: '🌐' },
            { label: 'Storage (GB)', used: USAGE.storageGB.used, limit: USAGE.storageGB.limit, icon: '💾' },
          ].map((item) => {
            const pct = Math.min(100, (item.used / item.limit) * 100)
            const isOver80 = pct > 80
            return (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <span>{item.icon}</span> {item.label}
                  </span>
                </div>
                <p className="text-xl font-semibold text-gray-800">
                  {typeof item.used === 'number' && item.used < 10 ? item.used.toFixed(1) : item.used.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mb-2">
                  of {item.limit === Infinity ? '∞' : item.limit.toLocaleString()}
                </p>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isOver80 ? 'bg-amber-400' : 'bg-nexpura-mint'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Plans */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Change Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan) => {
            const isCurrent = plan.key === currentPlan
            return (
              <div
                key={plan.key}
                className={`relative bg-white rounded-xl border-2 p-5 transition-colors ${
                  isCurrent
                    ? 'border-nexpura-mint bg-nexpura-mint/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && !isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-nexpura-mint text-white text-xs px-3 py-0.5 rounded-full font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-nexpura-forest text-white text-xs px-3 py-0.5 rounded-full font-medium">
                      Current Plan
                    </span>
                  </div>
                )}
                <h3 className="font-semibold text-gray-800">{plan.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5 mb-3">{plan.description}</p>
                <p className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">£{plan.price}</span>
                  <span className="text-xs text-gray-400 ml-1">/month</span>
                </p>
                <ul className="space-y-2 mb-5">
                  {plan.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-nexpura-mint mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                  {plan.features.length > 5 && (
                    <li className="text-xs text-gray-400">+{plan.features.length - 5} more features</li>
                  )}
                </ul>
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-2 rounded-lg text-xs font-medium bg-nexpura-forest/10 text-nexpura-forest cursor-default"
                  >
                    Active Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(plan.key)}
                    className="w-full py-2 rounded-lg text-xs font-medium bg-nexpura-forest text-white hover:bg-nexpura-forest/90 transition-colors"
                  >
                    {plan.price > activePlan.price ? 'Upgrade' : 'Downgrade'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Invoices */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Invoices</h2>
          <button className="text-xs text-nexpura-mint hover:underline">Download all</button>
        </div>
        <div className="divide-y divide-gray-100">
          {MOCK_INVOICES.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">
                  📄
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{inv.description}</p>
                  <p className="text-xs text-gray-400">
                    {inv.id} · {new Date(inv.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    inv.status === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : inv.status === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                </span>
                <span className="text-sm font-semibold text-gray-800">£{inv.amount}</span>
                <button className="text-xs text-gray-400 hover:text-gray-600">↓ PDF</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment method */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Payment Method</h2>
          <button className="text-xs text-nexpura-mint hover:underline">Update</button>
        </div>
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">VISA</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">•••• •••• •••• 4242</p>
            <p className="text-xs text-gray-400">Expires 08/2026</p>
          </div>
          <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Need to cancel? Email{' '}
            <a href="mailto:billing@nexpura.app" className="text-nexpura-mint hover:underline">
              billing@nexpura.app
            </a>
            . Cancellations take effect at the end of the billing period.
          </p>
        </div>
      </section>

      {/* Upgrade confirmation modal */}
      {showUpgrade && upgradeTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-playfair font-semibold text-gray-900 mb-2">
              {PLANS.find((p) => p.key === upgradeTarget)!.price > activePlan.price ? 'Upgrade Plan' : 'Change Plan'}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Switch to{' '}
              <span className="font-medium text-gray-800">
                {PLANS.find((p) => p.key === upgradeTarget)!.name}
              </span>{' '}
              for £{PLANS.find((p) => p.key === upgradeTarget)!.price}/month.{' '}
              {PLANS.find((p) => p.key === upgradeTarget)!.price > activePlan.price
                ? 'You will be charged the prorated difference immediately.'
                : 'Your plan will downgrade at the end of the current billing period.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUpgrade(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpgrade}
                className="flex-1 py-2.5 bg-nexpura-forest text-white rounded-lg text-sm font-medium hover:bg-nexpura-forest/90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
