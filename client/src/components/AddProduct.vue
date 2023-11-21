<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>New Product</h3>
      </div>

      <div class="new-product-form">
        <form @submit.prevent="createProduct">
          <div>
            <label for="productName">Product Name:</label>
            <input
              v-model="productName"
              type="text"
              id="productName"
              required
            />
          </div>

          <div>
            <label for="productPicture">Product Picture:</label>
            <input
              type="file"
              id="productPicture"
              @change="handleFileChange"
              accept="image/*"
              required
            />
          </div>

          <div>
            <label for="category">Category:</label>
            <select v-model="selectedCategory" id="category" required>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <div class="buttons">
              <button type="submit">Create Product</button>
              <button type="button" @click="closeAddProductForm">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  props: { show: Boolean },
  methods: {
    closeAddProductForm() {
      this.$emit("close");
    },
    // addProduct() {
    //   this.$emit("add", {
    //     name: this.newProductName,
    //     subcategoryId: this.selectedSubcategory,
    //   });
    // },
  },
};
</script>

<style scoped>
.modal {
  display: block; /* Hidden by default */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4); /* Overlay background */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  border: 1px solid #888;
  width: 30%;
  border-radius: 10px;
}

.modal-header {
  background-color: #cfcece96;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.modal-header h3 {
  margin: 0px;
  font-size: 25px;
  padding: 20px 30px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.new-product-form {
  padding: 10px 30px;
  margin: 20px auto;
}
.new-product-form div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

label {
  margin-bottom: 5px;
  color: #6d6c6c;
  font-size: 19px;
}

input,
select {
  margin-bottom: 10px;
  height: 30px;
}

.new-product-form .buttons {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

button {
  padding: 8px 15px;
  background-color: #4a54a2de;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 20px;
}

button:last-child {
  background-color: #ffffff;
  color: black;
  border: 1px solid #b3b3b3de;
}

button:hover {
  background-color: #4a54a2;
}
button:last-child:hover {
  background-color: #dfdede91;
}
</style>
