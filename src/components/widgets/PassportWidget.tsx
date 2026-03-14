'use client'

import { useState, useEffect } from 'react'

interface PassportData {
  productName: string
  metal: string
  caratage?: string
  gemstones?: string
  weight?: string
  craftedBy?: string
  craftedDate?: string
  certificateNumber?: string
  passportId: string
  issuedDate: string
  verifiedBy: string
  passportUrl?: string
}

interface Props {
  productId: string
  tenantKey: string
  buttonLabel?: string
  compact?: boolean
}

export default function PassportWidget({ productId, tenantKey, buttonLabel = 'Digital Passport', compact = false }: Props) {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<PassportData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadPassport() {
    if (data) return // Already loaded
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/passport/${productId}?key=${encodeURIComponent(tenantKey)}`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Error ${res.status}`)
      }
      const passport = await res.json()
      setData(passport)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load passport')
    } finally {
      setLoading(false)
    }
  }

  function handleOpen() {
    setOpen(true)
    loadPassport()
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className={`flex items-center gap-2 bg-nexpura-forest text-white rounded-lg hover:bg-nexpura-forest/90 transition-colors ${
          compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
        }`}
      >
        <span>🔒</span>
        <span>{buttonLabel}</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[9999] p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            {/* Header */}
            <div className="bg-nexpura-forest px-6 py-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-lg">🔒</div>
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wide">Nexpura</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white text-xl leading-none">
                  ✕
                </button>
              </div>
              <h2 className="font-playfair text-xl font-semibold">Digital Passport</h2>
              <p className="text-white/60 text-sm mt-0.5">Verified authenticity certificate</p>
            </div>

            {/* Body */}
            <div className="p-6">
              {loading && (
                <div className="flex flex-col items-center py-8 gap-3">
                  <div className="w-8 h-8 border-2 border-nexpura-mint border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-gray-400">Loading passport...</p>
                </div>
              )}

              {error && (
                <div className="py-6 text-center">
                  <p className="text-2xl mb-2">⚠️</p>
                  <p className="text-sm text-gray-600 font-medium">Passport unavailable</p>
                  <p className="text-xs text-gray-400 mt-1">{error}</p>
                  <button
                    onClick={loadPassport}
                    className="mt-4 text-xs text-nexpura-mint hover:underline"
                  >
                    Try again
                  </button>
                </div>
              )}

              {data && !loading && (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400">Product</p>
                    <p className="text-sm font-semibold text-gray-800">{data.productName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-400">Metal</p>
                      <p className="text-sm text-gray-700">{data.metal}</p>
                    </div>
                    {data.caratage && (
                      <div>
                        <p className="text-xs text-gray-400">Caratage</p>
                        <p className="text-sm text-gray-700">{data.caratage}</p>
                      </div>
                    )}
                  </div>

                  {data.gemstones && (
                    <div>
                      <p className="text-xs text-gray-400">Gemstones</p>
                      <p className="text-sm text-gray-700">{data.gemstones}</p>
                    </div>
                  )}

                  {data.weight && (
                    <div>
                      <p className="text-xs text-gray-400">Weight</p>
                      <p className="text-sm text-gray-700">{data.weight}</p>
                    </div>
                  )}

                  {data.craftedBy && (
                    <div>
                      <p className="text-xs text-gray-400">Crafted by</p>
                      <p className="text-sm text-gray-700">{data.craftedBy}</p>
                    </div>
                  )}

                  {data.craftedDate && (
                    <div>
                      <p className="text-xs text-gray-400">Crafted</p>
                      <p className="text-sm text-gray-700">
                        {new Date(data.craftedDate).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}

                  {data.certificateNumber && (
                    <div>
                      <p className="text-xs text-gray-400">Certificate #</p>
                      <p className="text-sm text-gray-700 font-mono">{data.certificateNumber}</p>
                    </div>
                  )}

                  {/* Passport ID */}
                  <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">Passport ID</p>
                      <code className="text-xs bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-gray-600">
                        {data.passportId}
                      </code>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-nexpura-mint">
                      <span>✓</span>
                      <span>Verified by {data.verifiedBy}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  {data.passportUrl && (
                    <div className="pt-2">
                      <a
                        href={data.passportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center py-2.5 border border-nexpura-forest text-nexpura-forest text-sm rounded-lg hover:bg-nexpura-forest hover:text-white transition-colors"
                      >
                        View Full Passport ↗
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
