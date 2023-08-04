<template>
  <div class="game">
    <div v-if="!gameStarted" class="game-start">
      <button class="start-button" @click="startGame">Start</button>
    </div>
    <div v-if="gameStarted">
      <button
        v-for="(direction, index) in directionSequence"
        :key="index"
        class="direction-button"
        @click="handleDirectionClick(direction)"
      >
        {{ direction }}
      </button>
    </div>
    <p v-if="message">{{ message }}</p>
    <p v-if="elapsedTime">{{ elapsedTime }}초</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      directionSequence: [],
      originalSequence: [],
      gameStarted: false,
      message: '',
      level: 1,
      currentLevel: 1,
      startTime: null,
      elapsedTime: null,
      timer: null,
    };
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      this.startTime = Date.now();
      this.generateSequence();
      this.timer = setInterval(() => {
        this.elapsedTime = ((Date.now() - this.startTime) / 1000).toFixed(2);
      }, 10);
      window.addEventListener('keydown', this.checkInput);
    },
    generateSequence() {
      const directions = ['Left', 'Up', 'Down', 'Right'];
      this.directionSequence = [];
      let sequenceLength;
      if (this.currentLevel <= 2) {
        sequenceLength = 4;
      } else if (this.currentLevel <= 4) {
        sequenceLength = 5;
      } else if (this.currentLevel <= 6) {
        sequenceLength = 6;
      } else if (this.currentLevel <= 8) {
        sequenceLength = 7;
      } else if (this.currentLevel <= 9){
        sequenceLength = 8;
      } else {
        sequenceLength = 10;
      }
      for (let i = 0; i < sequenceLength; i++) {
        this.directionSequence.push(
          directions[Math.floor(Math.random() * directions.length)]
        );
      }      
      this.originalSequence = [...this.directionSequence];
    },
    checkInput(event) {
      this.message = '';
      const direction = event.key.replace('Arrow', '');
      if (direction === this.directionSequence[0]) {
        this.directionSequence.shift();
        if (this.directionSequence.length === 0) {
          if (this.currentLevel === 10) {
            this.message = '성공!';
            clearInterval(this.timer);
            window.removeEventListener('keydown', this.checkInput);
          } else {
            this.currentLevel++;
            this.generateSequence();
          }
        }
      } else {
        this.restartLevel();
      }
    },
    handleDirectionClick(direction) {
      this.message = '';
      if (direction === this.directionSequence[0]) {
        this.directionSequence.shift();
        if (this.directionSequence.length === 0) {
          if (this.currentLevel === 3) {
            this.message = '성공!';
            clearInterval(this.timer);
            window.removeEventListener('keydown', this.checkInput);
          } else {
            this.currentLevel++;
            this.generateSequence();
          }
        }
      } else {
        this.restartLevel();
      }
    },
    restartLevel() {
      this.directionSequence = [...this.originalSequence];
      this.message = '틀렸습니다! 해당 레벨의 방향키를 처음부터 눌러주세요.';
    },
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.checkInput);
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.game {
  position: relative;
  width: 800px;
  height: 600px;
  border: 1px solid black;
  margin: 0 auto;
}

.game-start {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
}

.start-button {
  width: 100px;
  height: 50px;
  font-size: 24px;
}

.direction-button {
  margin: 1rem;
}
</style>