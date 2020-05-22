<template>
  <div class="is-flex questions-container">
    <div
      v-for="(item, questionIndex) in questions"
      :key="item.question"
      class="question-box box"
      data-test="pergunta"
      :data-resposta="getDataResposta(item)"
    >
      <p class="title is-4">{{ item.question }}</p>
      <div v-for="(answer, answerIndex) in item.answers" :key="answer">
        <div
          class="box answer-selector"
          :class="{
            success: getCorrectAnswerClass(answerIndex, item),
            error: getWrongAnswerClass(answerIndex, item),
          }"
          @click="onClickAnswer(answerIndex, questionIndex)"
        >
          <p class="subtitle is-5" data-test="opcao">{{ answer }}</p>
        </div>
      </div>
    </div>
    <div v-show="quizFinished" class="box" :data-resultado="totalAcertos">
      <div class="container resultado-container">
        <p
          class="has-text-weight-bold"
        >Você acertou {{ totalAcertos }} de {{ questions.length }} respostas</p>
        <button class="button reiniciar-button is-info" data-test="refazer" @click="reset">Reiniciar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          question: "Qual a capital da Argentina?",
          answers: ["Mendoza", "Buenos Aires", "Bariloche", "Ushuaia"],
          correctAnswerIndex: 1,
          userAnswer: null
        },
        {
          question: "Qual a capital da Turquia?",
          answers: ["Ancara", "Istambul", "Antália", "Esmirna"],
          correctAnswerIndex: 0,
          userAnswer: null
        },
        {
          question: "Qual a capital da Austrália?",
          answers: ["Sydney", "Melbourne", "Perth", "Camberra"],
          correctAnswerIndex: 3,
          userAnswer: null
        },
        {
          question: "Qual a capital da Croácia?",
          answers: ["Dubrovnik", "Zagrebe", "Split", "Zadar"],
          correctAnswerIndex: 1,
          userAnswer: null
        },
        {
          question: "Qual a capital da Suíça",
          answers: ["Zurique", "Genebra", "Berna", "Lucerna"],
          correctAnswerIndex: 3,
          userAnswer: null
        }
      ]
    };
  },

  computed: {
    quizFinished() {
      return this.questions.every(question => question.userAnswer !== null);
    },

    totalAcertos() {
      let acertos = 0;
      this.questions.map(question => {
        if (question.correctAnswerIndex === question.userAnswer) {
          acertos++;
        }
      });
      return acertos;
    }
  },

  methods: {
    onClickAnswer(answerIndex, questionIndex) {
      if (this.questions[questionIndex].userAnswer === null) {
        this.questions[questionIndex].userAnswer = answerIndex;
      }
    },

    answeredQuestion(question) {
      return question.userAnswer !== null;
    },

    answerStatus(question) {
      return question.userAnswer === question.correctAnswerIndex;
    },

    getDataResposta(question) {
      if (question.userAnswer === null) {
        return "";
      }
      return this.answerStatus(question) ? "correta" : "errada";
    },

    getCorrectAnswerClass(answerIndex, item) {
      return (
        this.answeredQuestion(item) && answerIndex === item.correctAnswerIndex
      );
    },

    getWrongAnswerClass(answerIndex, item) {
      return (
        !this.answerStatus(item) &&
        this.answeredQuestion(item) &&
        answerIndex === item.userAnswer
      );
    },

    reset() {
      this.questions.forEach(item => (item.userAnswer = null));
    }
  }
};
</script>

<style lang="scss" scoped>
.questions-container {
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .question-box {
    padding: 20px 100px;
    margin-bottom: 10px;
    color: #e6e6e6;
  }
}

.answer-selector {
  margin-bottom: 10px;
  cursor: pointer;
}

.success {
  background: #00ff7f;
}

.error {
  background: #ff6347;
}

.resultado-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .reiniciar-button {
    margin-left: 30px;
  }
}
</style>
