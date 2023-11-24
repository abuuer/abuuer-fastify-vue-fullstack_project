<template>
  <div class="admin-products-page">
    <div class="title-buttons">
      <h1>Manage Products</h1>
      <div class="add-buttons">
        <button @click="showAddProduct">Add New Product</button>
        <!-- <button @click="showAddCategory">Add New Category</button> -->
      </div>
    </div>

    <div class="table-header">
      <!-- <div class="add-buttons">
        <button @click="showAddProduct">Add New Product</button>
        <button @click="showAddCategory">Add New Category</button>
      </div> -->
    </div>

    <!-- Product Table -->
    <div class="product-table-container">
      <table>
        <thead>
          <tr>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>SUBCATEGORY</th>
            <th>CATEGORY</th>
            <th class="edit-delete-buttons">EDIT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in paginatedProducts" :key="product.id">
            <td class="td-image">
              <img :src="`${IMAGE_REQ}${product?.picture}`" alt="" />
            </td>
            <td>{{ product?.name || "NaN" }}</td>
            <td>{{ product?.category?.name || "NaN" }}</td>
            <td>{{ product?.category?.parent?.name || "NaN" }}</td>
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
      <div class="pagination">
        <div>
          <span
            @click="prevPage"
            :class="{ 'disabled-pagination': currentPage === 1 }"
            >Prev</span
          >
          <span
            v-for="page in totalPages"
            :key="page"
            :class="{
              'selected-page': page === currentPage,
            }"
            @click="customPage(page)"
          >
            {{ page }}</span
          >
          <span
            @click="nextPage"
            :class="{ 'disabled-pagination': currentPage === totalPages }"
          >
            Next
          </span>
        </div>
      </div>
    </div>

    <AddProduct
      v-if="isShowAddProductVisible"
      :show="isShowAddProductVisible"
      @close="closeAddProduct"
      @addProduct="addProduct"
      @openAddCategoryModal="showAddCategory"
      @showToast="showToast"
    />

    <DeleteProductModal
      v-if="isDeleteConfirmationModalVisible"
      :productToDelete="productToDelete"
      @close="hideDeleteConfirmation"
      @deleteProduct="deleteProduct"
      @showToast="showToast"
    />
    <EditProductModal
      v-if="isEditModalVisible"
      :productToEdit="productToEdit"
      @close="hideEditProduct"
      @addProduct="addProduct"
      @showToast="showToast"
    />
    <AddCategoryModal
      v-if="isShowAddCategoryVisible"
      @close="closeAddCategory"
      @showToast="showToast"
    />
    <ToastNotification
      :message="toastMessage"
      :toastType="toastType"
      :duration="10000"
      :showToastNotification="showToastNotification"
    />
  </div>
</template>

<script>
import { ref, inject } from "vue";
import AddProduct from "../components/AddProduct.vue";
import DeleteProductModal from "../components/DeleteProductModal.vue";
import EditProductModal from "../components/EditProductModal.vue";
import AddCategoryModal from "../components/AddCategoryModal.vue";
import ToastNotification from "../components/ToastNotification.vue";

import { IMAGE_REQ } from "../utils/constant";

export default {
  components: {
    AddProduct,
    DeleteProductModal,
    EditProductModal,
    AddCategoryModal,
    ToastNotification,
  },
  setup() {
    const productList = ref(inject("products"));
    const isDeleteConfirmationModalVisible = ref(false);
    const isShowAddProductVisible = ref(false);
    const isShowAddCategoryVisible = ref(false);
    const isEditModalVisible = ref(false);
    const showToastNotification = ref(false);

    return {
      productList,
      isDeleteConfirmationModalVisible,
      isShowAddProductVisible,
      isEditModalVisible,
      isShowAddCategoryVisible,
      showToastNotification,
      IMAGE_REQ,
    };
  },

  data() {
    return {
      productToDelete: null,
      productToEdit: null,
      currentPage: 1,
      itemsPerPage: 8,
      toastMessage: "",
      toastType: "",
    };
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.productList.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.productList.length / this.itemsPerPage);
    },
  },
  methods: {
    /** API related functions */
    addProduct(newProduct, oldProduct) {
      console.log(newProduct);
      console.log(oldProduct);
      if (oldProduct) {
        // Find the index of the old product
        const oldProductIndex = this.productList.findIndex(
          (product) => product.id === oldProduct.id
        );

        // If the old product exists, remove it
        if (oldProductIndex !== -1) {
          this.productList.splice(oldProductIndex, 1, newProduct);
        }
      } else this.productList.push(newProduct);
    },
    deleteProduct() {
      this.productList = this.productList.filter(
        (product) => product.id !== this.productToDelete.id
      );
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    customPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },

    /**
     * Modal show/hide methods
     */

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
    /**
     * Notification alert
     */
    showToast(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.showToastNotification = true;

      setTimeout(() => {
        this.showToastNotification = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.admin-products-page {
  background-color: #ffffff;
  border-radius: 20px;
  max-width: 80%;
  margin: 20px auto;
  padding: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

h1 {
  font-size: 3rem;
  color: #020748;
}

.title-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-buttons button {
  padding: 20px;
  font-size: 18px;
  border-radius: 5px;
  background-color: #00ca80;
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
  background-color: #ff5771;
}
.edit-button {
  background-color: #216afde1;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

thead th {
  border-bottom: 3px solid #838fc0;
  color: #979fa8;
  background-color: #f7f8fc;
}

td {
  padding: 8px;
  text-align: left;
}

th {
  text-align: center;
  padding: 15px 0px;
}

tr:nth-child(even) {
  background-color: #f7f8fc;
}

tr:nth-child(odd) {
  background-color: #ffffff;
}

.td-image {
  text-align: center;
}
td img {
  width: 70px;
  height: 70px;
}
.edit-delete-buttons {
  text-align: center;
}
.edit-delete-buttons button {
  margin-right: 10px; /* Adjust the value as needed */
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
.product-table-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination {
  display: flex;
  justify-content: flex-end;
}

.pagination span {
  flex: 1;
  border: 1px solid rgb(231, 230, 230);
  padding: 5px 20px;
  cursor: pointer;
}
.pagination span:hover {
  color: rgba(55, 99, 221, 0.726);
}

.selected-page {
  background-color: rgba(55, 99, 221, 0.726);
}
.pagination .disabled-pagination {
  cursor: default;
  color: #9e9e9e;
}
.pagination .disabled-pagination:hover {
  color: #9e9e9e;
}
</style>
