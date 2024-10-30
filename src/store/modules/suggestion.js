import apiClient from "@/api";
// import image from "../../assets/img/002.png";

export default {
  namespaced: true,
  state: {
    isAuthenticated: true, // 초기 상태를 true로 설정 (필요에 따라 조정)
    suggestions: [], // 공지사항 리스트를 저장할 상태

    suggestionId: null,
  },
  mutations: {
    setsuggestions(state, suggestions) {
      console.log("받아온 건의사항 데이터 : ", suggestions);
      state.suggestions = suggestions;
    },
    setAuthState(state, status) {
      state.isAuthenticated = status;
    },
    setSuggestionId(state, id) {
      state.suggestionId = id;
    },
  },
  actions: {
    async getAllSuggestions({ commit }) {
      try {
        const response = await apiClient.get(`/suggestions`);
        console.log("응답 : ", response);
        console.log("응답 데이터 : ", response.data);

        const suggestionsData = response.data.map((suggestions) => ({
          id: suggestions.id,
          title: suggestions.title,
          content: suggestions.content,
          email: suggestions.email, // accommodationName을 location으로
          type: suggestions.subject, // description을 openingDate로 사용
        }));
        console.log("받아온 건의사항 데이터:", suggestionsData);
        commit("setsuggestions", suggestionsData); // 상태 업데이트
      } catch (error) {
        console.error("건의사항 목록 가져오기 실패:", error);
      }
    },
    async reply(context, replyContent) {
      try {
        const response = await apiClient.post("/suggestions/reply", {
          suggestionId: context.state.suggestionId,
          replyContent,
        });
        console.log("응답 제출 : ", response);
      } catch (error) {
        console.log("답변 제출 실패 : ", error);
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
