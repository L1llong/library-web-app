<script setup>
import {ref, onMounted} from 'vue'
import {getRequests} from '../api/requests.js'
import RequestTable from '../components/RequestTable.vue'

const screen = ref('loading')
const items = ref([])
const errorMessage = ref('')

onMounted(async () => {
  screen.value = 'loading'
  const result = await getRequests()

  if (!result.ok) {
    screen.value = 'error'
    if (result.status === 0) {
      errorMessage.value = 'Нет связи с сервером. Проверьте, что приложение запущено.'
    } else if (result.status === 500) {
      errorMessage.value = 'Сервер не смог обработать запрос.'
    } else {
      errorMessage.value = `Ошибка ${result.status}: ${result.data?.error || 'Неизвестная ошибка'}`
    }
    return
  }

  if (result.data.length === 0) {
    screen.value = 'empty'
  } else {
    items.value = result.data
    screen.value = 'data'
  }
})
</script>

<template>
  <main>
    <h2>Список заявок на выдачу книг</h2>

    <p v-if="screen === 'loading'">
      Загрузка...
    </p>

    <p v-else-if="screen === 'empty'">
      Записей пока нет
    </p>

    <p v-else-if="screen === 'error'" class="error">
      {{ errorMessage }}
    </p>

    <RequestTable
        v-else-if="screen === 'data'"
        :items="items"
    />
  </main>
</template>

<style scoped>
.error {
  color: #c0392b;
  font-weight: bold;
}
</style>