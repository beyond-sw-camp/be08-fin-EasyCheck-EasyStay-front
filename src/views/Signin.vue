<script setup>
import { onBeforeUnmount, onBeforeMount } from "vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import carouselImage from "@/assets/img/carousel-1.jpg";

const body = document.getElementsByTagName("body")[0];
const store = useStore();
const router = useRouter();

const email = ref(""); // 이메일 입력값
const password = ref(""); // 비밀번호 입력값

onBeforeMount(() => {
  store.commit("layout/setHideConfigButton", true);
  store.commit("layout/setShowNavbar", false);
  store.commit("layout/setShowSidenav", false);
  store.commit("layout/setShowFooter", false);
  body.classList.remove("bg-gray-100");
});

onBeforeUnmount(() => {
  store.commit("layout/setHideConfigButton", false);
  store.commit("layout/setShowNavbar", true);
  store.commit("layout/setShowSidenav", true);
  store.commit("layout/setShowFooter", true);
  body.classList.add("bg-gray-100");
});

// 로그인 함수 정의
const handleLogin = async () => {
  try {
    // auth.js의 actions에 정의된 login 함수를 호출한다.
    await store.dispatch("auth/login", {
      email: email.value,
      password: password.value,
    });

    // 로그인 성공 시 user 정보 가져오기
    // await store.dispatch("auth/fetchUserInfo");

    router.push("/dashboard-default");
  } catch (error) {
    console.error("로그인 실패:", error);
    // 여기에 에러 메시지를 표시하는 로직을 추가할 수 있습니다
    alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.");
  }
};
</script>

<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-3 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card-plain">
                <div class="pb-0 card-header text-start">
                  <img
                    src="@/assets/img/013.png"
                    alt="로고"
                    style="width: 80px; height: auto; margin-bottom: 10px"
                  />
                  <h4 class="font-weight-bolder" style="font-size: 35px">
                    로그인
                  </h4>
                  <p class="mb-0" style="font-size: 20px">
                    Easy Stay 관리자 로그인
                  </p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="handleLogin">
                    <div class="mb-4">
                      <ArgonInput
                        v-model="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        size="lg"
                        style="font-size: 28px; padding: 10px"
                      />
                    </div>
                    <div class="mb-4">
                      <ArgonInput
                        v-model="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        size="lg"
                        style="font-size: 28px; padding: 10px"
                      />
                    </div>

                    <div class="text-center">
                      <ArgonButton
                        class="mt-4"
                        variant="gradient"
                        style="
                          background: linear-gradient(
                            to right,
                            #ff7e5f,
                            #feb47b
                          );
                          font-size: 24px;
                          padding: 16px;
                        "
                        fullWidth
                        size="lg"
                      >
                        로그인
                      </ArgonButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                :style="{
                  backgroundImage: `url(${carouselImage})`,
                  backgroundSize: 'cover',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
