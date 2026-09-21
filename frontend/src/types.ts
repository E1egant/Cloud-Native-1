export type ShipmentStatus =
  | 'CREATED'
  | 'ASSIGNED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'FAILED'

export type FleetStatus = 'AVAILABLE' | 'BUSY' | 'MAINTENANCE'

export interface Recipient {
  name: string
  phone: string
  email: string
  address: string
}

export interface PackageInfo {
  weightKg: number
  volumeM3: number
  description: string
}

export interface ShipmentResponse {
  id: number
  trackingNumber: string
  origin: string
  destination: string
  courierId: number | null
  status: ShipmentStatus
  recipient: Recipient
  packageInfo: PackageInfo
  createdAt: string
  updatedAt: string
}

export interface ShipmentRequest {
  origin: string
  destination: string
  courierId: number | null
  recipient: Recipient
  packageInfo: PackageInfo
}

export interface ServiceType {
  id: number
  name: string
  basePrice: number
  pricePerKm: number
  pricePerKg: number
  estimatedHours: number
}

export interface FleetCapacity {
  id: number
  vehicleType: string
  maxWeightKg: number
  maxVolumeM3: number
  status: FleetStatus
}
