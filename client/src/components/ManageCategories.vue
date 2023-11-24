<template>
  <div class="admin-categories-page">
    <div class="title-buttons">
      <h1>Manage Categories</h1>
      <div class="add-buttons">
        <button @click="showAddCategory">Add New Category</button>
      </div>
    </div>

    <!-- Product Table -->
    <div class="product-table-container">
      <table>
        <thead>
          <tr>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>SUB CATEGORIES</th>
            <th>PRODUCTS</th>
            <th class="edit-delete-buttons">EDIT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in paginatedCategories" :key="category.id">
            <td class="td-image">
              <img :src="`${IMAGE_REQ}${category?.picture}`" alt="" />
            </td>
            <td>{{ category?.name || "NaN" }}</td>
            <td>{{ category?.children?.length || "0" }}</td>
            <td>{{ totalCount(category) || "0" }}</td>
            <td class="edit-delete-buttons">
              <button
                @click="showDeleteConfirmation(category)"
                class="delete-button"
                aria-label="Delete"
              >
                <font-awesome-icon icon="fa-solid fa-trash-can" />
              </button>
              <!-- <button
                @click="showEditCategory(category)"
                class="edit-button"
                aria-label="Edit"
              >
                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
              </button> -->
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

    <CategoryAndProductsDeletionModal
      v-if="isDeleteConfirmationModalVisible"
      :toBeDeleted="categoryToDelete"
      :parentType="'Category'"
      @close="hideDeleteConfirmation"
      @deleteCategory="deleteCategory"
      @showToast="showToast"
    />
  </div>
</template>

<script>
import { inject, ref } from "vue";
import { IMAGE_REQ } from "../utils/constant";
import CategoryAndProductsDeletionModal from "./CategoryAndProductsDeletionModal.vue";
import AddCategoryModal from "./AddCategoryModal.vue";
import ToastNotification from "./ToastNotification.vue";

export default {
  name: "ManageCategories",
  components: {
    CategoryAndProductsDeletionModal,
    AddCategoryModal,
    ToastNotification,
  },
  setup() {
    const categoriesList = ref(inject("categories"));

    const isShowAddCategoryVisible = ref(false);
    const isDeleteConfirmationModalVisible = ref(false);
    const showToastNotification = ref(false);

    return {
      categoriesList,
      isShowAddCategoryVisible,
      isDeleteConfirmationModalVisible,
      showToastNotification,
    };
  },
  data() {
    return {
      categoryToDelete: null,
      categoryToEdit: null,
      currentPage: 1,
      itemsPerPage: 8,
      toastMessage: "",
      toastType: "",
      IMAGE_REQ,
    };
  },
  computed: {
    paginatedCategories() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.categoriesList.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.categoriesList.length / this.itemsPerPage);
    },
  },
  methods: {
    totalCount(category) {
      if (!category) {
        return 0;
      }

      if (category.children && category.children.length > 0) {
        if (!category) {
          return 0;
        }
        let count = 0;
        if (category.children && category.children.length > 0) {
          category.children.forEach((child) => {
            count = count + child._count.products;
          });
        }
        category.productCount = count;
        return count;
      }

      return 0;
    },
    deleteCategory() {
      this.categoriesList = this.categoriesList.filter(
        (product) => product.id !== this.categoryToDelete.id
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
    showAddCategory() {
      this.isShowAddCategoryVisible = true;
    },

    closeAddCategory() {
      this.isShowAddCategoryVisible = false;
    },
    showDeleteConfirmation(category) {
      console.log(category);
      if (category.productCount > 0) {
        this.showToast(
          "You cannot delete this category because it contains associated products",
          "error"
        );
      } else {
        this.categoryToDelete = category;
        this.isDeleteConfirmationModalVisible = true;
      }
    },

    hideDeleteConfirmation() {
      // Clear the product to delete and hide the modal
      this.isDeleteConfirmationModalVisible = false;
    },

    showEditCategory(category) {
      this.categoryToEdit = category;
      this.isEditModalVisible = true;
    },
    hideEditCategory() {
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
.admin-categories-page {
  margin: 20px auto;
  padding: 20px;
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
  padding: 10px 20px;
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

th,
td {
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
