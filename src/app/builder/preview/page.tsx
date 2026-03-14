'use client'

import { useState } from 'react'
import Link from 'next/link'

type DeviceMode = 'desktop' | 'tablet' | 'mobile'

const DEVICE_CONFIG: Record<DeviceMode, { label: string; icon: string; width: string; height: string }> = {
  desktop: { label: 'Desktop', icon: '🖥️', width: '100%', height: '100%' },
  tablet: { label: 'Tablet', icon: '📱', width: '768px', height: '1024px' },
  mobile: { label: 'Mobile', icon: '📱', width: '390px', height: '844px' },
}

// Demo subdomain to preview — in production this would come from the tenant context
const PREVIEW_DOMAIN = 'demo'

export default function PreviewPage() {
  const [device, setDevice] = useState<DeviceMode>('desktop')
  const [scale, setScale] = useState(75)

  const cfg = DEVICE_CONFIG[device]
  const previewUrl = `/site/${PREVIEW_DOMAIN}`

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/builder/pages" className="text-sm text-gray-400 hover:text-gray-600">
            ← Back to Editor
          </Link>
        </div>

        {/* Device switcher */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {(['desktop', 'tablet', 'mobile'] as DeviceMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setDevice(mode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-colors ${
                device === mode
                  ? 'bg-white text-gray-800 shadow-sm font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{DEVICE_CONFIG[mode].icon}</span>
              <span className="hidden sm:inline">{DEVICE_CONFIG[mode].label}</span>
            </button>
          ))}
        </div>

        {/* Scale & open */}
        <div className="flex items-center gap-3">
          {device !== 'desktop' && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Zoom</span>
              <input
                type="range"
                min={30}
                max={100}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-20"
              />
              <span>{scale}%</span>
            </div>
          )}
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 bg-nexpura-forest text-white text-xs rounded-lg hover:bg-nexpura-forest/90"
          >
            <span>↗</span>
            <span>Open</span>
          </a>
        </div>
      </div>

      {/* Preview frame */}
      <div className="flex-1 bg-gray-200 overflow-auto flex items-start justify-center p-6">
        {device === 'desktop' ? (
          <iframe
            src={previewUrl}
            className="w-full h-full bg-white shadow-lg rounded-lg border border-gray-300"
            title="Site Preview"
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* Device frame */}
            <div
              className={`bg-white rounded-2xl shadow-2xl border-4 overflow-hidden ${
                device === 'mobile' ? 'border-gray-800' : 'border-gray-600'
              }`}
              style={{
                width: cfg.width,
                height: cfg.height,
                transform: `scale(${scale / 100})`,
                transformOrigin: 'top center',
              }}
            >
              {/* Top bar for mobile */}
              {device === 'mobile' && (
                <div className="h-6 bg-gray-800 flex items-center justify-center">
                  <div className="w-16 h-1 bg-gray-600 rounded-full" />
                </div>
              )}
              <iframe
                src={previewUrl}
                className="w-full border-0"
                style={{ height: device === 'mobile' ? 'calc(100% - 1.5rem)' : '100%' }}
                title="Site Preview"
              />
            </div>

            <p className="text-xs text-gray-400 text-center mt-2">
              {cfg.width} × {cfg.height}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
