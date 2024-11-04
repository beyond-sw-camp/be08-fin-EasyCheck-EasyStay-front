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
import EventEdit from "../views/components/EventEdit.vue";
import SuperAdminDashboard from "../views/components/SuperAdminDashboard.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  // 이제 로그인 후에 유저 정보도 불러옴
  // 유저 역할 localstorage에 저장
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      // localStorage에서 사용자 역할을 가져옴
      const userRole = localStorage.getItem("userRole");

      // 만약 유저 역할이 SUPER_ADMIN이면 SuperAdminDashboard로 라우팅 처리
      if (userRole === "SUPER_ADMIN") {
        next({ name: "SuperAdminDashboard" });
      } else {
        next();
      }
    },
  },
  {
    path: "/super-admin-dashboard",
    name: "SuperAdminDashboard",
    component: SuperAdminDashboard,
    // beforeEnter: (to, from, next) => {
    //   const userRole = localStorage.getItem("userRole");

    //   if (userRole !== "SUPER_ADMIN") {
    //     next({ name: "Dashboard" });
    //   } else {
    //     next();
    //   }
    // },
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
    path: "/noticeslist/:id",
    name: "NoticeEdit",
    component: NoticeEdit, // 수정할 공지사항 페이지 컴포넌트
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
    path: "/eventlist/:id",
    name: "EventEdit",
    component: EventEdit,
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
