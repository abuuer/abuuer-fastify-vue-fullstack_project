<!-- ToastNotification.vue -->

<template>
  <transition appear name="fade">
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.toast {
  position: fixed;
  bottom: 100px;
  right: 100px;
  color: #fff;
  padding: 20px 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
