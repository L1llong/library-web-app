import {
    mockGetRequests,
    mockCreateRequest
} from './mockRequests.js'

// Переключатель: true = используем mock, false = настоящий fetch к API
const USE_MOCK = true

const baseUrl = import.meta.env.VITE_API_BASE_URL

// GET /api/requests
export async function getRequests() {
    if (USE_MOCK) {
        return mockGetRequests()
    }

    try {
        const response = await fetch(`${baseUrl}/api/requests`)
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
        }
        const data = await response.json()
        return { ok: true, status: response.status, data }
    } catch (error) {
        // Сетевая ошибка: сервер не запущен, неверный URL, нет сети
        return { ok: false, status: 0, data: { error: 'Нет связи с сервером' } }
    }
}

// POST /api/requests
export async function createRequest(body) {
    if (USE_MOCK) {
        return mockCreateRequest(body)
    }

    try {
        const response = await fetch(`${baseUrl}/api/requests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        const data = await response.json()

        if (!response.ok) {
            // 400, 404, 500 — сюда, НЕ в catch
            return { ok: false, status: response.status, data }
        }

        return { ok: true, status: response.status, data }
    } catch (error) {
        // Сюда попадает только отсутствие ответа (сеть, URL)
        return { ok: false, status: 0, data: { error: 'Нет связи с сервером' } }
    }
}