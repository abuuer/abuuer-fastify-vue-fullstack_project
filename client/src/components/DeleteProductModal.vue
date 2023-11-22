<template>
  <div class="modal-delete-overlay">
    <div class="modal-delete">
      <div class="modal-delete-header">
        <h2>Delete This Product ?</h2>
        <p class="modal-delete-product-name">{{ productToDeleteName }}</p>
      </div>
      <p class="modal-delete-message">
        <font-awesome-icon icon="fa-solid fa-bell" />
        <span> Are you sure you want to <b>delete</b> this product? </span>
      </p>
      <p class="modal-delete-buttons">
        <button @click="hideDeleteConfirmation">Cancel</button
        ><button @click="deleteConfirmed">Delete</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteProductModal",
  props: {
    productToDeleteName: String,
  },
  methods: {
    hideDeleteConfirmation() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal-delete-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-delete {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  background: white;
  padding: 20px;
  max-width: 50vh;
  border-radius: 15px;
}

.modal-delete > div {
  flex: 1;
  margin-bottom: 10px;
}
.modal-delete-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-delete-header h2 {
  margin-bottom: 0px;
}
.modal-delete-product-name {
  color: #4a55a2;
  font-size: 30px;
  font-weight: bold;
}

.modal-delete-message {
  background-color: rgb(255 230 234);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
}
.modal-delete-message svg {
  font-size: 30px;
  color: rgb(225 30 60);
}
.modal-delete-buttons {
  display: flex;
  gap: 20px;
}
.modal-delete-buttons button {
  padding: 8px 30px;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 20px;
}

.modal-delete-buttons button:first-child {
  background-color: white;
  border: 1px solid gray;
  color: black;
  font-weight: bold;
}
.modal-delete-buttons button:last-child {
  background-color: rgb(225 30 60);
  font-weight: bold;
}
</style>
