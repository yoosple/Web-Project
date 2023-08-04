<template>
    <div class="game">
      <div v-if="!gameStarted" class="game-start">
        <button class="start-button" @click="startGame">Start</button>
      </div>
      <div v-else>
        <div class="maze-grid">
          <div
            v-for="(row, rowIndex) in mazeData"
            :key="rowIndex"
            class="maze-row"
          >
            <div
              v-for="(cell, colIndex) in row"
              :key="colIndex"
              :class="getCellStyle(cell)"
            ></div>
          </div>
        </div>
        <div class="player" :style="getPlayerStyle"></div>
      </div>
    </div>
  </template>
  
  <script>
  import { generateRandomMaze } from './maze';
  
  export default {
    data() {
      return {
        mazeData: [],
        gameStarted: false,
        playerPosition: {
          row: 0,
          col: 0,
        },
      };
    },
    methods: {
      startGame() {
        this.gameStarted = true;
        this.generateMaze();
      },
      generateMaze() {
        const mazeSize = {
            rows: 7,
            cols: 7,
        };
        this.mazeData = generateRandomMaze(mazeSize.rows, mazeSize.cols);
        this.playerPosition = {
          row: 0,
          col: 0,
        };
      },
      getCellStyle(cell) {
        return cell === 1 ? 'wall' : 'path';
      },
    },
    computed: {
      getPlayerStyle() {
        const cellSize = 50; // 플레이어 크기를 설정합니다.
        const top = this.playerPosition.row * cellSize + 'px';
        const left = this.playerPosition.col * cellSize + 'px';
        return {
          top,
          left,
          width: cellSize + 'px',
          height: cellSize + 'px',
        };
      },
    },
    mounted() {
      // 키보드 이벤트를 감지하여 플레이어 이동 처리
      window.addEventListener('keydown', this.movePlayer);
    },
    beforeUnmount() {
      // 컴포넌트가 제거될 때 키보드 이벤트 리스너를 해제
      window.removeEventListener('keydown', this.movePlayer);
    },
  };
  </script>
  
<style>
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

.maze-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 1px;
    background-color: #fff;
}

.maze-row {
    display: flex;
}

.wall {
    background-color: #000;
}

.path {
    background-color: #fff;
}

.player {
  position: absolute;
  background-color: #ff0000; /* 플레이어 색상 설정 */
}
</style>