<template>
  <div class="py-4 container-fluid">
    <SuggestionTable
      title="건의사항 목록"
      :parks="suggestions"
      @open-response-form="showResponseForm = true"
    />
    <ResponseForm
      :showResponseForm="showResponseForm"
      @close="showResponseForm = false"
      @response-submitted="handleResponseSubmitted"
    />
  </div>
</template>

<script>
import SuggestionTable from "./components/SuggestionTable.vue";
import ResponseForm from "./components/ResponseForm.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: { SuggestionTable, ResponseForm },
  computed: {
    ...mapState({
      suggestions: (state) => state.suggestion.suggestions, // Vuex 상태에서 dinings 가져오기
    }),
  },
  created() {
    this.getAllSuggestions(); // 컴포넌트 생성 시 다이닝 목록을 가져오는 액션 실행
  },
  mounted() {
    // 공지사항을 가져오는 Vuex 액션 호출
    this.$store.dispatch("suggestion/getAllSuggestions");
  },
  data() {
    return {
      showResponseForm: false, // 폼 표시 상태
    };
  },
  methods: {
    ...mapActions("suggestion", ["getAllSuggestions"]), // Vuex 액션 연결
    handleResponseSubmitted() {
      // 여기에서 답변 제출 후의 로직을 처리
      this.showResponseForm = false; // 폼 닫기
      // 필요한 경우 데이터 갱신 또는 알림 추가
    },
    closeModal() {
      this.showResponseForm = false;
    },
  },
};
</script>
