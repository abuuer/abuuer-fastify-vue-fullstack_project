<template>
  <div class="modal-add-category-overlay">
    <div class="modal-add-category">
      <div class="modal-add-category-header">
        <h2>Add New Category</h2>
      </div>
      <Form @submit="addCategory">
        <div class="modal-add-choice">
          <b>What type of category would you like to add ?</b>
          <div>
            <label>
              <Field
                name="category"
                id="subcategory"
                type="radio"
                value="category"
                :rules="schema.category"
                v-model="selectedCategory"
              />
              <span>Category</span>
            </label>
            <label>
              <Field
                name="category"
                id="subcategory"
                type="radio"
                value="subcategory"
                :rules="schema.category"
                v-model="selectedCategory"
              />
              <span>Subcategory</span>
            </label>
          </div>
          <ErrorMessage name="category" />
        </div>
        <div
          v-if="selectedCategory === 'subcategory'"
          class="modal-add-choice-field"
        >
          <div class="category-label">
            <label>Category:</label>
          </div>

          <Field
            name="parentCategory"
            as="select"
            :rules="schema.parentCategory"
            class="input-style"
            id="parentCategory"
          >
            <option
              v-for="category in categoriesList"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </Field>

          <ErrorMessage name="parentCategory" />
        </div>
        <div class="modal-add-choice-field">
          <label>Name *</label>
          <Field
            name="newCategoryName"
            id="newCategoryName"
            type="text"
            placeholder="Enter a new category name"
            class="input-style"
            :rules="schema.newCategoryName"
          />
          <ErrorMessage name="newCategoryName" />
        </div>
        <div class="modal-add-choice-field">
          <label>Picture *</label>
          <ImageUploadField :schema="schema" />
          <ErrorMessage name="productPicture" />
        </div>
        <p class="modal-add-category-buttons">
          <button type="button" @click="hideDeleteConfirmation">Cancel</button
          ><button type="submit">Add</button>
        </p>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import ImageUploadField from "./ImageUploadField.vue";
import * as Yup from "yup";
import { inject, ref } from "vue";
import { readFileAsBuffer } from "../utils/fileReader";
import axios from "../api/axios";
const schema = {
  category: Yup.string().required("You must select a category type"),
  newCategoryName: Yup.string().required("Product name is required"),
  picture: Yup.mixed().required("You must upload an image"),
  parentCategory: Yup.string().required("You must select a category"),
};
const CATEGORY_URL = "/api/categories";
export default {
  name: "AddCategoryModal",
  components: {
    Form,
    Field,
    ImageUploadField,
    ErrorMessage,
  },
  setup() {
    const categoriesList = ref(inject("categories"));
    const updateCategories = inject("updateCategories");

    return { categoriesList, updateCategories };
  },
  data() {
    return { schema, selectedCategory: null };
  },
  methods: {
    hideDeleteConfirmation() {
      this.$emit("close");
    },
    async addCategory(values) {
      console.log(values);
      const buffer = await readFileAsBuffer(values.productPicture);
      const formData = new FormData();
      // Append the buffer as a file to the form data
      formData.append(
        "fileBuffer",
        new Blob([buffer], { type: "application/octet-stream" }),
        "filename.bin"
      );
      // Append other JSON data to the form data
      formData.append("fileName", values.productPicture.name);
      formData.append("name", values.newCategoryName);
      if (values.parentCategory)
        formData.append("parent_id", values.parentCategory);
      try {
        const response = await axios.post(`${CATEGORY_URL}/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
        if (this.updateCategories)
          this.updateCategories(response.data.category);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.modal-add-category-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-add-category {
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: white;
  padding: 20px;
  min-width: 40vh;
  border-radius: 15px;
  align-items: center;
}

form {
  display: flex;
  gap: 20px;
  flex-direction: column;
}
.modal-add-category-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-add-choice-field {
  display: flex;
  flex-direction: column;
}

.modal-add-choice > div {
  display: flex;
  width: 100%;
  gap: 40px;
}
.modal-add-choice > div > label {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
}
.modal-add-choice > div > label > span {
  margin-left: 2px;
  cursor: pointer;
}
.modal-add-choice button {
  background-color: white;
  border: 1px solid gray;
  color: black;
  font-weight: bold;
}
.modal-add-category-product-name {
  color: #4a55a2;
  font-size: 30px;
  font-weight: bold;
}

.modal-add-category-message {
  background-color: rgb(255 230 234);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  color: rgb(48, 47, 47);
}
.modal-add-category-message svg {
  font-size: 30px;
  color: rgb(225 30 60);
}
.modal-add-category-buttons {
  display: flex;
  gap: 20px;
}
button {
  padding: 8px 30px;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 20px;
}

.modal-add-category-buttons button:first-child {
  background-color: white;
  border: 1px solid gray;
  color: black;
  font-weight: bold;
}
.modal-add-category-buttons button:last-child {
  background-color: #00c9a7;
  font-weight: bold;
}
button {
  transition: transform 0.2s, box-shadow 0.2s;
}
button:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

label {
  font-size: 18px;
}

input {
  margin-bottom: 10px;
  height: 20px;
  border: none;
  border-radius: 4px;
  padding: 0.2em 0.6em;
  margin-top: 10px;
  background: transparent;
  font-size: 15px;
}
.input-style {
  margin-bottom: 10px;
  height: 30px;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 4px;
  padding: 0.2em 0.6em;
  margin-top: 10px;
  background: transparent;
  transition: background-color 0.5s;
}

input:focus {
  outline: none !important;
  border: 1px solid #4a54a2de;
}

input[type="radio"] {
  position: relative;
  appearance: none;
  border-radius: 50%;
  border: 1px solid #3d3d3d;
  margin-right: 5px;
  margin-left: 0px;
  cursor: pointer;
  -ms-transform: scale(0.8); /* IE */
  -moz-transform: scale(0.8); /* FF */
  -webkit-transform: scale(0.8); /* Safari and Chrome */
  -o-transform: scale(0.8); /* Opera */
  transform: scale(0.8);
}

input[type="radio"]::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background-color: #424242;
  opacity: 0;
  transition: opacity 0.2s;
}

input[type="radio"]:checked::before {
  opacity: 1;
}

span[role="alert"] {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  color: #d32f2f;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
}
</style>
