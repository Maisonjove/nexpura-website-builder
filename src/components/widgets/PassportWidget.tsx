'use client'

import { useState } from 'react'

interface PassportData {
  productName: string
  metal: string
  gemstones?: string
  craftedDate?: string
  craftedBy?: string
  certificateUrl?: string
}

interface Props {
  productId: string
  tenantKey: string
}

export default function PassportWidget({ productId, tenantKey }: Props) {
  const [open, setOpen] = useState(false)
  const [data] = useState<PassportData | null>({
    productName: 'Solitaire Diamond Ring',
    metal: '18ct White Gold',
    gemstones: 'Round Brilliant Diamond, 0.72ct, G/VS1',
    craftedDate: '2024-01-15',
    craftedBy: 'Maison Bijou, London',
    certificateUrl: '#',
  })

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-nexpura-forest text-white text-sm rounded-lg hover:bg-nexpura-forest/90 transition-colors"
      >
        🔒 Digital Passport
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="bg-nexpura-forest rounded-t-2xl px-6 py-5 text-white">
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">🔒</span>
                <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">✕</button>
              </div>
              <h2 className="font-playfair text-xl font-semibold">Digital Passport</h2>
              <p className="text-white/60 text-sm mt-1">Verified authenticity certificate</p>
            </div>

            <div className="p-6 space-y-3">
              {data ? (
                <>
                  <div>
                    <p className="text-xs text-gray-400">Product</p>
                    <p className="text-sm font-medium text-gray-800">{data.productName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Metal</p>
                    <p className="text-sm text-gray-700">{data.metal}</p>
                  </div>
                  {data.gemstones && (
                    <div>
                      <p className="text-xs text-gray-400">Gemstones</p>
                      <p className="text-sm text-gray-700">{data.gemstones}</p>
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
                      <p className="text-sm text-gray-700">{new Date(data.craftedDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-nexpura-mint text-xs font-medium">
                      <span>✓</span>
                      <span>Verified by Nexpura</span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">Loading passport data...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
