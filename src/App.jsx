import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
// Components
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import ContactModal from './components/ContactModal'

function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isContactOpen, setIsContactOpen] = useState(false)

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <Router>
      <div className="app-container">
        {/* CRT Overlay */}
        <div className="scanlines"></div>

        {/* Custom Cursor */}
        <div
          className="cursor-dot"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        />

        {/* Navigation / Floating Action Button */}
        <nav style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsContactOpen(true)}
            style={{
              background: 'var(--color-nintendo)',
              border: '2px solid white',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '4px 4px 0 black'
            }}
          >
            {/* Mail Icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </motion.button>
        </nav>

        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

        {/* Content */}
        <main style={{ width: '100vw', minHeight: '100vh' }}>
          <Hero />
          <Gallery />
        </main>
      </div>
    </Router>
  )
}

export default App
