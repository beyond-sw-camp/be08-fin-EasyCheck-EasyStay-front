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
            <tr v-for="(pay, index) in pays" :key="pay.id">
              <!-- 사진 -->
              <td class="photo-cell">
                <!-- <img :src="pay.images" class="avatar" :alt="pay.name" /> -->
              </td>

              <!-- 번호 -->
              <td class="number-cell">
                <span class="text-sm font-weight-bold">{{ index + 1 }}</span>
              </td>

              <!-- 결제자 이름 -->
              <td class="name-cell">
                <h6 class="mb-0 text-m">
                  {{ maskName(pay.username) }}({{ pay.email }})
                </h6>
              </td>

              <!-- 회원 구분 -->
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

              <!-- 결제 금액 -->
              <td class="text-center">
                <span class="text-lg">
                  {{ pay.amount }}
                </span>
              </td>

              <!-- 결제 상태 -->
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
              <!-- 결제 수단 -->
              <td class="text-center">
                <span class="payment-method">
                  <i
                    :class="getPaymentIcon(pay.method)"
                    class="payment-icon"
                  ></i>
                  {{ pay.method }}
                </span>
              </td>
              <!-- 결제 금액 -->
              <td class="text-center">
                <span class="text-lg">
                  {{ pay.paymentDate }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
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
  computed: {
    ...mapState({
      pays: (state) => state.pay.pays, // Vuex 상태에서 pays 가져오기
    }),
  },
  created() {
    this.getAllpays(); // 컴포넌트 생성 시 다이닝 목록을 가져오는 액션 실행
  },
  mounted() {
    this.$store.dispatch("pay/getAllpays");
    console.log("pay/getAllpays");
  },
  methods: {
    ...mapActions("pay", ["getAllpays"]), // Vuex 액션 연결
    getMemberBadge(type) {
      return type === "회원" ? "badge-success" : "badge-secondary";
    },
    refundCustomer(customer) {
      customer.paymentStatus = "취소됨";
      console.log(
        `환불 처리: 고객 ID ${customer.id}, 새로운 결제 상태: ${customer.paymentStatus}`
      );
    },
    getPaymentIcon(method) {
      if (method === "card") {
        return "fas fa-credit-card card-icon"; // 카드 아이콘
      } else if (method === "vbank") {
        return "fas fa-university bank-icon"; // 계좌이체 아이콘
      }
      return ""; // 기본적으로 아이콘이 없는 경우
    },
    maskName(name) {
      if (name.length <= 2) return name; // 이름이 2글자 이하인 경우 그대로 반환
      return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
    },
  },
};
</script>

<style scoped>
/* 테이블 스크롤 */
.table-container {
  max-height: 600px;
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
</style>
