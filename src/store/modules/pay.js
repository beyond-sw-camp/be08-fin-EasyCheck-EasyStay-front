import apiClient from "@/api";
// import image from "../../assets/img/002.png";

export default {
  namespaced: true,
  state: {
    isAuthenticated: true, // 초기 상태를 true로 설정 (필요에 따라 조정)
    pays: [], // 공지사항 리스트를 저장할 상태

    suggestionId: null,
  },
  mutations: {
    setpays(state, pays) {
      console.log("받아온 결제 데이터 : ", pays);
      state.pays = pays;
    },
    setAuthState(state, status) {
      state.isAuthenticated = status;
    },
    setSuggestionId(state, id) {
      state.payId = id;
    },
  },
  actions: {
    async getAllpays({ commit }) {
      try {
        const response = await apiClient.get(`/admin/payments`);
        console.log("응답 : ", response);
        console.log("응답 데이터 : ", response.data);

        const paysData = response.data.map((pays) => ({
          id: pays.id,
          username: pays.username,
          userRole: pays.userRole,
          amount: pays.amount,
          completionStatus: pays.completionStatus,
          method: pays.method,
          paymentDate: pays.paymentDate,
          email: pays.email,
        }));
        console.log("받아온 결제 데이터:", paysData);
        commit("setpays", paysData); // 상태 업데이트
      } catch (error) {
        console.error("결제 고객 목록 가져오기 실패:", error);
      }
    },

    // 로그아웃 액션
    logout({ commit }) {
      // 토큰 제거
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      commit("clearAuthState"); // 인증 상태 초기화
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated, // 인증 여부 확인
    currentUser: (state) => state.user, // 현재 유저 정보 반환
  },
};
