import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function AnnouncementsSection() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/announcements`)
        const json = await res.json()
        if (!json.success) throw new Error(json.message || 'Failed to load')
        setItems(json.data.slice(0, 3))
      } catch (e) {
        // Mock data for development
        setItems([
          {
            _id: '1',
            title: 'Welcome to GROWEXI',
            content: 'We are excited to announce our new training programs starting this month.',
            createdAt: new Date().toISOString()
          },
          {
            _id: '2', 
            title: 'New Course Launch',
            content: 'Data Analysis & Digital Tools course is now available for enrollment.',
            createdAt: new Date().toISOString()
          }
        ])
        setError('')
      }
    })()
  }, [])//

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-6">Latest News & Updates</h2>
        {error && <div className="message-error mb-4">{error}</div>}
        <div className="grid md:grid-cols-3 gap-6">
          {items.map(item => (
            <article key={item._id} className="bg-white rounded-xl p-6 border">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <div className="text-sm text-neutral-600 mb-3">{new Date(item.createdAt).toLocaleDateString()}</div>
              <p className="text-neutral-800 whitespace-pre-wrap">{item.content}</p>
            </article>
          ))}
          {items.length === 0 && !error && (
            <p className="text-neutral-600">No announcements yet.</p>
          )}
        </div>
        <div className="mt-6">
          <a href="/announcements" className="btn-primary">View All Announcements</a>
        </div>
      </div>
    </section>
  )
}


