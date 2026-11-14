import { ref } from 'vue'

export const items = ref(
    [
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
)

export let nextId = 3

export function addItem(newItem) {
    items.value.push(newItem)
    nextId++
}