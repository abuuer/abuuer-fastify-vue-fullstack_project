<!-- ToastNotification.vue -->

<template>
  <transition name="fade" class="toast-body">
    <div
      v-if="showToastNotification"
      class="toast"
      :style="{
        backgroundColor: toastType === 'success' ? '#4caf4fb4' : '#ff5a72b4',
      }"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: String,
    showToastNotification: Boolean,
    duration: {
      type: Number,
      default: 3000, // default duration is 3 seconds
    },
    toastType: {
      type: String,
      default: "success",
    },
  },
};
</script>

<style scoped>
.toast-body {
  z-index: 10;
}
.toast {
  position: fixed;
  bottom: 100px;
  right: 100px;
  color: #fff;
  padding: 20px 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-active {
  transition: opacity 1.3s;
}
.fade-leave-active {
  transition: opacity 1.3s;
}

.fade-leave-to {
  opacity: 0;
}
</style>
