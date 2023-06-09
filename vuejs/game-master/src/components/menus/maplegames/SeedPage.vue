<template>
   <div id="main">
     <nav v-bind:class="active" v-on:click.prevent>
       <a href="#" class="floor12th" v-on:click="makeActive('floor12th')">12층</a>
       <a href="#" class="floor14th" v-on:click="makeActive('floor14th')">14층</a>
       <a href="#" class="floor17th" v-on:click="makeActive('floor17th')">17층</a>
       <a href="#" class="floor19th" v-on:click="makeActive('floor19th')">19층</a>
       <a href="#" class="floor22th" v-on:click="makeActive('floor22th')">22층</a>
     </nav>
 
     <div v-if="active == 'floor12th'">
       <Floor12th />
     </div>
     <div v-else-if="active == 'floor14th'">
       <Floor14th />
     </div>
    <div v-else-if="active == 'floor17th'">
       <Floor17th />
     </div>
     <div v-else-if="active == 'floor19th'">
       <Floor19th />
     </div>
     <div v-else>
       <Floor22th />
     </div> 
     <router-view></router-view>
   </div>
 </template>
   
 <script>
 import Floor12th from './seeds/floor12th.vue'
 import Floor14th from './seeds/floor14th.vue'
 import Floor17th from './seeds/floor17th.vue'
 import Floor19th from './seeds/floor19th.vue'
 import Floor22th from './seeds/floor22th.vue'
 
 export default {
   el: '#main',
   data() {
     return {
       active: 'floor14th'
     }
   },
   components: {
      Floor12th, Floor14th, Floor17th, Floor19th, Floor22th
   },
   methods: {
     makeActive: function (item) {
       this.active = item;
     }
   }
 }
 </script>
   
   <!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped>
 * {
   margin: 0;
   padding: 0;
 }
 
 body {
   font: 15px/1.3 'Open Sans', sans-serif;
   color: #5e5b64;
   text-align: center;
 }
 
 a,
 a:visited {
   outline: none;
   color: #389dc1;
 }
 
 a:hover {
   text-decoration: none;
 }
 
 section,
 footer,
 header,
 aside,
 nav {
   display: block;
 }
 
 /*-------------------------
     The menu
   --------------------------*/
 
 nav {
   display: inline-block;
   margin: 10px auto 10px;
   background-color: #5597b4;
   box-shadow: 0 1px 1px #ccc;
   border-radius: 2px;
 }
 
 nav a {
   display: inline-block;
   padding: 18px 30px;
   color: #fff !important;
   font-weight: bold;
   font-size: 16px;
   text-decoration: none !important;
   line-height: 1;
   text-transform: uppercase;
   background-color: transparent;
 
   -webkit-transition: background-color 0.25s;
   -moz-transition: background-color 0.25s;
   transition: background-color 0.25s;
 }
 
 nav a:first-child {
   border-radius: 2px 0 0 2px;
 }
 
 nav a:last-child {
   border-radius: 0 2px 2px 0;
 }
 
 nav.floor12th .floor12th,
 nav.floor14th .floor14th,
 nav.floor17th .floor17th,
 nav.floor19th .floor19th,
 nav.floor22th .floor22th 
 {
   background-color: #e35885;
 }
 
 p {
   font-size: 22px;
   font-weight: bold;
   color: #7d9098;
 }
 
 p b {
   color: #ffffff;
   display: inline-block;
   padding: 5px 10px;
   background-color: #c4d7e0;
   border-radius: 2px;
   text-transform: uppercase;
   font-size: 18px;
 }
 
 .resource {
   margin: 20px 0;
 }</style>