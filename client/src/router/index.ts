import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ProdutPage from "../views/ProductPage.vue";
import AdminPage from "../views/AdminPage.vue";
import HomePage from "../views/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/product",
    name: "product",
    component: ProdutPage,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
