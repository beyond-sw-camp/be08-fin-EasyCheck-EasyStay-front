<template>
  <div
    class="card mb-4"
    style="width: 100%; max-width: 1900px; margin: 50px auto; padding: 0 15px"
  >
    <div class="card-header pb-0">
      <h6 class="fs-3">{{ title }}</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2 table-container">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              ></th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                번호
              </th>
              <th
                class="text-secondary text-xxs font-weight-bolder opacity-7 ps-6"
              >
                제목
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                이메일
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                타입
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(park, index) in parks" :key="park.id">
              <td class="photo-cell">
                <img
                  :src="park.image"
                  class="avatar avatar-sm"
                  :alt="park.name"
                />
              </td>
              <td class="number-cell">
                <span class="text-sm font-weight-bold">{{ index + 1 }}</span>
              </td>
              <td class="title-cell">
                <h6 class="mb-0 text-m">{{ park.title }}</h6>
              </td>

              <!-- 건의사항 내용 -->
              <td
                class="text-center content-cell"
                @click="showContentDetail(park.content)"
              >
                <p class="text-m text-secondary mb-0">{{ park.content }}</p>
              </td>

              <td class="text-center">
                <p class="text-m text-secondary mb-0">{{ park.email }}</p>
              </td>
              <td class="text-center">
                <span class="text-sm font-weight-bold">{{ park.type }}</span>
              </td>
              <td class="text-center" colspan="2">
                <div class="button-group">
                  <button
                    class="btn btn-sm btn-warning-custom"
                    @click="onClickReplyButton(park)"
                  >
                    답변
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- 모달 창 -->
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h5>건의사항 내용</h5>
      <p>{{ selectedContent }}</p>
      <button class="btn btn-close" @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "건의사항 목록",
    },
    parks: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      isModalOpen: false,
      selectedContent: "",
    };
  },
  methods: {
    openResponseForm() {
      this.showResponseForm = true;
    },
    onClickReplyButton(park) {
      this.$emit("open-response-form", park);
      this.$store.commit("suggestion/setSuggestionId", park.id);
    },
    showContentDetail(content) {
      this.selectedContent = content;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedContent = "";
    },
  },
};
</script>

<style scoped>
.table-container {
  max-height: 700px;
  overflow-y: auto;
}
.table-container::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.table-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
}
.photo-cell {
  padding: 0 8px;
  padding-left: 20px;
  text-align: center;
  width: 50px;
}
.number-cell {
  text-align: center;
  width: 40px;
}
.title-cell {
  padding-left: 64px;
  text-align: left;
}
.button-group {
  display: flex;
  gap: 8px;
  justify-content: center;
}
button {
  padding: 8px 15px;
  font-size: 0.9rem;
}
.btn-warning-custom {
  background-color: #ffa500;
  color: #fff;
  border: none;
}
.btn-warning-custom:hover {
  background-color: #ff8c00;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.btn-close {
  background-color: #ff8c00;
  color: #fff;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  margin-top: 15px;
}

.btn-close:hover {
  background-color: #ffa500;
}

/* 내용 셀 스타일 */
.content-cell {
  cursor: pointer;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
