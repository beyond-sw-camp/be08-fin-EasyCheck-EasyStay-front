<template>
  <div class="py-4 container-fluid">
    <PaymentTable title="결제 고객 목록" :customers="paymentCustomers" />
  </div>
</template>

<script>
import PaymentTable from "./components/PaymentTable.vue";

export default {
  components: { PaymentTable },
  data() {
    return {};
  },
};
</script>
