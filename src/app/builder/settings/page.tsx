'use client'

import { useState } from 'react'

interface Settings {
  businessName: string
  subdomain: string
  customDomain: string
  metaTitle: string
  metaDescription: string
  googleAnalytics: string
  isPublished: boolean
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    businessName: 'Maison Bijou',
    subdomain: 'maison-bijou',
    customDomain: '',
    metaTitle: 'Maison Bijou — Fine Jewellery',
    metaDescription: 'Handcrafted fine jewellery. Shop engagement rings, necklaces, bracelets and more.',
    googleAnalytics: '',
    isPublished: false,
  })
  const [saved, setSaved] = useState(false)

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-playfair font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure your website domain, SEO, and general settings</p>
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
        {/* General */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Business Name</label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => update('businessName', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-700">Published</p>
                <p className="text-xs text-gray-400">Make your site visible to the public</p>
              </div>
              <button
                onClick={() => update('isPublished', !settings.isPublished)}
                className={`w-11 h-6 rounded-full transition-colors ${
                  settings.isPublished ? 'bg-nexpura-mint' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-sm mx-0.5 transition-transform ${
                    settings.isPublished ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Domain */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Domain</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Subdomain</label>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-nexpura-mint">
                <input
                  type="text"
                  value={settings.subdomain}
                  onChange={(e) => update('subdomain', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="flex-1 px-3 py-2 text-sm focus:outline-none"
                />
                <span className="px-3 py-2 bg-gray-50 text-gray-400 text-sm border-l border-gray-200">
                  .nexpura.app
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Your site is live at:{' '}
                <a href="#" className="text-nexpura-mint">
                  https://{settings.subdomain}.nexpura.app
                </a>
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Custom Domain <span className="text-xs text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                value={settings.customDomain}
                onChange={(e) => update('customDomain', e.target.value)}
                placeholder="www.yourdomain.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
              />
              <p className="text-xs text-gray-400 mt-1">
                Point your domain's CNAME to <code className="bg-gray-100 px-1 rounded">cname.nexpura.app</code>
              </p>
            </div>
          </div>
        </section>

        {/* SEO */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Meta Title</label>
              <input
                type="text"
                value={settings.metaTitle}
                onChange={(e) => update('metaTitle', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
              />
              <p className="text-xs text-gray-400 mt-1">{settings.metaTitle.length}/60 characters</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Meta Description</label>
              <textarea
                value={settings.metaDescription}
                onChange={(e) => update('metaDescription', e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">{settings.metaDescription.length}/160 characters</p>
            </div>
          </div>
        </section>

        {/* Analytics */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Analytics</h2>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Google Analytics ID <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              value={settings.googleAnalytics}
              onChange={(e) => update('googleAnalytics', e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
            />
          </div>
        </section>
      </div>
    </div>
  )
}
