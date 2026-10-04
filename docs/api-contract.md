# Контракт API — АИС «БиблиоКонтроль»

## Общие сведения

- **Базовый URL:** `http://localhost:5000/api`
- **Формат данных:** JSON
- **Аутентификация:** Bearer-токен (в заголовке `Authorization`)
- **Коды статусов:** `New`, `InProgress`, `Closed`, `Cancelled`

---

## Таблица API

| Метод и путь | Что прислать (тело) | Успех | Ошибка |
| --- | --- | --- | --- |
| `GET /api/requests` | — | `200`, массив заявок (или `[]`) | — |
| `GET /api/requests/{id}` | — | `200`, объект заявки | `404` — заявка не найдена |
| `POST /api/requests` | `title`, `bookId`, `description` | `201`, в ответе `id`, `number`, `status: New` | `400` — невалидные данные |
| `PATCH /api/requests/{id}/assignee` | `assigneeUserId` | `200`, обновленная заявка | `404` — заявка не найдена |
| `PATCH /api/requests/{id}/status` | `status` | `200`, обновленная заявка | `404` — заявка не найдена; `409` — недопустимый переход статуса |

---

## Примеры запросов и ответов

### 1. Создание заявки (POST)

**Запрос:**
```
POST /api/requests
Content-Type: application/json

{
  "title": "Война и мир",
  "bookId": 5,
  "description": "Нужна для курсовой по литературе"
}
```

**Успешный ответ (201 Created):**
```
{
  "id": 17,
  "number": "REQ-2026-042",
  "title": "Война и мир",
  "description": "Нужна для курсовой по литературе",
  "status": "New",
  "bookId": 5,
  "createdByUserId": 3,
  "assigneeUserId": null,
  "createdAt": "2026-09-16T10:30:00Z",
  "updatedAt": "2026-09-16T10:30:00Z"
}
```

### 2. Получение списка заявок (GET)
**Запрос:** GET /api/requests


**Успешный ответ (200 OK):**
```
[
  {
    "id": 17,
    "number": "REQ-2026-042",
    "title": "Война и мир",
    "status": "New",
    "bookId": 5,
    "createdByUserId": 3,
    "assigneeUserId": null
  },
  {
    "id": 16,
    "number": "REQ-2026-041",
    "title": "Преступление и наказание",
    "status": "InProgress",
    "bookId": 12,
    "createdByUserId": 7,
    "assigneeUserId": 2
  }
]
```

**Пустой список (200 OK):**
```
[]
```

### 3. Получение одной заявки (GET)
**Запрос:** GET /api/requests/17

```
{
  "id": 17,
  "number": "REQ-2026-042",
  "title": "Война и мир",
  "description": "Нужна для курсовой по литературе",
  "status": "New",
  "bookId": 5,
  "createdByUserId": 3,
  "assigneeUserId": null,
  "createdAt": "2026-09-16T10:30:00Z",
  "updatedAt": "2026-09-16T10:30:00Z"
}
```

**Ошибка (404 Not Found):**
```
{
  "error": "Заявка с id=17 не найдена"
}
```

### 4. Назначение исполнителя (PATCH)
**Запрос:**
```
PATCH /api/requests/17/assignee
Content-Type: application/json

{
  "assigneeUserId": 2
}
```

**Успешный ответ (200 OK):**
```
{
  "id": 17,
  "number": "REQ-2026-042",
  "title": "Война и мир",
  "status": "New",
  "assigneeUserId": 2,
  "updatedAt": "2026-09-16T11:00:00Z"
}
```

**Ошибка (404 Not Found):**
```
{
  "error": "Заявка с id=17 не найдена"
}
```

### 5. Смена статуса (PATCH)
**Запрос:**
```
PATCH /api/requests/17/status
Content-Type: application/json

{
  "status": "InProgress"
}
```

**Успешный ответ (200 OK):**
```
{
  "id": 17,
  "number": "REQ-2026-042",
  "title": "Война и мир",
  "status": "InProgress",
  "assigneeUserId": 2,
  "updatedAt": "2026-09-16T11:15:00Z"
}
```

**Ошибка (409 Conflict — недопустимый переход):**
```
{
  "error": "Нельзя перевести заявку из статуса 'Closed' в 'InProgress'"
}
```

## Важные правила
1. Клиент НЕ присылает при создании: id, number, status, assigneeUserId, createdAt, updatedAt. Их генерирует сервер. 
2. Два разных PATCH: назначение исполнителя (/assignee) и смена статуса (/status) — это разные запросы. Нельзя объединять в один PATCH /update. 
3. Нет DELETE: отмена заявки = смена статуса на Cancelled, строка не удаляется из БД. 
4. Пустой список = 200 и [], а не 404. 
5. Пути вида /api/requests/create не используются. Действие определяется методом (POST), а не словом в адресе.
