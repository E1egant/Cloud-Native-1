import { useEffect, useState } from 'react'
import { api } from '../api/client'
import type { AuditEntry } from '../types'

export default function Audit() {
  const [entries, setEntries] = useState<AuditEntry[]>([])
  const [shipmentId, setShipmentId] = useState('')
  const [error, setError] = useState<string | null>(null)

  const load = () =>
    api
      .listAudit(shipmentId ? Number(shipmentId) : undefined)
      .then(setEntries)
      .catch((e) => setError(String(e)))

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section>
      <h2>Auditoría</h2>
      {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          placeholder="Filtrar por shipmentId"
          value={shipmentId}
          onChange={(e) => setShipmentId(e.target.value)}
        />
        <button onClick={load}>Buscar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Envío</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.shipmentId}</td>
              <td>{e.status}</td>
              <td>{new Date(e.occurredAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
