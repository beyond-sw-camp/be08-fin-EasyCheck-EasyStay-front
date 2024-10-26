import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import NoticesList from "../views/NoticesList.vue";
import ThemeParksList from "../views/ThemeParksList.vue";
import EventList from "../views/EventList.vue";
import SuggestionList from "../views/SuggestionList.vue";
import DiningList from "../views/DiningList.vue";
import AmenitiesList from "../views/AmenitiesList.vue";
import AdditionalServiceList from "../views/AdditionalServiceList.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import Profile from "../views/Profile.vue";
import NoticeRegistration from "../views/NoticeRegistration.vue";
import ThemeParksRegistration from "../views/ThemeParksRegistration.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import MoneyGraph from "../views/MoneyGraph.vue";
import NoticeEdit from "../views/components/NoticeEdit.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/moneygraph",
    name: "MoneyGraph",
    component: MoneyGraph,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/noticeslist",
    name: "NoticesList",
    component: NoticesList,
  },
  {
    path: "/themeparkslist",
    name: "ThemeParksList",
    component: ThemeParksList,
  },
  {
    path: "/eventlist",
    name: "EventList",
    component: EventList,
  },
  {
    path: "/suggestionlist",
    name: "SuggestionList",
    component: SuggestionList,
  },
  {
    path: "/dininglist",
    name: "DiningList",
    component: DiningList,
  },
  {
    path: "/amenitieslist",
    name: "AmenitiesList",
    component: AmenitiesList,
  },
  {
    path: "/additionalservicelist",
    name: "AdditionalServiceList",
    component: AdditionalServiceList,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/noticeedit",
    name: "NoticeEdit",
    component: NoticeEdit,
  },
  {
    path: "/noticeregistration",
    name: "NoticeRegistration",
    component: NoticeRegistration,
  },
  {
    path: "/themeparksregistration",
    name: "ThemeParksRegistration",
    component: ThemeParksRegistration,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
