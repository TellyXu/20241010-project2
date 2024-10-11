import HomePage from "../components/HomePage.vue";
import ChildPage1 from "../components/InitPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/init",
  },

  {
    path: "/home",
    name: "home",
    component: HomePage,
  },
  {
    path: "/init",
    name: "init",
    component: ChildPage1,
  },
];

export default routes;
