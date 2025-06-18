export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user" | "moderator"
  createdAt: string
  updatedAt: string
  isActive: boolean
  lastLogin?: string
}

export interface Quiz {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  subject: string
  difficulty: "easy" | "medium" | "hard"
  tags: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface Map {
  id: string
  title: string
  description: string
  category: string
  region: string
  coordinates: {
    lat: number
    lng: number
  }
  zoom: number
  markers: MapMarker[]
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface MapMarker {
  id: string
  title: string
  description: string
  coordinates: {
    lat: number
    lng: number
  }
  type: string
  color?: string
}

export interface FileRecord {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  s3Key: string
  uploadedBy: string
  createdAt: string
  isPublic: boolean
}

export interface AnalyticsEvent {
  id: string
  eventType: string
  userId?: string
  data: Record<string, any>
  timestamp: number
  sessionId?: string
  userAgent?: string
  ipAddress?: string
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface CognitoUser {
  Username: string
  Attributes: Array<{
    Name: string
    Value: string
  }>
  UserCreateDate: Date
  UserLastModifiedDate: Date
  Enabled: boolean
  UserStatus: string
}
