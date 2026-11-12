<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { items } from '../requestStore.js'

const router = useRouter()

const newTitle = ref('')
const newBookId = ref('')
const newDescription = ref('')

const createRequest = () => {
  if (newTitle.value && newBookId.value) {
    items.value.push({
      id: items.value.length + 1,
      number: `REQ-2026-00${items.value.length + 1}`,
      title: newTitle.value,
      bookId: parseInt(newBookId.value),
      status: 'New'
    })
    newTitle.value = ''
    newBookId.value = ''
    newDescription.value = ''
    router.push('/')
  }
}
</script>

<template>
  <main>
    <h2>Создание заявки на выдачу книги</h2>
    <form @submit.prevent="createRequest">
      <label for="title">
        Название книги (5–80 символов)
        <input
            id="title"
            v-model="newTitle"
            name="title"
            autofocus
            required
        />
      </label>

      <label for="bookId">
        ID книги (справочник)
        <input
            id="bookId"
            v-model="newBookId"
            name="bookId"
            type="number"
            min="1"
            required
        />
      </label>

      <label for="description">
        Описание / комментарий (10–500 символов)
        <textarea
            id="description"
            v-model="newDescription"
            name="description"
            rows="4"
        ></textarea>
      </label>

      <button type="submit">
        Создать заявку
      </button>
    </form>
  </main>
</template>