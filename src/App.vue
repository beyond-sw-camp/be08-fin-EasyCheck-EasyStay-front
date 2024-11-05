<!--
=========================================================
* Vue Argon Dashboard 2 - v4.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-argon-dashboard
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-->
<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import Sidenav from "./examples/Sidenav";
import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";

const store = useStore();

// 모든 상태를 layout 모듈에서 가져옵니다
const isNavFixed = computed(() => store.state.layout.isNavFixed);
const darkMode = computed(() => store.state.layout.darkMode);
const isAbsolute = computed(() => store.state.layout.isAbsolute);
const showSidenav = computed(() => store.state.layout.showSidenav);
const layout = computed(() => store.state.layout.layout);
const showNavbar = computed(() => store.state.layout.showNavbar);
const showFooter = computed(() => store.state.layout.showFooter);
const showConfig = computed(() => store.state.layout.showConfig);
const hideConfigButton = computed(() => store.state.layout.hideConfigButton);

// 뮤테이션 호출 시 'layout/' 네임스페이스를 추가합니다
const toggleConfigurator = () => store.commit("layout/toggleConfigurator");

const navClasses = computed(() => {
  return {
    "position-sticky bg-white left-auto top-2 z-index-sticky":
      isNavFixed.value && !darkMode.value,
    "position-sticky bg-default left-auto top-2 z-index-sticky":
      isNavFixed.value && darkMode.value,
    "position-absolute px-4 mx-0 w-100 z-index-2": isAbsolute.value,
    "px-0 mx-4": !isAbsolute.value,
  };
});

onMounted(() => {
  store.commit("auth/initAuthState");
});
</script>

<template>
  <div
    v-show="layout === 'landing'"
    class="landing-bg bg-dark h-100 bg-gradient-primary position-fixed w-100"
  ></div>

  <sidenav v-if="showSidenav" />

  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <navbar :class="[navClasses]" v-if="showNavbar" />

    <router-view />

    <app-footer v-show="showFooter" />

    <configurator
      :toggle="toggleConfigurator"
      :class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']"
    />
  </main>
</template>
