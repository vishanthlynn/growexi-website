import React, { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function StatusBadge({ status }) {
  const color = {
    'new': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'resolved': 'bg-green-100 text-green-800',
    'closed': 'bg-neutral-200 text-neutral-800'
  }[status] || 'bg-neutral-100 text-neutral-800'

  return (
    <span className={`px-2 py-1 rounded text-sm ${color}`}>{status}</span>
  )
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [total, setTotal] = useState(0)
  const [statusFilter, setStatusFilter] = useState('')
  const [updatingId, setUpdatingId] = useState('')

  const pages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit])

  const fetchInquiries = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) })
      if (statusFilter) params.set('status', statusFilter)
      const res = await fetch(`${API_BASE}/api/inquiries?${params.toString()}`)
      const json = await res.json()
      if (!json.success) throw new Error(json.message || 'Failed to fetch')
      setInquiries(json.data.inquiries)
      setTotal(json.data.pagination.total)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter])

  const updateStatus = async (id, nextStatus) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`${API_BASE}/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message || 'Update failed')
      setInquiries(prev => prev.map(i => (i._id === id ? json.data : i)))
    } catch (e) {
      alert(e.message)
    } finally {
      setUpdatingId('')
    }
  }

  return (
    <div className="container-custom py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Inquiries</h1>
        <div className="flex items-center gap-3">
          <select
            className="input-field"
            value={statusFilter}
            onChange={(e) => { setPage(1); setStatusFilter(e.target.value) }}
          >
            <option value="">All statuses</option>
            <option value="new">new</option>
            <option value="in-progress">in-progress</option>
            <option value="resolved">resolved</option>
            <option value="closed">closed</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="message-error mb-4">{error}</div>
      )}

      <div className="overflow-auto border rounded-xl">
        <table className="min-w-full">
          <thead className="bg-neutral-50">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Service</th>
              <th className="text-left p-3">Message</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Submitted</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-6" colSpan={7}>Loading...</td></tr>
            ) : inquiries.length === 0 ? (
              <tr><td className="p-6" colSpan={7}>No inquiries</td></tr>
            ) : (
              inquiries.map(i => (
                <tr key={i._id} className="border-t">
                  <td className="p-3 whitespace-nowrap">{i.name}</td>
                  <td className="p-3 whitespace-nowrap">{i.email}</td>
                  <td className="p-3 whitespace-nowrap">{i.serviceInterest}</td>
                  <td className="p-3 max-w-[24rem]">{i.message}</td>
                  <td className="p-3"><StatusBadge status={i.status} /></td>
                  <td className="p-3 whitespace-nowrap">{new Date(i.createdAt).toLocaleString()}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      {['new','in-progress','resolved','closed'].map(s => (
                        <button
                          key={s}
                          disabled={updatingId === i._id || s === i.status}
                          onClick={() => updateStatus(i._id, s)}
                          className={`btn-primary px-2 py-1 text-sm ${s===i.status ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >{s}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-neutral-600">Page {page} of {pages}</span>
        <div className="flex gap-2">
          <button className="btn-primary px-3 py-1" disabled={page<=1} onClick={() => setPage(p => Math.max(1, p-1))}>Prev</button>
          <button className="btn-primary px-3 py-1" disabled={page>=pages} onClick={() => setPage(p => Math.min(pages, p+1))}>Next</button>
        </div>
      </div>
    </div>
  )
}


