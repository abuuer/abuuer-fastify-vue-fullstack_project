<template>
  <div class="admin-categories-page">
    <div class="title-buttons">
      <h1>Manage Categories</h1>
      <div class="add-buttons">
        <button @click="showAddCategory">Add New Category</button>
      </div>
    </div>

    <!-- Product Table -->
    <div class="category-table-container">
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
        <tbody v-if="paginatedCategories?.length">
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
              <button
                @click="showEditCategory(category)"
                class="edit-button"
                aria-label="Edit"
              >
                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
              </button>
            </td>
          </tr>
        </tbody>
        <div v-else>No categories to show</div>
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
      @updateCategories="updateCategories"
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
    <EditCategoryModal
      v-if="isEditCategoryVisible"
      :categoryToEdit="categoryToEdit"
      @close="hideEditCategory"
      @showDeleteConfirmation="showDeleteConfirmation"
      @showToast="showToast"
      @updateCategory="updateCategory"
    />
  </div>
</template>

<script>
import { inject, ref } from "vue";
import { IMAGE_REQ } from "../utils/constant";
import CategoryAndProductsDeletionModal from "./CategoryAndProductsDeletionModal.vue";
import AddCategoryModal from "./AddCategoryModal.vue";
import ToastNotification from "./ToastNotification.vue";
import EditCategoryModal from "./EditCategoryModal.vue";

export default {
  name: "ManageCategories",
  components: {
    CategoryAndProductsDeletionModal,
    AddCategoryModal,
    ToastNotification,
    EditCategoryModal,
  },
  setup() {
    const categoriesList = ref(inject("categories"));

    const isShowAddCategoryVisible = ref(false);
    const isDeleteConfirmationModalVisible = ref(false);
    const showToastNotification = ref(false);
    const isEditCategoryVisible = ref(false);

    return {
      categoriesList,
      isShowAddCategoryVisible,
      isDeleteConfirmationModalVisible,
      showToastNotification,
      isEditCategoryVisible,
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
      return Math.ceil(this.categoriesList?.length / this.itemsPerPage);
    },
  },
  methods: {
    totalCount(category) {
      if (!category) {
        return 0;
      }

      if (category.children && category.children?.length > 0) {
        if (!category) {
          return 0;
        }
        let count = 0;
        if (category.children && category.children?.length > 0) {
          category.children.forEach((child) => {
            if (child._count) count = count + child._count.products;
          });
        }
        category.productCount = count;
        return count;
      }

      return 0;
    },
    deleteCategory(categoryToDelete) {
      if (categoryToDelete.parent_id !== null) {
        // Find the parent category
        const parentCategory = this.categoriesList.find(
          (category) => category.id === categoryToDelete.parent_id
        );

        if (parentCategory && parentCategory.children) {
          // Remove the categoryToDelete from the parent's children array
          parentCategory.children = parentCategory.children.filter(
            (category) => category.id !== categoryToDelete.id
          );
        }
      } else {
        // If parent_id is null, remove the categoryToDelete from the main categories array
        this.categoriesList = this.categoriesList.filter(
          (category) => category.id !== categoryToDelete.id
        );
      }
    },
    updateCategories(newCategory) {
      if (newCategory.parent_id !== null) {
        // Find the parent category
        const parentCategory = this.categoriesList.find(
          (category) => category.id === newCategory.parent_id
        );

        if (parentCategory) {
          // Check if the parent has children, if not, initialize it
          if (!parentCategory.children) {
            parentCategory.children = [];
          }

          parentCategory.children.push(newCategory);
        }
      } else {
        // If parent_id is null, push it to the main categories array
        this.categoriesList.push(newCategory);
      }
    },
    updateCategory(newCategory, oldCategory) {
      // Find the index of the old product
      const oldCategoryIndex = this.categoriesList.findIndex(
        (category) => category.id === oldCategory.id
      );

      // If the old category exists, remove it
      if (oldCategoryIndex !== -1) {
        this.categoriesList.splice(oldCategoryIndex, 1, newCategory);
      }
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
    showAddCategory() {
      this.isShowAddCategoryVisible = true;
    },

    closeAddCategory() {
      this.isShowAddCategoryVisible = false;
    },
    showDeleteConfirmation(category) {
      console.log(category);
      if (category.products?.length || category.children?.products?.length) {
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
      this.isEditCategoryVisible = true;
    },
    hideEditCategory() {
      this.isEditCategoryVisible = false;
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
.category-table-container {
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
