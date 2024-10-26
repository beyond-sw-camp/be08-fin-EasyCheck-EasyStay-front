import apiClient from "@/api";

export default {
  namespaced: true,
  state: {
    isAuthenticated: true, // 초기 상태를 true로 설정 (필요에 따라 조정)
    Events: [], // 공지사항 리스트를 저장할 상태
    isLoading: false,
    error: null,
    currentEvent: null,
  },
  mutations: {
    setEvent(state, Events) {
      state.Events = Events;
    },
    // 개별 공지사항을 추가하는
    addEvent(state, Event) {
      state.Events.push(Event);
    },
    setAuthState(state, status) {
      state.isAuthenticated = status;
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_CURRENT_EVENT(state, event) {
      state.currentEvent = event;
    },
  },
  actions: {
    // 이벤트 등록 액션 수정
    async createEvent({ commit }, { eventData, imageFiles }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const formData = new FormData();

        // 날짜 변환 함수
        const formatDate = (dateString) => {
          return dateString.split("T")[0]; // 'YYYY-MM-DD' 형식으로 변환
        };

        // 이벤트 데이터를 JSON 문자열로 변환하여 추가
        formData.append(
          "description",
          JSON.stringify({
            eventName: eventData.eventName,
            detail: eventData.detail,
            startDate: formatDate(eventData.startDate), // 변환된 날짜 사용
            endDate: formatDate(eventData.endDate), // 변환된 날짜 사용
          })
        );

        // 이미지 파일들을 formData에 추가
        imageFiles.forEach((file) => {
          formData.append("Image", file);
        });

        const config = {
          headers: {
            "Content-Type": "application/json", // JSON 형식으로 설정
          },
        };

        const response = await apiClient.post("/events", formData, config);
        console.log("으어어", response.data);
        commit("SET_CURRENT_EVENT", response.data);
        return response.data;
      } catch (error) {
        commit(
          "SET_ERROR",
          error.response?.data?.message || "이벤트 생성 중 오류가 발생했습니다."
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async getAllEvent({ commit }) {
      try {
        const response = await apiClient.get("/events"); // API 호출
        console.log("불러온 이벤트 데이터:", response.data); // 데이터 확인
        commit("setEvent", response.data); // 상태 업데이트
      } catch (error) {
        console.error("이벤트 목록 가져오기 실패:", error);
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
    isLoading: (state) => state.isLoading,
    error: (state) => state.error,
    currentEvent: (state) => state.currentEvent,
    events: (state) => state.Events, // 이벤트 목록 getter
  },
};
