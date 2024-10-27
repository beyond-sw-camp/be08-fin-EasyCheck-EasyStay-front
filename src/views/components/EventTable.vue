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
                이름
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                장소
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                상세
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                기간
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, index) in events" :key="event.id">
              <td class="photo-cell">
                <img
                  :src="event.images[0]"
                  class="avatar avatar-sm"
                  :alt="event.eventName"
                  v-if="event.images.length > 0"
                />
              </td>
              <td class="number-cell">
                <span class="text-sm font-weight-bold">{{ index + 1 }}</span>
              </td>
              <td class="title-cell">
                <h6 class="mb-0 text-m">{{ event.eventName }}</h6>
              </td>
              <td class="text-center">
                <p class="text-m text-secondary mb-0">
                  {{ event.accommodationName }}
                </p>
              </td>
              <td class="text-center">
                <span class="text-sm font-weight-bold">{{ event.detail }}</span>
              </td>
              <td class="text-center">
                <span class="text-sm font-weight-bold">{{
                  event.openingDate
                }}</span>
              </td>
              <td class="text-center" colspan="2">
                <div class="button-group">
                  <button class="btn btn-sm btn-primary">수정</button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="handleDelete(event.id)"
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
export default {
  props: {
    title: {
      type: String,
      default: "이벤트 목록",
    },
    events: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    async handleDelete(eventId) {
      if (confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
        try {
          await this.$store.dispatch("event/deleteEvent", eventId);
          alert("이벤트가 삭제되었습니다.");
        } catch (error) {
          alert("삭제에 실패했습니다. 다시 시도해주세요.");
        }
      }
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
</style>
