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
          <th>Subcategory / Category</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.category.name }}</td>
          <td>
            <button @click="deleteProduct(product.id)" class="delete-button">
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
    />
  </div>
</template>

<script>
import AddProduct from "../components/AddProduct.vue";
export default {
  components: {
    AddProduct,
  },
  data() {
    return {
      products: [
        {
          id: 2,
          name: "Asus laptop A25",
          category_id: 13,
          created_at: "2023-11-20T17:04:39.512Z",
          updated_at: "2023-11-20T17:50:13.659Z",
          picture: "new url",
          category: {
            id: 13,
            name: "Asus",
            created_at: "2023-11-20T17:00:41.557Z",
            updated_at: "2023-11-20T17:00:41.557Z",
            picture: "tthis is a pic url",
            parent_id: 10,
          },
        },
        {
          id: 3,
          name: "Asus X34W",
          category_id: 13,
          created_at: "2023-11-20T17:04:51.477Z",
          updated_at: "2023-11-20T17:04:51.477Z",
          picture: "tthis is a pic url",
          category: {
            id: 13,
            name: "Asus",
            created_at: "2023-11-20T17:00:41.557Z",
            updated_at: "2023-11-20T17:00:41.557Z",
            picture: "tthis is a pic url",
            parent_id: 10,
          },
        },
        {
          id: 7,
          name: "Asus VL39402",
          category_id: 13,
          created_at: "2023-11-21T00:04:55.965Z",
          updated_at: "2023-11-21T00:04:55.965Z",
          picture:
            "C:\\Users\\ismai\\Desktop\\anouar\\fastify-vue-fullstack-project\\server\\uploads\\1700525095962.png",
          category: {
            id: 13,
            name: "Asus",
            created_at: "2023-11-20T17:00:41.557Z",
            updated_at: "2023-11-20T17:00:41.557Z",
            picture: "tthis is a pic url",
            parent_id: 10,
          },
        },
      ],
      allSubcategories: [
        // A combined list of all subcategories
      ],
      showAddProductFormFlag: false,
      newProductName: "",
      selectedSubcategory: null,
    };
  },
  methods: {
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
    // addProduct() {
    //   if (
    //     this.newProductName.trim() !== "" &&
    //     this.selectedSubcategory !== null
    //   ) {
    //     const selectedSubcategory = this.allSubcategories.find(
    //       (subcategory) => subcategory.id === this.selectedSubcategory
    //     );
    //     const newProduct = {
    //       id: this.products.length + 1,
    //       name: this.newProductName.trim(),
    //     };
    //     selectedSubcategory.products.push(newProduct);
    //     this.products.push(newProduct);

    //     // Reset form
    //     this.newProductName = "";
    //     this.selectedSubcategory = null;
    //     this.showAddProductFormFlag = false;
    //   }
    // },

    closeAddProductForm() {
      this.showAddProductFormFlag = false;
    },
    deleteProduct(productId) {
      const productIndex = this.products.findIndex(
        (product) => product.id === productId
      );
      if (productIndex !== -1) {
        this.products.splice(productIndex, 1);
        // Update your data structure accordingly to remove the product
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
