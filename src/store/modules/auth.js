import apiClient from "@/api";

export default {
  namespace: true,
  state: {
    isAuthenticated: false,
    // 유저 정보

    userInfo: null,
  },
  mutations: {
    setAuthState(state, status) {
      state.isAuthenticated = status;
    },
    setUserInfo(state, info) {
      console.log(`[setUserInfo] info = ${info}`);
      state.userInfo = info;
      localStorage.setItem("userRole", info.role);
    },
    clearAuthState(state) {
      state.isAuthenticated = false;
    },
    initAuthState(state) {
      const isLogined = localStorage.getItem("accessToken");
      if (isLogined) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        // 두 번째 인자는 request Body
        // 무조건 객체 형태로 {} 얘 감싸줘야함
        const response = await apiClient.post("/users/login", {
          email: payload.email,
          password: payload.password,
        });

        // Response Body 접근 response.data
        // {} 이 안에는 response.data의 키 값이랑 동일 해야함
        /**

{
accessToken: ~,
refreshToken: ~
}
*/ // 요렇게 동일하게
        const { accessToken, refreshToken } = response.data;

        // 인증 상태 변경
        commit("setAuthState", true);

        // 토큰을 저장합니다
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      } catch (error) {
        commit("setAuthState", false);
        console.error("로그인 실패 : ", error);
        throw error; // 컴포넌트에서 에러 처리를 할 수 있도록 에러를 다시 던집니다
      }
    },

    async fetchUserInfo({ commit }) {
      try {
        // 유저 정보 불러오기
        const response = await apiClient.get("/users/info");

        // user 정보를 상태에 저장
        commit("setUserInfo", response.data);
      } catch (error) {
        // user를 못찾을 경우 에러를 띄워줌.
        console.error("Failed to fetch user info:", error);
        throw error;
      }
    },
    logout({ commit }) {
      // 토큰을 제거합니다
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");

      commit("clearAuthState"); // 인증 상태 초기화
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
  },
};
