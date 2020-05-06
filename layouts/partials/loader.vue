<template>
  <div v-show="loading" class="loader">
    <div class="loading">Loading...</div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean
    }
  }
};
</script>

<style></style>
