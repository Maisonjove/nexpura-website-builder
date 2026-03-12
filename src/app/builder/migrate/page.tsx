'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Platform = 'shopify' | 'wordpress' | 'squarespace' | 'wix' | 'other'
type Step = 1 | 2 | 3 | 4

interface AnalysisResult {
  title: string
  description: string
  h1: string
  navLinks: { text: string; href: string }[]
  bodyText: string
  ogImage: string | null
  themeColor: string | null
  headings: string[]
}

const PLATFORMS: { value: Platform; label: string; icon: string }[] = [
  { value: 'shopify', label: 'Shopify', icon: '🛍️' },
  { value: 'wordpress', label: 'WordPress', icon: '📝' },
  { value: 'squarespace', label: 'Squarespace', icon: '◻️' },
  { value: 'wix', label: 'Wix', icon: '🎨' },
  { value: 'other', label: 'Other', icon: '🌐' },
]

export default function MigratePage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [url, setUrl] = useState('')
  const [platform, setPlatform] = useState<Platform>('other')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [building, setBuilding] = useState(false)

  async function handleAnalyze() {
    if (!url) return
    setLoading(true)
    setError('')
    setStep(2)

    try {
      const res = await fetch('/api/migrate/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, platform }),
      })
      if (!res.ok) throw new Error('Failed to analyze website')
      const data = await res.json()
      setAnalysis(data)
      setStep(3)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setStep(1)
    } finally {
      setLoading(false)
    }
  }

  async function handleBuild() {
    if (!analysis) return
    setBuilding(true)
    setStep(4)

    try {
      const res = await fetch('/api/migrate/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysis }),
      })
      if (!res.ok) throw new Error('Failed to build site')
      // Redirect to editor
      setTimeout(() => router.push('/builder/pages/home'), 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Build failed')
      setBuilding(false)
      setStep(3)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-playfair font-semibold text-gray-900">Migrate Your Website</h1>
        <p className="text-sm text-gray-500 mt-1">
          Enter your existing website URL and we'll import your content automatically
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                s < step
                  ? 'bg-nexpura-mint text-white'
                  : s === step
                  ? 'bg-nexpura-forest text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {s < step ? '✓' : s}
            </div>
            {s < 4 && <div className={`h-0.5 w-12 ${s < step ? 'bg-nexpura-mint' : 'bg-gray-100'}`} />}
          </div>
        ))}
        <div className="ml-2 text-xs text-gray-400">
          {step === 1 && 'Enter URL'}
          {step === 2 && 'Analyzing...'}
          {step === 3 && 'Review'}
          {step === 4 && 'Building...'}
        </div>
      </div>

      {/* Step 1: URL input */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Your Current Website</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Website URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourbusiness.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Platform (optional)</label>
              <div className="grid grid-cols-5 gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPlatform(p.value)}
                    className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg border text-xs transition-colors ${
                      platform === p.value
                        ? 'border-nexpura-mint bg-nexpura-mint/5 text-nexpura-forest font-medium'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg">{p.icon}</span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleAnalyze}
              disabled={!url}
              className="w-full py-3 bg-nexpura-forest text-white rounded-lg text-sm font-medium hover:bg-nexpura-forest/90 transition-colors disabled:opacity-40"
            >
              Analyze Website →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Loading */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-12 h-12 border-3 border-nexpura-mint border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderWidth: 3 }} />
          <h2 className="text-lg font-playfair font-semibold text-gray-800">Analyzing your website...</h2>
          <p className="text-sm text-gray-400 mt-2">Extracting content, colours, and structure</p>
          <p className="text-xs text-gray-300 mt-1 font-mono">{url}</p>
        </div>
      )}

      {/* Step 3: Preview */}
      {step === 3 && analysis && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">✅ Analysis Complete</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Page Title</p>
                <p className="text-sm text-gray-800 font-medium mt-0.5">{analysis.title || '—'}</p>
              </div>
              {analysis.description && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Description</p>
                  <p className="text-sm text-gray-600 mt-0.5">{analysis.description}</p>
                </div>
              )}
              {analysis.navLinks.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Pages Found ({analysis.navLinks.length})</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {analysis.navLinks.slice(0, 8).map((link, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {link.text}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {analysis.themeColor && (
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Brand Colour</p>
                  <div
                    className="w-5 h-5 rounded border border-gray-200"
                    style={{ backgroundColor: analysis.themeColor }}
                  />
                  <code className="text-xs text-gray-600">{analysis.themeColor}</code>
                </div>
              )}
              {analysis.ogImage && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">Preview Image</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={analysis.ogImage} alt="OG" className="w-full h-32 object-cover rounded-lg" />
                </div>
              )}
            </div>
          </div>

          <div className="bg-nexpura-forest/5 border border-nexpura-forest/20 rounded-xl p-4">
            <p className="text-sm text-nexpura-forest font-medium">Ready to build</p>
            <p className="text-xs text-gray-500 mt-1">
              We'll create a Hero section, Trust Bar, and Contact Form using your content. You can customise everything afterwards.
            </p>
          </div>

          <button
            onClick={handleBuild}
            className="w-full py-3 bg-nexpura-forest text-white rounded-lg text-sm font-medium hover:bg-nexpura-forest/90 transition-colors"
          >
            Build My Site →
          </button>
          <button
            onClick={() => setStep(1)}
            className="w-full py-2 text-sm text-gray-400 hover:text-gray-600"
          >
            ← Start over
          </button>
        </div>
      )}

      {/* Step 4: Building */}
      {step === 4 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-4xl mb-4">🏗️</div>
          <h2 className="text-lg font-playfair font-semibold text-gray-800">
            {building ? 'Building your site...' : 'Site built! Redirecting...'}
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            {building ? 'Creating sections from your content' : '✅ Done! Opening your page editor...'}
          </p>
        </div>
      )}
    </div>
  )
}
