const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Учебный массив "в базе" mock-сервера
let serverItems = [
    {
        id: 1,
        number: 'REQ-2026-001',
        title: 'Война и мир',
        bookId: 5,
        description: 'Классика литературы',
        status: 'New'
    },
    {
        id: 2,
        number: 'REQ-2026-002',
        title: 'Преступление и наказание',
        bookId: 12,
        description: 'Для курсовой работы',
        status: 'InProgress'
    }
]

// Учебный флаг: true = mock вернёт 500 (для воспроизведения отказа)
export let force500 = false
export function setForce500(value) {
    force500 = value
}

// Имитация GET /api/requests
export async function mockGetRequests() {
    await delay(500)
    if (force500) {
        return { ok: false, status: 500, data: { error: 'Сервер не смог обработать запрос' } }
    }
    return { ok: true, status: 200, data: serverItems }
}

// Имитация POST /api/requests
export async function mockCreateRequest(body) {
    await delay(500)

    if (force500) {
        return { ok: false, status: 500, data: { error: 'Сервер не смог обработать запрос' } }
    }

    const title = (body.title || '').trim()
    if (title.length < 5 || title.length > 80) {
        return { ok: false, status: 400, data: { title: 'Тема: от 5 до 80 символов' } }
    }

    const id = serverItems.length + 1
    const created = {
        id,
        number: `REQ-2026-00${id}`,
        title,
        bookId: body.bookId,
        description: body.description,
        status: 'New'
    }
    serverItems.push(created)

    // ВАЖНО: id и number возвращает mock, а не форма
    return { ok: true, status: 201, data: created }
}