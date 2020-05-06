<template>
  <div id="info-view">
    <div class="score">{{ score }}</div>
    <div class="count">
      Song <b>{{ currentSongCount + 1 }}</b> von
      <b>{{ lenght }}</b>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      default: 0
    },
    currentSongCount: {
      type: Number,
      default: 0
    },
    lenght: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style></style>
