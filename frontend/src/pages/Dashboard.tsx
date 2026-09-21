import { useEffect, useState } from 'react'
import { api } from '../api/client'
import type { ShipmentResponse, ShipmentStatus } from '../types'

const STATUSES: ShipmentStatus[] = [
  'CREATED',
  'ASSIGNED',
  'PICKED_UP',
  'IN_TRANSIT',
  'DELIVERED',
  'CANCELLED',
  'FAILED',
]

export default function Dashboard() {
  const [shipments, setShipments] = useState<ShipmentResponse[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api
      .listShipments()
      .then(setShipments)
      .catch((e) => setError(String(e)))
  }, [])

  if (error) return <p>Error al cargar: {error}</p>

  const counts = STATUSES.map((status) => ({
    status,
    count: shipments.filter((s) => s.status === status).length,
  }))

  return (
    <section>
      <h2>Resumen de envíos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
        {counts.map(({ status, count }) => (
          <div
            key={status}
            style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}
          >
            <div style={{ fontSize: 26, fontWeight: 700 }}>{count}</div>
            <div style={{ color: '#6b7280', fontSize: 13 }}>{status}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
