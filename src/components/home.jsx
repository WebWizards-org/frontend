import React from 'react'

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: `linear-gradient(to right, var(--color-gradient-start), var(--color-gradient-end))` }}>
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl p-8 m-4">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
          Welcome to Your Learning Platform
        </h1>
        <p className="text-lg mb-4" style={{ color: 'var(--color-text-muted)' }}>
          Start your learning journey today
        </p>
      </div>
    </div>
  )
}

export default Home
