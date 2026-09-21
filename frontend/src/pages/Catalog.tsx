import { useEffect, useState } from 'react'
import { api } from '../api/client'
import type { FleetCapacity, ServiceType } from '../types'

export default function Catalog() {
  const [services, setServices] = useState<ServiceType[]>([])
  const [fleet, setFleet] = useState<FleetCapacity[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([api.listServices(), api.listFleet()])
      .then(([s, f]) => {
        setServices(s)
        setFleet(f)
      })
      .catch((e) => setError(String(e)))
  }, [])

  if (error) return <p>Error al cargar: {error}</p>

  return (
    <section>
      <h2>Servicios de envío</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Base</th>
            <th>Por km</th>
            <th>Por kg</th>
            <th>Horas est.</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.basePrice}</td>
              <td>{s.pricePerKm}</td>
              <td>{s.pricePerKg}</td>
              <td>{s.estimatedHours}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Flota</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Peso máx (kg)</th>
            <th>Volumen máx (m3)</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {fleet.map((v) => (
            <tr key={v.id}>
              <td>{v.vehicleType}</td>
              <td>{v.maxWeightKg}</td>
              <td>{v.maxVolumeM3}</td>
              <td>{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
