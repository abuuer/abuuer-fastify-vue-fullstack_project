<template>
  <div class="admin-page">
    <div class="admin-buttons">
      <div>
        <span :class="{ selected: isProductPageSelected }" @click="showProducts"
          >Products</span
        >
        <span
          :class="{ selected: isCategoryPageSelected }"
          @click="showCategories"
          >Categories</span
        >
      </div>
    </div>

    <ManageProducts v-if="isProductPageSelected" />
    <ManageCategories v-if="isCategoryPageSelected" />
  </div>
</template>

<script>
import { ref } from "vue";
import ManageProducts from "../components/ManageProducts.vue";
import ManageCategories from "../components/ManageCategories.vue";
export default {
  name: "AdminPage",
  components: {
    ManageProducts,
    ManageCategories,
  },
  setup() {
    const isProductPageSelected = ref(true);
    const isCategoryPageSelected = ref(false);

    return { isProductPageSelected, isCategoryPageSelected };
  },
  methods: {
    showProducts() {
      this.isProductPageSelected = true;
      this.isCategoryPageSelected = false;
    },
    showCategories() {
      this.isProductPageSelected = false;
      this.isCategoryPageSelected = true;
    },
  },
};
</script>

<style scoped>
.admin-page {
  background-color: #ffffff;
  border-radius: 20px;
  max-width: 80%;
  margin: 20px auto;
  padding: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.admin-buttons {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.admin-buttons div {
  background-color: #f8f8f8;
  border: 1px solid rgb(212, 212, 212);
  padding: 12px 0px;
  transition: background-color 0.3s, border 0.3s;
}

span {
  text-decoration: none;
  color: rgb(0, 0, 0);
  font-size: 16px;
  padding: 10px 30px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.selected {
  background-color: #fefffe;
  border: 1px solid rgb(226, 226, 226);
}

span:hover {
  color: rgb(54, 87, 160);
}
</style>
