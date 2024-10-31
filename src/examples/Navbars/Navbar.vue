<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const isRTL = computed(() => store.state.isRTL);
const router = useRouter();

// 로그아웃 함수 정의
const handleLogout = () => {
  // 여기에 로그아웃 처리 로직 추가
  // ...

  // 로그아웃 후 다른 페이지로 이동 (예: 로그인 페이지)
  router.push("/signin");
};
</script>

<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    :class="isRTL ? 'top-0 position-sticky z-index-sticky' : ''"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
          <div class="card">
            <p class="card-title">설악 리조트</p>
          </div>
        </div>

        <!-- 로그아웃 링크 -->
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <a
              href="#"
              class="px-0 nav-link font-weight-bold text-white"
              @click.prevent="handleLogout"
            >
              <i
                class="fa fa-sign-out-alt"
                :class="isRTL ? 'ms-sm-2' : 'me-sm-3'"
              ></i>
              <span v-if="isRTL" class="d-sm-inline d-none">تسجيل الخروج</span>
              <span v-else class="d-sm-inline d-none">로그아웃</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.card {
  width: 200px; /* 카드 너비 */
  padding: 20px;
  margin: 15px auto;
  background-color: #ffffff;
  border-radius: 10px; /* 모서리를 둥글게 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 */
  text-align: center;
  transition: transform 0.3s ease; /* 애니메이션 효과 */
}

.card:hover {
  transform: translateY(-5px); /* 호버 시 카드가 올라가는 효과 */
}

.card-title {
  font-size: 1.2em;
  font-weight: bold;
  color: #333333; /* 텍스트 색상 */
  margin: 0;
}
</style>
