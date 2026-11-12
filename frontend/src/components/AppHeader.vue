<template>
  <header>
    <nav>
      <router-link to="/">
        Список заявок
      </router-link>
      <router-link to="/new">
        Создать заявку
      </router-link>
      <router-link to="/login">
        Вход
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
header {
  background: #f0f0f0;
  padding: 10px;
  margin-bottom: 20px;
}

nav {
  display: flex;
  gap: 15px;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

a.router-link-active {
  color: #007bff;
  text-decoration: underline;
}
</style>