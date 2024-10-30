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
                  src="@/assets/img/002.png"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">이벤트 수정</h5>
                <p class="mb-0 font-weight-bold text-sm">
                  리조트/호텔에 대한 이벤트를 수정
                </p>
              </div>
            </div>
            <div
              class="mx-auto mt-3 col-lg-4 col-md-10 my-sm-auto ms-sm-auto me-sm-0"
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
                        @click="updateEvent"
                      >
                        수정하기
                      </argon-button>
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
        <div class="col-md-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">이벤트 수정</p>
              </div>
            </div>
            <div class="card-body">
              <!-- 이벤트 이름 -->
              <p class="text-uppercase text-sm">이름</p>
              <div class="row mb-3">
                <div class="col-md-4">
                  <input
                    type="text"
                    v-model="eventName"
                    placeholder="이벤트 이름을 입력하세요"
                    style="border-radius: 5px; padding: 10px"
                  />
                </div>
              </div>

              <!-- 이벤트 시작일 -->
              <p class="text-uppercase text-sm">시작일</p>
              <div class="row mb-3">
                <div class="col-md-4">
                  <input
                    type="date"
                    v-model="startDate"
                    style="border-radius: 5px; padding: 10px"
                  />
                </div>
              </div>

              <!-- 이벤트 종료일 -->
              <p class="text-uppercase text-sm">종료일</p>
              <div class="row mb-3">
                <div class="col-md-4">
                  <input
                    type="date"
                    v-model="endDate"
                    style="border-radius: 5px; padding: 10px"
                  />
                </div>
              </div>

              <hr class="horizontal dark" />
              <!-- 이벤트 내용 -->
              <p class="text-uppercase text-sm">내용</p>
              <div class="row mb-3">
                <div class="col-md-12">
                  <textarea
                    class="form-control"
                    v-model="detail"
                    style="
                      resize: none;
                      height: 300px;
                      padding: 10px;
                      border-radius: 5px;
                    "
                    placeholder="공지사항 내용을 입력하세요"
                  ></textarea>
                </div>
              </div>
              <!-- 기존 이미지 미리보기 및 새 이미지 업로드 -->
              <p class="text-uppercase text-sm">이미지</p>
              <div class="row mb-3">
                <div class="col-md-12">
                  <profile-card
                    :photoList="images"
                    :cardId="eventId"
                    :onPhotoChange="handlePhotoChange"
                  />
                </div>
              </div>
              <div class="row"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import ProfileCard from "@/views/components/ProfileCard.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

// const notice = computed(() => store.state.notice);
const eventName = ref("");
const detail = ref("");
const startDate = ref("");
const endDate = ref("");
const images = ref([]);

const fetchEventById = async (id) => {
  console.log("찍혔나");
  try {
    // 데이터를 불러올 때까지 기다림
    await store.dispatch("event/fetchEventById", id);

    // 데이터를 store에서 가져옴
    const fetchedEvent = store.state.event.Event; // store에서 이벤트 데이터 가져오기

    // undefined 여부 확인
    if (fetchedEvent) {
      console.log(fetchedEvent.eventName); // title 로그 확인
      console.log(fetchedEvent.detail); // content 로그 확인

      eventName.value = fetchedEvent.eventName;
      detail.value = fetchedEvent.detail;
      startDate.value = fetchedEvent.startDate;
      endDate.value = fetchedEvent.endDate;
      images.value = fetchedEvent.images || []; // 기존 이미지
    } else {
      console.error("데이터가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error("공지사항을 불러오는데 실패했습니다.", error);
  }
};

const handlePhotoChange = (newPhoto, index) => {
  if (index !== undefined) {
    // 이미지 삭제
    images.value.splice(index, 1);
  } else {
    // 이미지 추가
    images.value.push(newPhoto.url);
  }
};

// 페이지 로드 시 이벤트 데이터를 불러옴
onMounted(() => {
  const eventId = route.params.id;
  if (eventId) {
    fetchEventById(eventId);
  } else {
    console.error("이벤트 ID가 없습니다.");
  }
});

// 수정하기 버튼 클릭 시 호출되는 메서드
const updateEvent = async () => {
  const eventId = route.params.id; // 수정할 공지의 ID
  try {
    await store.dispatch("event/updateEvent", {
      eventId,
      eventName: eventName.value,
      detail: detail.value,
      startDate: startDate.value,
      endDate: endDate.value,
      images: images.value, // 이미지도 함께 전송
    });
    // 수정 성공 후 공지사항 목록 페이지로 이동
    router.push("/eventlist");
  } catch (error) {
    alert("수정에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>
