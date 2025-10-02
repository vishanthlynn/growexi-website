import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message || 'Signup failed')
      localStorage.setItem('token', json.token)
      localStorage.setItem('user', JSON.stringify(json.user))
      // Redirect to homepage after signup
      navigate('/')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full font-[Inter,sans-serif] flex">
      {/* Left Decorative Panel */}
      <div
        className="hidden md:flex md:basis-2/5 items-center justify-center relative"
        style={{ backgroundColor: '#003366' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/src/assets/imigongo-pattern.svg')",
            backgroundRepeat: 'repeat',
            backgroundSize: '400px 400px'
          }}
        />
        <div className="relative z-10 text-center px-8">
          <div className="text-3xl font-extrabold text-white tracking-wide">GROWEXI</div>
          <div className="text-white/80 mt-2 max-w-md mx-auto">
            Building Rwanda's Future-Ready Workforce
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="basis-full md:basis-3/5 bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Create Your Account</h1>
          {error && <div className="message-error mb-4">{error}</div>}

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-2">Full Name</label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] bg-white"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-2">Email Address</label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] bg-white"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-800 mb-2">Password</label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-[#003366] bg-white"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="w-full rounded-lg text-white py-3 transition shadow-sm hover:shadow-lg"
              style={{ backgroundColor: '#003366' }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-neutral-700">
            Already have an account?{' '}
            <Link to="/login" className="text-[#003366] underline">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


