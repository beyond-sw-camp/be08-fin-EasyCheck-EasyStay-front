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
                class="ztext-secondary text-xxs font-weight-bolder opacity-7 ps-6"
              >
                제목
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(author, index) in authors" :key="author.id">
              <!-- 사진 -->
              <td class="photo-cell">
                <img
                  :src="author.image"
                  class="avatar avatar-sm"
                  :alt="author.name"
                />
              </td>

              <!-- 번호 -->
              <td class="number-cell">
                <span class="text-sm font-weight-bold">{{ index + 1 }}</span>
              </td>

              <!-- 제목 및 부가 설명 -->
              <td class="title-cell">
                <h6 class="mb-0 text-m">{{ author.title }}</h6>
              </td>

              <!-- 작성자 -->
              <td class="text-center">
                <p class="text-m text-secondary mb-0">
                  {{ author.department }}
                </p>
              </td>

              <!-- 작성일 -->
              <td class="text-center">
                <span class="text-sm font-weight-bold">{{
                  author.employed
                }}</span>
              </td>

              <!-- 버튼 -->
              <td class="text-center" colspan="2">
                <div class="button-group">
                  <button
                    class="btn btn-sm btn-primary"
                    @click="handleUpdate(author.id)"
                  >
                    수정
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="handleDelete(author.id)"
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "공지사항 목록",
    },
    authors: {
      type: Array,
      required: true,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    async handleDelete(noticeId) {
      if (confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
        try {
          await this.$store.dispatch("notice/deleteNotice", noticeId);
          alert("공지사항이 삭제되었습니다.");
        } catch (error) {
          alert("삭제에 실패했습니다. 다시 시도해주세요.");
        }
      }
    },
    async handleUpdate(id) {
      console.log("Notice ID:", id);
      if (confirm("정말로 이 공지사항을 수정하시겠습니까?")) {
        try {
          console.log("Navigating to NoticeEdit with ID:", id);
          this.$router.push({ name: "NoticeEdit", params: { id: id } });
        } catch (error) {
          alert("수정에 실패했습니다. 다시 시도해주세요.");
        }
      }
    },
  },
});
</script>

<style scoped>
.table-container {
  max-height: 700px;
  overflow-y: auto;
}

/* 스크롤바 숨기기 */
.table-container::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.table-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* 아바타 이미지 스타일 */
.avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
}

/* 사진 셀 */
.photo-cell {
  padding: 0 8px;
  text-align: center;
  width: 50px;
}

/* 번호 셀 */
.number-cell {
  text-align: center;
  width: 40px;
}

/* 제목 셀 */
.title-cell {
  padding-left: 64px;
  text-align: left; /* 중앙 정렬 추가 */
}

/* 버튼 그룹 정렬 */
.button-group {
  display: flex;
  gap: 8px;
  justify-content: center;
}

/* 버튼 스타일 */
button {
  padding: 8px 15px;
  font-size: 0.9rem;
}
</style>
