import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message || 'Login failed')
      localStorage.setItem('token', json.token)
      localStorage.setItem('user', JSON.stringify(json.user))
      // Redirect to homepage after login
      navigate('/')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold gradient-text">GROWEXI</div>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-center">Admin Portal Login</h2>
        {error && <div className="message-error mb-4">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input className="input-field w-full" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input className="input-field w-full" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="btn-primary w-full" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login Securely'}</button>
        </form>
        <div className="text-center mt-4 text-sm">
          Don't have an account? <Link to="/signup" className="text-primary-600">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}


