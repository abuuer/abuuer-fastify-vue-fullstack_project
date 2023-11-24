import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ProdutPage from "../views/ProductPage.vue";
import AdminPage from "../views/AdminPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "product",
    component: ProdutPage,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminPage,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
