import apiClient from "@/api";

export default {
  namespaced: true,
  state: {
    isAuthenticated: true, // 초기 상태를 true로 설정 (필요에 따라 조정)
    Events: [], // 공지사항 리스트를 저장할 상태
    Event: null,
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
    removeEvent(state, eventId) {
      state.Events = state.Events.filter((event) => event.id !== eventId);
    },
    updateEvent(state, Event) {
      state.Event = Event;
    },
  },
  actions: {
    // 이벤트 등록 액션
    async createEvent({ commit }, { eventData, imageFiles }) {
      try {
        const formData = new FormData();

        const eventBlob = new Blob([JSON.stringify(eventData)], {
          type: "application/json",
        });

        formData.append("description", eventBlob);

        // base64 이미지 데이터를 File 객체로 변환하여 추가
        imageFiles.forEach((base64Data, index) => {
          // base64 문자열에서 실제 데이터 부분만 추출
          const base64Content = base64Data.url.split(",")[1];
          // base64를 바이너리 데이터로 변환
          const binaryData = atob(base64Content);
          // 바이너리 데이터를 Uint8Array로 변환
          const bytes = new Uint8Array(binaryData.length);
          for (let i = 0; i < binaryData.length; i++) {
            bytes[i] = binaryData.charCodeAt(i);
          }
          // Blob 생성
          const blob = new Blob([bytes], { type: "image/jpeg" });
          // File 객체 생성
          const file = new File([blob], `image${index + 1}.jpg`, {
            type: "image/jpeg",
          });

          formData.append("Image", file);
        });

        const response = await apiClient.post("/events", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("이벤트 등록 성공:", response.data);
        commit("addEvent", response.data); // 이벤트 추가 뮤테이션 호출
      } catch (error) {
        console.error("이벤트 등록 중 오류 발생:", error);
        throw error; // 에러를 호출한 쪽으로 전달
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

    async fetchEventById({ commit }, eventId) {
      console.log("요청한 ID:", eventId);

      try {
        const response = await apiClient.get(`/events/${eventId}`);
        console.log("데이터 확인 : ", response);
        console.log("데이터 정보", response.data);
        commit("updateEvent", response.data);
        return response.data;
      } catch (err) {
        this.error = err.message;
        console.error("Error fetching notice:", err);
      } finally {
        this.loading = false;
      }
    },

    async deleteEvent({ commit }, eventId) {
      try {
        // 공지사항 삭제
        await apiClient.delete(`/events/${eventId}`);

        commit("removeEvent", eventId);
      } catch (error) {
        console.error("이벤트 삭제 실패 : ", error);
        throw error;
      }
    },

    async updateNotice(
      { commit },
      { eventId, eventName, detail, startDate, endDate, images }
    ) {
      try {
        const response = await apiClient.put(`/events/${eventId}`, {
          eventName,
          detail,
          startDate,
          endDate,
          images,
        });

        console.log("수정 : ", response);

        alert("공지사항이 수정되었습니다.");
        // 공지사항 목록 페이지로 이동
        commit("setEvent"); // 상태 업데이트를 먼저 하고
        return response;
      } catch (error) {
        console.error("공지사항 수정 실패 : ", error);
      }
    },
  },

  // 로그아웃 액션
  logout({ commit }) {
    // 토큰 제거
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    commit("clearAuthState"); // 인증 상태 초기화
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
