<template>
  <div class="admin-products-page">
    <h2>Manage Products</h2>

    <!-- Add Product/Category Buttons -->
    <div class="add-buttons">
      <button @click="showAddProduct">Add New Product</button>
      <button @click="showAddCategory">Add New Category</button>
    </div>

    <!-- Product Table -->
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Subcategory</th>
          <th>Category</th>
          <th class="edit-delete-buttons">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productList" :key="product.id">
          <td>{{ product.name || "NaN" }}</td>
          <td>{{ product.category.name || "NaN" }}</td>
          <td>{{ product.category.parent?.name || "NaN" }}</td>
          <td class="edit-delete-buttons">
            <button
              @click="showDeleteConfirmation(product)"
              class="delete-button"
              aria-label="Delete"
            >
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </button>
            <button
              @click="showEditProduct(product)"
              class="edit-button"
              aria-label="Edit"
            >
              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <AddProduct
      v-if="isShowAddProductVisible"
      :show="isShowAddProductVisible"
      @close="closeAddProduct"
      @addProduct="addProduct"
      @openAddCategoryModal="showAddCategory"
    />

    <DeleteProductModal
      v-if="isDeleteConfirmationModalVisible"
      :productToDelete="productToDelete"
      @close="hideDeleteConfirmation"
      @delete="deleteProduct"
    />
    <EditProductModal
      v-if="isEditModalVisible"
      :productToEdit="productToEdit"
      @close="hideEditProduct"
    />
    <AddCategoryModal
      v-if="isShowAddCategoryVisible"
      @close="closeAddCategory"
    />
  </div>
</template>

<script>
import { ref, inject } from "vue";
import AddProduct from "../components/AddProduct.vue";
import DeleteProductModal from "../components/DeleteProductModal.vue";
import EditProductModal from "../components/EditProductModal.vue";
import AddCategoryModal from "../components/AddCategoryModal.vue";
import axios from "../api/axios";

const PRODUCTS_URL = "api/products";

export default {
  components: {
    AddProduct,
    DeleteProductModal,
    EditProductModal,
    AddCategoryModal,
  },
  setup() {
    const productList = ref(inject("products"));
    const isDeleteConfirmationModalVisible = ref(false);
    const isShowAddProductVisible = ref(false);
    const isShowAddCategoryVisible = ref(false);
    const isEditModalVisible = ref(false);

    return {
      productList,
      isDeleteConfirmationModalVisible,
      isShowAddProductVisible,
      isEditModalVisible,
      isShowAddCategoryVisible,
    };
  },

  data() {
    return {
      productToDelete: null,
      productToEdit: null,
    };
  },
  methods: {
    addProduct(newProduct) {
      this.productList.push(newProduct);
    },
    getProductSubcategory(product) {
      const subcategory = this.allSubcategories.find((subcategory) =>
        subcategory.products.some((p) => p.id === product.id)
      );
      return subcategory ? subcategory.name : "N/A";
    },
    getProductParentCategory(product) {
      const subcategory = this.allSubcategories.find((subcategory) =>
        subcategory.products.some((p) => p.id === product.id)
      );
      return subcategory && subcategory.parent
        ? subcategory.parent.name
        : "N/A";
    },

    showAddProduct() {
      this.isShowAddProductVisible = true;
    },

    closeAddProduct() {
      this.isShowAddProductVisible = false;
    },

    showAddCategory() {
      this.isShowAddCategoryVisible = true;
    },

    closeAddCategory() {
      this.isShowAddCategoryVisible = false;
    },

    showDeleteConfirmation(product) {
      this.productToDelete = product;
      this.isDeleteConfirmationModalVisible = true;
    },

    hideDeleteConfirmation() {
      // Clear the product to delete and hide the modal
      this.isDeleteConfirmationModalVisible = false;
    },

    showEditProduct(product) {
      this.productToEdit = product;
      this.isEditModalVisible = true;
    },
    hideEditProduct() {
      this.isEditModalVisible = false;
    },

    async deleteProduct() {
      this.isDeleteConfirmationModalVisible = false;
      try {
        const response = await axios.delete(
          `${PRODUCTS_URL}/${this.productToDelete.id}`
        );
        console.log(response);
        this.productList = this.productList.filter(
          (product) => product.id !== this.productToDelete.id
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.admin-products-page {
  max-width: 80%;
  margin: 20px auto;
  padding: 20px;
}

.add-buttons {
  display: flex;
  gap: 10px;
}

button {
  margin: 10px 0;
  padding: 8px;
  background-color: #0da49f;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-weight: bold;
}

.delete-button {
  background-color: rgba(225, 30, 59, 0.884);
}
.edit-button {
  background-color: rgba(55, 99, 221, 0.822);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.edit-delete-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

th {
  background-color: #dfdede3b;
  color: rgb(0, 0, 0);
}

button {
  transition: transform 0.2s, box-shadow 0.2s;
}
button:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
button[aria-label] {
  overflow: visible;
}
</style>
