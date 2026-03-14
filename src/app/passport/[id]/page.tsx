import { notFound } from 'next/navigation'

// Mock data — in production, query Supabase by passport ID
const PASSPORTS: Record<string, {
  passportId: string
  productName: string
  sku: string
  metal: string
  caratage?: string
  gemstones?: string
  weight?: string
  craftedBy?: string
  craftedDate?: string
  certificateNumber?: string
  businessName: string
  businessWebsite?: string
  issuedDate: string
  verifiedBy: string
}> = {
  'pp_001': {
    passportId: 'pp_001',
    productName: 'Solitaire Diamond Ring',
    sku: 'SDR-001',
    metal: '18ct White Gold',
    caratage: '18ct',
    gemstones: 'Round Brilliant Diamond, 0.72ct, G/VS1',
    weight: '3.8g',
    craftedBy: 'Maison Bijou Atelier, London',
    craftedDate: '2024-01-15',
    certificateNumber: 'GIA-2406768282',
    businessName: 'Maison Bijou',
    businessWebsite: 'https://maisonbijou.co.uk',
    issuedDate: '2024-01-16',
    verifiedBy: 'Nexpura',
  },
  'pp_002': {
    passportId: 'pp_002',
    productName: 'Gold Pearl Bracelet',
    sku: 'GPB-001',
    metal: '14ct Yellow Gold',
    caratage: '14ct',
    gemstones: 'South Sea Pearl, 8–10mm',
    weight: '12.4g',
    craftedBy: 'Maison Bijou Atelier, London',
    craftedDate: '2024-02-05',
    businessName: 'Maison Bijou',
    businessWebsite: 'https://maisonbijou.co.uk',
    issuedDate: '2024-02-06',
    verifiedBy: 'Nexpura',
  },
}

interface Props {
  params: { id: string }
}

export default function PassportPublicPage({ params }: Props) {
  const passport = PASSPORTS[params.id]
  if (!passport) return notFound()

  const details = [
    { label: 'Product', value: passport.productName },
    { label: 'SKU / Reference', value: passport.sku },
    { label: 'Metal', value: passport.metal },
    passport.caratage ? { label: 'Caratage', value: passport.caratage } : null,
    passport.gemstones ? { label: 'Gemstones', value: passport.gemstones } : null,
    passport.weight ? { label: 'Weight', value: passport.weight } : null,
    passport.craftedBy ? { label: 'Crafted by', value: passport.craftedBy } : null,
    passport.craftedDate
      ? {
          label: 'Crafted',
          value: new Date(passport.craftedDate).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }
      : null,
    passport.certificateNumber ? { label: 'Certificate #', value: passport.certificateNumber } : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="bg-[#1a2e1a] rounded-t-2xl px-6 py-6 text-white text-center">
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
            🔒
          </div>
          <h1 className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Digital Passport
          </h1>
          <p className="text-white/60 text-sm mt-1">{passport.businessName}</p>
        </div>

        {/* Verified banner */}
        <div className="bg-[#52B788] text-white px-6 py-2.5 flex items-center justify-center gap-2 text-sm font-medium">
          <span>✓</span>
          <span>Verified by Nexpura</span>
        </div>

        {/* Details */}
        <div className="bg-white px-6 py-6 divide-y divide-gray-100">
          {details.map((d, i) => (
            <div key={i} className="py-3 flex justify-between gap-4">
              <span className="text-xs text-gray-400 flex-shrink-0 w-28">{d.label}</span>
              <span className="text-sm text-gray-800 text-right font-medium">{d.value}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-white rounded-b-2xl px-6 py-5 border-t border-gray-100 text-center space-y-3">
          <div className="text-xs text-gray-400">
            Passport ID:{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{passport.passportId}</code>
          </div>
          <div className="text-xs text-gray-400">
            Issued:{' '}
            {new Date(passport.issuedDate).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          {passport.businessWebsite && (
            <a
              href={passport.businessWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-[#52B788] hover:underline"
            >
              Visit {passport.businessName} →
            </a>
          )}
        </div>

        {/* Powered by */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">
            Powered by{' '}
            <a href="https://nexpura.app" className="text-gray-500 hover:text-gray-700">
              Nexpura
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
