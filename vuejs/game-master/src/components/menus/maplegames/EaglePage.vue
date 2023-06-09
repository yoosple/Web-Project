<template>
   <div>
      <button v-if="!isGameStarted" @click="startGame" class="start-button">Start</button>
      <div class="game-board" @click="missClick">
         <div v-for="(object, index) in objects" :key="index" class="game-object" :style="{
            width: object.size + 'px',
            height: object.size + 'px',
            top: object.y + 'px',
            left: object.x + 'px',
            backgroundColor: object.color,
            display: object.visible ? 'block' : 'none'
         }" @click.stop="handleClick(object)"></div>
         <div class="score-board">Score: {{ score }}</div>
         <div class="timer">Time: {{ remainingTime }}</div>
         <div v-if="isGameCleared || isGameOver" class="overlay"></div>
         <div v-if="isGameCleared" class="game-cleared">게임 클리어!</div>
         <div v-if="isGameOver" class="game-over">게임 오버!</div>
      </div>
   </div>
</template>
 
<script>
export default {
   data() {
      return {
         boardWidth: 800,
         boardHeight: 600,
         objects: [],
         score: 0,
         isGameCleared: false,
         remainingTime: 30,
         isGameOver: false,
         isGameStarted: false
      };
   },
   mounted() {
   },
   methods: {
      initGame() {
         const trapObjects = Array(3)
            .fill()
            .map(() => ({
               size: 50,
               speed: 2000,
               color: "red",
               score: Math.floor(Math.random() * 46) * -1 - 5,
               visible: true
            }));

         const positiveObjects = [
            { size: 50, speed: 2000, color: "green", score: 5, visible: true },
            { size: 50, speed: 2000, color: "green", score: 5, visible: true },
            { size: 50, speed: 2000, color: "green", score: 5, visible: true },
            { size: 40, speed: 1800, color: "blue", score: 10, visible: true },
            { size: 40, speed: 1800, color: "blue", score: 10, visible: true },
            { size: 30, speed: 1600, color: "yellow", score: 15, visible: true },
            { size: 30, speed: 1600, color: "yellow", score: 15, visible: true },
            { size: 20, speed: 1400, color: "purple", score: 20, visible: true },
            { size: 10, speed: 1000, color: "orange", score: 30, visible: true }
         ];

         this.objects = [...trapObjects, ...positiveObjects];
      },
      moveObject(object) {
         object.x = Math.floor(Math.random() * (this.boardWidth - object.size));
         object.y = Math.floor(Math.random() * (this.boardHeight - object.size));

         if (!this.isGameCleared && !this.isGameOver) {
            setTimeout(() => {
               this.moveObject(object);
            }, object.speed);
         }
      },
      moveObjects() {
         for (const object of this.objects) {
            this.moveObject(object);
         }
      },
      handleClick(object) {
         if (this.isGameCleared || this.isGameOver) {
            return;
         }

         this.score += object.score;
         object.visible = false;

         const positiveObjectsVisible = this.objects.filter(
            (obj) => obj.score > 0 && obj.visible
         );
         const allObjectsVisible = this.objects.filter((obj) => obj.visible);

         if (positiveObjectsVisible.length === 0 || allObjectsVisible.length === 0) {
            this.isGameCleared = true;
         }
      },
      missClick() {
         if (this.isGameCleared || this.isGameOver) {
            return;
         }

         this.score -= 1;
      },
      startTimer() {
         const countdown = setInterval(() => {
            // 게임 클리어 또는 게임 오버 상태를 확인하고 타이머를 멈추세요.
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
         this.remainingTime = 30;
         this.score = 0;
         this.initGame();
         this.moveObjects();
         this.startTimer();
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

.game-object {
   position: absolute;
   border-radius: 50%;
}

.score-board {
   position: absolute;
   top: 10px;
   left: 10px;
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

.start-button {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   font-size: 24px;
   z-index: 10;
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