<script setup>
import {ref} from 'vue'

const screen = ref('list')

const items = ref(
    [
      {
        id: 1,
        number: 'REQ-2026-001',
        title: 'Война и мир',
        bookId: 5,
        status: 'New'
      },
      {
        id: 2,
        number: 'REQ-2026-002',
        title: 'Преступление и наказание',
        bookId: 12,
        status: 'InProgress'
      }
    ]
)

const newTitle = ref('')
const newBookId = ref('')
const newDescription = ref('')

const login = ref('')
const password = ref('')

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
    screen.value = 'list'
  }
}

const doLogin = () => {
  alert(`Вход выполнен: ${login.value}`)
  login.value = ''
  password.value = ''
  screen.value = 'list'
}
</script>

<template>
  <div>
    <header>
      <button
          type="button"
          @click="screen = 'list'"
      >
        Список заявок
      </button>
      <button
          type="button"
          @click="screen = 'new'"
      >
        Создать заявку
      </button>
      <button
          type="button"
          @click="screen = 'login'"
      >
        Вход
      </button>
    </header>

    <main v-if="screen === 'list'">
      <h2>
        Список заявок на выдачу книг
      </h2>
      <table>
        <thead>
        <tr>
          <th>
            Номер
          </th>
          <th>
            Название книги
          </th>
          <th>
            ID книги
          </th>
          <th>
            Статус
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in items"
            :key="item.id"
        >
          <td>
            {{ item.number }}
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ item.bookId }}
          </td>
          <td>
            {{ item.status }}
          </td>
        </tr>
        </tbody>
      </table>
    </main>

    <main v-else-if="screen === 'new'">
      <h2>
        Создание заявки на выдачу книги
      </h2>
      <form @submit.prevent="createRequest">
        <label for="title">
          Название книги (5–80 символов)
          <input
              id="title"
              v-model="newTitle"
              name="title" autofocus required
          />
        </label>

        <label for="bookId">
          ID книги (справочник)
          <input
              id="bookId"
              v-model="newBookId"
              name="bookId" type="number" min="1" required
          />
        </label>

        <label for="description">
          Описание / комментарий (10–500 символов)
          <textarea
              id="description"
              v-model="newDescription"
              name="description"
              rows="4"
          >
          </textarea>
        </label>

        <button type="submit">
          Создать заявку
        </button>
      </form>
    </main>

    <main v-else>
      <h2>
        Вход в систему
      </h2>
      <form @submit.prevent="doLogin">
        <label for="login">
          Логин
          <input
              id="login"
              v-model="login"
              name="login" autofocus required
          />
        </label>

        <label for="password">
          Пароль
          <input
              id="password"
              v-model="password"
              name="password"
              type="password" required
          />
        </label>

        <button type="submit">
          Войти
        </button>
      </form>
    </main>
  </div>
</template>

<style scoped>
header {
  margin-bottom: 20px;
  padding: 10px;
  background: #f0f0f0;
}

header button {
  margin-right: 10px;
  padding: 8px 16px;
  cursor: pointer;
}

main {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background: #f5f5f5;
}

form label {
  display: block;
  margin-bottom: 15px;
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
  padding: 10px 20px;
  cursor: pointer;
}
</style>