import { useEffect, useState } from 'react'
import { api } from '../api/client'
import type { KpiReport, ShipmentStatus } from '../types'

const STATUSES: ShipmentStatus[] = [
  'CREATED',
  'ASSIGNED',
  'PICKED_UP',
  'IN_TRANSIT',
  'DELIVERED',
  'CANCELLED',
  'FAILED',
]

export default function Reports() {
  const [report, setReport] = useState<KpiReport | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api
      .kpis()
      .then(setReport)
      .catch((e) => setError(String(e)))
  }, [])

  if (error) return <p>Error al cargar: {error}</p>
  if (!report) return <p>Cargando KPIs…</p>

  return (
    <section>
      <h2>Reportería</h2>
      <p>Eventos procesados: <strong>{report.totalEvents}</strong></p>
      <table>
        <thead>
          <tr>
            <th>Estado</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {STATUSES.map((status) => (
            <tr key={status}>
              <td>{status}</td>
              <td>{report.byStatus[status] ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
