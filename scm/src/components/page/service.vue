<template>
    <div class="container">
        service
    </div>
</template>
<script>
export default {
  created() {
    this.$store.commit("setActiveTab", "/service");
  }
};
</script>
