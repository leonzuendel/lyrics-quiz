<template>
  <div v-if="gameIsReady != true && loading != true" id="start-menu">
    <h1>Wie viele Songs?</h1>
    <div class="start-menu-grid">
      <button @click="$parent.getRandomSongs(10)">10 Songs</button>
      <button @click="$parent.getRandomSongs(30)">30 Songs</button>
      <button @click="$parent.getRandomSongs(100)">100 Songs</button>
    </div>
    <div class="dev-note">
      Dieses Projekt wurde mit <i class="las la-heart"></i> von
      <a href="https://github.com/leonzuendel">Leon Zündel</a> gemacht.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gameIsReady: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  }
};
</script>

<style></style>
