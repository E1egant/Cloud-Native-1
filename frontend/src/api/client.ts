import type {
  FleetCapacity,
  ServiceType,
  ShipmentRequest,
  ShipmentResponse,
} from '../types'

const BASE_URL = import.meta.env.VITE_BFF_URL ?? '/api/bff'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const api = {
  listShipments: () => request<ShipmentResponse[]>('/shipments'),
  createShipment: (body: ShipmentRequest) =>
    request<ShipmentResponse>('/shipments', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  listServices: () => request<ServiceType[]>('/catalog/services'),
  listFleet: () => request<FleetCapacity[]>('/catalog/fleet'),
}
