import { useEffect, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { api } from '../api/client'
import { useRoles } from '../auth/useRoles'
import type { ShipmentResponse } from '../types'

export default function Shipments() {
  const { accounts } = useMsal()
  const account = accounts[0]
  const roles = useRoles()
  const canCreate = !account || roles.includes('Operador') || roles.includes('Admin')

  const [shipments, setShipments] = useState<ShipmentResponse[]>([])
  const [error, setError] = useState<string | null>(null)
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const load = () =>
    api
      .listShipments()
      .then(setShipments)
      .catch((e) => setError(String(e)))

  useEffect(() => {
    load()
  }, [])

  const submit = async () => {
    setError(null)
    try {
      await api.createShipment({
        origin,
        destination,
        courierId: null,
        recipient: { name, phone: '', email, address: '' },
        packageInfo: { weightKg: 0, volumeM3: 0, description: '' },
      })
      setOrigin('')
      setDestination('')
      setName('')
      setEmail('')
      load()
    } catch (e) {
      setError(String(e))
    }
  }

  return (
    <section>
      <h2>Envíos</h2>
      {error && <p style={{ color: '#b91c1c' }}>{error}</p>}

      {canCreate && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 8,
            marginBottom: 16,
          }}
        >
          <input placeholder="Origen" value={origin} onChange={(e) => setOrigin(e.target.value)} />
          <input placeholder="Destino" value={destination} onChange={(e) => setDestination(e.target.value)} />
          <input placeholder="Destinatario" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={submit}>Crear envío</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Tracking</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Estado</th>
            <th>Destinatario</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s) => (
            <tr key={s.id}>
              <td>{s.trackingNumber}</td>
              <td>{s.origin}</td>
              <td>{s.destination}</td>
              <td>{s.status}</td>
              <td>{s.recipient.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
