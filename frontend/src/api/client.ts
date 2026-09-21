import type {
  AuditEntry,
  FleetCapacity,
  KpiReport,
  NotificationDto,
  ServiceType,
  ShipmentRequest,
  ShipmentResponse,
} from '../types'
import { getAccessToken } from '../auth/msal'

const BASE_URL = import.meta.env.VITE_BFF_URL ?? '/api/bff'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await getAccessToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { ...headers, ...(init?.headers ?? {}) },
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
  listNotifications: () => request<NotificationDto[]>('/notifications'),
  listAudit: (shipmentId?: number) =>
    request<AuditEntry[]>(`/audit${shipmentId ? `?shipmentId=${shipmentId}` : ''}`),
  kpis: () => request<KpiReport>('/reports/kpis'),
}
