<template>
   <div class="game">
     <button v-if="!gameStarted" @click="startGame">Start</button>
     <div v-if="gameStarted">
       <button
         v-for="(direction, index) in directionSequence"
         :key="index"
         class="direction-button"
       >
         {{ direction }}
       </button>
     </div>
     <p>{{ message }}</p>
     <p v-if="elapsedTime">{{ elapsedTime }}초</p>
   </div>
 </template>
 
 <script>
 export default {
   data() {
     return {
       directionSequence: [],
       gameStarted: false,
       message: '',
       level: 1,
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
       for (let i = 0; i < this.level * 2 + 1; i++) {
         this.directionSequence.push(directions[Math.floor(Math.random() * directions.length)]);
       }
     },
     checkInput(event) {
       const direction = event.key.replace('Arrow', '');
       const index = this.directionSequence.indexOf(direction);
       if (index !== -1) {
         this.directionSequence.splice(index, 1);
       }
       if (this.directionSequence.length === 0) {
         if (this.level === 3) {
           this.message = '성공!';
           clearInterval(this.timer);
           window.removeEventListener('keydown', this.checkInput);
         } else {
           this.level++;
           this.generateSequence();
         }
       }
     },
   },
   beforeUnmount() {
     window.removeEventListener('keydown', this.checkInput);
     clearInterval(this.timer);
   },
 };
 </script>
 
 <style scoped>
 .direction-button {
   margin: 1rem;
 }
 </style>