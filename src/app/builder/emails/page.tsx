'use client'

import { useState } from 'react'

type EmailEvent =
  | 'appointment_confirmation'
  | 'appointment_reminder'
  | 'repair_received'
  | 'repair_ready'
  | 'bespoke_received'
  | 'bespoke_quote'
  | 'contact_received'
  | 'passport_issued'
  | 'order_confirmation'
  | 'welcome'

interface EmailTemplate {
  key: EmailEvent
  name: string
  trigger: string
  icon: string
  category: 'booking' | 'repair' | 'bespoke' | 'general' | 'passport'
  enabled: boolean
  subject: string
  previewText: string
  body: string
}

const DEFAULT_TEMPLATES: EmailTemplate[] = [
  {
    key: 'appointment_confirmation',
    name: 'Appointment Confirmation',
    trigger: 'When a booking is made',
    icon: '📅',
    category: 'booking',
    enabled: true,
    subject: 'Your appointment at {{businessName}} is confirmed',
    previewText: 'We look forward to seeing you on {{date}}',
    body: `Dear {{customerName}},

Thank you for booking an appointment with {{businessName}}.

Your appointment details:
• Date: {{date}}
• Time: {{time}}
• Service: {{service}}
• Location: {{address}}

If you need to reschedule or cancel, please contact us at least 24 hours in advance.

We look forward to welcoming you.

Warm regards,
{{businessName}}`,
  },
  {
    key: 'appointment_reminder',
    name: 'Appointment Reminder',
    trigger: '24 hours before appointment',
    icon: '⏰',
    category: 'booking',
    enabled: true,
    subject: 'Reminder: Your appointment tomorrow at {{businessName}}',
    previewText: 'A friendly reminder for your visit tomorrow',
    body: `Dear {{customerName}},

Just a friendly reminder that you have an appointment with us tomorrow.

📅 {{date}} at {{time}}
📍 {{address}}

See you soon!

{{businessName}}`,
  },
  {
    key: 'repair_received',
    name: 'Repair Intake Confirmation',
    trigger: 'When repair item is received',
    icon: '🔧',
    category: 'repair',
    enabled: true,
    subject: 'We\'ve received your jewellery for repair – {{refNumber}}',
    previewText: 'Your piece is in safe hands',
    body: `Dear {{customerName}},

We have safely received your jewellery for repair and will begin work shortly.

Repair reference: {{refNumber}}
Item: {{itemDescription}}
Agreed work: {{repairDescription}}
Estimated completion: {{estimatedDate}}
Quoted price: £{{price}}

We'll be in touch as soon as your piece is ready.

{{businessName}}`,
  },
  {
    key: 'repair_ready',
    name: 'Repair Ready for Collection',
    trigger: 'When repair is completed',
    icon: '✅',
    category: 'repair',
    enabled: true,
    subject: 'Your jewellery is ready to collect – {{refNumber}}',
    previewText: 'Your piece has been expertly restored',
    body: `Dear {{customerName}},

Great news! Your jewellery repair is complete and ready for collection.

Repair reference: {{refNumber}}
Item: {{itemDescription}}
Collection hours: {{openingHours}}

Please bring this email or your reference number when collecting.

{{businessName}}`,
  },
  {
    key: 'bespoke_received',
    name: 'Bespoke Enquiry Received',
    trigger: 'When a bespoke form is submitted',
    icon: '💎',
    category: 'bespoke',
    enabled: true,
    subject: 'We\'ve received your bespoke enquiry',
    previewText: 'Thank you for reaching out about a custom piece',
    body: `Dear {{customerName}},

Thank you for your bespoke commission enquiry. We're excited to help bring your vision to life.

Our team will review your request and be in touch within 2 business days to discuss your project in detail.

Your enquiry reference: {{refNumber}}

In the meantime, please feel free to browse our portfolio at {{websiteUrl}}.

Warmly,
{{businessName}}`,
  },
  {
    key: 'bespoke_quote',
    name: 'Bespoke Quote',
    trigger: 'When a quote is sent manually',
    icon: '📋',
    category: 'bespoke',
    enabled: false,
    subject: 'Your bespoke quote from {{businessName}}',
    previewText: 'We\'ve prepared a quote for your custom commission',
    body: `Dear {{customerName}},

Please find below our quote for your bespoke commission.

Project: {{projectDescription}}
Materials: {{materials}}
Timeline: {{timeline}}
Quoted price: £{{price}} (inc. VAT)

This quote is valid for 30 days. To proceed, please reply confirming your acceptance and we'll request a 25% deposit to begin work.

{{businessName}}`,
  },
  {
    key: 'contact_received',
    name: 'Contact Form Receipt',
    trigger: 'When contact form is submitted',
    icon: '📬',
    category: 'general',
    enabled: true,
    subject: 'Thank you for contacting {{businessName}}',
    previewText: 'We\'ve received your message',
    body: `Dear {{customerName}},

Thank you for getting in touch. We've received your message and will respond within 1–2 business days.

If your enquiry is urgent, please call us at {{phone}}.

{{businessName}}`,
  },
  {
    key: 'passport_issued',
    name: 'Digital Passport Issued',
    trigger: 'When a passport is published',
    icon: '🔒',
    category: 'passport',
    enabled: true,
    subject: 'Your {{productName}} Digital Passport',
    previewText: 'Your certificate of authenticity is ready',
    body: `Dear {{customerName}},

Your purchase comes with a Nexpura Digital Passport — a permanent record of your jewellery's provenance and authenticity.

Product: {{productName}}
Passport ID: {{passportId}}

View your passport: {{passportUrl}}

You can share this link or scan the QR code included with your packaging to access your passport at any time.

{{businessName}}`,
  },
  {
    key: 'welcome',
    name: 'Welcome Email',
    trigger: 'When a customer account is created',
    icon: '👋',
    category: 'general',
    enabled: true,
    subject: 'Welcome to {{businessName}}',
    previewText: 'We\'re delighted to have you',
    body: `Dear {{customerName}},

Welcome to {{businessName}}. We're delighted to have you as a client.

As a valued member of our community, you'll receive:
• Early access to new collections
• Invitations to exclusive events
• Priority appointment booking

Browse our collection at {{websiteUrl}}.

{{businessName}}`,
  },
]

