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
                이름
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                소개
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(park, index) in parks" :key="park.id">
              <td class="photo-cell"></td>
              <td class="number-cell">
                <span class="text-sm font-weight-bold">{{ index + 1 }}</span>
              </td>
              <td class="title-cell">
                <h6 class="mb-0 text-m">{{ park.name }}</h6>
              </td>
              <td class="text-center">
                <p class="text-m text-secondary mb-0">{{ park.location }}</p>
              </td>
              <td class="text-center" colspan="2">
                <div class="button-group">
                  <button
                    class="btn btn-sm btn-warning"
                    @click="showFacilities(park.id)"
                  >
                    시설 더보기
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="selectedParkFacilities.length > 0">
          <h6 class="mt-4">시설 목록</h6>
          <div class="facility-cards">
            <div
              v-for="facility in selectedParkFacilities"
              :key="facility.id"
              class="facility-card"
            >
              <img
                :src="facility.imageUrl"
                alt="시설 이미지"
                class="facility-image"
              />
              <div class="facility-info">
                <h6 class="facility-name">{{ facility.name }}</h6>
                <p class="facility-description">{{ facility.introduction }}</p>
                <p class="facility-description">{{ facility.information }}</p>
                <p class="facility-description">{{ facility.standardUse }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "테마파크 목록",
    },
    parks: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    async showFacilities(themeParkId) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/parks/${themeParkId}/attractions`
        );
        const data = await response.json();
        this.selectedParkFacilities = data.data; // 데이터 바인딩
        console.log("이것이 시설이다!", this.selectedParkFacilities);
      } catch (error) {
        console.error("시설 목록 가져오기 실패:", error);
      }
    },
  },
  data() {
    return {
      selectedParkFacilities: [], // 선택한 테마파크의 시설 목록
    };
  },
};
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
  text-align: left;
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

/* 시설 카드 스타일 */
.facility-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 10px;
}

.facility-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: calc(33.333% - 16px); /* 3개 카드가 가로로 나열되도록 설정 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.facility-card:hover {
  transform: translateY(-5px);
}

.facility-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.facility-info {
  padding: 10px;
}

.facility-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.facility-description {
  font-size: 0.9rem;
  color: #666;
}
</style>
