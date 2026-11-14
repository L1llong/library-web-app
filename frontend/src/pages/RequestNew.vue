<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {items, nextId, addItem} from '../requestStore.js'

const router = useRouter()

// Единый объект формы
const form = ref({
  title: '',
  bookId: 0,
  description: ''
})

// Объект с текстами ошибок (пустая строка = ошибки нет)
const errors = ref({
  title: '',
  bookId: '',
  description: ''
})

const clearErrors = () => {
  errors.value = {title: '', bookId: '', description: ''}
}

const validate = () => {
  clearErrors()

  const title = form.value.title.trim()
  if (title.length < 5 || title.length > 80) {
    errors.value.title = 'Тема: от 5 до 80 символов'
  }

  const bookId = form.value.bookId
  if (!Number.isInteger(bookId) || bookId <= 0) {
    errors.value.bookId = 'ID книги: целое число больше нуля'
  }

  const description = form.value.description.trim()
  if (description.length < 10 || description.length > 500) {
    errors.value.description = 'Описание: от 10 до 500 символов'
  }

  return !errors.value.title && !errors.value.bookId && !errors.value.description
}

const onCreate = () => {
  if (!validate()) {
    return
  }

  const id = nextId
  addItem({
    id,
    number: `REQ-2026-00${id}`,
    title: form.value.title.trim(),
    bookId: form.value.bookId,
    description: form.value.description.trim(),
    status: 'New'
  })

  form.value = {title: '', bookId: 0, description: ''}
  clearErrors()
  router.push('/')
}
</script>

<template>
  <main>
    <h2>
      Создание заявки на выдачу книги
    </h2>
    <form @submit.prevent="onCreate">
      <label for="title">
        Название книги (5–80 символов)
        <input
            id="title"
            v-model="form.title"
            name="title"
            autofocus
        />
      </label>
      <p
          v-if="errors.title"
          class="error"
      >
        {{ errors.title }}
      </p>

      <label for="bookId">
        ID книги (справочник)
        <input
            id="bookId"
            v-model.number="form.bookId"
            name="bookId"
            type="number"
            min="1"
        />
      </label>
      <p
          v-if="errors.bookId"
          class="error"
      >
        {{ errors.bookId }}
      </p>

      <label for="description">
        Описание / комментарий (10–500 символов)
        <textarea
            id="description"
            v-model="form.description"
            name="description"
            rows="4"
        ></textarea>
      </label>
      <p
          v-if="errors.description"
          class="error"
      >
        {{ errors.description }}
      </p>

      <button type="submit">
        Создать заявку
      </button>
    </form>
  </main>
</template>

<style scoped>
.error {
  color: #c0392b;
  margin: 4px 0 12px;
  font-size: 14px;
}

form label {
  display: block;
  margin-bottom: 6px;
}

form input,
form textarea {
  display: block;
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}

form button {
  margin-top: 10px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>