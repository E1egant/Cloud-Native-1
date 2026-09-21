import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Shipments from './pages/Shipments'
import Catalog from './pages/Catalog'

type Page = 'dashboard' | 'shipments' | 'catalog'

const PAGES: { id: Page; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'shipments', label: 'Envíos' },
  { id: 'catalog', label: 'Catálogo' },
]

export default function App() {
  const [page, setPage] = useState<Page>('dashboard')

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '16px 20px' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 22 }}>RutaExpress</h1>
        <nav style={{ display: 'flex', gap: 8 }}>
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => setPage(p.id)}
              style={{
                padding: '6px 12px',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                background: page === p.id ? '#1a1a2e' : '#fff',
                color: page === p.id ? '#fff' : '#1a1a2e',
              }}
            >
              {p.label}
            </button>
          ))}
        </nav>
      </header>
      <main>
        {page === 'dashboard' && <Dashboard />}
        {page === 'shipments' && <Shipments />}
        {page === 'catalog' && <Catalog />}
      </main>
    </div>
  )
}
