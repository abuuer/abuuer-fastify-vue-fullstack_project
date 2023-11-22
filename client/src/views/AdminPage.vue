<template>
  <div class="admin-products-page">
    <h2>Manage Products</h2>

    <!-- Add Product Button -->
    <button @click="showAddProductForm">Add New Product</button>

    <!-- Product Table -->
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Subcategory</th>
          <th>Category</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in productList" :key="product.id">
          <td>{{ product.name || "NaN" }}</td>
          <td>{{ product.category.name || "NaN" }}</td>
          <td>{{ product.category.parent?.name || "NaN" }}</td>
          <td>
            <button
              @click="deleteProduct(product.id, product.name)"
              class="delete-button"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <AddProduct
      v-if="showAddProductFormFlag"
      :show="showAddProductFormFlag"
      @close="closeAddProductForm"
      @addProduct="addProduct"
    />

    <DeleteProductModal
      v-if="isDeleteConfirmationVisible"
      :productToDeleteName="productToDeleteName"
      @close="hideDeleteConfirmation"
    />
  </div>
</template>

<script>
import AddProduct from "../components/AddProduct.vue";
import DeleteProductModal from "../components/DeleteProductModal.vue";
import { onMounted, ref } from "vue";
import axios from "../api/axios";

const PRODUCTS_URL = "api/products";
export default {
  components: {
    AddProduct,
    DeleteProductModal,
  },
  setup() {
    const productList = ref([]);
    const isDeleteConfirmationVisible = ref(false);
    const showAddProductFormFlag = ref(false);
    onMounted(async () => {
      try {
        const response = await axios.get(PRODUCTS_URL);
        productList.value = response.data.products;
      } catch (error) {
        console.error(error);
      }
    });

    return { productList, isDeleteConfirmationVisible, showAddProductFormFlag };
  },

  data() {
    return {
      productToDeleteName: "",
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
    showAddProductForm() {
      this.showAddProductFormFlag = true;
    },

    closeAddProductForm() {
      this.showAddProductFormFlag = false;
    },

    showDeleteConfirmation(product) {
      // Store the product to delete and show the modal
      // productToDelete.value = product;
      this.isDeleteConfirmationVisible = true;
    },

    hideDeleteConfirmation() {
      // Clear the product to delete and hide the modal
      // productToDelete.value = null;
      this.isDeleteConfirmationVisible = false;
    },

    async deleteProduct(productId, productName) {
      this.productToDeleteName = productName;
      this.showDeleteConfirmation();
      try {
        // const response = await axios.delete(`${PRODUCTS_URL}/${productId}`);
        // console.log(response);
        // this.productList = this.productList.filter(
        //   (product) => product.id !== productId
        // );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.admin-products-page {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  margin: 10px 0;
  padding: 8px;
  background-color: #4a55a2;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

.delete-button {
  background-color: #dd3737b2;
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

th {
  background-color: #4a55a2;
  color: white;
}
</style>
