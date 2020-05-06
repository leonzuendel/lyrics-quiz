<template>
  <div v-show="gameIsOver" id="game-over">
    <h1>Game Over</h1>
    Dein Score ist <b>{{ score }}</b
    ><br />
    <button @click="restartGame()">Erneut versuchen?</button>
  </div>
</template>

<script>
export default {
  props: {
    gameIsOver: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      default: 0
    }
  },
  methods: {
    restartGame() {
      this.$parent.gameIsReady = false;
      this.$parent.gameIsOver = false;
    }
  }
};
</script>

<style></style>
