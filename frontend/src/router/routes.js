export const routes = [
  {
    path: "",
    name: "/home",
    component: () => import("@/views/HomeView.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/login",
    name: "/login",
    component: () => import("@/views/LoginView.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/cart",
    name: "/cart",
    component: () => import("@/views/CartView.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/orders",
    name: "/orders",
    component: () => import("@/views/OrdersView.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/profile",
    name: "/profile",
    component: () => import("@/views/ProfileView.vue"),
    meta: { layout: "AppLayoutMain" },
  },
];
