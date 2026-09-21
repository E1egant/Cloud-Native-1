import { useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from './auth/msal'
import Dashboard from './pages/Dashboard'
import Shipments from './pages/Shipments'
import Catalog from './pages/Catalog'
import Audit from './pages/Audit'
import Reports from './pages/Reports'

type Page = 'dashboard' | 'shipments' | 'catalog' | 'audit' | 'reports'

const PAGES: { id: Page; label: string; roles?: string[] }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'shipments', label: 'Envíos' },
  { id: 'catalog', label: 'Catálogo' },
  { id: 'audit', label: 'Auditoría', roles: ['Admin'] },
  { id: 'reports', label: 'Reportería', roles: ['Admin'] },
]

function AuthArea() {
  const { instance, accounts } = useMsal()
  const account = accounts[0]

  if (account) {
    return (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 13 }}>{account.name ?? account.username}</span>
        <button onClick={() => instance.logoutRedirect()}>Salir</button>
      </div>
    )
  }
  return <button onClick={() => instance.loginRedirect(loginRequest)}>Entrar</button>
}

export default function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const { accounts } = useMsal()
  const account = accounts[0]
  const roles = (account?.idTokenClaims?.roles as string[] | undefined) ?? []

  const visiblePages = account
    ? PAGES.filter((p) => !p.roles || p.roles.some((r) => roles.includes(r)))
    : PAGES

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
          {visiblePages.map((p) => (
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
        <AuthArea />
      </header>
      <main>
        {page === 'dashboard' && <Dashboard />}
        {page === 'shipments' && <Shipments />}
        {page === 'catalog' && <Catalog />}
        {page === 'audit' && <Audit />}
        {page === 'reports' && <Reports />}
      </main>
    </div>
  )
}
