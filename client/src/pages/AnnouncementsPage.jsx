import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function AnnouncementsPage() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/announcements`)
        const json = await res.json()
        if (!json.success) throw new Error(json.message || 'Failed to load')
        setItems(json.data)
      } catch (e) {
        setError(e.message)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container-custom py-10">
        <h1 className="text-3xl font-bold mb-6">News & Announcements</h1>
        {error && <div className="message-error mb-4">{error}</div>}
        <div className="grid gap-6">
          {items.map(item => (
            <article key={item._id} className="p-6 border rounded-xl">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <div className="text-sm text-neutral-600 mb-2">{new Date(item.createdAt).toLocaleString()}</div>
              <div className="whitespace-pre-wrap">{item.content}</div>
            </article>
          ))}
          {items.length === 0 && !error && <p className="text-neutral-600">No announcements yet.</p>}
        </div>
      </main>
      <Footer />
    </div>
  )
}


