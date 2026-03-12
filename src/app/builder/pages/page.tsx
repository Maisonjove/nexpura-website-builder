'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Page {
  id: string
  title: string
  slug: string
  pageType: string
  isPublished: boolean
  updatedAt: string
}

// Mock data — replace with Supabase fetch
const MOCK_PAGES: Page[] = [
  {
    id: '1',
    title: 'Home',
    slug: 'home',
    pageType: 'home',
    isPublished: true,
    updatedAt: '2024-03-10T12:00:00Z',
  },
  {
    id: '2',
    title: 'About Us',
    slug: 'about',
    pageType: 'custom',
    isPublished: true,
    updatedAt: '2024-03-08T09:30:00Z',
  },
  {
    id: '3',
    title: 'Bespoke Jewellery',
    slug: 'bespoke',
    pageType: 'custom',
    isPublished: false,
    updatedAt: '2024-03-05T15:20:00Z',
  },
  {
    id: '4',
    title: 'Contact',
    slug: 'contact',
    pageType: 'contact',
    isPublished: true,
    updatedAt: '2024-03-01T11:00:00Z',
  },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function PagesListPage() {
  const [pages, setPages] = useState<Page[]>(MOCK_PAGES)
  const [showNewPageModal, setShowNewPageModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSlug, setNewSlug] = useState('')

  function handleTitleChange(val: string) {
    setNewTitle(val)
    setNewSlug(val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
  }

  function handleCreatePage() {
    if (!newTitle || !newSlug) return
    const page: Page = {
      id: Date.now().toString(),
      title: newTitle,
      slug: newSlug,
      pageType: 'custom',
      isPublished: false,
      updatedAt: new Date().toISOString(),
    }
    setPages([...pages, page])
    setShowNewPageModal(false)
    setNewTitle('')
    setNewSlug('')
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-playfair font-semibold text-gray-900">Website Pages</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and edit the pages of your storefront</p>
        </div>
        <button
          onClick={() => setShowNewPageModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-nexpura-forest text-white rounded-lg text-sm font-medium hover:bg-nexpura-forest/90 transition-colors"
        >
          <span>+</span>
          <span>New Page</span>
        </button>
      </div>

      {/* Pages table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Page</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Slug</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Last Updated</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                      {page.pageType === 'home' ? '🏠' : page.pageType === 'contact' ? '✉️' : '📄'}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{page.title}</div>
                      {page.pageType !== 'custom' && (
                        <div className="text-xs text-gray-400 capitalize">{page.pageType} page</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">/{page.slug}</code>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
                      page.isPublished
                        ? 'bg-green-50 text-green-700'
                        : 'bg-yellow-50 text-yellow-700'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${page.isPublished ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    {page.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(page.updatedAt)}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/builder/pages/${page.slug}`}
                    className="text-sm text-nexpura-mint hover:text-nexpura-forest font-medium transition-colors"
                  >
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Page Modal */}
      {showNewPageModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-playfair font-semibold text-gray-900 mb-4">Create New Page</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. About Us"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nexpura-mint"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-nexpura-mint">
                  <span className="px-3 py-2 bg-gray-50 text-gray-400 text-sm border-r border-gray-200">/</span>
                  <input
                    type="text"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewPageModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePage}
                disabled={!newTitle || !newSlug}
                className="flex-1 px-4 py-2 bg-nexpura-forest text-white rounded-lg text-sm font-medium hover:bg-nexpura-forest/90 transition-colors disabled:opacity-40"
              >
                Create Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
