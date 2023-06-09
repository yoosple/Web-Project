<template>
    <div>
      <svg class="pendulum" width="200" height="300">
        <rect class="pendulum-body" :x="bodyX" :y="bodyY" :width="bodyWidth" :height="bodyHeight"></rect>
        <circle class="pendulum-weight" :cx="weightCenterX" :cy="weightCenterY" :r="weightRadius"></circle>
      </svg>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bodyX: 90,
        bodyY: 0,
        bodyWidth: 20,
        bodyHeight: 200,
        weightCenterX: 100,
        weightCenterY: 210,
        weightRadius: 30,
      };
    },
    mounted() {
      this.animatePendulum();
    },
    methods: {
      animatePendulum() {
        setInterval(() => {
          const angle = Math.sin(Date.now() / 1000) * Math.PI / 4; // 회전 각도를 계산합니다.
          const amplitude = 150; // 중심 축으로부터의 거리입니다.
          this.bodyX = 100 + Math.sin(angle) * amplitude;
          this.bodyY = Math.cos(angle) * amplitude;
        }, 16);
      },
    },
  };
  </script>
  
  <style>
  .pendulum {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .pendulum-body {
    fill: #000;
  }
  
  .pendulum-weight {
    fill: #999;
  }
  </style>