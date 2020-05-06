<template>
  <div>
    <button
      v-for="answer in answers"
      :key="answer"
      @click="checklAnswer(answer)"
    >
      {{ answer }}
    </button>
    <div v-show="isCorrect">Richtig!</div>
    <div v-show="isFalse">Falsch!</div>
  </div>
</template>

<script>
export default {
  props: {
    answers: {
      type: Array,
      default() {
        return [];
      }
    },
    correctAnswer: {
      type: String,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isCorrect: false,
      isFalse: false
    };
  },
  methods: {
    checklAnswer(answer) {
      if (answer === this.correctAnswer) {
        this.isFalse = true;
        this.isCorrect = false;
        this.$parent.score += 100;
      } else {
        this.isCorrect = true;
        this.isFalse = false;
        if (this.$parent.score === 0) {
        } else {
          this.$parent.score -= 100;
        }
      }
      this.$parent.getRandomSong();
    }
  }
};
</script>

<style></style>
