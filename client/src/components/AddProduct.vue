<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>New Product</h3>
      </div>

      <div class="new-product-form">
        <Form @submit="onSubmit">
          <div>
            <label>Product Name:</label>
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

          <div>
            <label>Product Picture:</label>
            <Field
              name="productPicture"
              id="productPicture"
              type="file"
              :rules="schema.picture"
              v-model="selectedPicture"
            />
            <ErrorMessage name="productPicture" />
          </div>

          <div>
            <div class="category-label">
              <label>Category:</label>
              <font-awesome-icon icon="fa-solid fa-plus" />
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
              <font-awesome-icon icon="fa-solid fa-plus" />
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
            <div
              v-if="selectedCategory && selectedCategory.children.length === 0"
            >
              This category has no sub-categories
            </div>
            <ErrorMessage name="subCategory" />
          </div>
          <div>
            <div class="buttons">
              <button type="submit" :disabled="isSubmitting">
                Create Product
              </button>
              <button type="button" @click="closeAddProductForm">Cancel</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Buffer } from "buffer";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import axios from "../api/axios";

const schema = {
  productName: Yup.string().required("Product name is required"),
  category: Yup.string().required("You must select a category"),
  subCategory: Yup.string().required("You must select a sub-category"),
  picture: Yup.mixed().required("You must upload an image"),
};
const categories = [
  {
    id: 10,
    name: "Laptops",
    created_at: "2023-11-20T14:58:09.254Z",
    updated_at: "2023-11-20T15:23:10.462Z",
    picture: "new url",
    parent_id: null,
    children: [
      {
        id: 13,
        name: "Asus",
        created_at: "2023-11-20T17:00:41.557Z",
        updated_at: "2023-11-20T17:00:41.557Z",
        picture: "tthis is a pic url",
        parent_id: 10,
        _count: {
          products: 3,
        },
      },
      {
        id: 15,
        name: "HP",
        created_at: "2023-11-20T17:03:43.050Z",
        updated_at: "2023-11-20T17:03:43.050Z",
        picture: "tthis is a pic url",
        parent_id: 10,
        _count: {
          products: 0,
        },
      },
      {
        id: 17,
        name: "DELL",
        created_at: "2023-11-20T17:03:50.172Z",
        updated_at: "2023-11-20T17:03:50.172Z",
        picture: "tthis is a pic url",
        parent_id: 10,
        _count: {
          products: 0,
        },
      },
    ],
  },
  {
    id: 18,
    name: "Printers",
    created_at: "2023-11-20T17:11:43.774Z",
    updated_at: "2023-11-20T17:11:43.774Z",
    picture: "tthis is a pic url",
    parent_id: null,
    children: [],
  },
  {
    id: 19,
    name: "Mouses",
    created_at: "2023-11-20T23:44:06.962Z",
    updated_at: "2023-11-20T23:44:06.962Z",
    picture:
      "C:\\Users\\ismai\\Desktop\\anouar\\fastify-vue-fullstack-project\\server\\uploads\\1700523846855.jpg",
    parent_id: null,
    children: [],
  },
];

const ADD_PRODUCT_URL = "api/products/create";
export default {
  name: "AddProduct",
  components: { ErrorMessage, Field, Form },
  props: {
    show: Boolean,
  },
  data() {
    return {
      selectedCategory: null,
      selectedCategoryId: null,
      selectedSubCategory: null,
      selectedPicture: null,
      schema,
      categories,
      isSubmitting: false,
    };
  },
  methods: {
    closeAddProductForm() {
      this.$emit("close");
    },
    handleCategorySelect() {
      // this.selectedCategory = event.target.value;
      // console.log(event.target);
      this.selectedCategory = categories.find(
        (cat) => cat.id === this.selectedCategoryId
      );
    },

    async onSubmit(values) {
      this.isSubmitting = true;
      const buffer = await this.readFileAsBuffer(values.productPicture);
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
        const response = await axios.post(ADD_PRODUCT_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data.product);
        this.$emit("addProduct", response.data.product);
      } catch (error) {
        console.log(error);
      }
      this.isSubmitting = false;
    },
    readFileAsBuffer(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const arrayBuffer = event.target.result;
          const buffer = Buffer.from(arrayBuffer);
          resolve(buffer);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsArrayBuffer(file);
      });
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
  background-color: #4a54a2de;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 20px;
}

button:disabled,
button:disabled:hover {
  background-color: #a9a9a9;
  cursor: default;
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
