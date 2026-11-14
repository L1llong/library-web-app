<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createRequest } from '../api/requests.js'
import { force500, setForce500 } from '../api/mockRequests.js'

const router = useRouter()

const form = ref({
  title: '',
  bookId: 0,
  description: ''
})

const errors = ref({
  title: '',
  bookId: '',
  description: ''
})

const submitError = ref('')
const isSubmitting = ref(false)

const clearErrors = () => {
  errors.value = { title: '', bookId: '', description: '' }
  submitError.value = ''
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

const onCreate = async () => {
  if (isSubmitting.value) {
    return
  }

  if (!validate()) {
    return
  }

  isSubmitting.value = true
  submitError.value = ''

  const result = await createRequest({
    title: form.value.title.trim(),
    bookId: form.value.bookId,
    description: form.value.description.trim()
  })

  isSubmitting.value = false

  if (!result.ok) {
    if (result.status === 400) {
      submitError.value = 'Проверьте поля формы.'
      if (result.data?.title) {
        errors.value.title = result.data.title
      }
    } else if (result.status === 500) {
      submitError.value = 'Сервер не смог обработать запрос. Попробуйте позже.'
    } else {
      submitError.value = `Ошибка ${result.status}: ${result.data?.error || 'Неизвестная ошибка'}`
    }
    return
  }

  form.value = { title: '', bookId: 0, description: '' }
  clearErrors()
  router.push('/')
}
</script>

<template>
  <main>
    <h2>Создание заявки на выдачу книги</h2>

    <p v-if="submitError" class="error">
      {{ submitError }}
    </p>

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

      <label class="checkbox-label">
        <input
            type="checkbox"
            :checked="force500"
            @change="setForce500($event.target.checked)"
        />
        Симулировать ошибку сервера (500)
      </label>

      <button
          type="submit"
          :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Создаём…' : 'Создать заявку' }}
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

form button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  font-size: 14px;
}

.checkbox-label input {
  width: auto;
}
</style>