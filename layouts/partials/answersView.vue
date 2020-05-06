<template>
  <div id="answers-view">
    <div class="currently-playing">
      <span v-show="answered"
        >{{ message }} Das war <b>{{ title }}</b> von
        <b>{{ correctAnswer }}</b></span
      >
    </div>
    <div id="answers-grid">
      <button
        v-for="answer in answers"
        :key="answer"
        @click="checklAnswer(answer)"
      >
        {{ answer }}
      </button>
    </div>
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
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isCorrect: false,
      isFalse: false,
      answered: false,
      message: ""
    };
  },
  methods: {
    checklAnswer(answer) {
      if (answer === this.correctAnswer) {
        this.$parent.score += 100;
        event.target.classList.add("correct");
        this.message = "Richtig!";
        this.answered = true;
      } else {
        event.target.classList.add("wrong");
        this.message = "Falsch!";
        this.answered = true;
        if (this.$parent.score === 0) {
        } else {
          this.$parent.score -= 100;
        }
      }
      setTimeout(() => {
        this.answered = false;
        this.$parent.nextSong();
      }, 1500);
    }
  }
};
</script>

<style></style>
