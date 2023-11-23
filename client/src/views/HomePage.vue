<template>
  <div class="routes">
    <router-link to="/product" class="route-link">Home</router-link> |
    <router-link to="/admin" class="route-link">Admin</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.routes {
  display: flex;
  justify-content: center;
  justify-items: center;
  height: 100vh;
  align-items: center;
}

.route-link {
  margin: 0 10px;
  color: #4a54a2;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.2s;
}

.route-link:hover {
  color: #4a54a2de;
}
</style>
