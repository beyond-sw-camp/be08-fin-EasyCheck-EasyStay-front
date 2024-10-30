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
                <h5 class="mb-1">공지사항 수정</h5>
                <p class="mb-0 font-weight-bold text-sm">
                  리조트/호텔에 대한 공지사항을 수정
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
                        @click="updateNotice"
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
                <p class="mb-0">공지사항 수정</p>
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">제목</p>
              <div class="row mb-3">
                <div class="col-md-4">
                  <input
                    type="text"
                    v-model="title"
                    placeholder="공지사항 제목을 입력하세요"
                    style="border-radius: 5px; padding: 10px"
                  />
                </div>
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">내용</p>
              <div class="row mb-3">
                <div class="col-md-12">
                  <div v-if="title && content">
                    <!-- <p>{{ title }}</p>
                    <p>{{ content }}</p> -->
                  </div>
                  <textarea
                    class="form-control"
                    v-model="content"
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

const store = useStore();
const route = useRoute();
const router = useRouter();

// const notice = computed(() => store.state.notice);
const title = ref("");
const content = ref("");

const fetchNoticeById = async (id) => {
  console.log("찍혔나");
  try {
    // 데이터를 불러올 때까지 기다림
    await store.dispatch("notice/fetchNoticeById", id);

    // 데이터를 store에서 가져옴
    const fetchedNotice = store.state.notice.notice; // store에서 notice 데이터 가져오기

    // undefined 여부 확인
    if (fetchedNotice) {
      console.log(fetchedNotice.title); // title 로그 확인
      console.log(fetchedNotice.content); // content 로그 확인

      // title과 content 업데이트
      title.value = fetchedNotice.title;
      content.value = fetchedNotice.content;
    } else {
      console.error("데이터가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error("공지사항을 불러오는데 실패했습니다.", error);
  }
};

onMounted(() => {
  const noticeId = route.params.id;
  console.log("Notice ID in NoticeEdit:", noticeId); // 여기에 로그 추가
  if (!noticeId) {
    console.error("공지사항 ID가 없습니다.");
  } else {
    fetchNoticeById(noticeId); // ID가 있을 경우에만 API 호출
  }
});

// 수정하기 버튼 클릭 시 호출되는 메서드
const updateNotice = async () => {
  const noticeId = route.params.id; // 수정할 공지의 ID
  try {
    await store.dispatch("notice/updateNotice", {
      noticeId,
      title: title.value,
      content: content.value,
    });
    // 수정 성공 후 공지사항 목록 페이지로 이동
    router.push("/noticeslist");
  } catch (error) {
    alert("수정에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>
