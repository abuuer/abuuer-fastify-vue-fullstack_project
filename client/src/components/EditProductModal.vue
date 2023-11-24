<template>
  <div class="modal-edit-overlay">
    <div class="modal-edit">
      <div class="modal-header">
        <h2>Edit Product</h2>
      </div>
      <Form @submit="saveEdit">
        <div class="modal-edit-input">
          <ImageUploadField :pictureName="editedProduct.picture" />
          <ErrorMessage name="productPicture" />
        </div>
        <div class="modal-edit-input">
          <Field
            name="editProductName"
            id="editProductName"
            type="text"
            placeholder="Enter your product name"
            class="input-style"
            v-model="editedProduct.name"
          />
        </div>

        <div class="modal-edit-buttons">
          <button type="submit">Save</button>
          <button type="button" @click="cancelEdit">Cancel</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import ImageUploadField from "./ImageUploadField.vue";
import { PRODUCT_URL } from "../utils/constant";
import axios from "../api/axios";
import { readFileAsBuffer } from "../utils/fileReader";

export default {
  name: "EditProductModal",
  props: {
    productToEdit: Object,
  },
  components: {
    Form,
    ErrorMessage,
    ImageUploadField,
    Field,
  },
  data() {
    return {
      editedProduct: { ...this.productToEdit },
      originalProduct: { ...this.productToEdit },
    };
  },
  methods: {
    cancelEdit() {
      this.$emit("close");
    },
    async saveEdit(values) {
      let editedFields = this.getEditedFields();
      const file = values.productPicture;
      const formData = new FormData();
      if (file) {
        const buffer = await readFileAsBuffer(file);
        formData.append(
          "fileBuffer",
          new Blob([buffer], { type: "application/octet-stream" }),
          "filename.bin"
        );
        formData.append("fileName", file.name);
        formData.append("oldPictureName", this.originalProduct.picture);
      }
      if (editedFields.name) formData.append("name", editedFields.name);
      if (editedFields.name || file) {
        try {
          const response = await axios.put(
            `${PRODUCT_URL}/${this.editedProduct.id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          this.originalProduct = response.data.product;
          this.$emit("addProduct", response.data.product, this.editedProduct);
          this.$emit("close");
          this.$emit("showToast", "Product Edited Successfully");
        } catch (error) {
          this.$emit(
            "showToast",
            "An error occurred. Please Try Again",
            "error"
          );
        }
      }
    },
    getEditedFields() {
      const editedFields = {};

      // Compare each field to check if it has been edited
      for (const key in this.editedProduct) {
        if (this.editedProduct[key] !== this.originalProduct[key]) {
          editedFields[key] = this.editedProduct[key];
        }
      }
      return editedFields;
    },
  },
};
</script>

<style scoped>
.modal-edit-overlay {
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

.modal-edit {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  background: white;
  padding: 20px;
  min-width: 50vh;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-edit form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 80%;
}

.modal-edit label {
  font-size: 18px;
  margin-bottom: 5px;
}

.modal-edit input {
  margin-bottom: 10px;
  height: 30px;
  border: none;
  border-radius: 4px;
  padding: 0.2em 0.6em;
  margin-top: 10px;
  background: transparent;
  width: 100%;
  text-align: center;
  font-size: 25px;
}

.modal-edit input:focus {
  outline: none !important;
  border: 1px solid #4a54a2de;
}

.modal-edit-input {
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
}
.modal-edit-buttons {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.modal-edit-buttons button {
  padding: 8px 30px;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 20px;
  background-color: rgb(225, 30, 60);
  font-weight: bold;
  transition: box-shadow 0.2s;
}

.modal-edit-buttons button:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-edit-buttons button:first-child {
  background-color: white;
  border: 1px solid gray;
  color: black;
  font-weight: bold;
}
.upload-label {
  display: block;
  margin-bottom: 8px;
}
</style>
