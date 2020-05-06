<template>
  <div id="lyrics-view">
    <div class="pre-formatted">{{ lyrics }}</div>
  </div>
</template>

<script>
export default {
  props: {
    lyrics: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style></style>
