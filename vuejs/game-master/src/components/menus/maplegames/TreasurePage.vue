<template>
     <div class="game" tabindex="0" @keydown="handleKeyDown" @keyup="handleKeyUp">
          <div class="canvas-container">
               <canvas ref="canvas" width="400" height="400"></canvas>
               <div class="basket" :style="{ bottom: '0', left: basket.x + 'px' }"></div>               
               <div v-if="remainingTime === 0" class="overlay"></div>
          </div>
          <p>Score: {{ score }}</p>
          <p>Time: {{ remainingTime }} 초 남음</p>
     </div>
</template>
   
<script>
export default {
     data() {
          return {
               canvas: null,
               ctx: null,
               width: 0,
               height: 0,
               basket: {
                    x: 0,
                    width: 100,
                    height: 20,
               },
               jewels: [],
               score: 0,
               isMovingLeft: false,
               isMovingRight: false,
               gameStarted: false,
               remainingTime: 30,
               timer: null,
          };
     },
     mounted() {
          this.canvas = this.$refs.canvas;
          this.ctx = this.canvas.getContext('2d');
          this.width = this.canvas.width;
          this.height = this.canvas.height;
          this.basket.x = (this.width - this.basket.width) / 2; // Center the basket horizontally
          this.startGame();
          this.attachEventListeners();
     },
     beforeUnmounted() {
          this.removeEventListeners();
          this.stopTimer();
     },
     methods: {
          startGame() {
               this.gameStarted = true;
               this.score = 0;
               this.jewels = [];
               this.remainingTime = 30;
               this.startTimer();
               this.createJewels();
               this.draw();
          },
          createJewels() {
               setInterval(() => {
                    const jewel = {
                         x: Math.random() * (this.width - 20),
                         y: 0,
                         size: 20,
                         speed: Math.random() * 2 + 1,
                         score: Math.random() < 0.5 ? -1 : 1,
                    };
                    this.jewels.push(jewel);
               }, 1000);
          },
          draw() {
               if (this.remainingTime === 0) {
                    return;
               }

               this.ctx.clearRect(0, 0, this.width, this.height);

               // Draw basket
               this.ctx.fillStyle = 'blue';
               this.ctx.fillRect(this.basket.x, this.height - this.basket.height, this.basket.width, this.basket.height);

               // Draw jewels
               for (const jewel of this.jewels) {
                    const jewelColor = jewel.score < 0 ? 'gray' : 'red';
                    this.ctx.fillStyle = jewelColor;
                    this.ctx.fillRect(jewel.x, jewel.y, jewel.size, jewel.size);
                    jewel.y += jewel.speed;

                    // Check collision with basket
                    if (
                         jewel.y + jewel.size >= this.height - this.basket.height &&
                         jewel.x + jewel.size >= this.basket.x &&
                         jewel.x <= this.basket.x + this.basket.width
                    ) {
                         this.score += jewel.score;
                         this.jewels.splice(this.jewels.indexOf(jewel), 1);
                    }

                    // Remove jewels that fall off the canvas
                    if (jewel.y > this.height) {
                         this.jewels.splice(this.jewels.indexOf(jewel), 1);
                    }
               }

               requestAnimationFrame(this.draw);
          },
          moveBasket() {
               const speed = 5;
               if (this.isMovingLeft) {
                    this.basket.x = Math.max(0, this.basket.x - speed);
               }
               if (this.isMovingRight) {
                    this.basket.x = Math.min(this.width - this.basket.width, this.basket.x + speed);
               }
          },
          handleKeyDown(event) {
               if (this.remainingTime === 0) {
                    return;
               }

               event.preventDefault();
               if (event.key === 'ArrowLeft') {
                    this.isMovingLeft = true;
                    this.moveBasket();
               } else if (event.key === 'ArrowRight') {
                    this.isMovingRight = true;
                    this.moveBasket();
               } else if (event.key === 'ArrowUp') {
                    this.moveBasketUp();
               }
          },
          handleKeyUp(event) {
               if (this.remainingTime === 0) {
                    return;
               }

               if (event.key === 'ArrowLeft') {
                    this.isMovingLeft = false;
               } else if (event.key === 'ArrowRight') {
                    this.isMovingRight = false;
               }
          },
          attachEventListeners() {
               window.addEventListener('keydown', this.handleKeyDown);
               window.addEventListener('keyup', this.handleKeyUp);
          },
          removeEventListeners() {
               window.removeEventListener('keydown', this.handleKeyDown);
               window.removeEventListener('keyup', this.handleKeyUp);
          },
          startTimer() {
               this.timer = setInterval(() => {
                    if (this.remainingTime > 0) {
                         this.remainingTime--;
                    } else {
                         this.stopGame();
                    }
               }, 1000);
          },
          stopTimer() {
               clearInterval(this.timer);
          },
          stopGame() {
               this.gameStarted = false;
               this.stopTimer();
               this.isMovingLeft = false;
               this.isMovingRight = false;
               this.jewels = this.jewels.map(jewel => ({ ...jewel, score: jewel.score < 0 ? -1 : 0 }));

               this.removeEventListeners();
          },
     },
};
</script>

<style scoped>
.canvas-container {
     position: relative;
     width: 400px;
     height: 400px;
     border: 1px solid #000;
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

canvas {
     border: 1px solid #000;
}

.game {
     display: flex;
     flex-direction: column;
     align-items: center;
}

.basket {
     position: absolute;
     width: 100px;
     height: 20px;
     background-color: blue;
}
</style>
