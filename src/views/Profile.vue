<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ProfileCard from "./components/ProfileCard.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const body = document.getElementsByTagName("body")[0];

const store = useStore();
const router = useRouter();
const photoList = ref([]);

const introduce = ref(""); // 이벤트 소개
const day = ref(""); // 진행 기간
const days = ref(""); // 종료 기간
const name = ref(""); // 이벤트 이름
const events = ref([]);

function updatePhotoList(newPhoto) {
  if (newPhoto) {
    photoList.value.push(newPhoto); // 새 사진 추가
  }
}

onMounted(async () => {
  // 이벤트 목록 가져오기
  await store.dispatch("event/getAllEvent"); // Vuex 액션 호출
  events.value = store.getters.events; // 이벤트 목록을 로컬 상태에 저장
  setNavPills();
  setTooltip();
});
onBeforeMount(() => {
  store.state.imageLayout = "profile-overview";
  store.state.showNavbar = false;
  store.state.showFooter = true;
  store.state.hideConfigButton = true;
  body.classList.add("profile-overview");
});
onBeforeUnmount(() => {
  store.state.isAbsolute = false;
  store.state.imageLayout = "default";
  store.state.showNavbar = true;
  store.state.showFooter = true;
  store.state.hideConfigButton = false;
  body.classList.remove("profile-overview");
});
// 이벤트 등록 함수 정의
const handlecreateEvent = async () => {
  try {
    const eventData = {
      accommodationEntity: 1,
      eventName: name.value, // 사용자로부터 입력받은 이벤트 이름
      detail: introduce.value, // 이벤트 상세 내용
      startDate: day.value, // 시작 날짜
      endDate: days.value, // 종료 날짜
    };

    // 이미지 파일을 추가
    const imageFiles = photoList.value; // 업로드할 이미지 파일 목록
    console.log("요청 본문 :", "event/createEvent", { eventData, imageFiles });

    // if (!imageFiles || imageFiles.length === 0) {
    //   console.log("파일 선택이 취소되었습니다.");
    //   return;
    // }
    // Vuex 액션 호출
    await store.dispatch("event/createEvent", { eventData, imageFiles });

    // 이벤트 리스트로 이동
    router.push("/eventlist");
  } catch (error) {
    console.error("등록 실패:", error);
    alert("등록에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>
<template>
  <main>
    <div class="container-fluid">
      <div
        class="page-header min-height-300"
        style="
          background: linear-gradient(310deg, #5e72e4, #825ee4);
          margin-right: -24px;
          margin-left: -34%;
        "
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>
      <div class="card shadow-lg mt-n6">
        <div class="card-body p-3">
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  src="../assets/img/002.png"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">이벤트 등록</h5>
                <p class="mb-0 font-weight-bold text-sm">
                  리조트/호텔에 대한 이벤트를 등록
                </p>
              </div>
            </div>
            <div
              class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0"
            >
              <div class="nav-wrapper position-relative end-0">
                <ul
                  class="p-1 bg-transparent nav nav-pills nav-fill"
                  role="tablist"
                >
                  <li class="nav-item">
                    <a
                      class="px-0 py-1 mb-0 nav-link"
                      data-bs-toggle="tab"
                      href="javascript:;"
                      role="tab"
                      aria-selected="false"
                    >
                      <argon-button
                        color="success"
                        size=""
                        class="ms-auto"
                        style="
                          padding: 15px 100px;
                          font-size: 20px;
                          margin-right: 5px;
                        "
                        @click="handlecreateEvent"
                        >등록하기</argon-button
                      >
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">이벤트 등록</p>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <argon-input
                    v-model="name"
                    type="text"
                    placeholder="이벤트 이름"
                  />
                </div>
                <div class="col-md-6">
                  <argon-input
                    v-model="day"
                    type="text"
                    placeholder="진행 기간"
                  />
                </div>
                <div class="col-md-6">
                  <argon-input
                    v-model="days"
                    type="text"
                    placeholder="진행 기간"
                  />
                </div>
                <div class="col-md-6">
                  <argon-input
                    v-model="introduce"
                    type="text"
                    placeholder="이벤트 소개"
                  />
                </div>
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >소개</label
                  >
                  <argon-input type="text" value="introduce" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >이벤트 상세 제목</label
                  >
                  <argon-input type="text" value="Content" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >기간</label
                  >
                  <argon-input type="text" value="month" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >시간</label
                  >
                  <argon-input type="text" value="time" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >장소</label
                  >
                  <argon-input type="text" value="place" />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >예약 문의</label
                  >
                  <argon-input type="text" value="reservation" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >주의사항</label
                  >
                  <argon-input type="text" value="warning" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <profile-card
            :photoList="photoList"
            :onPhotoChange="updatePhotoList"
          />
        </div>
      </div>
    </div>
  </main>
</template>
