<template>
  <div
    class="card mb-4"
    style="width: 100%; max-width: 1900px; margin: 50px auto; padding: 0 15px"
  >
    <!-- Search Section -->
    <div class="search-container">
      <div class="search-box">
        <div class="search-input-group">
          <label>이름</label>
          <input
            type="text"
            v-model="searchQuery.userName"
            placeholder="사용자 이름을 입력하세요"
            class="search-input"
          />
        </div>
        <div class="search-input-group">
          <label>이메일</label>
          <input
            type="text"
            v-model="searchQuery.email"
            placeholder="이메일을 입력하세요"
            class="search-input"
          />
        </div>
        <button @click="handleSearch" class="search-button">
          <i class="fas fa-search"></i> 검색
        </button>
      </div>
    </div>

    <div class="card-header pb-0">
      <h6 class="fs-3">{{ title }}</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2 table-container">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-center opacity-7"></th>
              <th class="text-center opacity-7">번호</th>
              <th class="opacity-7">결제자</th>
              <th class="text-center opacity-7">회원구분</th>
              <th class="text-center opacity-7">결제금액</th>
              <th class="text-center opacity-7">결제상태</th>
              <th class="text-center opacity-7">결제수단</th>
              <th class="text-center opacity-7">결제일자</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pay, index) in paginatedPays" :key="pay.id">
              <td class="photo-cell"></td>
              <td class="number-cell">
                <span class="text-sm font-weight-bold">{{
                  index + 1 + (currentPage - 1) * itemsPerPage
                }}</span>
              </td>
              <td class="name-cell">
                <h6 class="mb-0 text-m">
                  {{ maskName(pay.username) }}({{ pay.email }})
                </h6>
              </td>
              <td class="text-center">
                <span
                  class="badge"
                  :class="
                    pay.userRole === 'USER' ? 'user-badge' : 'corporate-badge'
                  "
                >
                  {{ pay.userRole === "USER" ? "회원" : "법인회원" }}
                </span>
              </td>
              <td class="text-center">
                <span class="text-lg">{{ pay.amount }}</span>
              </td>
              <td class="text-center">
                <span
                  class="status-badge"
                  :class="
                    pay.completionStatus === 'COMPLETE'
                      ? 'complete'
                      : 'incomplete'
                  "
                >
                  <i
                    :class="
                      pay.completionStatus === 'COMPLETE'
                        ? 'fas fa-check-circle'
                        : 'fas fa-times-circle'
                    "
                    aria-hidden="true"
                  ></i>
                  {{ pay.completionStatus }}
                </span>
              </td>
              <td class="text-center">
                <span class="payment-method">
                  <i
                    :class="getPaymentIcon(pay.method).iconClass"
                    class="payment-icon"
                  ></i>
                  {{ getPaymentIcon(pay.method).text }}
                </span>
              </td>
              <td class="text-center">
                <span class="text-lg">{{ pay.paymentDate }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">이전</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          다음
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "Payment Customer List",
    },
    customers: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 8, // 페이지당 항목 수
      searchQuery: {
        userName: "",
        email: "",
      },
    };
  },
  computed: {
    ...mapState({
      pays: (state) => state.pay.pays,
    }),
    paginatedPays() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.pays.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.pays.length / this.itemsPerPage);
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions("pay", ["getAllpays"]),
    async fetchData() {
      await this.getAllpays({
        userName: this.searchQuery.userName,
        email: this.searchQuery.email,
      });
    },
    async handleSearch() {
      this.currentPage = 1; // 검색 시 첫 페이지로 리셋
      await this.fetchData();
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    maskName(name) {
      if (name.length <= 2) return name;
      return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
    },
    getPaymentIcon(method) {
      if (method === "card") {
        return { iconClass: "fas fa-credit-card card-icon", text: "카드" };
      } else if (method === "vbank") {
        return { iconClass: "fas fa-university bank-icon", text: "계좌이체" };
      }
      return { iconClass: "", text: "" };
    },
  },
};
</script>

<style scoped>
/* 새로 추가된 검색 스타일 */
.search-container {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  gap: 15px;
  align-items: flex-end;
}

.search-input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.search-input-group label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 200px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.search-button {
  padding: 8px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 38px;
}

.search-button:hover {
  background-color: #0056b3;
}

.search-button i {
  font-size: 0.9rem;
}
/* 테이블 스크롤 */
.table-container {
  max-height: 800px;
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

/* 아바타 이미지 */
.avatar {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  object-fit: cover;
}

/* 셀 스타일 */
.photo-cell {
  padding: 0 8px;
  text-align: center;
  width: 50px;
}

.number-cell {
  text-align: center;
  width: 40px;
}

.name-cell {
  text-align: left;
  padding-left: 15px;
}

.user-badge {
  background: linear-gradient(
    135deg,
    #a3c1e1,
    #6b9fc6
  ); /* 차분한 블루 그라데이션 */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px; /* 둥근 모서리 */
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 */
}
.corporate-badge {
  background: linear-gradient(135deg, #555555, #2c2c2c); /* 차콜 그라데이션 */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px; /* 둥근 모서리 */
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 */
}
/* 버튼 스타일 */
.btn {
  padding: 6px 12px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
  transition: background-color 0.3s;
}

.btn-danger:hover {
  background-color: #c0392b;
}
.payment-method {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem; /* 텍스트 크기 조정 */
}

.payment-icon {
  margin-right: 0.5rem; /* 텍스트와 아이콘 간의 간격 */
  font-size: 1.5rem; /* 아이콘 크기 */
  color: #333; /* 아이콘 색상 */
}

.card-icon {
  color: #1e90ff; /* 카드 아이콘 색상 */
}

.bank-icon {
  color: #4caf50; /* 계좌이체 아이콘 색상 */
}
.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.8rem;
  border-radius: 12px; /* 둥근 모서리 */
  font-size: 0.8rem;
  font-weight: bold;
  color: white; /* 텍스트 색상 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 */
}

.complete {
  background: linear-gradient(135deg, #28a745, #218838); /* 성공 그라데이션 */
}

.incomplete {
  background: linear-gradient(135deg, #dc3545, #c82333); /* 실패 그라데이션 */
}

.status-badge i {
  margin-right: 0.5rem; /* 아이콘과 텍스트 간격 */
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 10px;
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
