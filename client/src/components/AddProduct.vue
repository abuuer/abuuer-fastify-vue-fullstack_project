<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Add New Product</h3>
      </div>

      <div class="new-product-form">
        <Form @submit="onSubmit">
          <div>
            <label>Picture *:</label>

            <ImageUploadField :schema="schema" />
            <ErrorMessage name="productPicture" />
          </div>
          <div>
            <label>Name *:</label>
            <Field
              name="productName"
              id="productName"
              type="text"
              placeholder="Enter your product name"
              class="input-style"
              :rules="schema.productName"
            />
            <ErrorMessage name="productName" />
          </div>

          <div class="cat-sub-category">
            <div>
              <div class="category-label">
                <label>Category:</label>
                <font-awesome-icon
                  @click="addCategory"
                  icon="fa-solid fa-plus"
                />
              </div>

              <Field
                name="category"
                as="select"
                :rules="schema.category"
                class="input-style"
                @change="handleCategorySelect"
                id="category"
                v-model="selectedCategoryId"
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </Field>

              <ErrorMessage name="category" />
            </div>
            <div v-if="selectedCategory">
              <div class="category-label">
                <label>Sub Category:</label>
                <font-awesome-icon
                  @click="addCategory"
                  icon="fa-solid fa-plus"
                />
              </div>
              <Field
                name="subCategory"
                as="select"
                :rules="schema.subCategory"
                class="input-style"
                v-model="selectedSubCategory"
                id="subCategory"
              >
                <option
                  v-for="subcategory in selectedCategory.children"
                  :key="subcategory.id"
                  :value="subcategory.id"
                >
                  {{ subcategory.name }}
                </option>
              </Field>
              <span
                v-if="
                  selectedCategory && selectedCategory.children?.length === 0
                "
              >
                This category has no sub-categories
              </span>
              <ErrorMessage name="subCategory" />
            </div>
          </div>

          <div>
            <div class="buttons">
              <button type="button" @click="closeAddProduct">Cancel</button>
              <button type="submit" :disabled="isSubmitting">
                Create Product
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import { readFileAsBuffer } from "../utils/fileReader";
import * as Yup from "yup";
import axios from "../api/axios";
import ImageUploadField from "./ImageUploadField.vue";
import { inject, ref } from "vue";
import { PRODUCT_URL } from "../utils/constant";
const schema = {
  productName: Yup.string().required("Product name is required"),
  category: Yup.string().required("You must select a category"),
  subCategory: Yup.string().required("You must select a sub-category"),
  picture: Yup.mixed().required("You must upload an image"),
};

export default {
  name: "AddProduct",
  components: { ErrorMessage, Field, Form, ImageUploadField },
  props: {
    show: Boolean,
  },
  setup() {
    const categories = ref(inject("categories"));
    return { categories };
  },
  data() {
    return {
      selectedCategory: null,
      selectedCategoryId: null,
      selectedSubCategory: null,
      selectedPicture: null,
      schema,
      isSubmitting: false,
    };
  },
  methods: {
    closeAddProduct() {
      this.$emit("close");
    },
    handleImageUpload() {
      // const input = this.$refs.fileInput.$el; // Access the underlying DOM element
      const file = this.selectedPicture;

      if (file) {
        // Update the selected picture and its URL
        this.selectedPicture = file;
        this.selectedPictureUrl = URL.createObjectURL(file);
      }
    },

    handleCategorySelect() {
      this.selectedCategory = this.categories.find(
        (cat) => cat.id === this.selectedCategoryId
      );
    },

    addCategory() {
      this.$emit("openAddCategoryModal");
    },

    async onSubmit(values) {
      this.isSubmitting = true;
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
      formData.append("name", values.productName);
      formData.append("category_id", values.subCategory);
      try {
        const response = await axios.post(PRODUCT_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.$emit("addProduct", response.data.product);
        this.$emit("close");
        this.$emit("showToast", "New Product Added Successfully", "success");
      } catch (error) {
        this.$emit("showToast", "An error occurred. Please Try Again", "error");
      }
      this.isSubmitting = false;
    },
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
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
}
form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

label {
  color: #292929;
  font-size: 17px;
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

.category-label {
  display: flex !important;
  flex-direction: row !important;
  gap: 10px;
  align-items: center;
}

.category-label svg {
  cursor: pointer;
  color: #4a54a2;
}

.category-label svg:hover {
  color: #232e80;
  font-size: 18px;
  transition: font-size 2.3 ease-in-out;
}

.new-product-form div span {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  color: #d32f2f;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
}

.input-style:focus {
  outline: none !important;
  border: 1px solid #4a54a2de;
}
.new-product-form .buttons {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

button {
  padding: 8px 15px;
  background-color: #00c9a7;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 20px;
  font-weight: bold;
}

button:disabled,
button:disabled:hover {
  background-color: #a9a9a9;
  cursor: default;
}

button:first-child {
  background-color: #ffffff;
  color: black;
  border: 1px solid #b3b3b3de;
}

.upload-label {
  display: block;
  margin-bottom: 8px;
}
</style>
