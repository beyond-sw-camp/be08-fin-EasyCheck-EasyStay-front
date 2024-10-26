<template>
  <main>
    <div class="container-fluid">
      <!-- Same layout as the notice registration page -->
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
                <!-- 제목 변경 -->
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
                        @click="handleUpdateNotice"
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
                <!-- 제목 변경 -->
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">제목</p>
              <div class="row mb-3">
                <div class="col-md-4">
                  <argon-input
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

<script>
export default {
  data() {
    return {
      title: "", // 기존 공지 제목
      content: "", // 기존 공지 내용
    };
  },
  mounted() {
    // 수정할 공지사항 데이터를 불러오는 API 호출
    this.fetchNoticeDetail();
  },
  methods: {
    fetchNoticeDetail() {
      // 예시 API 호출로 공지 데이터를 가져와서 title과 content를 설정
      const noticeId = this.$route.params.id; // 수정할 공지의 ID
      this.$axios.get(`/api/v1/notices-reply/${noticeId}`).then((response) => {
        const notice = response.data;
        this.title = notice.title;
        this.content = notice.content;
      });
    },
    handleUpdateNotice() {
      // 수정된 공지사항 데이터를 저장하는 API 호출
      const noticeId = this.$route.params.id;
      this.$axios
        .put(`/api/v1/notices-reply/${noticeId}`, {
          title: this.title,
          content: this.content,
        })
        .then(() => {
          // 성공 시 페이지 이동이나 알림 처리
          this.$router.push("/noticeslist");
        });
    },
  },
};
</script>
