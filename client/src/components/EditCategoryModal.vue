<template>
  <div class="modal-edit-overlay">
    <div class="modal-edit">
      <div class="modal-header">
        <h2>Edit Category</h2>
      </div>
      <Form @submit="saveEdit">
        <div class="modal-edit-input">
          <ImageUploadField :pictureName="editedCategory.picture" />
          <ErrorMessage name="categoryPicture" />
        </div>
        <div class="modal-edit-input">
          <Field
            name="editCategoryName"
            id="editCategoryName"
            type="text"
            placeholder="Enter your category name"
            class="input-style"
            v-model="editedCategory.name"
          />
        </div>
        <!-- <div class="sub-categories">
          <h3>Sub Categories</h3>
          <div
            v-if="editedCategory.children?.length"
            class="modal-edit-subcategories"
          >
            <div
              v-for="subCategory in editedCategory.children"
              :key="subCategory.id"
              class="modal-edit-subcategory"
            >
              {{ subCategory.name }}
              <button
                class="delete-button"
                type="button"
                aria-label="Delete"
                @click="deleteSubcategory(subCategory)"
              >
                <font-awesome-icon icon="fa-solid fa-x" />
              </button>
            </div>
          </div>
          <div v-else>This category has no sub categories</div>
        </div> -->

        <div class="modal-edit-buttons">
          <button type="button" @click="cancelEdit">Cancel</button>
          <button type="submit">Save</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import ImageUploadField from "./ImageUploadField.vue";
import { CATEGORY_URL } from "../utils/constant";
import { readFileAsBuffer } from "../utils/fileReader";
import axios from "../api/axios";

export default {
  name: "EditCategoryModal",
  props: {
    categoryToEdit: Object,
  },
  components: {
    Form,
    ErrorMessage,
    ImageUploadField,
    Field,
  },
  data() {
    return {
      editedCategory: { ...this.categoryToEdit },
      originalCategory: { ...this.categoryToEdit },
    };
  },
  methods: {
    cancelEdit() {
      this.$emit("close");
    },
    deleteSubcategory(subCategory) {
      this.$emit("showDeleteConfirmation", subCategory);
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
        formData.append("oldPictureName", this.originalCategory.picture);
      }
      if (editedFields.name) formData.append("name", editedFields.name);
      if (editedFields.name || file) {
        try {
          const response = await axios.put(
            `${CATEGORY_URL}/${this.editedCategory.id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          this.originalCategory = response.data.category;
          this.$emit("showToast", "Product Edited Successfully");
          this.$emit(
            "updateCategory",
            response.data.category,
            this.editedCategory
          );
        } catch (error) {
          this.$emit(
            "showToast",
            "An error occurred. Please Try Again",
            "error"
          );
        }
      }
      this.$emit("close");
    },
    getEditedFields() {
      const editedFields = {};

      // Compare each field to check if it has been edited
      for (const key in this.editedCategory) {
        if (this.editedCategory[key] !== this.originalCategory[key]) {
          editedFields[key] = this.editedCategory[key];
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
.modal-edit-lign-break {
  border-top: 1px solid rgb(214, 214, 214);
  width: 100%;
  margin-top: 20px;
}
.sub-categories {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;
}

.sub-categories h3 {
  display: flex;
}
.modal-edit-subcategories {
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
}
.modal-edit-subcategory {
  padding: 10px 10px;
  background-color: rgb(241, 240, 240);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}
.delete-button {
  color: #ff5771;
  font-weight: 900;
}
button {
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}
</style>
