<script setup>
import { items } from '../requestStore.js'
import RequestTable from '../components/RequestTable.vue'
</script>

<template>
  <main>
    <h2>Список заявок на выдачу книг</h2>
    <RequestTable :items="items" />
  </main>
</template>