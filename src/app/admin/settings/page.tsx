'use client'

import { useState } from 'react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    platformName: 'Nexpura',
    supportEmail: 'support@nexpura.app',
    billingEmail: 'billing@nexpura.app',
    trialDays: 14,
    passportScanLimitStarter: 500,
    passportScanLimitPro: 5000,
    passportScanLimitEnterprise: -1,
    emailsPerMonthStarter: 1000,
    emailsPerMonthPro: 10000,
    emailsPerMonthEnterprise: -1,
    cdnBaseUrl: 'https://cdn.nexpura.app',
    passportBaseUrl: 'https://passport.nexpura.app',
    appBaseUrl: 'https://nexpura.app',
    maintenanceMode: false,
    newSignupsEnabled: true,
    trialEnabled: true,
    stripePublishableKey: 'pk_live_...',
    stripeWebhookSecret: 'whsec_...',
    resendApiKey: 're_...',
    anthropicApiKey: 'sk-ant-...',
  })
  const [saved, setSaved] = useState(false)

  function update(key: string, value: string | number | boolean) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-playfair font-semibold text-gray-900">Platform Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Global configuration for the Nexpura platform</p>
        </div>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            saved ? 'bg-green-100 text-green-700' : 'bg-nexpura-forest text-white hover:bg-nexpura-forest/90'
          }`}
        >
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Platform */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Platform</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Platform Name</label>
                <input
                  type="text"
                  value={settings.platformName}
                  onChange={(e) => update('platformName', e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Trial Period (days)</label>
                <input
                  type="number"
                  value={settings.trialDays}
                  onChange={(e) => update('trialDays', Number(e.target.value))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Support Email</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => update('supportEmail', e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Billing Email</label>
                <input
                  type="email"
                  value={settings.billingEmail}
                  onChange={(e) => update('billingEmail', e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              </div>
            </div>

            {/* Toggles */}
            {[
              { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Show maintenance page to all users' },
              { key: 'newSignupsEnabled', label: 'New Signups', desc: 'Allow new accounts to be created' },
              { key: 'trialEnabled', label: 'Free Trial', desc: 'Offer a free trial period to new users' },
            ].map((tog) => (
              <div key={tog.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">{tog.label}</p>
                  <p className="text-xs text-gray-400">{tog.desc}</p>
                </div>
                <button
                  onClick={() => update(tog.key, !settings[tog.key as keyof typeof settings])}
                  className={`w-11 h-6 rounded-full transition-colors ${
                    settings[tog.key as keyof typeof settings] ? 'bg-nexpura-mint' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-sm mx-0.5 transition-transform ${
                      settings[tog.key as keyof typeof settings] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* URLs */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">URLs</h2>
          <div className="space-y-3">
            {[
              { key: 'appBaseUrl', label: 'App Base URL' },
              { key: 'cdnBaseUrl', label: 'CDN Base URL' },
              { key: 'passportBaseUrl', label: 'Passport Base URL' },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
                <input
                  type="url"
                  value={settings[f.key as keyof typeof settings] as string}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint font-mono"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Plan limits */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Plan Limits</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Limit</th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Starter</th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Professional</th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-3 text-gray-600">Passport Scans / month</td>
                  <td className="py-3">
                    <input
                      type="number"
                      value={settings.passportScanLimitStarter}
                      onChange={(e) => update('passportScanLimitStarter', Number(e.target.value))}
                      className="w-20 text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-nexpura-mint"
                    />
                  </td>
                  <td className="py-3">
                    <input
                      type="number"
                      value={settings.passportScanLimitPro}
                      onChange={(e) => update('passportScanLimitPro', Number(e.target.value))}
                      className="w-20 text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-nexpura-mint"
                    />
                  </td>
                  <td className="py-3 text-gray-400 text-sm">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-600">Emails / month</td>
                  <td className="py-3">
                    <input
                      type="number"
                      value={settings.emailsPerMonthStarter}
                      onChange={(e) => update('emailsPerMonthStarter', Number(e.target.value))}
                      className="w-20 text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-nexpura-mint"
                    />
                  </td>
                  <td className="py-3">
                    <input
                      type="number"
                      value={settings.emailsPerMonthPro}
                      onChange={(e) => update('emailsPerMonthPro', Number(e.target.value))}
                      className="w-20 text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-nexpura-mint"
                    />
                  </td>
                  <td className="py-3 text-gray-400 text-sm">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* API Keys */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">API Keys & Integrations</h2>
          <p className="text-xs text-gray-400 mb-4">These values should be set as environment variables in production.</p>
          <div className="space-y-3">
            {[
              { key: 'stripePublishableKey', label: 'Stripe Publishable Key' },
              { key: 'stripeWebhookSecret', label: 'Stripe Webhook Secret' },
              { key: 'resendApiKey', label: 'Resend API Key' },
              { key: 'anthropicApiKey', label: 'Anthropic API Key' },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
                <input
                  type="password"
                  value={settings[f.key as keyof typeof settings] as string}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint font-mono"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
