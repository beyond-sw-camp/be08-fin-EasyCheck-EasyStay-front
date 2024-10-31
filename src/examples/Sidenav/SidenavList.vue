<script setup>
// import { computed } from "vue";
import { useRoute } from "vue-router";
// import { useStore } from "vuex";

import SidenavItem from "./SidenavItem.vue";
// import SidenavCard from "./SidenavCard.vue";

// const store = useStore();
// const isRTL = computed(() => store.state.isRTL);

const getRoute = () => {
  const route = useRoute();
  const routeArr = route.path.split("/");
  return routeArr[1];
};
</script>
<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          to="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="'메인페이지'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="mt-3 nav-item">
        <h6
          class="text-m ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="'ms-2'"
        >
          매출
        </h6>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/moneygraph"
          :class="getRoute() === 'moneygraph' ? 'active' : ''"
          :navText="'매출 현황 페이지'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-tv-2 text-primary text-sm opacity-10"
            ></i> </template
          >x
        </sidenav-item>
      </li>

      <li class="mt-3 nav-item">
        <h6
          class="text-m ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="'ms-2'"
        >
          결제
        </h6>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/tables"
          :class="getRoute() === 'tables' ? 'active' : ''"
          :navText="'결제 고객 리스트'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>

      <li class="mt-3 nav-item">
        <h6
          class="text-m ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="'ms-2'"
        >
          등록
        </h6>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/noticeregistration"
          :class="getRoute() === 'noticeregistration' ? 'active' : ''"
          :navText="'공지사항'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/profile"
          :class="getRoute() === 'profile' ? 'active' : ''"
          :navText="'이벤트'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="mt-3 nav-item">
        <h6
          class="text-m ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="'ms-2'"
        >
          목록
        </h6>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/noticeslist"
          :class="getRoute() === 'noticeslist' ? 'active' : ''"
          :navText="'공지사항'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/themeparkslist"
          :class="getRoute() === 'themeparkslist' ? 'active' : ''"
          :navText="'테마파크'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/eventlist"
          :class="getRoute() === 'eventlist' ? 'active' : ''"
          :navText="'이벤트'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/suggestionlist"
          :class="getRoute() === 'suggestionlist' ? 'active' : ''"
          :navText="'건의사항'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
      <!-- <li class="nav-item">
        <sidenav-item
          to="/amenitieslist"
          :class="getRoute() === 'amenitieslist' ? 'active' : ''"
          :navText="'편의시설'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li> -->
      <!-- <li class="nav-item">
        <sidenav-item
          to="/signin"
          :class="getRoute() === 'signin' ? 'active' : ''"
          :navText="'로그인'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/signup"
          :class="getRoute() === 'signup' ? 'active' : ''"
          :navText="'회원가입'"
        >
          <template v-slot:icon>
            <i class="ni ni-collection text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li> -->
    </ul>
  </div>

  <!-- <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :card="{
        title: '도움이 필요하십니까?',
        description: '뭘 도와드릴깝쇼',
        links: [
          {
            label: 'Documentation',
            route:
              'https://www.creative-tim.com/learning-lab/vue/overview/argon-dashboard/',
            color: 'dark',
          },
          {
            label: 'Buy now',
            route:
              'https://www.creative-tim.com/product/vue-argon-dashboard-pro?ref=vadp',
            color: 'success',
          },
        ],
      }"
    />
  </div> -->
</template>
