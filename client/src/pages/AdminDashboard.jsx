import React, { useEffect, useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function AdminDashboard() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState('')
  const [error, setError] = useState('')

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }

  const load = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/announcements`)
      const json = await res.json()
      if (!json.success) throw new Error(json.message || 'Load failed')
      setItems(json.data)
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => { load() }, [])

  const onSave = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `${API_BASE}/api/announcements/${editingId}` : `${API_BASE}/api/announcements`
      const res = await fetch(url, { method, headers, body: JSON.stringify({ title, content }) })
      const json = await res.json()
      if (!json.success) throw new Error(json.message || 'Save failed')
      setTitle('')
      setContent('')
      setEditingId('')
      await load()
    } catch (e) {
      setError(e.message)
    }
  }

  const onEdit = (item) => {
    setEditingId(item._id)
    setTitle(item.title)
    setContent(item.content)
  }

  const onDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return
    try {
      const res = await fetch(`${API_BASE}/api/announcements/${id}`, { method: 'DELETE', headers })
      const json = await res.json()
      if (!json.success) throw new Error(json.message || 'Delete failed')
      await load()
    } catch (e) {
      setError(e.message)
    }
  }

  const onLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
        <aside className="border-r p-4">
          <div className="font-bold mb-4">GROWEXI Admin</div>
          <nav className="space-y-2">
            <a className="text-primary-700" href="#">Announcements</a>
          </nav>
          <button className="btn-primary w-full mt-6" onClick={onLogout}>Logout</button>
        </aside>
        <main className="p-6">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">GROWEXI Admin Dashboard</h1>
          </header>

          {error && <div className="message-error mb-4">{error}</div>}

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Manage Announcements</h2>
            <form onSubmit={onSave} className="space-y-3">
              <input className="input-field w-full" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
              <textarea className="textarea-field w-full" rows={6} placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
              <div className="flex gap-2">
                <button className="btn-primary" type="submit">Save Announcement</button>
                {editingId && <button type="button" className="btn-primary" onClick={() => { setEditingId(''); setTitle(''); setContent('') }}>Cancel</button>}
              </div>
            </form>
          </section>

          <section>
            <div className="grid gap-4">
              {items.map(item => (
                <div key={item._id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="text-sm text-neutral-600">{new Date(item.createdAt).toLocaleString()}</div>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap">{item.content}</p>
                  <div className="flex gap-2 mt-3">
                    <button className="btn-primary" onClick={() => onEdit(item)}>Edit</button>
                    <button className="btn-primary" onClick={() => onDelete(item._id)}>Delete</button>
                  </div>
                </div>
              ))}
              {items.length === 0 && <p className="text-neutral-600">No announcements found.</p>}
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  )
}


