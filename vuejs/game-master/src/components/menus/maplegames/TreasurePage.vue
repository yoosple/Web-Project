<template>
     <div class="game-board">
          <div class="container">
               <div v-for="(object, index) in objects" :key="index" class="object" :style="{ top: object.top + 'px' }"></div>
          </div>
          <div class="score-board">Score: {{ score }}</div>
          <div class="timer">Time: {{ remainingTime }}</div>
          <div v-if="!isGameStarted || isGameCleared || isGameOver" class="overlay"></div>
          <div v-if="!isGameStarted" class="game-start">
               <button class="start-button" @click="startGame">Start</button>
          </div>
          <div v-if="isGameCleared" class="game-cleared">게임 클리어!</div>
          <div v-if="isGameOver" class="game-over">게임 오버!</div>
     </div>
</template>
   
<script>
export default {
     data() {
          return {
               objects: [], // 물체들을 관리하는 배열
               containerHeight: 0, // 컨테이너(div)의 높이
               score: 0,
               isGameCleared: false,
               remainingTime: 60,
               isGameOver: false,
               isGameStarted: false
          };
     },
     mounted() { },
     methods: {
          startAnimation() {
               const numObjects = 5; // 물체의 개수
               const animationDuration = 2000; // 애니메이션 지속 시간 (밀리초)
               const interval = 10; // 위치 업데이트 간격 (밀리초)

               const distanceToFall = this.containerHeight; // 물체가 떨어질 거리 (컨테이너의 높이만큼)

               for (let i = 0; i < numObjects; i++) {
                    const object = {
                         top: 0, // 물체의 초기 위치 (위쪽에서부터의 거리)
                         delay: Math.random() * animationDuration // 물체마다 랜덤한 지연 시간 설정
                    };
                    this.objects.push(object);
               }

               const animationInterval = setInterval(() => {
                    this.objects.forEach((object, index) => {
                         const progress = Math.max((Date.now() - object.delay) / animationDuration, 0);
                         if (progress >= 1) {
                              // 애니메이션이 완료된 경우 배열에서 해당 물체 제거
                              this.objects.splice(index, 1);
                         } else {
                              object.top = distanceToFall * progress;
                         }
                    });

                    if (this.objects.length === 0) {
                         clearInterval(animationInterval);
                    }
               }, interval);
          },
          startTimer() {
               const countdown = setInterval(() => {
                    // 게임 클리어 또는 게임 오버 상태확인하고 타이머를 멈추세요.
                    if (this.isGameCleared || this.isGameOver) {
                         clearInterval(countdown);
                         return;
                    }
                    this.remainingTime--;

                    if (this.remainingTime <= 0) {
                         clearInterval(countdown);
                         this.isGameOver = true;
                         this.isGameCleared = false;
                    }
               }, 1000);
          },
          startGame() {
               this.isGameStarted = true;
               this.isGameOver = false;
               this.isGameCleared = false;
               this.remainingTime = 60;
               this.score = 0;

               // 컨테이너의 높이를 설정하기 위해 다음 프레임에서 실행되도록 setTimeout 사용
               setTimeout(() => {
                    this.containerHeight = this.$el.querySelector('.container').offsetHeight;
                    this.startAnimation();
                    this.startTimer();
               }, 0);
          }
     }
};
</script>

<style scoped>
.game-board {
     position: relative;
     width: 800px;
     height: 600px;
     border: 1px solid black;
     margin: 0 auto;
}

.container {
     position: relative;
     width: 800px;
     height: 600px;
}

.object {
     position: absolute;
     width: 50px;
     height: 50px;
     background-color: red;
}

.score-board {
     position: absolute;
     top: 10px;
     left: 10px;
     font-size: 24px;
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

.game-cleared,
.game-over {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     font-size: 36px;
     z-index: 30;
     background-color: aliceblue;
}

.timer {
     position: absolute;
     top: 10px;
     right: 10px;
     font-size: 24px;
}

.overlay {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.5);
     z-index: 20;
}
</style>
<style>
/* 동적으로 물체의 크기를 설정하기 위한 CSS */
.object[data-size="50"] {
     width: 50px;
     height: 50px;
}

.object[data-size="40"] {
     width: 40px;
     height: 40px;
}

.object[data-size="30"] {
     width: 30px;
     height: 30px;
}

.object[data-size="20"] {
     width: 20px;
     height: 20px;
}

.object[data-size="10"] {
     width: 10px;
     height: 10px;
}
</style>