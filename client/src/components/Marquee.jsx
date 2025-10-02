import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function Marquee() {
  const [text, setText] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/announcements/marquee`)
        const json = await res.json()
        if (json.success && json.data) {
          setText(json.data.content || json.data.title)
        }
      } catch {}
    })()
  }, [])

  if (!text) return null

  return (
    <div className="sticky top-0 z-50 bg-yellow-500 text-white overflow-hidden">
      <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] py-2 px-4">
        {text}
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}`}</style>
    </div>
  )
}


