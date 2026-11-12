<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const login = ref('')
const password = ref('')

const doLogin = () => {
  alert(`Вход выполнен: ${login.value}`)
  login.value = ''
  password.value = ''
  router.push('/')
}
</script>

<template>
  <main>
    <h2>Вход в систему</h2>
    <form @submit.prevent="doLogin">
      <label for="login">
        Логин
        <input
            id="login"
            v-model="login"
            name="login"
            autofocus
            required
        />
      </label>

      <label for="password">
        Пароль
        <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            required
        />
      </label>

      <button type="submit">
        Войти
      </button>
    </form>
  </main>
</template>