interface SentEmail {
  id: string
  template: EmailEvent
  to: string
  subject: string
  sentAt: string
  status: 'delivered' | 'bounced' | 'pending'
}

const MOCK_SENT: SentEmail[] = [
  {
    id: 'em_001',
    template: 'appointment_confirmation',
    to: 'sarah.chen@example.com',
    subject: 'Your appointment at Maison Bijou is confirmed',
    sentAt: '2024-03-10T14:23:00',
    status: 'delivered',
  },
  {
    id: 'em_002',
    template: 'repair_received',
    to: 'james.wilson@example.com',
    subject: "We've received your jewellery for repair – REP-2024-042",
    sentAt: '2024-03-08T10:15:00',
    status: 'delivered',
  },
  {
    id: 'em_003',
    template: 'passport_issued',
    to: 'emily.taylor@example.com',
    subject: 'Your Solitaire Diamond Ring Digital Passport',
    sentAt: '2024-03-06T16:44:00',
    status: 'delivered',
  },
]

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'booking', label: '📅 Booking' },
  { key: 'repair', label: '🔧 Repair' },
  { key: 'bespoke', label: '💎 Bespoke' },
  { key: 'passport', label: '🔒 Passport' },
  { key: 'general', label: '📬 General' },
]

export default function EmailsPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(DEFAULT_TEMPLATES)
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [activeTab, setActiveTab] = useState<'templates' | 'log'>('templates')
  const [catFilter, setCatFilter] = useState('all')
  const [editing, setEditing] = useState(false)
  const [editDraft, setEditDraft] = useState<EmailTemplate | null>(null)

  const filteredTemplates = templates.filter(
    (t) => catFilter === 'all' || t.category === catFilter
  )

  function toggleTemplate(key: EmailEvent) {
    setTemplates((prev) =>
      prev.map((t) => (t.key === key ? { ...t, enabled: !t.enabled } : t))
    )
  }

  function saveEditDraft() {
    if (!editDraft) return
    setTemplates((prev) => prev.map((t) => (t.key === editDraft.key ? editDraft : t)))
    setSelectedTemplate(editDraft)
    setEditing(false)
    setEditDraft(null)
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
        <div className="px-4 py-4 border-b border-gray-100">
          <h1 className="font-playfair font-semibold text-gray-900">Email Communications</h1>
          <p className="text-xs text-gray-400 mt-0.5">Automated emails sent to your clients</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {(['templates', 'log'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-xs font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-nexpura-mint text-nexpura-forest'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab === 'templates' ? `Templates (${templates.length})` : `Sent Log`}
            </button>
          ))}
        </div>

        {activeTab === 'templates' && (
          <>
            {/* Category filter */}
            <div className="px-3 pt-3 pb-2">
              <div className="flex flex-wrap gap-1">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setCatFilter(c.key)}
                    className={`px-2 py-0.5 rounded text-xs transition-colors ${
                      catFilter === c.key
                        ? 'bg-nexpura-mint/10 text-nexpura-forest font-medium'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {filteredTemplates.map((t) => (
                <button
                  key={t.key}
                  onClick={() => { setSelectedTemplate(t); setEditing(false) }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                    selectedTemplate?.key === t.key
                      ? 'bg-nexpura-mint/5 border-l-2 border-nexpura-mint'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base flex-shrink-0">{t.icon}</span>
                      <span className="text-sm text-gray-700 truncate">{t.name}</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleTemplate(t.key) }}
                      className={`w-8 h-4 rounded-full flex-shrink-0 transition-colors ${
                        t.enabled ? 'bg-nexpura-mint' : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className={`w-3 h-3 bg-white rounded-full shadow-sm mx-0.5 transition-transform ${
                          t.enabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 ml-6">{t.trigger}</p>
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === 'log' && (
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {MOCK_SENT.map((email) => {
              const tmpl = templates.find((t) => t.key === email.template)
              return (
                <div key={email.id} className="px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 truncate">{email.to}</span>
                    <span
                      className={`text-xs flex-shrink-0 ${
                        email.status === 'delivered'
                          ? 'text-green-600'
                          : email.status === 'bounced'
                          ? 'text-red-500'
                          : 'text-amber-500'
                      }`}
                    >
                      {email.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{email.subject}</p>
                  <p className="text-xs text-gray-300 mt-0.5">
                    {tmpl?.icon} {new Date(email.sentAt).toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Detail panel */}
      <div className="flex-1 overflow-y-auto">
        {selectedTemplate ? (
          <div className="p-8 max-w-2xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{selectedTemplate.icon}</span>
                  <h2 className="text-xl font-playfair font-semibold text-gray-900">
                    {selectedTemplate.name}
                  </h2>
                </div>
                <p className="text-xs text-gray-400 ml-9">Trigger: {selectedTemplate.trigger}</p>
              </div>
              <div className="flex gap-2">
                {editing ? (
                  <>
                    <button
                      onClick={() => { setEditing(false); setEditDraft(null) }}
                      className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEditDraft}
                      className="px-3 py-1.5 bg-nexpura-forest text-white text-xs rounded-lg"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => toggleTemplate(selectedTemplate.key)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        selectedTemplate.enabled
                          ? 'border-green-200 bg-green-50 text-green-700'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {selectedTemplate.enabled ? '● Enabled' : '○ Disabled'}
                    </button>
                    <button
                      onClick={() => {
                        setEditing(true)
                        setEditDraft({ ...selectedTemplate })
                      }}
                      className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-50"
                    >
                      Edit Template
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Subject Line
              </label>
              {editing && editDraft ? (
                <input
                  type="text"
                  value={editDraft.subject}
                  onChange={(e) => setEditDraft({ ...editDraft, subject: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                  {selectedTemplate.subject}
                </div>
              )}
            </div>

            {/* Preview text */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Preview Text
              </label>
              {editing && editDraft ? (
                <input
                  type="text"
                  value={editDraft.previewText}
                  onChange={(e) => setEditDraft({ ...editDraft, previewText: e.target.value })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500">
                  {selectedTemplate.previewText}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Email Body
              </label>
              {editing && editDraft ? (
                <textarea
                  value={editDraft.body}
                  onChange={(e) => setEditDraft({ ...editDraft, body: e.target.value })}
                  rows={16}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-nexpura-mint resize-none font-mono"
                />
              ) : (
                <pre className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {selectedTemplate.body}
                </pre>
              )}
            </div>

            {/* Variables guide */}
            <div className="bg-nexpura-mint/5 border border-nexpura-mint/20 rounded-xl p-4">
              <p className="text-xs font-semibold text-nexpura-forest mb-2">📌 Template Variables</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {[
                  '{{businessName}}', '{{customerName}}', '{{date}}', '{{time}}',
                  '{{refNumber}}', '{{productName}}', '{{passportUrl}}', '{{websiteUrl}}',
                  '{{address}}', '{{phone}}', '{{price}}', '{{estimatedDate}}',
                ].map((v) => (
                  <code key={v} className="text-xs text-gray-500">{v}</code>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="font-playfair text-xl text-gray-700 mb-2">Email Templates</h2>
            <p className="text-sm text-gray-400 max-w-xs">
              Select a template from the sidebar to view and customise its content.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-gray-800">{templates.filter((t) => t.enabled).length}</p>
                <p className="text-xs text-gray-400 mt-1">Enabled</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{MOCK_SENT.length}</p>
                <p className="text-xs text-gray-400 mt-1">Sent this month</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">100%</p>
                <p className="text-xs text-gray-400 mt-1">Delivery rate</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
