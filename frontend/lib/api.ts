const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

class ApiService {
  private baseURL: string
  private token: string | null = null

  constructor() {
    this.baseURL = API_BASE_URL
  }

  setToken(token: string) {
    this.token = token
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Network error" }))
      throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Authentication
  async signUp(email: string, password: string, name: string) {
    return this.request("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    })
  }

  async signIn(email: string, password: string) {
    return this.request("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async verify(token: string) {
    return this.request("/api/auth/verify", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
  }

  // Quiz Management
  async getQuizzes(params?: { subject?: string; difficulty?: string }) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : ""
    return this.request(`/api/quiz${queryString}`)
  }

  async createQuiz(quiz: any) {
    return this.request("/api/quiz", {
      method: "POST",
      body: JSON.stringify(quiz),
    })
  }

  async updateQuiz(id: string, quiz: any) {
    return this.request(`/api/quiz/${id}`, {
      method: "PUT",
      body: JSON.stringify(quiz),
    })
  }

  async deleteQuiz(id: string) {
    return this.request(`/api/quiz/${id}`, {
      method: "DELETE",
    })
  }

  // Maps Management
  async getMaps(params?: { category?: string; region?: string }) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : ""
    return this.request(`/api/maps${queryString}`)
  }

  async createMap(map: any) {
    return this.request("/api/maps", {
      method: "POST",
      body: JSON.stringify(map),
    })
  }

  async updateMap(id: string, map: any) {
    return this.request(`/api/maps/${id}`, {
      method: "PUT",
      body: JSON.stringify(map),
    })
  }

  async deleteMap(id: string) {
    return this.request(`/api/maps/${id}`, {
      method: "DELETE",
    })
  }

  // User Management (Admin)
  async getUsers(params?: { page?: string; limit?: string; role?: string; search?: string }) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : ""
    return this.request(`/api/users${queryString}`)
  }

  async createUser(user: any) {
    return this.request("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    })
  }

  async updateUser(id: string, user: any) {
    return this.request(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
    })
  }

  async deleteUser(id: string) {
    return this.request(`/api/users/${id}`, {
      method: "DELETE",
    })
  }

  // File Management
  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    return fetch(`${this.baseURL}/api/files/upload`, {
      method: "POST",
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : "",
      },
      body: formData,
    }).then((res) => res.json())
  }

  async getFiles() {
    return this.request("/api/files")
  }

  async deleteFile(id: string) {
    return this.request(`/api/files/${id}`, {
      method: "DELETE",
    })
  }

  // CSV Upload
  async uploadQuizCSV(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    return fetch(`${this.baseURL}/api/csv/quiz`, {
      method: "POST",
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : "",
      },
      body: formData,
    }).then((res) => res.json())
  }

  async uploadMapsCSV(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    return fetch(`${this.baseURL}/api/csv/maps`, {
      method: "POST",
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : "",
      },
      body: formData,
    }).then((res) => res.json())
  }

  // Analytics
  async getAnalytics() {
    return this.request("/api/analytics")
  }

  async createAnalyticsEvent(event: any) {
    return this.request("/api/analytics/event", {
      method: "POST",
      body: JSON.stringify(event),
    })
  }
}

export const apiService = new ApiService()
